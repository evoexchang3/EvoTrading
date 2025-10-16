import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, Bell, Shield } from "lucide-react";

export default function TradingAdvicePage() {
  const services = [
    {
      title: "Market Analysis",
      icon: BarChart3,
      description: "Daily and weekly market analysis covering major currency pairs, commodities, and indices",
      features: [
        "Technical analysis reports",
        "Fundamental analysis updates",
        "Market sentiment indicators",
        "Key support and resistance levels"
      ]
    },
    {
      title: "Trading Signals",
      icon: TrendingUp,
      description: "Professional trading signals with entry, stop loss, and take profit levels",
      features: [
        "Multiple daily signals",
        "Risk/reward analysis",
        "Real-time signal updates",
        "Performance tracking"
      ]
    },
    {
      title: "Educational Webinars",
      icon: Users,
      description: "Live and recorded educational sessions with professional traders",
      features: [
        "Weekly live trading sessions",
        "Strategy development workshops",
        "Q&A with market experts",
        "Recorded session library"
      ]
    },
    {
      title: "Market Alerts",
      icon: Bell,
      description: "Customizable alerts for important market events and price movements",
      features: [
        "Economic calendar alerts",
        "Price movement notifications",
        "Volatility warnings",
        "News event updates"
      ]
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Trading Advice & Advisory Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access professional market insights, trading signals, and educational resources to enhance your trading performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>Important Disclaimers</CardTitle>
                  <CardDescription>Please read carefully before using our advisory services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Risk Warning</h3>
                <p className="text-muted-foreground">
                  Trading foreign exchange, commodities, and other financial instruments carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. You should carefully consider your investment objectives, level of experience, and risk appetite before making any trading decisions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">No Guarantee of Profit</h3>
                <p className="text-muted-foreground">
                  Our advisory services, including market analysis and trading signals, are provided for informational and educational purposes only. We do not guarantee profits or protection against losses. All trading decisions are made at your own discretion and risk.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Not Financial Advice</h3>
                <p className="text-muted-foreground">
                  The information provided through our services should not be construed as personalized financial advice. We recommend consulting with a qualified financial advisor before making investment decisions. You are solely responsible for your trading activities and outcomes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance Transparency</h3>
                <p className="text-muted-foreground">
                  Historical signal performance and market analysis accuracy are tracked and available upon request. However, past performance does not guarantee future results. Market conditions can change rapidly, affecting the effectiveness of any trading strategy or signal.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Advisory Services</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our advisory services are available to all verified account holders. Professional and VIP account members receive enhanced access with priority support and exclusive insights.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="bg-background rounded-lg p-4 min-w-[200px]">
                <p className="font-semibold mb-1">Standard Account</p>
                <p className="text-muted-foreground">Basic market analysis</p>
              </div>
              <div className="bg-background rounded-lg p-4 min-w-[200px]">
                <p className="font-semibold mb-1">Professional Account</p>
                <p className="text-muted-foreground">Full advisory access</p>
              </div>
              <div className="bg-background rounded-lg p-4 min-w-[200px]">
                <p className="font-semibold mb-1">VIP Account</p>
                <p className="text-muted-foreground">Premium insights + personal advisor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
