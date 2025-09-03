'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, Badge, Button } from '@/components/ui'
import { Heart, MapPin, Calendar } from 'lucide-react'
import AuthModal from '@/components/AuthModal'

interface Pet {
  id: number
  name: string
  age: number
  tags: string[]
  story: string
  photo: string
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets')
      const data = await response.json()
      setPets(data)
    } catch (error) {
      console.error('Error fetching pets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInterest = (petName: string) => {
    if (isLoggedIn) {
      // Handle showing interest in pet
      alert(`Thank you for your interest in ${petName}! A shelter representative will contact you soon.`)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing pets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Meet Your New Best Friend
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Every pet has a story. Find the one that speaks to your heart.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div className="text-2xl font-bold text-purple-600">{pets.length}</div>
          <div className="text-sm text-gray-600">Available Pets</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div className="text-2xl font-bold text-pink-600">100%</div>
          <div className="text-sm text-gray-600">Health Checked</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
          <div className="text-2xl font-bold text-orange-600">24/7</div>
          <div className="text-sm text-gray-600">Support</div>
        </div>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <Card key={pet.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20">
            {/* Pet Image */}
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={pet.photo}
                alt={pet.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              {/* Age Badge */}
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700">
                  <Calendar className="h-3 w-3 mr-1" />
                  {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Name and Location */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Local Shelter</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {pet.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {tag}
                  </Badge>
                ))}
                {pet.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                    +{pet.tags.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Story */}
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {pet.story}
              </p>
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <div className="flex gap-3 w-full">
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => handleInterest(pet.name)}
                >
                  {isLoggedIn ? 'Show Interest' : 'Learn More'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => handleInterest(pet.name)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {pets.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐕</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No pets available right now</h3>
          <p className="text-gray-600">Check back soon for new arrivals!</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Didn't find your perfect match yet?
        </h2>
        <p className="text-gray-600 mb-6">
          Take our lifestyle quiz to get personalized recommendations based on your preferences.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          Take the Quiz
        </Button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}