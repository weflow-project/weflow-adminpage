import { cases, caseDetails, defaultCaseDetail, caseImagePath } from '@/data/cases'
import CaseDetailContent from '@/components/cases/CaseDetailContent'

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = caseDetails[slug] || defaultCaseDetail
  const imageSrc = caseImagePath(slug)
  return <CaseDetailContent c={c} imageSrc={imageSrc} slug={slug} />
}

export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }))
}
