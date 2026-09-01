import type { NextConfig } from "next";

// Vercel 构建环境（VERCEL=1）不做静态导出：旧域名 json1.org 由 Vercel 全权 308
// 到 www.json.how，站点本体已由 Cloudflare Workers 托管（Vercel 项目仅作跳转器）。
// Cloudflare Workers Builds 环境没有 VERCEL 变量，仍走静态导出。
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  // 两种构建模式都保持尾部斜杠，与线上 URL 结构一致（避免跳转链中多一跳）
  trailingSlash: true,

  // Enable static exports for better SEO (disabled in development and on Vercel)
  ...(process.env.NODE_ENV === 'production' && !isVercel && {
    output: "export",
  }),

  // On Vercel: 308 every request on the legacy domains to www.json.how.
  // next.config redirects 运行在路由层，目录路径也能命中（vercel.json 只覆盖文件路径）。
  ...(isVercel && {
    async redirects() {
      return [
        {
          source: "/:path*",
          has: [{ type: "host" as const, value: "json1.org" }],
          destination: "https://www.json.how/:path*",
          permanent: true,
        },
        {
          source: "/:path*",
          has: [{ type: "host" as const, value: "www.json1.org" }],
          destination: "https://www.json.how/:path*",
          permanent: true,
        },
      ];
    },
  }),

  // Image optimization
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },

  // Performance optimizations
  compress: true,

  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
    turbopack: {
      resolveAlias: {
        // Fix potential module resolution issues
      },
    },
  }),

  // Note: headers and redirects are not supported with static export
  // These configurations are commented out for static export compatibility
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         // Security headers for better SEO ranking
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin',
  //         },
  //         {
  //           key: 'Permissions-Policy',
  //           value: 'camera=(), microphone=(), geolocation=()',
  //         },
  //         // Cache headers for performance
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/robots.txt',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=3600, s-maxage=3600',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/sitemap.xml',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=3600, s-maxage=3600',
  //         },
  //         {
  //           key: 'Content-Type',
  //           value: 'application/xml',
  //         },
  //       ],
  //     },
  //   ]
  // },

  // Note: redirects are not supported with static export
  // async redirects() {
  //   return [
  //     // Add any necessary redirects here
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
};

export default nextConfig;
