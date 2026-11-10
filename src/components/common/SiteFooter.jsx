import { ArrowUp } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>Alfiya A N</span>
        <a href="#home" aria-label="Back to top">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
