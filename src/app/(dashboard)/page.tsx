"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Student {
    id: string
    math: number
    physics: number
    chemistry: number
    total: number
}

export default function Dashboard() {
    const [top10groupStudent, setTop10groupStudent] = useState<Student[]>([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await api.get("/students/top-10-students")
                setTop10groupStudent(response.data.data)
                setError(null)
            } catch (err) {
                setError("Failed to fetch student data. Please try again later.")
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="text-red-500 text-lg">{error}</div>
                <Button
                    onClick={() => window.location.reload()}
                    className="bg-blue-700 hover:bg-blue-800"
                >
                    Try Again
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Top 10 Students</h1>
                    <p className="text-gray-600 mt-1">View the highest performing students in Group A</p>
                </div>
            </div>

            <div className="rounded-lg border bg-white shadow-sm overflow-x-auto">
                <Table>
                    <TableCaption>List of top 10 performing students in Group A</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead className="text-right">Math</TableHead>
                            <TableHead className="text-right">Physics</TableHead>
                            <TableHead className="text-right">Chemistry</TableHead>
                            <TableHead className="text-right font-bold">Total Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    Loading..
                                </TableCell>
                            </TableRow>
                        ) : (
                            top10groupStudent.map((student, index) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center justify-center w-6 h-6 rounded-full ${index < 3
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-100 text-gray-800"
                                                }`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono">{student.id}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        {student.math}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {student.physics}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {student.chemistry}
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-blue-700">
                                        {student.total}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}