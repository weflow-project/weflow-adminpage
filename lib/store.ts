// ⚠️ 데모용 인메모리 스토어 — 실제 DB(Supabase) 연동 없이 하드코딩된 가라데이터로 동작합니다.
// 서버가 재시작되면 데이터가 초기 상태로 돌아갑니다. (상태 변경·삭제는 메모리에서만 유지)

export interface Booking {
  id: string
  status: 'pending' | 'in_progress' | 'done'
  name: string
  phone: string
  type: string
  industry: string
  note: string
  date: string
  time: string
  createdAt: string
}

export interface Inquiry {
  id: string
  status: 'pending' | 'in_progress' | 'done'
  name: string
  phone: string
  type: string
  industry: string
  note: string
  source?: string
  agree: boolean
  createdAt: string
}

export interface PageView {
  id: string
  sessionId: string
  path: string
  referrer: string
  source: string
  medium: string
  campaign: string
  device: string
  durationMs: number | null
  maxScroll: number | null
  createdAt: string
}

// ── 재현 가능한 의사난수 (매 실행 동일한 가라데이터) ──
let _seed = 20260708
function rnd(): number {
  _seed = (_seed * 1103515245 + 12345) & 0x7fffffff
  return _seed / 0x7fffffff
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)]
}
function int(min: number, max: number): number {
  return Math.floor(rnd() * (max - min + 1)) + min
}
function phone(): string {
  return '010-1234-5678'
}

const DAY = 86400000
const HOUR = 3600000
const NOW = Date.now()

const PROJECT_TYPES = [
  '랜딩페이지 제작',
  '랜딩형 홈페이지 제작',
  '홈페이지 제작',
  '기타(관리자 페이지)',
]
const NAMES = ['홍길동']
const INDUSTRIES = [
  '요식업', '뷰티/미용', '병원/의료', '교육/학원', '피트니스', '카페',
  '부동산', '법률/세무', '인테리어', '쇼핑몰', 'IT/스타트업', '펜션/숙박',
]
const NOTES = [
  '경쟁사보다 상단 노출이 잘 되었으면 합니다.',
  '모바일에서 문의 버튼이 잘 보였으면 해요.',
  '오픈 일정이 촉박해서 빠른 상담 부탁드립니다.',
  '기존 사이트 리뉴얼 건입니다.',
  '광고 연동까지 함께 진행하고 싶어요.',
  '',
  '',
  '예산 범위 내에서 가능한지 궁금합니다.',
  '후기/사례 페이지가 꼭 필요합니다.',
]
const TIMES = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const STATUSES: Booking['status'][] = ['pending', 'pending', 'in_progress', 'done']
const SOURCES = ['kakao', 'naver', 'instagram', 'google', 'direct', 'facebook']

function isoDaysAgo(daysAgo: number, hourJitter = true): string {
  const t = NOW - daysAgo * DAY - (hourJitter ? int(0, 22) * HOUR + int(0, 59) * 60000 : 0)
  return new Date(t).toISOString()
}
function dateStr(offsetDays: number): string {
  const d = new Date(NOW + offsetDays * DAY)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// ── 예약 가라데이터 ──
let _bid = 0
function seedBookings(): Booking[] {
  const rows: Booking[] = []
  for (let i = 0; i < 26; i++) {
    const daysAgo = int(0, 29)
    rows.push({
      id: `bk_${String(++_bid).padStart(4, '0')}`,
      status: pick(STATUSES),
      name: pick(NAMES),
      phone: phone(),
      type: pick(PROJECT_TYPES),
      industry: pick(INDUSTRIES),
      note: pick(NOTES),
      date: dateStr(int(1, 14)),
      time: pick(TIMES),
      createdAt: isoDaysAgo(daysAgo),
    })
  }
  return rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

// ── 문의 가라데이터 ──
let _iid = 0
function seedInquiries(): Inquiry[] {
  const rows: Inquiry[] = []
  for (let i = 0; i < 34; i++) {
    const daysAgo = int(0, 29)
    rows.push({
      id: `iq_${String(++_iid).padStart(4, '0')}`,
      status: pick(STATUSES),
      name: pick(NAMES),
      phone: phone(),
      type: pick(PROJECT_TYPES),
      industry: pick(INDUSTRIES),
      note: pick(NOTES),
      source: pick(['web', 'quiz', 'popup', 'web', 'web']),
      agree: true,
      createdAt: isoDaysAgo(daysAgo),
    })
  }
  return rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

// ── 방문(페이지뷰) 가라데이터 — 세션 단위로 생성 ──
const PATHS = ['/', '/service', '/pricing', '/cases', '/reviews', '/about', '/benefits', '/diagnosis', '/booking']
const DEVICES = ['mobile', 'mobile', 'mobile', 'desktop', 'tablet']
let _pid = 0
function seedPageViews(): PageView[] {
  const rows: PageView[] = []
  const SESSIONS = 140
  for (let s = 0; s < SESSIONS; s++) {
    const sessionId = `sess_${String(s).padStart(4, '0')}`
    const source = pick(SOURCES)
    const device = pick(DEVICES)
    const startDaysAgo = int(0, 13)
    let t = NOW - startDaysAgo * DAY - int(0, 20) * HOUR - int(0, 59) * 60000
    const depth = rnd() < 0.42 ? 1 : int(2, 5) // 42%는 즉시 이탈(1페이지)
    for (let p = 0; p < depth; p++) {
      const durationMs = int(4, 180) * 1000
      rows.push({
        id: `pv_${String(++_pid).padStart(5, '0')}`,
        sessionId,
        path: p === 0 ? '/' : pick(PATHS),
        referrer: source === 'direct' ? '' : `https://${source}.com/`,
        source,
        medium: source === 'direct' ? '' : 'referral',
        campaign: '',
        device,
        durationMs,
        maxScroll: int(15, 100),
        createdAt: new Date(t).toISOString(),
      })
      t += durationMs + int(1, 8) * 1000
    }
  }
  return rows.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
}

// 모듈 로드 시 1회 생성 (프로세스 생존 동안 유지)
const bookings: Booking[] = seedBookings()
const inquiries: Inquiry[] = seedInquiries()
const pageViews: PageView[] = seedPageViews()

export const bookingStore = {
  getAll: async (): Promise<Booking[]> =>
    [...bookings].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),

  create: async (input: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> => {
    const item: Booking = {
      ...input,
      id: `bk_${String(++_bid).padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    bookings.unshift(item)
    return item
  },

  update: async (id: string, patch: Partial<Booking>): Promise<Booking | null> => {
    const row = bookings.find((b) => b.id === id)
    if (!row) return null
    const { id: _i, createdAt: _c, ...rest } = patch as Partial<Booking>
    Object.assign(row, rest)
    return row
  },

  delete: async (id: string): Promise<boolean> => {
    const i = bookings.findIndex((b) => b.id === id)
    if (i === -1) return false
    bookings.splice(i, 1)
    return true
  },
}

export const inquiryStore = {
  getAll: async (): Promise<Inquiry[]> =>
    [...inquiries].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),

  create: async (input: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> => {
    const item: Inquiry = {
      ...input,
      id: `iq_${String(++_iid).padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    inquiries.unshift(item)
    return item
  },

  update: async (id: string, patch: Partial<Inquiry>): Promise<Inquiry | null> => {
    const row = inquiries.find((r) => r.id === id)
    if (!row) return null
    const { id: _i, createdAt: _c, ...rest } = patch as Partial<Inquiry>
    Object.assign(row, rest)
    return row
  },

  delete: async (id: string): Promise<boolean> => {
    const i = inquiries.findIndex((r) => r.id === id)
    if (i === -1) return false
    inquiries.splice(i, 1)
    return true
  },
}

export const pageViewStore = {
  getRecent: async (days = 30): Promise<PageView[]> => {
    const since = NOW - days * DAY
    return pageViews
      .filter((v) => +new Date(v.createdAt) >= since)
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
  },

  create: async (input: {
    sessionId: string; path: string; referrer: string
    source: string; medium: string; campaign: string; device: string
  }): Promise<{ id: string }> => {
    const id = `pv_${String(++_pid).padStart(5, '0')}`
    pageViews.push({
      ...input,
      id,
      durationMs: null,
      maxScroll: null,
      createdAt: new Date().toISOString(),
    })
    return { id }
  },

  setDuration: async (id: string, durationMs: number, maxScroll?: number): Promise<void> => {
    const row = pageViews.find((v) => v.id === id)
    if (!row) return
    row.durationMs = durationMs
    if (typeof maxScroll === 'number') row.maxScroll = maxScroll
  },
}
