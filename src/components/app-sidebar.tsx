"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface MenuItem {
    title: string
    href: string
}

export function AppSidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const menuItems: MenuItem[] = [
        { title: "Dashboard", href: "/" },
        { title: "Search Scores", href: "/search-scores" },
        { title: "Reports", href: "/reports" },
        { title: "Settings", href: "/settings" },
    ]

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }

    const MenuContent = () => (
        <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Menu</h2>
            <nav className="space-y-1 md:space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${isActive(item.href) ? "bg-black/20" : ""
                            }`}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )

    return (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500">
                <MenuContent />
            </SheetContent>
        </Sheet>
    )
}
