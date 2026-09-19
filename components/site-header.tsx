type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  const root = compact ? '/' : '';

  return (
    <header className="site-header">
      <a className="brand" href={`${root}#top`} aria-label="Dimple Lin home">
        Dimple Lin<span>.</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href={`${root}#home`}>Home</a>
        <a className="active" href={`${root}#projects`} aria-current="page">
          Projects
        </a>
        <a href={`${root}#about`}>About</a>
        <a href={`${root}#resume`}>Resume</a>
      </nav>
    </header>
  );
}
