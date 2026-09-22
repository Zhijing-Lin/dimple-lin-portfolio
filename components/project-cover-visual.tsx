type ProjectCoverVisualProps = {
  artifact: string;
  artifactAlt: string;
  illustration?: string;
  preserveOriginal?: boolean;
  eager?: boolean;
};

export function ProjectCoverVisual({
  artifact,
  artifactAlt,
  illustration,
  preserveOriginal = false,
  eager = false,
}: ProjectCoverVisualProps) {
  if (preserveOriginal) {
    return (
      <div className="project-cover-visual is-original">
        <img
          className="project-cover-original"
          src={artifact}
          alt={artifactAlt}
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={`project-cover-visual${illustration ? ' has-illustration' : ' is-artifact-only'}`}
    >
      {illustration ? (
        <img
          className="project-cover-backdrop"
          src={illustration}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      ) : null}
      <div className="project-cover-artifact">
        <img
          src={artifact}
          alt={artifactAlt}
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
}
