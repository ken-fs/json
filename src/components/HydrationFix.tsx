'use client';

import { useEffect } from 'react';

interface HydrationFixProps {
  children: React.ReactNode;
}

/**
 * Strips attributes that browser extensions inject into the page before React
 * hydrates, which otherwise surface as hydration warnings.
 *
 * This deliberately renders `children` unchanged on every pass. An earlier
 * version returned a placeholder `<div>` wrapper until an effect had run, so the
 * server and client produced different trees — the exact mismatch it was meant
 * to prevent.
 */
export default function HydrationFix({ children }: HydrationFixProps) {
  useEffect(() => {
    const removeExtensionAttributes = () => {
      document.querySelectorAll('[cz-shortcut-listen]').forEach((element) => {
        element.removeAttribute('cz-shortcut-listen');
      });
    };

    removeExtensionAttributes();

    // Extensions re-add the attribute, so keep watching for it.
    const observer = new MutationObserver(removeExtensionAttributes);
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['cz-shortcut-listen'],
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
