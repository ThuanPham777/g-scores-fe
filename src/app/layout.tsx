import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "G-Scores Management System",
  description: "Student score management and reporting system",
}

function DesktopSidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-16 w-60 lg:w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500 z-40">
      <div className="p-4 md:p-6 h-full overflow-y-auto">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Menu</h2>
        <nav className="space-y-1 md:space-y-2">
          <Link
            href="/"
            className="block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base"
          >
            Dashboard
          </Link>
          <Link
            href="/search-scores"
            className="block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base"
          >
            Search Scores
          </Link>
          <Link
            href="/reports"
            className="block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base"
          >
            Reports
          </Link>
          <Link
            href="/settings"
            className="block w-full text-left px-3 py-2 rounded text-gray-800 font-medium hover:bg-black/10 transition-colors text-sm md:text-base"
          >
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          {/* Header - Fixed */}
          <header className="bg-blue-700 text-white py-3 md:py-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-between">
              {/* Mobile Menu Button - only show on mobile */}
              <div className="md:hidden">
                <AppSidebar />
              </div>
              <h1 className="text-xl md:text-2xl font-bold flex-1 text-center md:text-center">G-Scores</h1>
              <div className="w-10 md:hidden"></div>
            </div>
          </header>

          {/* Desktop Sidebar - Fixed */}
          <DesktopSidebar />

          {/* Main Content - với margin để tránh sidebar */}
          <main className="pt-16 md:ml-60 lg:ml-64 p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  )
}
