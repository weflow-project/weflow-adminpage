export interface Review {
  star: number
  name: string
  text: string
  category: string
}

export const reviews: Review[] = [
  { star: 5, name: 'OO pt샵 대표', text: '문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.', category: '피트니스' },
]

export const reviewCategories = ['전체', ...Array.from(new Set(reviews.map(r => r.category)))]
