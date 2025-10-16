import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, Bell, Shield, HelpCircle, ArrowRight, CheckCircle2, BookOpen, Video, LineChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TradingAdvicePage() {
  const services = [
    {
      title: "Market Analysis",
      icon: BarChart3,
      description: "Daily and weekly market analysis covering major currency pairs, commodities, and indices",
      features: [
        "Technical analysis reports with chart patterns",
        "Fundamental analysis of economic events",
        "Market sentiment indicators and trends",
        "Key support and resistance levels",
        "Multi-timeframe analysis (H1, H4, D1)",
        "Risk/reward assessments"
      ],
      availability: {
        standard: "Weekly reports",
        professional: "Daily + Weekly reports",
        vip: "Daily + Real-time updates"
      }
    },
    {
      title: "Trading Signals",
      icon: TrendingUp,
      description: "Professional trading signals with entry, stop loss, and take profit levels",
      features: [
        "3-5 signals daily across forex, crypto, commodities",
        "Detailed risk/reward analysis (min 1:2 ratio)",
        "Real-time signal updates via email/SMS",
        "Historical performance tracking & transparency",
        "Entry timing recommendations",
        "Position sizing suggestions"
      ],
      availability: {
        standard: "Basic signals only",
        professional: "All signals + analysis",
        vip: "Premium signals + priority access"
      }
    },
    {
      title: "Educational Webinars",
      icon: Users,
      description: "Live and recorded educational sessions with professional traders",
      features: [
        "Weekly live trading sessions (2 hours)",
        "Strategy development workshops",
        "Q&A sessions with market experts",
        "Recorded session library (100+ videos)",
        "Beginner to advanced courses",
        "Platform training and tutorials"
      ],
      availability: {
        standard: "Monthly webinars",
        professional: "Weekly webinars + recordings",
        vip: "All webinars + 1-on-1 coaching"
      }
    },
    {
      title: "Market Alerts",
      icon: Bell,
      description: "Customizable alerts for important market events and price movements",
      features: [
        "Economic calendar alerts (NFP, CPI, interest rates)",
        "Price movement notifications (custom triggers)",
        "Volatility warnings during high-impact news",
        "Market open/close notifications",
        "Correlation alerts between instruments",
        "Support/resistance break alerts"
      ],
      availability: {
        standard: "Basic price alerts",
        professional: "All alerts + economic calendar",
        vip: "All alerts + custom setups"
      }
    }
  ];

  const signalPerformance = [
    { month: "January 2025", totalSignals: 87, winRate: "68%", avgRR: "1:2.4", pips: "+420" },
    { month: "December 2024", totalSignals: 92, winRate: "71%", avgRR: "1:2.6", pips: "+510" },
    { month: "November 2024", totalSignals: 89, winRate: "65%", avgRR: "1:2.2", pips: "+380" },
    { month: "October 2024", totalSignals: 95, winRate: "69%", avgRR: "1:2.5", pips: "+445" }
  ];

  const faqs = [
    {
      question: "How accurate are the trading signals?",
      answer: "Our signals maintain a 65-72% win rate over the past 12 months with an average risk-reward ratio of 1:2.3. We publish full performance statistics monthly for transparency. However, past performance doesn't guarantee future results. All signals include stop loss and take profit levels to manage risk effectively."
    },
    {
      question: "Can I rely solely on trading signals without my own analysis?",
      answer: "While our signals are professionally researched, we strongly recommend using them as part of your overall trading strategy, not as standalone trades. Combine signals with your own analysis, risk management, and market understanding. Signals are educational tools to help you learn market patterns and trading strategies."
    },
    {
      question: "What's included in the market analysis reports?",
      answer: "Each market analysis includes: technical chart analysis with key levels, fundamental factors affecting price movement, upcoming economic events to watch, trend analysis across multiple timeframes, potential trading opportunities, and risk factors to consider. Professional and VIP accounts receive more detailed analysis with exclusive insights."
    },
    {
      question: "How do I receive trading signals and alerts?",
      answer: "Signals are delivered via multiple channels: push notifications in the trading platform, email alerts to your registered address, SMS text messages (opt-in required), and through our mobile app. You can customize which signals you receive and via which channels. VIP members get priority delivery before general release."
    },
    {
      question: "Are the webinars live or pre-recorded?",
      answer: "We offer both. Live webinars occur weekly and include Q&A sessions where you can ask questions directly to our analysts. All live sessions are recorded and added to our library of 100+ educational videos. Professional and VIP members can access all recordings on-demand. Topics range from beginner basics to advanced strategies."
    },
    {
      question: "What if a signal doesn't work out?",
      answer: "Not all signals will be profitable - that's the nature of trading. Each signal includes stop loss levels to limit potential losses. Our 65-72% win rate means 28-35% of signals hit stop loss. The key is our risk-reward ratio (1:2+), which means winners typically outweigh losers. We track and publish all signal outcomes for transparency."
    },
    {
      question: "Can I request analysis on specific instruments?",
      answer: "Professional and VIP account holders can request analysis on specific instruments. Submit requests through your account dashboard, and our team will include them in upcoming reports (subject to availability). VIP members receive priority for custom analysis requests and can schedule 1-on-1 sessions with our senior analysts."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-trading-advice">Advisory Services</Badge>
            <h1 className="text-4xl font-bold mb-4">Trading Advice & Advisory Services</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access professional market insights, trading signals, and educational resources to enhance your trading performance. Our team of expert analysts provides actionable advice across forex, crypto, and commodities.
            </p>
          </div>

          {/* Performance Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-signals">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">363</div>
                <p className="text-sm text-muted-foreground">Signals (Last 4 months)</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-winrate">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">68%</div>
                <p className="text-sm text-muted-foreground">Average Win Rate</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-ratio">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">1:2.4</div>
                <p className="text-sm text-muted-foreground">Avg Risk/Reward</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-pips">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">+1,755</div>
                <p className="text-sm text-muted-foreground">Total Pips (4 months)</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-2">Availability by Account Type</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Standard:</span>
                          <span className="font-medium">{service.availability.standard}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Professional:</span>
                          <span className="font-medium">{service.availability.professional}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VIP:</span>
                          <span className="font-medium text-primary">{service.availability.vip}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Signal Performance History */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                <CardTitle>Trading Signals Performance History</CardTitle>
              </div>
              <CardDescription>Transparent track record of our signal performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Month</th>
                      <th className="text-center py-3 px-4 font-semibold">Total Signals</th>
                      <th className="text-center py-3 px-4 font-semibold">Win Rate</th>
                      <th className="text-center py-3 px-4 font-semibold">Avg R:R</th>
                      <th className="text-center py-3 px-4 font-semibold">Total Pips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signalPerformance.map((month, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{month.month}</td>
                        <td className="text-center py-3 px-4">{month.totalSignals}</td>
                        <td className="text-center py-3 px-4 font-medium text-primary">{month.winRate}</td>
                        <td className="text-center py-3 px-4">{month.avgRR}</td>
                        <td className="text-center py-3 px-4 font-medium text-primary">{month.pips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Performance based on recommended position sizes and all signals executed at suggested levels. Individual results may vary based on execution, slippage, and risk management.
              </p>
            </CardContent>
          </Card>

          {/* Educational Resources */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <CardTitle>Educational Resources Included</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Video className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">Video Library</h4>
                  <p className="text-sm text-muted-foreground">100+ hours of educational content covering beginner to advanced topics</p>
                </div>
                <div className="space-y-2">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">Live Sessions</h4>
                  <p className="text-sm text-muted-foreground">Weekly live webinars with Q&A, market analysis, and strategy discussions</p>
                </div>
                <div className="space-y-2">
                  <BarChart3 className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">Strategy Guides</h4>
                  <p className="text-sm text-muted-foreground">Downloadable PDFs with detailed trading strategies and case studies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Disclaimers */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-amber-500" />
                <div>
                  <CardTitle>Important Risk Disclaimers</CardTitle>
                  <CardDescription>Please read carefully before using our advisory services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>High Risk Warning:</strong> Trading foreign exchange, commodities, and cryptocurrencies carries a high level of risk and may not be suitable for all investors. You could lose some or all of your invested capital. Past performance is not indicative of future results.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">No Guarantee of Profit</h4>
                  <p className="text-muted-foreground">
                    Our advisory services, including market analysis and trading signals, are provided for informational and educational purposes only. We do not guarantee profits or protection against losses. A 68% win rate still means 32% of trades hit stop loss. All trading decisions are made at your own discretion and risk.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Not Personalized Financial Advice</h4>
                  <p className="text-muted-foreground">
                    The information provided through our services should not be construed as personalized financial advice tailored to your specific situation. Trading signals and market analysis are general recommendations that may not suit your individual risk tolerance, financial situation, or investment objectives. We recommend consulting with a qualified financial advisor before making investment decisions.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Performance Transparency & Methodology</h4>
                  <p className="text-muted-foreground">
                    Historical signal performance is tracked using standard lot sizes with recommended risk management (2% risk per trade). Results assume execution at suggested entry levels with full stop loss and take profit adherence. Real-world results may differ due to slippage, execution delays, spreads, commissions, and individual risk management choices. We publish monthly performance reports for full transparency.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Market Conditions & Volatility</h4>
                  <p className="text-muted-foreground">
                    Market conditions can change rapidly, affecting the effectiveness of any trading strategy or signal. High-impact news events, unexpected geopolitical developments, and market volatility can cause signals to perform differently than expected. Always use appropriate risk management and never risk more than you can afford to lose.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Account Type Comparison */}
          <div className="bg-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Advisory Access by Account Type</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Account</CardTitle>
                  <CardDescription>Basic advisory access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ Weekly market analysis</p>
                  <p>✓ Basic trading signals</p>
                  <p>✓ Monthly webinars</p>
                  <p>✓ Basic price alerts</p>
                  <p>✓ Educational library access</p>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <Badge className="mb-2">Most Popular</Badge>
                  <CardTitle>Professional Account</CardTitle>
                  <CardDescription>Full advisory suite</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ Daily + weekly analysis</p>
                  <p>✓ All premium signals</p>
                  <p>✓ Weekly live webinars</p>
                  <p>✓ All alerts + calendar</p>
                  <p>✓ Dedicated support</p>
                  <p>✓ Custom analysis requests</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>VIP Account</CardTitle>
                  <CardDescription>Premium + exclusive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ Real-time market updates</p>
                  <p>✓ Priority signal access</p>
                  <p>✓ All webinars + 1-on-1</p>
                  <p>✓ Custom alert setups</p>
                  <p>✓ Personal analyst</p>
                  <p>✓ Exclusive market insights</p>
                  <p>✓ Strategy backtesting support</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Start Receiving Expert Trading Advice</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access professional market analysis, trading signals, and educational resources. All verified account holders can access our advisory services based on their account tier.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-get-signals">
                Get Trading Signals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-performance">
                View Full Performance
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ 68% average win rate</span>
              <span>✓ 1:2.4 risk/reward ratio</span>
              <span>✓ Full transparency</span>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
