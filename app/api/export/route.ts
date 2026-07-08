import { NextResponse } from 'next/server'
import { bookingStore, inquiryStore } from '@/lib/store'
import * as XLSX from 'xlsx'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'all'

  const wb = XLSX.utils.book_new()

  if (type === 'bookings' || type === 'all') {
    const bookings = (await bookingStore.getAll()).map(b => ({
      상태: b.status === 'pending' ? '대기' : b.status === 'in_progress' ? '진행중' : '완료',
      이름: b.name,
      연락처: b.phone,
      '제작 종류': b.type,
      업종: b.industry,
      '희망일정': `${b.date} ${b.time}`,
      추가요청사항: b.note,
      접수일: new Date(b.createdAt).toLocaleString('ko-KR'),
    }))
    const ws = XLSX.utils.json_to_sheet(bookings)
    XLSX.utils.book_append_sheet(wb, ws, '예약관리')
  }

  if (type === 'inquiries' || type === 'all') {
    const inquiries = (await inquiryStore.getAll()).map(i => ({
      상태: i.status === 'pending' ? '대기' : i.status === 'in_progress' ? '진행중' : '완료',
      이름: i.name,
      연락처: i.phone,
      '제작 종류': i.type,
      업종: i.industry,
      추가요청사항: i.note,
      출처: i.source || 'web',
      접수일: new Date(i.createdAt).toLocaleString('ko-KR'),
    }))
    const ws = XLSX.utils.json_to_sheet(inquiries)
    XLSX.utils.book_append_sheet(wb, ws, '문의관리')
  }

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const filename = `WEFLOW_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    },
  })
}
