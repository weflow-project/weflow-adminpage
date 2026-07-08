import next from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...next,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    // Next 16 / eslint-config-next 16 추가 규칙. 기존 코드의 hydration 플래그·
    // 데이터 로딩·파생 상태 동기화 패턴을 에러로 막지 않도록 경고로 완화(추후 정리 대상).
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default eslintConfig
