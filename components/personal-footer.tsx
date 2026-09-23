export function PersonalFooter() {
  return (
    <footer className="personal-footer" id="contact">
      <div className="personal-footer-inner">
        <div className="personal-footer-intro">
          <p className="personal-footer-name">
            Dimple Lin<span>.</span>
          </p>
          <p>Designing learning that moves from insight to action.</p>
        </div>

        <div className="personal-footer-column">
          <p>Connect</p>
          <a href="mailto:linzhijing168@gmail.com">linzhijing168@gmail.com</a>
          <a href="tel:+16085040084">608-504-0084</a>
          <a
            href="https://www.linkedin.com/in/zhijing-lin/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <figure className="personal-footer-flower" aria-hidden="true">
          <img src="/about/footer-bouquet-v2.png" alt="" />
        </figure>

        <p className="personal-footer-copyright">
          © 2026 Dimple Lin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
