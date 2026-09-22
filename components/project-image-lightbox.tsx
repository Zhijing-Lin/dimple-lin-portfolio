'use client';

import { Maximize2, X } from 'lucide-react';
import { useRef } from 'react';

export function ProjectImageLightbox({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className="legacy-media legacy-media-image is-zoomable">
      <div className="legacy-media-frame">
        <button
          className="project-image-trigger"
          type="button"
          aria-label={`Enlarge ${caption}`}
          onClick={() => dialogRef.current?.showModal()}
        >
          <img src={src} alt={alt} loading="lazy" />
          <span className="project-image-trigger-badge" aria-hidden="true">
            <Maximize2 size={16} />
            <span className="project-image-trigger-label">View larger</span>
          </span>
        </button>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}

      <dialog
        ref={dialogRef}
        className="project-image-lightbox"
        aria-label={caption}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="project-image-lightbox-content">
          <button
            className="project-image-lightbox-close"
            type="button"
            aria-label="Close enlarged image"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={20} aria-hidden="true" />
          </button>
          <img src={src} alt={alt} />
          {caption ? <p>{caption}</p> : null}
        </div>
      </dialog>
    </figure>
  );
}
