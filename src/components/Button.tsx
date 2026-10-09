import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-ivory hover:bg-navy-soft border border-navy",
  secondary: "border border-navy/70 text-navy hover:bg-navy hover:text-ivory",
  light: "bg-ivory text-navy hover:bg-bone border border-ivory",
  "ghost-light": "border border-ivory/50 text-ivory hover:bg-ivory hover:text-navy",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Extern länk – öppnas i samma flik men markeras med pil. */
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: Props) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[0.9375rem] font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
        <span className="sr-only">(extern webbplats)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

/** Diskret textlänk med pil, för "Läs mer"-liknande länkar. */
export function ArrowLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = `group inline-flex items-center gap-2 text-[0.9375rem] font-medium ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span className="link-underline">{children}</span>
      <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
      {external && <span className="sr-only">(extern webbplats)</span>}
    </>
  );
  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
