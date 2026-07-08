/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // 루트로 들어오면 바로 관리자 페이지로 이동 (데모용)
  async redirects() {
    return [
      { source: '/', destination: '/admin', permanent: false },
    ]
  },
}

module.exports = nextConfig
