export default function Tag({ className = "", children, ...props }) {
  return (
    <span className={`ui-tag ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
