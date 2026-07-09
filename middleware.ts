import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 깨진 링크 안전장치:
// 마크다운 대괄호 등 잘못 붙은 문자([ ] ( ))가 URL 경로에 섞여 들어오면
// 404로 이탈시키지 않고 홈으로 보낸다. (예: /] → /)
const BROKEN = /[[\]()]/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  if (BROKEN.test(pathname) || BROKEN.test(decoded)) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// 정적 파일·API·내부 경로는 제외
export const config = {
  matcher: ['/((?!_next|api).*)'],
}
