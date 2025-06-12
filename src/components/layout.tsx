"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import type { MenuItem } from "../types"

interface LayoutProps {
    children: React.ReactNode
    activeMenuItem: MenuItem
    onMenuItemChange: (item: MenuItem) => void
}

export function Layout({ children, activeMenuItem, onMenuItemChange }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const menuItems: MenuItem[] = ["Dashboard", "Search Scores", "Reports", "Settings"]

    const MenuContent = () => (
        <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Menu</h2>
            <nav className="space-y-1 md:space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            onMenuItemChange(item)
                            setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${activeMenuItem === item ? "bg-black/20" : ""
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-700 text-white py-3 md:py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-blue-600">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500">
                            <MenuContent />
                        </SheetContent>
                    </Sheet>

                    <h1 className="text-xl md:text-2xl font-bold flex-1 text-center">G-Scores</h1>
                    <div className="w-10 md:hidden"></div>
                </div>
            </header>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-60 lg:w-64 min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500">
                    <MenuContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full">{children}</main>
            </div>
        </div>
    )
}
