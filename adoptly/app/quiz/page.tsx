'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Progress, Badge } from '@/components/ui'
import { Brain, Heart, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

interface Pet {
  id: number
  name: string
  age: number
  tags: string[]
  story: string
  photo: string
}

interface QuizAnswer {
  livingSpace: string
  activityLevel: string
  experience: string
  timeAvailable: string
  hasKids: boolean
}

const questions = [
  {
    id: 'livingSpace',
    title: 'What\'s your living situation?',
    subtitle: 'This helps us match you with pets that will be comfortable in your space.',
    options: [
      { value: 'apartment', label: 'Apartment', description: 'Smaller space, possibly with restrictions' },
      { value: 'house-small', label: 'Small House', description: 'House with limited yard space' },
      { value: 'house-large', label: 'Large House', description: 'House with large yard or acreage' }
    ]
  },
  {
    id: 'activityLevel',
    title: 'How active are you?',
    subtitle: 'We\'ll match you with pets that fit your lifestyle.',
    options: [
      { value: 'low', label: 'Low Activity', description: 'Prefer quiet, calm activities' },
      { value: 'medium', label: 'Moderate Activity', description: 'Some walks and playtime' },
      { value: 'high', label: 'High Activity', description: 'Love running, hiking, and active play' }
    ]
  },
  {
    id: 'experience',
    title: 'What\'s your pet experience level?',
    subtitle: 'This helps us find pets that match your comfort level.',
    options: [
      { value: 'first-time', label: 'First-time Owner', description: 'New to pet ownership' },
      { value: 'some', label: 'Some Experience', description: 'Have had pets before' },
      { value: 'experienced', label: 'Very Experienced', description: 'Comfortable with all types of pets' }
    ]
  },
  {
    id: 'timeAvailable',
    title: 'How much time can you dedicate daily?',
    subtitle: 'Different pets need different amounts of attention.',
    options: [
      { value: 'limited', label: '1-2 hours', description: 'Limited time for pet care' },
      { value: 'moderate', label: '3-5 hours', description: 'Moderate amount of time' },
      { value: 'lots', label: '6+ hours', description: 'Lots of time for training and play' }
    ]
  },
  {
    id: 'hasKids',
    title: 'Do you have children at home?',
    subtitle: 'We\'ll prioritize kid-friendly pets for families.',
    options: [
      { value: 'yes', label: 'Yes', description: 'Children live in the home' },
      { value: 'no', label: 'No', description: 'No children in the home' }
    ]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({})
  const [matches, setMatches] = useState<Pet[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: string | boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuiz = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      })
      const data = await response.json()
      setMatches(data.matches)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      // Fallback matching logic for demo
      const mockMatches = generateMockMatches()
      setMatches(mockMatches)
      setShowResults(true)
    } finally {
      setLoading(false)
    }
  }

  const generateMockMatches = (): Pet[] => {
    // Simple affordability and compatibility assessment
    const mockPets: Pet[] = [
      {
        id: 1,
        name: "Buddy",
        age: 3,
        tags: ["Friendly", "House-trained", "Good with kids"],
        story: "Buddy is a gentle golden retriever mix who loves families and children. He's already house-trained and knows basic commands.",
        photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Luna",
        age: 2,
        tags: ["Calm", "Independent", "Low maintenance"],
        story: "Luna is a beautiful tabby cat who enjoys quiet environments. She's perfect for apartment living and doesn't require much space.",
        photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Max",
        age: 1,
        tags: ["Energetic", "Playful", "Needs training"],
        story: "Max is a young border collie mix with lots of energy. He would be perfect for an active family who enjoys outdoor activities.",
        photo: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop"
      }
    ]

    // Filter based on answers for better matching
    const { livingSpace, activityLevel, experience, timeAvailable } = answers
    
    return mockPets.filter((pet, index) => {
      if (livingSpace === 'apartment' && pet.name === 'Max') return false
      if (activityLevel === 'low' && pet.name === 'Max') return false
      if (experience === 'first-time' && pet.name === 'Max') return false
      return true
    })
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setMatches([])
    setShowResults(false)
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ?.id as keyof QuizAnswer]
  const isCurrentAnswered = currentAnswer !== undefined && currentAnswer !== ''

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Perfect Matches!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your lifestyle and preferences, here are the pets we think would be perfect for you.
          </p>
        </div>

        {/* Affordability Assessment */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏦 Affordability Assessment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Estimated Monthly Costs:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Food: ₹2,500-6,500</li>
                    <li>• Veterinary care: ₹4,000-12,000</li>
                    <li>• Supplies & toys: ₹1,500-4,000</li>
                    <li>• Grooming: ₹2,500-8,000</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">One-time Setup Costs:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Adoption fee: ₹4,000-25,000</li>
                    <li>• Initial supplies: ₹8,000-16,000</li>
                    <li>• Spay/neuter (if needed): ₹16,000-40,000</li>
                    <li>• Microchip: ₹2,000-4,000</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white/60 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Consider pet insurance and establish an emergency fund of ₹80,000-1,60,000 for unexpected veterinary costs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {matches.map((pet, index) => (
            <Card key={pet.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 relative">
              {/* Match Rank */}
              <div className="absolute -top-3 -right-3 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 
                    'bg-gradient-to-r from-orange-400 to-red-500'}`}>
                  {index + 1}
                </div>
              </div>

              {/* Pet Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    {index === 0 ? 'Best Match' : index === 1 ? 'Great Match' : 'Good Match'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pet.name}</h3>
                <p className="text-gray-600 mb-4">{pet.age} {pet.age === 1 ? 'year' : 'years'} old</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pet.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-purple-200 text-purple-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-4">{pet.story}</p>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Meet {pet.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              View All Available Pets
            </Button>
            <Button variant="outline" size="lg" onClick={resetQuiz} className="border-purple-300 text-purple-700 hover:bg-purple-50">
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Lifestyle Match Quiz
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Answer a few questions about your lifestyle and preferences, and we'll find the perfect pets for you.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">{currentQ.title}</CardTitle>
          <p className="text-gray-600">{currentQ.subtitle}</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer">
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  id={option.value}
                  checked={currentAnswer?.toString() === option.value}
                  onChange={(e) => handleAnswer(currentQ.id, currentQ.id === 'hasKids' ? e.target.value === 'yes' : e.target.value)}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="border-gray-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={nextQuestion}
          disabled={!isCurrentAnswered}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {currentQuestion === questions.length - 1 ? (
            <>
              Find My Matches
              <Heart className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}