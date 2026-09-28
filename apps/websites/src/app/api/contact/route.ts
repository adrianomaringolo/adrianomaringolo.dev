import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'CONTACT_WEBHOOK_URL is not configured' }, { status: 500 })
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, source: 'websites-landing' }),
  })

  const data = await response.json()
  return NextResponse.json(data)
}
