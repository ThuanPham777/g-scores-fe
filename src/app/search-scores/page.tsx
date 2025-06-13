'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/axios"
import { StudentScore } from "@/types/StudentScore"

export default function SearchScores() {
    const [registrationNumber, setRegistrationNumber] = useState("")
    const [searchResults, setSearchResults] = useState<StudentScore | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setSearchResults(undefined)
        setErrorMessage("")

        try {
            const res = await api.get(`/students/search-score?registrationNumber=${registrationNumber}`)
            const result = res.data?.data
            if (result) {
                setSearchResults(result)
            } else {
                setErrorMessage("No student found with that registration number.")
            }
        } catch (error) {
            console.error("Error fetching student scores:", error)
            setErrorMessage("An error occurred while searching. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const scoreFields: { label: string; key: keyof StudentScore; isForeignLang?: boolean }[] = [
        { label: "Math", key: "math" },
        { label: "Literature", key: "literature" },
        { label: "Foreign Language", key: "foreignlanguage", isForeignLang: true },
        { label: "Physics", key: "physics" },
        { label: "Chemistry", key: "chemistry" },
        { label: "Biology", key: "biology" },
        { label: "History", key: "history" },
        { label: "Geography", key: "geography" },
        { label: "Civic Education", key: "civics" },
    ]

    return (
        <div className="space-y-6 mt-12">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Student Score Lookup</h1>
                <p className="text-gray-600">Enter the registration number to search for student scores.</p>
            </div>

            {/* Search Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Search Student</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="registration-number" className="block mb-2">Registration Number</Label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    id="registration-number"
                                    type="text"
                                    placeholder="Enter registration number"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    required
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Searching..." : "Search"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Error message */}
            {errorMessage && (
                <div className="text-red-600 font-medium">{errorMessage}</div>
            )}

            {/* Results */}
            {searchResults && (
                <Card>
                    <CardHeader>
                        <CardTitle>Score Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            {scoreFields.map((field) => {
                                const value = field.isForeignLang
                                    ? searchResults?.foreignlanguage && searchResults?.foreignlangcode
                                        ? `${searchResults.foreignlanguage} (${searchResults.foreignlangcode})`
                                        : "Unknown"
                                    : searchResults?.[field.key] ?? "Unknown"

                                return (
                                    <div key={field.key}>
                                        <p className="font-medium text-gray-600">{field.label}</p>
                                        <p className="text-lg font-bold">
                                            {value !== undefined && value !== null ? value : "Unknown"}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
