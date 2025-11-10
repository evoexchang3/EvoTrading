import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ChevronLeft, ChevronRight, TrendingUp, Users, Globe, Zap } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

interface StatsProps {
  currencyPairs: string;
  cryptoAssets: string;
  customerSupport: string;
  avgExecutionTime: string;
}

/**
 * Carousel-based stats layout
 * Dynamic, interactive presentation
 * Used by: crypto-neon, carbon-sleek, sunset-trading
 */
export function StatsCarousel({ currencyPairs, cryptoAssets, customerSupport, avgExecutionTime }: StatsProps) {
  const classes = useVariantClasses();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const stats = [
    { 
      label: currencyPairs, 
      value: '50+', 
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      label: cryptoAssets, 
      value: '100+', 
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    { 
      label: customerSupport, 
      value: '24/7', 
      icon: Globe,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      label: avgExecutionTime, 
      value: '0.01s', 
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className="relative">
          {/* Carousel Navigation */}
          <div className="flex justify-end gap-2 mb-4">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              aria-label="Previous statistic"
              data-testid="button-stats-carousel-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={scrollNext}
              aria-label="Next statistic"
              data-testid="button-stats-carousel-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                >
                  <Card
                    className={`${classes.card} h-full`}
                    data-testid={`card-stat-${index}`}
                  >
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className={`inline-flex p-4 sm:p-5 rounded-lg ${stat.bg} mb-4`}>
                        <stat.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${stat.color}`} />
                      </div>
                      <div 
                        className={`${classes.textSize('heading')} text-3xl sm:text-4xl font-bold mb-2`}
                        data-testid={`text-stat-value-${index}`}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className={`${classes.textSize('body')} text-muted-foreground`}
                        data-testid={`text-stat-label-${index}`}
                      >
                        {stat.label}
                      </div>
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
