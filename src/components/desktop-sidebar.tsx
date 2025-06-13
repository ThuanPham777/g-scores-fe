"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DesktopSidebar() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }

    return (
        <aside className="hidden md:block fixed left-0 top-16 w-60 lg:w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500 z-40">
            <div className="p-4 md:p-6 h-full overflow-y-auto">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Menu</h2>
                <nav className="space-y-1 md:space-y-2">
                    <Link
                        href="/"
                        className={`block w-full text-left px-3 py-2 rounded font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${isActive("/") ? "bg-white/20 text-white font-semibold" : "text-gray-800"
                            }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/search-scores"
                        className={`block w-full text-left px-3 py-2 rounded font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${isActive("/search-scores") ? "bg-white/20 text-white font-semibold" : "text-gray-800"
                            }`}
                    >
                        Search Scores
                    </Link>
                    <Link
                        href="/reports"
                        className={`block w-full text-left px-3 py-2 rounded font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${isActive("/reports") ? "bg-white/20 text-white font-semibold" : "text-gray-800"
                            }`}
                    >
                        Reports
                    </Link>
                    <Link
                        href="/settings"
                        className={`block w-full text-left px-3 py-2 rounded font-medium hover:bg-black/10 transition-colors text-sm md:text-base ${isActive("/settings") ? "bg-white/20 text-white font-semibold" : "text-gray-800"
                            }`}
                    >
                        Settings
                    </Link>
                </nav>
            </div>
        </aside>
    )
}