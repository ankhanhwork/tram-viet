import { ChevronDown, ChevronLeft, ChevronRight, CircleHelp, X } from 'lucide-react';
import { useState } from 'react';

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
  onClose: () => void;
};

export function DemoGuidePanel({
  className, step, total, title, instruction, previousLabel = 'Trước', nextLabel = 'Tiếp', onPrevious, onNext, onClose,
}: DemoGuidePanelProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside data-demo-target="demo-guide-panel" className={`${className} demo-guide-panel ${expanded ? 'expanded' : ''}`} aria-live="polite">
      <div className="demo-guide-heading">
        <button className="demo-guide-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          <CircleHelp size={16} />
          <span className="eyebrow">Demo {step}/{total}</span>
          <strong>{title}</strong>
          <ChevronDown size={16} />
        </button>
        <button className="icon-button" aria-label="Tắt hướng dẫn" onClick={onClose}><X size={17} /></button>
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
