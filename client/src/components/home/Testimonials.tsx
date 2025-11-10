import { Card, CardContent } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Testimonials section showing customer reviews
 * Used by: nordic-clean, modern-light, terracotta-warm, sunset-trading, midnight-premium, carbon-sleek
 */
export function Testimonials() {
  const classes = useVariantClasses();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Trader",
      content: "The platform's execution speed and reliability have transformed my trading results. Best decision I've made.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Investor",
      content: "Transparent pricing and excellent support. Finally, a platform that puts traders first.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Day Trader",
      content: "Advanced tools combined with an intuitive interface. Perfect for both beginners and professionals.",
      rating: 5,
    },
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container} ref={ref}>
        <div className={`text-center ${classes.spacing('element')} mb-12`}>
          <h2 className={`${classes.textSize('heading')} font-bold mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} data-testid="text-testimonials-title">
            Trusted by Traders Worldwide
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            See what our clients say about their experience
          </p>
        </div>

        <div className={classes.grid}>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`${classes.card} ${classes.hover('card')} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className={`${classes.textSize('body')} mb-6 leading-relaxed`}>
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
