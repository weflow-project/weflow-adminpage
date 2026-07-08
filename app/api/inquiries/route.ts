import { NextResponse } from 'next/server'
import { inquiryStore } from '@/lib/store'

export async function GET() {
  const inquiries = await inquiryStore.getAll()
  return NextResponse.json(inquiries)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, type, industry, note, agree, source } = body
  if (!name || !phone || !type) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }
  const item = await inquiryStore.create({ name, phone, type, industry: industry || '', note: note || '', agree: !!agree, source: source || 'web' })
  return NextResponse.json(item, { status: 201 })
}
