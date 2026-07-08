import { NextResponse } from 'next/server'
import { bookingStore } from '@/lib/store'

export async function GET() {
  const bookings = await bookingStore.getAll()
  return NextResponse.json(bookings)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, type, industry, note, date, time } = body
  if (!name || !phone || !type || !date || !time) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }
  const item = await bookingStore.create({ name, phone, type, industry: industry || '', note: note || '', date, time })
  return NextResponse.json(item, { status: 201 })
}
