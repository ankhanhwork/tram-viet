import { useEffect, useState } from 'react';

type Rect = { top: number; left: number; right: number; bottom: number; width: number; height: number };

export function DemoSpotlight({ selector }: { selector?: string }) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!selector) return setRect(null);
    let frame = 0;
    const update = () => {
      const target = document.querySelector(selector);
      if (!target) return setRect(null);
      const box = target.getBoundingClientRect();
      const padding = 6;
      setRect({
        top: Math.max(0, box.top - padding),
        left: Math.max(0, box.left - padding),
        right: Math.min(window.innerWidth, box.right + padding),
        bottom: Math.min(window.innerHeight, box.bottom + padding),
        width: Math.min(window.innerWidth, box.right + padding) - Math.max(0, box.left - padding),
        height: Math.min(window.innerHeight, box.bottom + padding) - Math.max(0, box.top - padding),
      });
    };
    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    requestUpdate();
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('scroll', requestUpdate, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('scroll', requestUpdate, true);
    };
  }, [selector]);

  if (!rect) return null;
  return (
    <div className="demo-spotlight" aria-hidden="true">
      <i style={{ top: 0, left: 0, right: 0, height: rect.top }} />
      <i style={{ top: rect.top, left: 0, width: rect.left, height: rect.height }} />
      <i style={{ top: rect.top, left: rect.right, right: 0, height: rect.height }} />
      <i style={{ top: rect.bottom, left: 0, right: 0, bottom: 0 }} />
      <b style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} />
    </div>
  );
}
