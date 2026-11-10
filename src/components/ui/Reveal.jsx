import { useEffect, useRef } from "react";

export default function Reveal({
  as: Element = "div",
  direction = "up",
  className = "",
  children,
  ...props
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (
      !element
      || !("IntersectionObserver" in window)
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.setAttribute("data-revealed", "true");
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    element.setAttribute("data-reveal-ready", "true");
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`ui-reveal ui-reveal--${direction} ${className}`.trim()}
      {...props}
    >
      {children}
    </Element>
  );
}
