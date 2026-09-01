import AdSlot from "@/components/AdSlot";

/**
 * 所有 wiki 页面（索引 + 文章，新老两套模板）共用的布局，在页面底部注入广告位：
 * - 移动端 (<sm)：320x50
 * - 桌面 (sm+)：728x90
 * - 宽屏 (lg+)：728x90 旁再加 300x250
 * 工具页不放（编辑器场景不打扰，且已有 AdSense），内容页是天然的广告库存。
 */
export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-center gap-6 px-4 pb-10">
        <div className="hidden sm:block">
          <AdSlot unit="leaderboard" />
        </div>
        <div className="hidden lg:block">
          <AdSlot unit="box" />
        </div>
        <div className="sm:hidden">
          <AdSlot unit="mobile" />
        </div>
      </div>
    </>
  );
}
