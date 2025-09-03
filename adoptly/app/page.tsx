import Link from 'next/link'
import { Button } from '@/components/ui'
import { Home, Users, Brain, ArrowRight, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
              Find Your Perfect Pet Match
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with amazing pets waiting for their forever homes. Every adoption story begins with love.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/pets">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                Browse Pets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg">
                Take Quiz
                <Brain className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Adoptions</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600">Shelter Partners</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Adoptly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use modern technology and storytelling to create meaningful connections between pets and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <Link href="/pets" className="block">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pet Stories</h3>
                  <p className="text-gray-600 mb-4">
                    Each pet has a unique story. Learn about their personality, background, and what makes them special through detailed profiles.
                  </p>
                  <div className="text-purple-600 font-semibold group-hover:text-pink-600 transition-colors">
                    Browse Pets →
                  </div>
                </div>
              </Link>
            </div>

            <div className="group">
              <Link href="/quiz" className="block">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/20">
                  <div className="bg-gradient-to-r from-pink-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Matching</h3>
                  <p className="text-gray-600 mb-4">
                    Take our lifestyle quiz to find pets that match your living situation, activity level, and preferences perfectly.
                  </p>
                  <div className="text-purple-600 font-semibold group-hover:text-pink-600 transition-colors">
                    Take Quiz →
                  </div>
                </div>
              </Link>
            </div>

            <div className="group">
              <Link href="/feed" className="block">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/20">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Stories</h3>
                  <p className="text-gray-600 mb-4">
                    Follow adoption journeys, see success stories, and connect with a community of pet lovers and adopters.
                  </p>
                  <div className="text-purple-600 font-semibold group-hover:text-pink-600 transition-colors">
                    View Feed →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Success Stories
          </h2>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
              "Adoptly helped us find Luna, and it's been the best decision we've ever made. The matching quiz was spot-on, and Luna's story immediately captured our hearts. Six months later, she's the perfect addition to our family!"
            </blockquote>
            <div className="text-gray-600 font-semibold">
              — Sarah & Mike Rodriguez, Luna's Family
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your New Best Friend?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have found their perfect pet match through Adoptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pets">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 text-lg">
                Browse Available Pets
                <span className="ml-2 text-xl">🐾</span>
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                Find My Match
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}