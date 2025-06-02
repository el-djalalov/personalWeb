interface InteractiveLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  website: string;
  company: string;
}

export default function InteractiveLink({
  website,
  company,
  ...rest
}: InteractiveLinkProps) {
  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      onClickCapture={(e) => {
        e.stopPropagation(); // Prevents the click from bubbling up to parent elements
      }}
      className="relative z-100 mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
      {...rest}
    >
      {company}
    </a>
  );
}
