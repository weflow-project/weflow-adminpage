export interface Plan {
  name: string;
  sub: string;
  highlight: boolean;
  features: string[];
  originalPrice: string;
  price: string;
  note: string;
}

export interface MakePlan extends Plan {
  id: string;
  emoji: string;
  img: string;
  tagline: string;
  discount: string;
  maintenance: string;
  adminPrice: string;
  adminOriginalPrice: string;
  adminMaintenance: string;
}

export const makePlans: MakePlan[] = [
  {
    id: "start",
    name: "START",
    sub: "랜딩페이지",
    tagline: "스피드형",
    emoji: "🚀",
    img: "/images/3d-icon/image-3.svg",
    highlight: false,
    discount: "50%",
    features: [
      "랜딩페이지 1섹션 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "기본 SEO 설정",
    ],
    originalPrice: "780,000원",
    price: "390,000원",
    maintenance: "39,000원",
    adminPrice: "190,000원",
    adminOriginalPrice: "380,000원",
    adminMaintenance: "19,000원",
    note: "VAT 별도",
  },
  {
    id: "grow",
    name: "GROW",
    sub: "랜딩형 홈페이지",
    tagline: "밸런스형",
    emoji: "🌱",
    img: "/images/3d-icon/image-4.svg",
    highlight: false,
    discount: "50%",
    features: [
      "원페이지 형식 홈페이지 1섹션 & 페이지 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "헤더 앵커 이동 구성",
      "기본 SEO 설정",
    ],
    originalPrice: "1,180,000원",
    price: "590,000원",
    maintenance: "59,000원",
    adminPrice: "290,000원",
    adminOriginalPrice: "580,000원",
    adminMaintenance: "29,000원",
    note: "VAT 별도",
  },
  {
    id: "master",
    name: "MASTER",
    sub: "홈페이지",
    tagline: "풀 패키지형",
    emoji: "👑",
    img: "/images/3d-icon/image-5.svg",
    highlight: true,
    discount: "50%",
    features: [
      "홈페이지 1페이지 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "페이지 로딩 속도 최적화",
      "각 페이지별 URL 생성",
      "SEO 상위 노출 증가",
    ],
    originalPrice: "1,980,000원",
    price: "990,000원",
    maintenance: "99,000원",
    adminPrice: "390,000원",
    adminOriginalPrice: "780,000원",
    adminMaintenance: "39,000원",
    note: "VAT 별도",
  },
];

/* 케어플랜 전체 - 주석처리
export const carePlans: Plan[] = [
  {
    name: 'WE CARE',
    sub: '기본 관리 플랜',
    highlight: false,
    features: [
      '유지보수(월 수정) 월 1회',
      '블로그 : 월 1개',
      '인스타 : 월 4회 (주 1회)',
      '스레드 : 월 4회 (주 1회)',
      'SEO 상단등록',
    ],
    originalPrice: '월 170,000원',
    price: '월 89,000원~',
    note: 'VAT 별도',
  },
  {
    name: 'FLOW CARE',
    sub: '성장 관리 플랜',
    highlight: false,
    features: [
      '유지보수 : 월 3회',
      '인스타 : 월 8회 (주 2회)',
      '스레드 : 월 8회 (주 2회)',
      '블로그 : 월 2회',
      '네이버 키워드 세팅 할인 (149,000→79,000원)',
      '당근 키워드 광고 세팅 50% 할인 (79,000→39,000원)',
      '문의 개선',
      'SEO 상단 등록',
    ],
    originalPrice: '월 378,000원~',
    price: '월 189,000원~',
    note: 'VAT 별도',
  },
  {
    name: 'WEFLOW CARE',
    sub: '올인원 관리 플랜',
    highlight: true,
    features: [
      '유지보수 : 무제한',
      '블로그 : 월 4회 (주 1회)',
      '인스타 : 월 12회 (주 3회)',
      '스레드 : 월 12회 (주 3회)',
      '네이버 키워드/당근 플레이스 광고 세팅 무료',
      '월 성과 체크',
      '랜딩 개선',
      '광고관리',
      'SEO 최적화',
    ],
    originalPrice: '월 678,000원~',
    price: '월 339,000원~',
    note: 'VAT 별도',
  },
]
*/

/* 광고 세팅 플랜 - 주석처리
export const adPlans = [
  {
    name: '네이버 광고 (키워드 셋팅)',
    features: ['키워드 분석', '광고 세팅 지원', '광고 문구 제작', '문의 구조 연결', '채널 연동 지원', '성과 최적화'],
    originalPrice: '298,000원',
    price: '149,000원~',
    note: 'VAT 별도',
  },
  {
    name: '당근 플레이스 광고 (키워드 셋팅)',
    features: ['지역 키워드 분석', '광고 세팅 지원', '광고 문구 제작', '지역 타겟 설정', '랜딩 연결 지원', '성과 최적화'],
    originalPrice: '158,000원',
    price: '79,000원~',
    note: 'VAT 별도',
  },
]
*/
