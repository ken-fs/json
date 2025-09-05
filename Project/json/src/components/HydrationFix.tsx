'use client';

import { useEffect, useState } from 'react';

interface HydrationFixProps {
  children: React.ReactNode;
}

export default function HydrationFix({ children }: HydrationFixProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // 清理可能导致水合错误的属性
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('[cz-shortcut-listen]');
      elements.forEach((element) => {
        element.removeAttribute('cz-shortcut-listen');
      });
    };

    // 立即清理
    removeExtensionAttributes();

    // 监听DOM变化，防止扩展重新添加属性
    const observer = new MutationObserver(() => {
      removeExtensionAttributes();
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['cz-shortcut-listen']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 在服务端或客户端首次渲染时返回占位符，避免水合错误
  if (!isClient) {
    return <div suppressHydrationWarning={true}>{children}</div>;
  }

  return <>{children}</>;
}