type SiteHeaderProps = {
  active?: 'home' | 'projects' | 'about';
};

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Dimple Lin home">
        Dimple Lin<span>.</span>
      </a>
      <nav aria-label="Primary navigation">
        <a
          className={active === 'home' ? 'active' : undefined}
          href="/"
          aria-current={active === 'home' ? 'page' : undefined}
        >
          Home
        </a>
        <a
          className={active === 'projects' ? 'active' : undefined}
          href="/projects"
          aria-current={active === 'projects' ? 'page' : undefined}
        >
          Projects
        </a>
        <a
          className={active === 'about' ? 'active' : undefined}
          href="/about"
          aria-current={active === 'about' ? 'page' : undefined}
        >
          About
        </a>
      </nav>
    </header>
  );
}
