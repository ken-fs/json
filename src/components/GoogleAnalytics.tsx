'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6FX1CYKSLV';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const gtag = typeof window !== 'undefined' ? window.gtag : undefined;

    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });

      // 首页曝光事件
      if (pathname === '/') {
        gtag('event', '首页曝光');
      }
    }
  }, [pathname, searchParams]);

  return null;
}
