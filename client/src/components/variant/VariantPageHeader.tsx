import { VariantSection } from "./VariantSection";
import { VariantContainer } from "./VariantContainer";
import { VariantHeading } from "./VariantHeading";
import { VariantText } from "./VariantText";
import { useVariantClasses } from "@/layouts/shared/useVariant";

type VariantPageHeaderProps = {
  title: string;
  subtitle?: string;
  titleTestId?: string;
};

export function VariantPageHeader({ title, subtitle, titleTestId }: VariantPageHeaderProps) {
  const classes = useVariantClasses();
  
  return (
    <VariantSection background="gradient" animation="hero">
      <VariantContainer>
        <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')}`}>
          <VariantHeading level="hero" as="h1" data-testid={titleTestId}>
            {title}
          </VariantHeading>
          {subtitle && (
            <VariantText className="text-muted-foreground">
              {subtitle}
            </VariantText>
          )}
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
