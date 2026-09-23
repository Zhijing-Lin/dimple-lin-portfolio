'use client';

import { Maximize2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRef } from 'react';

export function ProjectVisualLightbox({
  children,
  caption,
  className = '',
}: {
  children: ReactNode;
  caption: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure
      className={`legacy-media nutrition-visual is-zoomable${className ? ` ${className}` : ''}`}
    >
      <button
        className="project-visual-trigger"
        type="button"
        aria-label={`Enlarge ${caption}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children}
        <span className="project-image-trigger-badge" aria-hidden="true">
          <Maximize2 size={16} />
          <span className="project-image-trigger-label">View larger</span>
        </span>
      </button>
      <figcaption>{caption}</figcaption>

      <dialog
        ref={dialogRef}
        className="project-visual-lightbox"
        aria-label={caption}
      >
        <div className="project-visual-lightbox-content">
          <button
            className="project-visual-lightbox-close"
            type="button"
            aria-label="Close enlarged visual"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={20} aria-hidden="true" />
          </button>
          <div
            className={`project-visual-lightbox-visual${className ? ` ${className}` : ''}`}
          >
            {children}
          </div>
          <p>{caption}</p>
        </div>
      </dialog>
    </figure>
  );
}
