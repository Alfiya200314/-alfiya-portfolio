export default function Button({
  as: Element = "button",
  variant = "secondary",
  className = "",
  children,
  ...props
}) {
  return (
    <Element
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </Element>
  );
}
