import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Globe2,
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

interface FeaturesProps {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * Carousel-based features layout with horizontal scrolling
 * Modern, interactive presentation
 * Used by: sunset-trading, crypto-neon variants
 */
export function FeaturesCarousel({ title, subtitle, items }: FeaturesProps) {
  const classes = useVariantClasses();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Canonical icon order (matches variant content structure)
  const iconMap: LucideIcon[] = [Zap, Shield, Clock, DollarSign, BarChart3, Globe2];
  const colorMap = ['text-yellow-500', 'text-green-500', 'text-blue-500', 'text-emerald-500', 'text-purple-500', 'text-cyan-500'];
  const bgMap = ['bg-yellow-500/10', 'bg-green-500/10', 'bg-blue-500/10', 'bg-emerald-500/10', 'bg-purple-500/10', 'bg-cyan-500/10'];

  const features = items.map((item, index) => ({
    icon: iconMap[index % iconMap.length],
    title: item.title,
    description: item.description,
    color: colorMap[index % colorMap.length],
    bg: bgMap[index % bgMap.length],
  }));

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold mb-3 sm:mb-4`} 
            data-testid="text-features-title"
          >
            {title}
          </h2>
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="flex justify-end gap-2 mb-4">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              aria-label="Previous feature"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={scrollNext}
              aria-label="Next feature"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                >
                  <Card 
                    className={`${classes.card} ${classes.hover('card')} h-full group transition-all duration-300`}
                    data-testid={`card-feature-${index}`}
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <div className={`inline-flex p-2.5 sm:p-3 rounded-lg ${feature.bg} transition-transform group-hover:scale-110 duration-300`}>
                          <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color} transition-transform group-hover:rotate-12 duration-300`} />
                        </div>
                      </div>
                      <CardTitle className={classes.textSize('heading')}>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <CardDescription className={`${classes.textSize('body')} leading-relaxed`}>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
