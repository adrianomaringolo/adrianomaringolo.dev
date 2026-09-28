import { NextResponse } from 'next/server'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  // Honeypot: a hidden field real visitors never fill. Answer like a success
  // so bots don't learn to skip it, but don't forward anything.
  if (str(body.website, 200)) {
    return NextResponse.json({ status: 'success' })
  }

  const data = {
    name: str(body.name, 200),
    email: str(body.email, 200),
    package: str(body.package, 50),
    addons: Array.isArray(body.addons) ? body.addons.map((a) => str(a, 100)).filter(Boolean).slice(0, 10) : [],
    message: str(body.message, 5000),
  }

  if (!data.name || !EMAIL.test(data.email) || !data.message) {
    return NextResponse.json({ error: 'missing or invalid fields' }, { status: 400 })
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[contact] CONTACT_WEBHOOK_URL is not configured')
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'websites-landing' }),
    })

    // Apps Script answers 200 with an HTML error page when the script throws,
    // so neither the status nor "it parsed" is enough: require its success flag
    // (the portfolio's script says { status: 'success' }, this one { success: true }).
    const text = await response.text()
    let result: { status?: string; success?: boolean } | undefined
    try {
      result = JSON.parse(text)
    } catch {
      // not JSON: handled below
    }

    if (!response.ok || !(result?.success === true || result?.status === 'success')) {
      console.error('[contact] webhook failed', response.status, text.slice(0, 500))
      return NextResponse.json({ error: 'delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('[contact] webhook unreachable', error)
    return NextResponse.json({ error: 'delivery failed' }, { status: 502 })
  }
}
