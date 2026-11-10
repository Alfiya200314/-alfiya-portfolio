import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  id,
  className = "",
}) {
  return (
    <Reveal className={`ui-section-heading ${className}`.trim()}>
      {eyebrow && <p className="ui-section-heading__eyebrow">{eyebrow}</p>}
      {title && (
        <h2 className="ui-section-heading__title" id={id}>
          {title}
        </h2>
      )}
    </Reveal>
  );
}
