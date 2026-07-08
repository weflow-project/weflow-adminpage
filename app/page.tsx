"use client";
import { useEffect } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import PlaceholderSection from "@/components/home/PlaceholderSection";
import TargetCustomerSection from "@/components/home/TargetCustomerSection";
import HomepageDefinitionSection from "@/components/home/HomepageDefinitionSection";
import WhatIsHomepageSection from "@/components/home/WhatIsHomepageSection";
import LandingHomepageSection from "@/components/home/LandingHomepageSection";
import LandingPageSection from "@/components/home/LandingPageSection";
import AdminPageSection from "@/components/home/AdminPageSection";
import WhyAdminSection from "@/components/home/WhyAdminSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import ListeningSection from "@/components/home/ListeningSection";
import WhyWeflowSection from "@/components/home/WhyWeflowSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PricingSection from "@/components/home/PricingSection";
import HomeServiceSection from "@/components/home/HomeServiceSection";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import ComparisonCTA from "@/components/home/ComparisonCTA";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add("snap-home");
    return () => document.body.classList.remove("snap-home");
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. 대표 이미지 (캐러셀) */}
      <HeroBanner />

      {/* 2~7. 새 섹션 (임시 문구 · 텍스트 아래 이미지) */}
      <PlaceholderSection
        eyebrow="포트폴리오"
        stars
        title={
          <>
            WEFLOW의 실력,{" "}
            <span className="c-accent">
              <span className="tilt-hl tilt-hl-red">결과가 대신 말합니다</span>
            </span>
          </>
        }
        body="WEFLOW가 직접 제작한 결과물, 실제 성과로 확인하세요."
        background="var(--bg-secondary)"
        image="/images/main/main-portfolio-01.png"
        imageAlt="WEFLOW 포트폴리오"
        imageCount={1}
      />
      <PlaceholderSection
        eyebrow="고객 후기"
        stars
        title={
          <>
            결과보다 확실한 건,{" "}
            <span className="c-accent">
              <span className="tilt-hl tilt-hl-red">고객의 실제 목소리</span>
            </span>
            입니다
          </>
        }
        body="WEFLOW가 직접 제작한 결과물, 실제 고객 인터뷰로 확인하세요."
        image="/images/main/main-review-01.png"
        imageAlt="WEFLOW 고객 후기"
        imageCount={1}
      />
      <TargetCustomerSection />
      <HomepageDefinitionSection />
      <WhatIsHomepageSection />
      <LandingHomepageSection />
      <LandingPageSection />
      <AdminPageSection />
      <WhyAdminSection />

      {/* 8~12. 원래 있던 섹션들 */}
      <PartnershipSection />
      <ListeningSection />
      <WhyWeflowSection />

      {/* 13. WEFLOW 혜택 (기존) */}
      <BenefitsSection />

      {/* 14. 제작 플랜 & 가격 */}
      <PricingSection />

      {/* 15. 타사 비교 배너 (가격 아래) */}
      <ComparisonCTA />

      {/* 14~15. 서비스 · 회사소개 (임시 문구) */}
      <HomeServiceSection />
      <HomeAboutSection />

      {/* 16. 마지막 CTA (기존) */}
      <FinalCTA />
    </>
  );
}
