'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Home, Users, Brain, Menu, User, LogOut } from 'lucide-react'
import AuthModal from './AuthModal'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setUser({
      name: 'Pet Lover',
      email: 'user@example.com'
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setIsMenuOpen(false)
  }

  const handleLoginClick = () => {
    setAuthMode('login')
    setIsAuthModalOpen(true)
    setIsMenuOpen(false)
  }

  const handleSignupClick = () => {
    setAuthMode('signup')
    setIsAuthModalOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl">🐾</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Adoptly
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation - Menu Structure */}
            <div className="hidden md:flex items-center">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                >
                  <Menu className="h-6 w-6" />
                  <span className="font-medium">Menu</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border">
                    {/* Navigation Links */}
                    <div className="px-2 py-1">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1">
                        Navigate
                      </div>
                      <Link 
                        href="/pets" 
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Home className="h-5 w-5" />
                        <span>Browse Pets</span>
                      </Link>
                      <Link 
                        href="/feed" 
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Users className="h-5 w-5" />
                        <span>Community Feed</span>
                      </Link>
                      <Link 
                        href="/quiz" 
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Brain className="h-5 w-5" />
                        <span>Pet Match Quiz</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 my-2"></div>

                    {/* Account Section */}
                    <div className="px-2 py-1">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1">
                        Account
                      </div>
                      {isLoggedIn ? (
                        <div>
                          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{user?.name}</span>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-md w-full text-left"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <button
                            onClick={handleLoginClick}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-md w-full text-left"
                          >
                            <User className="h-5 w-5" />
                            <span>Login</span>
                          </button>
                          <button
                            onClick={handleSignupClick}
                            className="flex items-center space-x-3 px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md w-full text-left"
                          >
                            <User className="h-5 w-5" />
                            <span>Sign Up</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-1">
                {/* Navigation Section */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Navigate
                  </div>
                  <Link 
                    href="/pets" 
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Browse Pets</span>
                  </Link>
                  <Link 
                    href="/feed" 
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Community Feed</span>
                  </Link>
                  <Link 
                    href="/quiz" 
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Brain className="h-5 w-5" />
                    <span className="font-medium">Pet Match Quiz</span>
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 mx-4"></div>
                
                {/* Account Section */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Account
                  </div>
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3 px-3 py-2 text-gray-700">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{user?.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors rounded-md w-full text-left"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleLoginClick}
                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md w-full text-left"
                      >
                        <User className="h-5 w-5" />
                        <span>Login</span>
                      </button>
                      <button
                        onClick={handleSignupClick}
                        className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md w-full text-left"
                      >
                        <User className="h-5 w-5" />
                        <span>Sign Up</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}
