import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantTextProps = {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

export function VariantText({ children, className = '', 'data-testid': testId }: VariantTextProps) {
  const classes = useVariantClasses();
  
  return (
    <p 
      className={`${classes.textSize('body')} ${className}`}
      data-testid={testId}
    >
      {children}
    </p>
  );
}
