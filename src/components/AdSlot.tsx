"use client";

import { useEffect, useRef } from "react";

/**
 * 广告位（Adsterra / highrevenueformat.com）。
 *
 * 联盟代码是 document.write 时代的老式 snippet（全局 atOptions + invoke.js），
 * 直接注入 React 页面时多个广告位会互相覆盖 window.atOptions（内联 conf 立即执行、
 * invoke 异步加载，执行顺序无法保证）。用 iframe srcDoc 给每个广告位一个隔离的
 * window，snippet 原样运行，顺序与并发都安全。
 *
 * sandbox 允许脚本和点击跳转（保障收入），但阻止广告自动重定向顶层页面。
 * 输出是静态 HTML（srcDoc 属性），不进客户端 bundle。
 */

const UNITS = {
  leaderboard: { key: "8f63bed6c94b51003c26bebbb63113c9", width: 728, height: 90 },
  box: { key: "00f21b08793fc613e7ed1305b09d19a7", width: 300, height: 250 },
  mobile: { key: "f7dd1d28a25401364dc2ef6a38872823", width: 320, height: 50 },
} as const;

export type AdUnit = keyof typeof UNITS;

export default function AdSlot({ unit }: { unit: AdUnit }) {
  const { key, width, height } = UNITS[unit];
  const options = JSON.stringify({ key, format: "iframe", height, width, params: {} });
  const ref = useRef<HTMLIFrameElement>(null);
  const srcDoc =
    `<!doctype html><html><head><style>body{margin:0;padding:0;overflow:hidden}</style></head>` +
    `<body><script>atOptions = ${options};</script>` +
    `<script src="https://www.highrevenueformat.com/${key}/invoke.js"></script></body></html>`;

  // Fill srcdoc only once the slot is on screen (or close), 2026-10-31. It used to be in the HTML, and
  // srcdoc ignores loading="lazy", so the units hidden by breakpoint (leaderboard + box on phones,
  // the 320x50 on desktop) loaded on every visit: impressions for ads nobody saw. display:none never intersects.
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    if (!("IntersectionObserver" in window)) {
      if (iframe.offsetParent) iframe.srcdoc = srcDoc;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          iframe.srcdoc = srcDoc;
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(iframe);
    return () => io.disconnect();
  }, [srcDoc]);
  return (
    <iframe
      ref={ref}
      title="advertisement"
      width={width}
      height={height}
      loading="lazy"
      // No allow-same-origin: a srcdoc frame would inherit this page's origin and the ad script could read it.
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      style={{ border: 0, overflow: "hidden", maxWidth: "100%" }}
    />
  );
}
