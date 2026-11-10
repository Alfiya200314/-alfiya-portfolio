import { ArrowUp } from "lucide-react";

export default function SiteFooter() {
  const backToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("home")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="site-footer__name" href="#home">Alfiya A N</a>
        <div className="site-footer__end">
          <span className="site-footer__copyright">© 2026 · All rights reserved.</span>
          <button
            className="site-footer__top-button"
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
