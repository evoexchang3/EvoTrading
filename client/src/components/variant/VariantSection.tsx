import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantSectionProps = {
  children: React.ReactNode;
  background?: 'default' | 'muted' | 'gradient';
  animation?: 'hero' | 'page' | 'none';
  className?: string;
};

export function VariantSection({ children, background = 'default', animation = 'none', className = '' }: VariantSectionProps) {
  const classes = useVariantClasses();
  
  const bgClass = {
    default: '',
    muted: 'bg-muted/30',
    gradient: 'bg-gradient-to-br from-primary/10 via-background to-background'
  }[background];
  
  const animClass = animation !== 'none' ? classes.animation(animation) : '';
  
  return (
    <section className={`${classes.spacing('section')} ${bgClass} ${animClass} ${className}`}>
      {children}
    </section>
  );
}
