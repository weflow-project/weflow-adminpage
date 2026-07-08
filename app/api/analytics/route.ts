import { NextResponse } from 'next/server'
import { pageViewStore } from '@/lib/store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const days = Math.min(Math.max(Number(searchParams.get('days')) || 30, 1), 90)
  const rows = await pageViewStore.getRecent(days)
  return NextResponse.json(rows)
}
