"use client";

import { useId, useRef, useState } from "react";

interface IconButtonProps {
  icon: React.ElementType;
  /** 按钮做什么。tooltip 的第一行，也是它的无障碍名称。 */
  label: string;
  /** 补充说明。跟 label 说同一件事时省掉，别在气泡里把话说两遍。 */
  hint?: string;
  onClick: () => void;
  /** 处于开启状态（行号已显示、正在看 XML）。 */
  active?: boolean;
  disabled?: boolean;
}

/**
 * 纯图标按钮，带自绘 tooltip。
 *
 * 原来只挂了原生 `title`：要按住不动等将近一秒才弹，样式是操作系统的，触屏上
 * 干脆不出现 —— 一排八个图标因此没人认得。这里自己画气泡，悬停即出，键盘聚焦
 * 也出（原生 title 对键盘用户完全不响应）。
 *
 * 气泡本身 `aria-hidden`，真正的无障碍名称走按钮上的 `aria-label` —— 否则读屏
 * 会把标题和说明连着念一遍标题。
 */
export default function IconButton({
  icon: Icon,
  label,
  hint,
  onClick,
  active = false,
  disabled = false,
}: IconButtonProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  // 指针快速扫过一排图标时不该沿途弹出一串气泡，所以进入后略等一下。
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 120);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  /**
   * 气泡默认在按钮正下方居中，但工具栏是右对齐的 —— 最后一个按钮的气泡会有一半
   * 探到视口外面被裁掉。这里量一下再往回推。
   *
   * 直接写 DOM 而不是 setState：这是「读布局、改布局」，中间没有 React 该知道的
   * 状态，走 state 只会多渲染一轮，而且第一帧仍然是没纠正过的位置。
   * 用 marginLeft 而不是 transform，是为了不碰居中和入场动画用的那个 translate。
   */
  const clampToViewport = (node: HTMLDivElement | null) => {
    if (!node) return;
    node.style.marginLeft = "0px";
    const rect = node.getBoundingClientRect();
    const edge = 8;
    const overflowRight = rect.right - (window.innerWidth - edge);
    const overflowLeft = edge - rect.left;
    if (overflowRight > 0) {
      node.style.marginLeft = `${-overflowRight}px`;
    } else if (overflowLeft > 0) {
      node.style.marginLeft = `${overflowLeft}px`;
    }
  };

  return (
    <div className="relative flex" onPointerLeave={hide}>
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        onPointerEnter={(event) => {
          // 触屏的 tap 也会发 pointerenter，而手指就停在按钮上，pointerleave
          // 永远不来 —— 气泡会一直挂着。悬停提示是鼠标的交互，只对鼠标响应。
          if (event.pointerType === "mouse") show();
        }}
        // 只有键盘聚焦才弹：触屏和鼠标点击同样会给按钮焦点，那时不该再弹一次。
        onFocus={(event) => {
          if (event.target.matches(":focus-visible")) show();
        }}
        onBlur={hide}
        // 点完就把气泡收掉：图标常常在点击后就换了含义（压缩→展开），
        // 留着旧文案比不显示更容易骗人。
        onPointerUp={hide}
        disabled={disabled}
        aria-label={label}
        aria-pressed={active}
        aria-describedby={hint && open ? tooltipId : undefined}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-150 ${
          disabled
            ? "cursor-not-allowed text-[#c5c5c0]"
            : active
            ? "bg-[#edf3ff] text-[#1261ff]"
            : "text-[#555961] hover:bg-white hover:text-[#111]"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={tooltipId}
          role="tooltip"
          aria-hidden="true"
          ref={clampToViewport}
          // 从图标下方 2px 处升上来。`bottom-auto top-full` 让它挂在按钮下沿，
          // 工具栏上方就是标题区，气泡朝上会压住 H1。
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max max-w-[15rem] -translate-x-1/2 rounded border border-[#2c2e33] bg-[#1a1b1e] px-2.5 py-1.5 text-left shadow-[0_6px_20px_rgba(0,0,0,0.18)] motion-safe:animate-[tooltip-rise_120ms_cubic-bezier(0.16,1,0.3,1)]"
        >
          <span className="block text-[13px] font-semibold leading-tight text-white">
            {label}
          </span>
          {hint ? (
            <span className="mt-0.5 block text-[11.5px] leading-snug text-[#a8abb2]">
              {hint}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
