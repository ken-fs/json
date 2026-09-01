// JSON1 — Cloudflare Worker entry
// 职责：所有非规范域名的请求 301 到 www.json.how（apex、workers.dev 等），
// 其余交给静态资产（Next.js 静态导出的 out/）。
const CANONICAL_HOST = "www.json.how";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
