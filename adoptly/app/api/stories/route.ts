import { NextRequest, NextResponse } from 'next/server'
import { stories, Story } from '@/lib/data'

export async function GET() {
  // Return stories sorted by timestamp (newest first)
  const sortedStories = [...stories].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  return NextResponse.json(sortedStories)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newStory: Story = {
      id: stories.length + 1,
      author: body.author,
      content: body.content,
      photo: body.photo,
      timestamp: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    }
    
    stories.unshift(newStory) // Add to beginning for newest first
    return NextResponse.json(newStory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
}