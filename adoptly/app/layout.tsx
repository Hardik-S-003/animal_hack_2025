import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Home, Users, Brain, Menu, User, LogOut } from 'lucide-react'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adoptly - Find Your Perfect Pet Match',
  description: 'A modern pet adoption platform connecting loving families with pets in need',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Navigation />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-2xl">🐾</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Adoptly
                  </span>
                </div>
                <p className="text-gray-600">
                  Connecting loving families with pets in need. Every adoption saves a life.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}