export interface Case {
  slug: string
  name: string
  category: string
  color: string
  emoji: string
}

export interface CaseDetail {
  name: string
  category: string
  emoji: string
  color: string
  challenge: string
  solution: string
  result: string
}

export const caseDetails: Record<string, CaseDetail> = {
  'pt-shop': {
    name: 'PT샵', category: '피트니스', emoji: '💪', color: '#6366f1',
    challenge: 'PT 상담 문의가 소셜미디어 대비 홈페이지에서 거의 들어오지 않는 상황이었습니다.',
    solution: 'PT 체험 문의 버튼을 상단과 하단에 배치하고, 모바일 문의 동선을 카카오톡으로 최적화했습니다. 사진과 후기를 배너로 구성했습니다.',
    result: '홈페이지를 통한 PT 상담 문의가 월 3회에서 월 18회로 6배 증가했습니다.',
  },
  'pilates': {
    name: '필라테스', category: '피트니스', emoji: '🧘', color: '#ec4899',
    challenge: '필라테스 홈페이지가 있었지만 모바일에서 문의 버튼이 잘 보이지 않았고, 체험 신청 경로가 복잡했습니다.',
    solution: '모바일 최우선 반응형으로 재제작하고, 상담 플로팅 버튼과 카카오톡 채널 연동을 적용했습니다.',
    result: '모바일 체험 신청 전환율이 35% 향상되었습니다.',
  },
  'fitness': {
    name: '헬스장', category: '피트니스', emoji: '🏋️', color: '#8b5cf6',
    challenge: '헬스장 홈페이지가 없어 신규 회원이 SNS 검색에만 의존하던 상황이었습니다.',
    solution: '업종 특화 랜딩페이지를 제작하고, 회원권 종류별 CTA와 네이버 키워드 광고를 연동했습니다.',
    result: '검색 유입 신규 문의가 월 평균 12건 발생하여 오프라인 상담으로 연결됐습니다.',
  },
  'insurance': {
    name: '보험 설계', category: '금융', emoji: '📋', color: '#f59e0b',
    challenge: '복잡한 보험 상품 설명 때문에 방문자가 이탈하고 문의로 이어지지 않았습니다.',
    solution: '핵심 혜택 3가지를 히어로 섹션에 배치하고, 간단한 무료 상담 신청 폼으로 진입 장벽을 낮췄습니다.',
    result: '랜딩 페이지 문의 전환율이 2.1%에서 8.7%로 향상됐습니다.',
  },
  'law': {
    name: '법률 사무소', category: '법률', emoji: '⚖️', color: '#1e40af',
    challenge: '법률 서비스 특성상 신뢰도가 중요하지만 기존 홈페이지가 너무 오래되어 신뢰감을 주지 못했습니다.',
    solution: '수임 실적과 변호사 프로필을 전면에 배치하고, 무료 법률 상담 예약 폼을 제작했습니다.',
    result: '홈페이지 리뉴얼 후 온라인 상담 예약이 월 15건으로 안정적으로 유입됩니다.',
  },
  'car-detailing': {
    name: '자동차 디테일링', category: '자동차', emoji: '🚗', color: '#0891b2',
    challenge: '비포·애프터 사진이 없어 신뢰도가 낮고, 가격 문의가 전화로만 들어와 대응이 어려웠습니다.',
    solution: '비포·애프터 갤러리 섹션과 온라인 견적 문의 폼을 제작했습니다.',
    result: '온라인 견적 문의가 월 22건 발생하여 예약 관리가 체계화됐습니다.',
  },
  'rental-car': {
    name: '렌터카 업체', category: '자동차', emoji: '🚙', color: '#059669',
    challenge: '렌터카 예약이 전화에만 의존해 야간·주말 예약 기회를 놓치고 있었습니다.',
    solution: '차종별 소개와 온라인 예약 문의 폼을 구성하고 카카오채널을 연동했습니다.',
    result: '비전화 온라인 예약 문의가 30% 증가하고 고객 응대 시간이 단축됐습니다.',
  },
  'wedding': {
    name: '웨딩/스냅 업체', category: '웨딩', emoji: '💒', color: '#f43f5e',
    challenge: '포트폴리오가 인스타그램에만 있어 검색 유입이 없고 상담 신청 경로가 불명확했습니다.',
    solution: '갤러리형 포트폴리오 페이지와 패키지별 가격표, 상담 예약 폼을 제작했습니다.',
    result: '네이버 검색을 통한 문의가 월 8건 발생하고 인스타 의존도가 낮아졌습니다.',
  },
  'tax': {
    name: '세무사 사무소', category: '금융', emoji: '📊', color: '#d97706',
    challenge: '세무 서비스의 전문성이 홈페이지에 제대로 전달되지 않아 문의 전환율이 낮았습니다.',
    solution: '업종별 세무 서비스 항목을 구조화하고, 무료 세무 상담 신청 폼을 상단에 배치했습니다.',
    result: '온라인 무료 상담 신청이 월 10건 이상 꾸준히 유입됩니다.',
  },
  'realestate': {
    name: '공인중개사', category: '부동산', emoji: '🏠', color: '#16a34a',
    challenge: '매물 정보가 없는 단순 명함형 홈페이지로 방문자 체류 시간이 짧았습니다.',
    solution: '지역 특화 키워드 중심 랜딩페이지와 카카오 상담 연동, 당근플레이스 광고를 세팅했습니다.',
    result: '지역 검색을 통한 신규 매물 문의가 월 15건으로 증가했습니다.',
  },
  'cafe': {
    name: '카페', category: '식음료', emoji: '☕', color: '#92400e',
    challenge: '카페 정보가 포털 지도에만 있고 자체 홈페이지나 예약 시스템이 없었습니다.',
    solution: '메뉴·분위기 소개 페이지와 단체 예약 문의 폼을 제작하고 구글 마이비즈니스와 연동했습니다.',
    result: '단체 예약 문의가 생기고 포털 노출 순위가 상승했습니다.',
  },
  'beauty': {
    name: '미용실', category: '뷰티', emoji: '✂️', color: '#db2777',
    challenge: '신규 고객이 가격과 스타일 정보를 찾지 못해 이탈하는 경우가 많았습니다.',
    solution: '시술 메뉴와 가격표, 헤어 포트폴리오를 구성하고 카카오 예약을 연동했습니다.',
    result: '온라인을 통한 신규 예약이 월 20건으로 늘어났습니다.',
  },
  'nail': {
    name: '네일샵', category: '뷰티', emoji: '💅', color: '#7c3aed',
    challenge: '인스타그램 포트폴리오만 있고 예약 경로가 DM으로만 연결되어 관리가 어려웠습니다.',
    solution: '디자인 갤러리와 시술 메뉴 안내 페이지, 카카오 예약 연동을 구성했습니다.',
    result: '예약 관리가 체계화되고 신규 유입 예약이 월 15건 증가했습니다.',
  },
  'sme': {
    name: '소상공인 기업형 홈페이지', category: '기업', emoji: '🏢', color: '#2563eb',
    challenge: '사업 규모에 비해 신뢰도 있는 홈페이지가 없어 B2B 미팅에서 불이익을 겪었습니다.',
    solution: '회사 소개, 사업 영역, 연혁을 갖춘 기업형 홈페이지를 제작하고 SEO를 최적화했습니다.',
    result: '홈페이지 제시 후 파트너사 미팅 성사율이 높아지고 브랜드 신뢰도가 개선됐습니다.',
  },
  'skin': {
    name: '피부관리샵', category: '뷰티', emoji: '✨', color: '#be185d',
    challenge: '피부 고민별 서비스를 설명하는 콘텐츠가 없어 신규 고객의 문의 진입 장벽이 높았습니다.',
    solution: '피부 고민 유형별 솔루션 섹션과 후기, 시술 전·후 사진을 구성하고 상담 폼을 배치했습니다.',
    result: '무료 피부 상담 신청이 월 18건으로 증가했습니다.',
  },
  'waxing': {
    name: '왁싱샵', category: '뷰티', emoji: '🌸', color: '#9333ea',
    challenge: '왁싱 서비스 특성상 처음 방문하는 고객의 심리적 장벽이 높아 문의가 적었습니다.',
    solution: 'FAQ 섹션으로 초보자 의문을 해소하고, 부위별 시술 안내와 가격표, 예약 폼을 구성했습니다.',
    result: '초보 신규 고객 예약이 늘고 전화 상담 문의 수가 줄어 업무 효율이 향상됐습니다.',
  },
  'semiperm': {
    name: '반영구샵', category: '뷰티', emoji: '💋', color: '#c2410c',
    challenge: '시술 종류와 지속 기간 정보가 부족해 가격 비교 후 이탈하는 고객이 많았습니다.',
    solution: '시술별 비포·애프터 갤러리와 상세 안내, 무료 상담 예약 폼을 제작했습니다.',
    result: '상담 예약 전환율이 높아지고 재방문 고객도 꾸준히 증가했습니다.',
  },
  'petgrooming': {
    name: '애견미용', category: '반려동물', emoji: '🐶', color: '#65a30d',
    challenge: '견종별 미용 스타일 정보가 없어 신규 고객이 예약 전에 이탈하는 경우가 많았습니다.',
    solution: '견종별 미용 스타일 가이드와 포트폴리오, 카카오 예약 연동을 구성했습니다.',
    result: '온라인 예약 문의가 월 20건으로 증가하고 반복 예약 고객이 늘었습니다.',
  },
  'petshop': {
    name: '반려동물 용품점', category: '반려동물', emoji: '🐾', color: '#16a34a',
    challenge: '오프라인 매장 중심으로 운영되어 온라인 인지도와 유입이 전혀 없었습니다.',
    solution: '상품 카테고리 소개 페이지와 온라인 문의 폼, 당근플레이스 광고를 연동했습니다.',
    result: '지역 검색 유입이 생기고 온라인 구매 문의가 월 10건 이상 발생했습니다.',
  },
  'interior': {
    name: '인테리어 업체', category: '인테리어', emoji: '🛋️', color: '#b45309',
    challenge: '시공 사례가 없어 잠재 고객이 신뢰하기 어렵고 견적 문의로 이어지지 않았습니다.',
    solution: '시공 전·후 갤러리와 공간별 포트폴리오, 무료 견적 신청 폼을 제작했습니다.',
    result: '온라인 견적 신청이 월 15건으로 안정적으로 유입됩니다.',
  },
  'moving': {
    name: '이사 업체', category: '생활서비스', emoji: '📦', color: '#0369a1',
    challenge: '이사 시즌에만 검색 광고를 운영해 비시즌 유입이 없고 비용 대비 효율이 낮았습니다.',
    solution: '지역·평수별 이사 서비스 랜딩페이지와 견적 신청 폼, 네이버 키워드 광고를 최적화했습니다.',
    result: '비시즌에도 월 8건 이상 온라인 견적 문의가 꾸준히 들어옵니다.',
  },
  'kidscafe': {
    name: '키즈카페', category: '엔터테인먼트', emoji: '🎡', color: '#ea580c',
    challenge: '시설 사진과 요금 정보를 찾지 못한 부모 고객이 이탈하는 경우가 많았습니다.',
    solution: '시설 사진 갤러리, 이용 요금표, 단체 예약 문의 폼을 제작하고 지역 키워드를 최적화했습니다.',
    result: '단체 예약과 생일파티 문의가 월 12건으로 증가했습니다.',
  },
  'studycafe': {
    name: '스터디카페', category: '교육', emoji: '📚', color: '#7c3aed',
    challenge: '스터디카페 요금제와 좌석 정보가 명확하지 않아 신규 이용자 유입이 적었습니다.',
    solution: '좌석 유형별 요금제 안내와 무료 체험권 신청 폼을 제작하고 지역 검색을 최적화했습니다.',
    result: '무료 체험 신청이 월 25건으로 늘고 정기 이용자 전환율이 높아졌습니다.',
  },
  'english': {
    name: '영어학원', category: '교육', emoji: '🔤', color: '#0891b2',
    challenge: '학부모가 커리큘럼과 레벨별 수업 정보를 찾지 못해 상담 전화를 하지 않고 이탈했습니다.',
    solution: '레벨별 커리큘럼 안내와 원장 소개, 무료 레벨 테스트 신청 폼을 제작했습니다.',
    result: '레벨 테스트 신청이 월 18건으로 증가하고 등록 전환율이 높아졌습니다.',
  },
  'math': {
    name: '수학학원', category: '교육', emoji: '🔢', color: '#1d4ed8',
    challenge: '입소문 외에 온라인 유입 경로가 없어 신규 학생 모집에 어려움이 있었습니다.',
    solution: '학년별 수업 과정과 강사 소개, 무료 진단 테스트 신청 폼을 제작하고 SEO를 적용했습니다.',
    result: '네이버 검색을 통한 학부모 문의가 월 10건 발생했습니다.',
  },
  'entrance': {
    name: '입시학원', category: '교육', emoji: '🎓', color: '#dc2626',
    challenge: '입시 실적을 효과적으로 전달하지 못해 타 학원 대비 신뢰도에서 뒤처졌습니다.',
    solution: '합격 실적 배너와 학습 관리 시스템 안내, 무료 입시 상담 신청 폼을 구성했습니다.',
    result: '상담 신청이 월 20건으로 늘고 재수생·고3 신규 등록이 증가했습니다.',
  },
  'tutoring': {
    name: '개인과외', category: '교육', emoji: '📖', color: '#059669',
    challenge: '개인 과외임에도 신뢰도를 높일 수 있는 자기소개 채널이 없었습니다.',
    solution: '강사 프로필, 수업 방식, 수강 후기를 담은 개인 브랜딩 페이지를 제작했습니다.',
    result: '학부모 직접 문의가 꾸준히 들어와 수업 공백 없이 운영이 가능해졌습니다.',
  },
  'cleaning': {
    name: '청소업체', category: '생활서비스', emoji: '🧹', color: '#0e7490',
    challenge: '청소 서비스 종류와 가격이 불명확해 견적 문의 전에 이탈하는 고객이 많았습니다.',
    solution: '서비스 유형별 가격 안내와 청소 전·후 사진, 온라인 견적 신청 폼을 구성했습니다.',
    result: '온라인 견적 문의가 월 30건으로 증가하고 서비스 지역이 확장됐습니다.',
  },
}

export const defaultCaseDetail: CaseDetail = {
  name: '업종별 맞춤 제작',
  category: '다양한 업종',
  emoji: '🏆',
  color: '#3b82f6',
  challenge: '고객마다 다른 업종과 타겟 고객에 맞춰 최적의 홈페이지 구조가 필요했습니다.',
  solution: 'WEFLOW는 업종별 전환 최적화 노하우를 바탕으로 문의 구조, 버튼 위치, 컨텐츠 배치를 설계합니다.',
  result: '평균적으로 홈페이지 리뉴얼 후 문의 전환율이 3~5배 향상됩니다.',
}

const SLUG_TO_IMAGE: Record<string, string> = {
  'pt-shop': 'pt',
  'pilates': 'pilates',
  'fitness': 'gym',
  'insurance': 'insurance',
  'law': 'law-firm',
  'car-detailing': 'car-detailing',
  'rental-car': 'car-rental',
  'wedding': 'wedding-snap',
  'tax': 'tax-office',
  'realestate': 'real-estate',
  'cafe': 'cafe',
  'beauty': 'hair-salon',
  'nail': 'nail-salon',
  'sme': 'corporate-site',
  'skin': 'skincare',
  'waxing': 'waxing',
  'semiperm': 'semi-permanent',
  'petgrooming': 'pet-grooming',
  'petshop': 'pet-supplies',
  'interior': 'interior',
  'moving': 'moving',
  'kidscafe': 'kids-cafe',
  'studycafe': 'study-cafe',
  'english': 'english-academy',
  'math': 'math-academy',
  'entrance': 'exam-academy',
  'tutoring': 'private-tutoring',
  'cleaning': 'cleaning',
}

export function caseImagePath(slug: string): string {
  const imageSlug = SLUG_TO_IMAGE[slug] ?? slug
  return `/images/cases/cases_${imageSlug}.jpg`
}

// 포트폴리오 준비 중 — 실제 제작 사례 확정 시 여기에 추가 (더미 데이터는 git 이력에 보존)
export const cases: Case[] = []
