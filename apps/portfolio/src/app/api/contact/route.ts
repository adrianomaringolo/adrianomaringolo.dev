import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(
    'https://script.google.com/macros/s/AKfycby1tfnTb2yec1k6fm266qH4wtQ_arR5kvVat9A1bx-TpiybyiVl7DR58zGmRICzgHSP/exec',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
