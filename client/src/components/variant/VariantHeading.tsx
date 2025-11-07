import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantHeadingProps = {
  children: React.ReactNode;
  level: 'hero' | 'heading' | 'body';
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  'data-testid'?: string;
};

export function VariantHeading({ children, level, as: Component = 'h2', className = '', 'data-testid': testId }: VariantHeadingProps) {
  const classes = useVariantClasses();
  
  return (
    <Component 
      className={`${classes.textSize(level)} font-bold ${className}`}
      data-testid={testId}
    >
      {children}
    </Component>
  );
}
