import { ChevronDown, ChevronLeft, ChevronRight, CircleHelp, GripHorizontal, X } from 'lucide-react';
import { type CSSProperties, type PointerEvent, useRef, useState } from 'react';

type DemoGuidePanelProps = {
  className: string;
  step: number;
  total: number;
  title: string;
  instruction: string;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
};

export function DemoGuidePanel({
  className, step, total, title, instruction, previousLabel = 'Trước', nextLabel = 'Tiếp', onPrevious, onNext, onClose,
}: DemoGuidePanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [bottom, setBottom] = useState<number | null>(null);
  const drag = useRef<{ y: number; bottom: number } | null>(null);
  const beginDrag = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { y: event.clientY, bottom: bottom ?? 12 };
  };
  const moveDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const panelHeight = event.currentTarget.closest('.demo-guide-panel')?.getBoundingClientRect().height ?? 160;
    const maxBottom = Math.max(12, window.innerHeight - panelHeight - 12);
    setBottom(Math.min(maxBottom, Math.max(12, drag.current.bottom + drag.current.y - event.clientY)));
  };
  const endDrag = () => { drag.current = null; };
  return (
    <aside data-demo-target="demo-guide-panel" className={`${className} demo-guide-panel ${expanded ? 'expanded' : ''}`} style={bottom === null ? undefined : ({ '--guide-bottom': `${bottom}px` } as CSSProperties)} aria-live="polite">
      <button className="demo-guide-drag-handle" aria-label="Kéo thanh hướng dẫn" onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <GripHorizontal size={18} />
      </button>
      <div className="demo-guide-heading">
        <button className="demo-guide-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          <CircleHelp size={16} />
          <span className="eyebrow">Demo {step}/{total}</span>
          <strong>{title}</strong>
          <ChevronDown size={16} />
        </button>
        {onClose && <button className="icon-button" aria-label="Tắt hướng dẫn" onClick={onClose}><X size={17} /></button>}
      </div>
      {expanded && (
        <>
          <p className="demo-guide-instruction">{instruction}</p>
          <div className="demo-guide-actions">
            <button className="button secondary" disabled={!onPrevious} onClick={onPrevious}><ChevronLeft size={17} /> {previousLabel}</button>
            <button className="button" onClick={onNext}>{nextLabel} <ChevronRight size={17} /></button>
          </div>
        </>
      )}
    </aside>
  );
}
