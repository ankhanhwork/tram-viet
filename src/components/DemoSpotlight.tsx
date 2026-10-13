import { useEffect, useRef, useState } from 'react';

type Rect = { top: number; left: number; right: number; bottom: number; width: number; height: number };

export function DemoSpotlight({ selector }: { selector?: string }) {
  const [rect, setRect] = useState<Rect | null>(null);
  const lastRect = useRef<Rect | null>(null);

  useEffect(() => {
    if (!selector) return setRect(null);
    const update = () => {
      const target = document.querySelector(selector);
      if (!target) return setRect(null);
      const box = target.getBoundingClientRect();
      const padding = 6;
      const next = {
        top: Math.max(0, box.top - padding),
        left: Math.max(0, box.left - padding),
        right: Math.min(window.innerWidth, box.right + padding),
        bottom: Math.min(window.innerHeight, box.bottom + padding),
        width: Math.min(window.innerWidth, box.right + padding) - Math.max(0, box.left - padding),
        height: Math.min(window.innerHeight, box.bottom + padding) - Math.max(0, box.top - padding),
      };
      const previous = lastRect.current;
      if (previous && Object.entries(next).every(([key, value]) => previous[key as keyof Rect] === value)) return;
      lastRect.current = next;
      setRect(next);
    };
    // A spotlight is a still frame of the current instruction. Following every
    // scroll/layout tick makes it shimmer on mobile, which is distracting in a pitch.
    update();
    window.addEventListener('resize', update);
    // Keep the snapshot correct when an async UI update (for example, the kitchen
    // print acknowledgement) pushes the highlighted CTA. We deliberately do not
    // subscribe to scroll, so the spotlight never chases the page while it moves.
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      window.removeEventListener('resize', update);
      observer.disconnect();
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
