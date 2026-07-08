import type { Metadata } from 'next'
import BenefitsSection from '@/components/home/BenefitsSection'
import BenefitDetails from '@/components/home/BenefitDetails'

export const metadata: Metadata = { title: 'WEFLOW 혜택 · WEFLOW' }

export default function BenefitsPage() {
  return (
    <>
      <BenefitsSection />
      <BenefitDetails />
    </>
  )
}
