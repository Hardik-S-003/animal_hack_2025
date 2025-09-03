'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, Avatar, AvatarFallback, Button } from '@/components/ui'
import { Heart, MessageCircle, Share, Calendar, Camera, User } from 'lucide-react'
import CreatePostModal from '@/components/CreatePostModal'
import AuthModal from '@/components/AuthModal'

interface Story {
  id: number
  author: string
  content: string
  photo?: string
  timestamp: string
}

export default function FeedPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories')
      const data = await response.json()
      setStories(data)
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getAuthorInitials = (author: string) => {
    return author.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const isShelfterPost = (author: string) => {
    return author.toLowerCase().includes('shelter') || author.toLowerCase().includes('adoptly')
  }

  const handleCreatePost = () => {
    if (isLoggedIn) {
      setIsCreatePostOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handlePostSubmit = async (post: { content: string; photo?: File }) => {
    // Create new story
    const newStory: Story = {
      id: Date.now(),
      author: 'You',
      content: post.content,
      photo: post.photo ? URL.createObjectURL(post.photo) : undefined,
      timestamp: new Date().toISOString()
    }
    
    setStories(prev => [newStory, ...prev])
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setIsCreatePostOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Adoption Stories Feed
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Follow the journeys of our adopted pets and share in the joy of successful matches.
        </p>
      </div>

      {/* New Post Prompt */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <button
                onClick={handleCreatePost}
                className="w-full text-left bg-gray-50 rounded-lg p-4 mb-3 hover:bg-gray-100 transition-colors"
              >
                <p className="text-gray-500 italic">Share your adoption story or update...</p>
              </button>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-purple-600 border-purple-300"
                  onClick={handleCreatePost}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  onClick={handleCreatePost}
                >
                  Share Story
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stories Feed */}
      <div className="space-y-6">
        {stories.map((story) => (
          <Card key={story.id} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Story Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className={
                      isShelfterPost(story.author) 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                        : "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    }>
                      {getAuthorInitials(story.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{story.author}</h3>
                      {isShelfterPost(story.author) && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Shelter
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(story.timestamp)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {story.content}
                </p>
              </div>

              {/* Story Photo */}
              {story.photo && (
                <div className="px-6 pb-4">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={story.photo}
                      alt="Story photo"
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Story Actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                      <Share className="h-5 w-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {Math.floor(Math.random() * 50) + 5} likes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No stories yet</h3>
          <p className="text-gray-600">Be the first to share your adoption journey!</p>
        </div>
      )}

      {/* Load More Button */}
      {stories.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Load More Stories
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Your Own Story?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse our available pets and begin your adoption journey today.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          Browse Pets
        </Button>
      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handlePostSubmit}
      />

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