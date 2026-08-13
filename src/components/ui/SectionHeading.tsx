import { cn } from "../../lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, center = false, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)} {...props}>
      <h2 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-gray-600", center && "mx-auto max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
