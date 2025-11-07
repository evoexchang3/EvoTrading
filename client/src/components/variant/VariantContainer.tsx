import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function VariantContainer({ children, className = '' }: VariantContainerProps) {
  const classes = useVariantClasses();
  
  return (
    <div className={`${classes.container} ${className}`}>
      {children}
    </div>
  );
}
