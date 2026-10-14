import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Frame = { top: number; left: number; width: number; height: number; pageHeight: number; fixed: boolean };

export function DemoSpotlight({ selector }: { selector?: string }) {
  const [frame, setFrame] = useState<Frame | null>(null);
  useEffect(() => {
    if (!selector) { setFrame(null); return; }
    const update = () => {
      const target = document.querySelector(selector);
      if (!target) { setFrame(null); return; }
      const box = target.getBoundingClientRect();
      if (!box.width || !box.height) { setFrame(null); return; }
      // Normal controls use document coordinates so native scrolling carries
      // the highlight with them. Fixed controls retain viewport coordinates.
      let fixed = false;
      for (let node: Element | null = target; node; node = node.parentElement) {
        if (getComputedStyle(node).position === 'fixed') { fixed = true; break; }
      }
      const next: Frame = {
        top: box.top + (fixed ? 0 : window.scrollY) - 6,
        left: box.left + (fixed ? 0 : window.scrollX) - 6,
        width: box.width + 12,
        height: box.height + 12,
        pageHeight: Math.max(document.getElementById('root')?.offsetHeight ?? 0, window.innerHeight),
        fixed,
      };
      setFrame((previous) => previous && Object.keys(next).every(
        (key) => previous[key as keyof Frame] === next[key as keyof Frame],
      ) ? previous : next);
    };
    update();
    window.addEventListener('resize', update);
    // Dialogs scroll internally; only their own scroll events need a new frame.
    // Document scrolling is handled entirely by the browser's native layout.
    const onInnerScroll = (event: Event) => {
      if (event.target instanceof Element && event.target.contains(document.querySelector(selector))) update();
    };
    document.addEventListener('scroll', onInnerScroll, true);
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root') ?? document.body, {
      childList: true, subtree: true, characterData: true, attributes: true,
    });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.getElementById('root') ?? document.body);
    return () => {
      window.removeEventListener('resize', update);
      document.removeEventListener('scroll', onInnerScroll, true);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [selector]);
  if (!frame) return null;
  return createPortal(
    <div className="demo-spotlight" aria-hidden="true" style={{
      position: frame.fixed ? 'fixed' : 'absolute',
      height: frame.fixed ? '100%' : frame.pageHeight,
    }}>
      <b style={{ top: frame.top, left: frame.left, width: frame.width, height: frame.height }} />
    </div>, document.body,
  );
}
