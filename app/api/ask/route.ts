import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, phone, access_code } = body

    if (!question || !phone || !access_code) {
      return NextResponse.json(
        { error: 'question, phone, and access_code are required' },
        { status: 400 }
      )
    }

    // In a real application, you would call your AI service here
    // For now, this is a placeholder that returns a mock response
    // You should replace this with your actual API call
    
    // Example: const response = await fetch('YOUR_AI_API_ENDPOINT', { ... })
    
    const answer = `Sure, I can address the question based on the provided information. The net losses increased in FY25 due to strategic investments in 'Cost of Services' to build out the SkillTech engine. These investments were necessary to enhance our service offerings and improve our technology infrastructure, which is expected to yield long-term benefits and help us achieve our growth objectives.`

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
