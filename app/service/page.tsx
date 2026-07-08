'use client'
import { useEffect } from 'react'
import ServiceFeatures from '@/components/service/ServiceFeatures'
import ServiceSteps from '@/components/service/ServiceSteps'
import ServiceSwitch from '@/components/service/ServiceSwitch'
import AdManagement from '@/components/service/AdManagement'
import ServiceCTA from '@/components/service/ServiceCTA'

export default function ServicePage() {
  useEffect(() => {
    document.body.classList.add('snap-home')
    return () => document.body.classList.remove('snap-home')
  }, [])

  return (
    <>
      <ServiceFeatures />
      <ServiceSteps />
      <ServiceSwitch />
      <AdManagement />
      <ServiceCTA />
    </>
  )
}
