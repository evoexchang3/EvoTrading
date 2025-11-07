import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function VariantGrid({ children, className = '' }: VariantGridProps) {
  const classes = useVariantClasses();
  
  return (
    <div className={`${classes.grid} ${className}`}>
      {children}
    </div>
  );
}
