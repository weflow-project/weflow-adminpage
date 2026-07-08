export interface Step {
  num: string;
  title: string;
  desc: string;
  detail: string;
  image: string;
}

export const steps: Step[] = [
  {
    num: "01",
    title: "상담·진단",
    desc: "업종 및 제작 방향 확인",
    detail:
      "고객의 업종, 타겟 고객, 경쟁사 분석을 통해 최적의 제작 방향을 설정합니다.",
    image: "/images/process/process-01-consult.png",
  },
  {
    num: "02",
    title: "기획·설계",
    desc: "문의 구조 및 전략 설계",
    detail:
      "고객이 문의로 이어지는 동선을 설계하고, 버튼 위치와 CTA 구조를 최적화합니다.",
    image: "/images/process/process-02-plan.png",
  },
  {
    num: "03",
    title: "디자인",
    desc: "브랜드 맞춤 화면 구성",
    detail:
      "업종별 특성에 맞는 컬러, 레이아웃, 폰트를 선정하여 브랜드 아이덴티티를 구현합니다.",
    image: "/images/process/process-03-design.png",
  },
  {
    num: "04",
    title: "개발",
    desc: "필요한 기능 구현 및 페이지 개발",
    detail: "설계안을 바탕으로 페이지와 기능을 안정적으로 개발합니다.",
    image: "/images/process/process-04-dev.png",
  },
  {
    num: "05",
    title: "최종 점검 및 배포",
    desc: "반응형 검수 · 실제 배포",
    detail:
      "PC·모바일 반응형과 속도·오류·크로스브라우저까지 최종 점검한 뒤, 실제 도메인에 배포해 사이트를 오픈합니다.",
    image: "/images/process/process-05-responsive.png",
  },
  {
    num: "06",
    title: "제휴 마케팅·상단 관리 (선택형)",
    desc: "블로그·인스타·유튜브 숏폼·네이버 플레이스",
    detail:
      "WEFLOW만의 제휴 채널(블로그·인스타그램·\n유튜브 숏폼·네이버 플레이스)에 연결하고\n검색 상단 노출까지 관리해, 제작 이후에도 노출과 유입을 만듭니다.",
    image: "/images/process/process-06-marketing.png",
  },
];

export const adServices = [
  { icon: "📝", title: "블로그 업로드", desc: "네이버 블로그 정기 업로드" },
  { icon: "📸", title: "인스타 업로드", desc: "인스타그램·메타 광고 운영" },
  { icon: "🧵", title: "스레드 업로드", desc: "스레드 계정 운영 관리" },
  { icon: "🔍", title: "네이버 키워드", desc: "네이버 키워드 광고 세팅·운영" },
  { icon: "🥕", title: "당근플레이스", desc: "당근플레이스 키워드 업로드" },
  { icon: "📊", title: "네이버 서치어드바이저", desc: "상단 등록 및 최적화" },
  { icon: "🌐", title: "구글 콘솔", desc: "구글 검색 상단 등록" },
  { icon: "🗺️", title: "사이트맵 등록", desc: "XML 사이트맵 생성 및 등록" },
];
