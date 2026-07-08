import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

// 지연 초기화: 모듈 로드 시점이 아니라 실제 요청 시점에 클라이언트를 만든다.
// (next build 의 page-data 수집 단계에서 env 없이 모듈을 평가해도 throw 하지 않도록)
export function getSupabase(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다.'
    )
  }

  client = createClient(url, key)
  return client
}
