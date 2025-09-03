import { NextRequest, NextResponse } from 'next/server'
import { pets, Pet } from '@/lib/data'

export async function GET() {
  return NextResponse.json(pets)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newPet: Pet = {
      id: pets.length + 1,
      name: body.name,
      age: body.age,
      tags: body.tags || [],
      story: body.story,
      photo: body.photo
    }
    
    pets.push(newPet)
    return NextResponse.json(newPet, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
}