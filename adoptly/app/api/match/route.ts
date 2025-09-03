import { NextRequest, NextResponse } from 'next/server'
import { matchPets, QuizAnswer } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const answers: QuizAnswer = {
      livingSpace: body.livingSpace,
      activityLevel: body.activityLevel,
      experience: body.experience,
      timeAvailable: body.timeAvailable,
      hasKids: body.hasKids
    }
    
    const matches = matchPets(answers)
    return NextResponse.json({ matches })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
}