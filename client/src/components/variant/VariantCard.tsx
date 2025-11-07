import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantCardProps = {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

export function VariantCard({ children, className = '', 'data-testid': testId }: VariantCardProps) {
  const classes = useVariantClasses();
  
  return (
    <Card 
      className={`${classes.card} ${classes.hover('card')} ${className}`}
      data-testid={testId}
    >
      {children}
    </Card>
  );
}

export { CardContent, CardDescription, CardHeader, CardTitle };
