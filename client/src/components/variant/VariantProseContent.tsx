import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantProseContentProps = {
  children: React.ReactNode;
};

export function VariantProseContent({ children }: VariantProseContentProps) {
  const classes = useVariantClasses();
  
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${classes.textSize('body')}`}>
      {children}
    </div>
  );
}
