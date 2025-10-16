import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Award, 
  Info, 
  CheckCircle, 
  Globe, 
  Zap,
  Shield,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

type InstrumentData = {
  symbol: string;
  name: string;
  standard: string;
  ecn: string;
  vip: string;
  commission: string;
  asian: string;
  london: string;
  ny: string;
  unit?: string;
};

export default function RatesPage() {
  const [selectedAccountType, setSelectedAccountType] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");

  const forexInstruments: InstrumentData[] = [
    { 
      symbol: "EUR/USD", 
      name: "Euro vs US Dollar", 
      standard: "0.8", 
      ecn: "0.5", 
      vip: "0.3", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.2",
      london: "0.6",
      ny: "0.8",
      unit: "pips"
    },
    { 
      symbol: "GBP/USD", 
      name: "British Pound vs US Dollar", 
      standard: "1.2", 
      ecn: "0.9", 
      vip: "0.6", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.8",
      london: "0.9",
      ny: "1.1",
      unit: "pips"
    },
    { 
      symbol: "USD/JPY", 
      name: "US Dollar vs Japanese Yen", 
      standard: "0.9", 
      ecn: "0.6", 
      vip: "0.4", 
      commission: "$0 / $3.50 / Custom",
      asian: "0.7",
      london: "0.8",
      ny: "1.0",
      unit: "pips"
    },
    { 
      symbol: "AUD/USD", 
      name: "Australian Dollar vs US Dollar", 
      standard: "1.0", 
      ecn: "0.7", 
      vip: "0.5", 
      commission: "$0 / $3.50 / Custom",
      asian: "0.8",
      london: "0.9",
      ny: "1.2",
      unit: "pips"
    },
    { 
      symbol: "USD/CAD", 
      name: "US Dollar vs Canadian Dollar", 
      standard: "1.3", 
      ecn: "1.0", 
      vip: "0.7", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.6",
      london: "1.2",
      ny: "1.0",
      unit: "pips"
    },
    { 
      symbol: "USD/CHF", 
      name: "US Dollar vs Swiss Franc", 
      standard: "1.1", 
      ecn: "0.8", 
      vip: "0.6", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.5",
      london: "0.9",
      ny: "1.2",
      unit: "pips"
    },
    { 
      symbol: "NZD/USD", 
      name: "New Zealand Dollar vs US Dollar", 
      standard: "1.4", 
      ecn: "1.1", 
      vip: "0.8", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.0",
      london: "1.3",
      ny: "1.6",
      unit: "pips"
    },
    { 
      symbol: "EUR/GBP", 
      name: "Euro vs British Pound", 
      standard: "1.5", 
      ecn: "1.2", 
      vip: "0.9", 
      commission: "$0 / $3.50 / Custom",
      asian: "2.0",
      london: "1.2",
      ny: "1.6",
      unit: "pips"
    },
    { 
      symbol: "EUR/JPY", 
      name: "Euro vs Japanese Yen", 
      standard: "1.3", 
      ecn: "1.0", 
      vip: "0.7", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.0",
      london: "1.2",
      ny: "1.5",
      unit: "pips"
    },
    { 
      symbol: "GBP/JPY", 
      name: "British Pound vs Japanese Yen", 
      standard: "2.0", 
      ecn: "1.6", 
      vip: "1.2", 
      commission: "$0 / $3.50 / Custom",
      asian: "1.8",
      london: "1.8",
      ny: "2.3",
      unit: "pips"
    },
  ];

  const commodityInstruments: InstrumentData[] = [
    { 
      symbol: "XAUUSD", 
      name: "Gold vs US Dollar", 
      standard: "0.30", 
      ecn: "0.20", 
      vip: "0.15", 
      commission: "$0 / $5 / Custom",
      asian: "0.35",
      london: "0.25",
      ny: "0.28",
      unit: "$"
    },
    { 
      symbol: "XAGUSD", 
      name: "Silver vs US Dollar", 
      standard: "0.025", 
      ecn: "0.018", 
      vip: "0.012", 
      commission: "$0 / $5 / Custom",
      asian: "0.030",
      london: "0.020",
      ny: "0.024",
      unit: "$"
    },
    { 
      symbol: "WTI", 
      name: "Crude Oil (WTI)", 
      standard: "0.04", 
      ecn: "0.03", 
      vip: "0.02", 
      commission: "$0 / $5 / Custom",
      asian: "0.05",
      london: "0.03",
      ny: "0.03",
      unit: "$"
    },
    { 
      symbol: "BRENT", 
      name: "Brent Crude Oil", 
      standard: "0.05", 
      ecn: "0.04", 
      vip: "0.03", 
      commission: "$0 / $5 / Custom",
      asian: "0.06",
      london: "0.04",
      ny: "0.04",
      unit: "$"
    },
    { 
      symbol: "NATGAS", 
      name: "Natural Gas", 
      standard: "0.008", 
      ecn: "0.006", 
      vip: "0.004", 
      commission: "$0 / $5 / Custom",
      asian: "0.010",
      london: "0.007",
      ny: "0.006",
      unit: "$"
    },
  ];

  const indicesInstruments: InstrumentData[] = [
    { 
      symbol: "US30", 
      name: "Dow Jones Industrial Average", 
      standard: "2.5", 
      ecn: "1.8", 
      vip: "1.2", 
      commission: "$0 / $8 / Custom",
      asian: "3.5",
      london: "2.2",
      ny: "2.0",
      unit: "pts"
    },
    { 
      symbol: "SPX500", 
      name: "S&P 500 Index", 
      standard: "0.6", 
      ecn: "0.4", 
      vip: "0.3", 
      commission: "$0 / $8 / Custom",
      asian: "0.8",
      london: "0.5",
      ny: "0.5",
      unit: "pts"
    },
    { 
      symbol: "NAS100", 
      name: "NASDAQ 100 Index", 
      standard: "1.5", 
      ecn: "1.0", 
      vip: "0.7", 
      commission: "$0 / $8 / Custom",
      asian: "2.0",
      london: "1.2",
      ny: "1.2",
      unit: "pts"
    },
    { 
      symbol: "UK100", 
      name: "FTSE 100 Index", 
      standard: "1.2", 
      ecn: "0.9", 
      vip: "0.6", 
      commission: "$0 / $8 / Custom",
      asian: "1.8",
      london: "0.8",
      ny: "1.5",
      unit: "pts"
    },
    { 
      symbol: "GER40", 
      name: "DAX 40 Index", 
      standard: "1.0", 
      ecn: "0.7", 
      vip: "0.5", 
      commission: "$0 / $8 / Custom",
      asian: "1.5",
      london: "0.7",
      ny: "1.2",
      unit: "pts"
    },
    { 
      symbol: "JPN225", 
      name: "Nikkei 225 Index", 
      standard: "8.0", 
      ecn: "6.0", 
      vip: "4.0", 
      commission: "$0 / $8 / Custom",
      asian: "6.0",
      london: "9.0",
      ny: "10.0",
      unit: "pts"
    },
  ];

  const cryptoInstruments: InstrumentData[] = [
    { 
      symbol: "BTCUSD", 
      name: "Bitcoin vs US Dollar", 
      standard: "25", 
      ecn: "18", 
      vip: "12", 
      commission: "$0 / $10 / Custom",
      asian: "30",
      london: "22",
      ny: "20",
      unit: "$"
    },
    { 
      symbol: "ETHUSD", 
      name: "Ethereum vs US Dollar", 
      standard: "1.50", 
      ecn: "1.10", 
      vip: "0.80", 
      commission: "$0 / $10 / Custom",
      asian: "1.80",
      london: "1.30",
      ny: "1.20",
      unit: "$"
    },
    { 
      symbol: "XRPUSD", 
      name: "Ripple vs US Dollar", 
      standard: "0.002", 
      ecn: "0.0015", 
      vip: "0.001", 
      commission: "$0 / $10 / Custom",
      asian: "0.0025",
      london: "0.0018",
      ny: "0.0016",
      unit: "$"
    },
    { 
      symbol: "LTCUSD", 
      name: "Litecoin vs US Dollar", 
      standard: "0.35", 
      ecn: "0.25", 
      vip: "0.18", 
      commission: "$0 / $10 / Custom",
      asian: "0.40",
      london: "0.30",
      ny: "0.28",
      unit: "$"
    },
    { 
      symbol: "ADAUSD", 
      name: "Cardano vs US Dollar", 
      standard: "0.003", 
      ecn: "0.002", 
      vip: "0.0015", 
      commission: "$0 / $10 / Custom",
      asian: "0.0035",
      london: "0.0025",
      ny: "0.0022",
      unit: "$"
    },
  ];

  const renderInstrumentTable = (instruments: InstrumentData[], category: string) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">Instrument</th>
              <th className="text-center py-3 px-4 font-semibold">Standard</th>
              <th className="text-center py-3 px-4 font-semibold">ECN</th>
              <th className="text-center py-3 px-4 font-semibold">VIP</th>
              <th className="text-center py-3 px-4 font-semibold">Commission</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((item, index) => (
              <tr 
                key={index} 
                className="border-b hover-elevate"
                data-testid={`row-instrument-${item.symbol.toLowerCase()}`}
              >
                <td className="py-3 px-4">
                  <div>
                    <div className="font-semibold" data-testid={`text-symbol-${item.symbol.toLowerCase()}`}>
                      {item.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.name}</div>
                  </div>
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-standard-${item.symbol.toLowerCase()}`}>
                  {item.standard} {item.unit}
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-ecn-${item.symbol.toLowerCase()}`}>
                  {item.ecn} {item.unit}
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-vip-${item.symbol.toLowerCase()}`}>
                  {item.vip} {item.unit}
                </td>
                <td className="text-center py-3 px-4 text-xs" data-testid={`text-commission-${item.symbol.toLowerCase()}`}>
                  {item.commission}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSessionTable = (instruments: InstrumentData[], category: string) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">Instrument</th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  Asian
                </div>
                <div className="text-xs font-normal text-muted-foreground">12am-9am GMT</div>
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  London
                </div>
                <div className="text-xs font-normal text-muted-foreground">8am-5pm GMT</div>
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  New York
                </div>
                <div className="text-xs font-normal text-muted-foreground">1pm-10pm GMT</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((item, index) => (
              <tr 
                key={index} 
                className="border-b hover-elevate"
                data-testid={`row-session-${item.symbol.toLowerCase()}`}
              >
                <td className="py-3 px-4">
                  <div>
                    <div className="font-semibold">{item.symbol}</div>
                    <div className="text-xs text-muted-foreground">{item.name}</div>
                  </div>
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-asian-${item.symbol.toLowerCase()}`}>
                  {item.asian} {item.unit}
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-london-${item.symbol.toLowerCase()}`}>
                  {item.london} {item.unit}
                </td>
                <td className="text-center py-3 px-4" data-testid={`text-ny-${item.symbol.toLowerCase()}`}>
                  {item.ny} {item.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const faqs = [
    {
      question: "What's the difference between spreads and commissions?",
      answer: "Spreads are the difference between the buy and sell price of an instrument, measured in pips or points. This is built into the price you see. Commissions are separate fees charged per trade, typically per lot. Standard accounts have no commission but slightly wider spreads, while ECN accounts have tighter spreads but charge a small commission ($3.50-$10 per lot depending on instrument). VIP accounts have custom pricing tailored to trading volume."
    },
    {
      question: "Why do spreads vary between trading sessions?",
      answer: "Spreads fluctuate based on market liquidity. During major session overlaps (London-NY: 1pm-5pm GMT), spreads are typically tightest due to high trading volume. Asian session spreads tend to be wider for EUR/USD and GBP/USD due to lower liquidity, but narrower for JPY pairs and Asian indices. The most liquid session for each instrument generally offers the best spreads."
    },
    {
      question: "Are there any hidden fees I should know about?",
      answer: "No hidden fees. All costs are transparent: spreads (shown in real-time on platform), commissions (if applicable to account type), swap rates (overnight financing charges displayed per instrument), withdrawal fees ($0 for e-wallets/crypto, $25 for wire transfers), and an inactivity fee ($15/month after 6 months of no trading). There are no deposit fees, platform fees, or account maintenance charges."
    },
    {
      question: "How do swap rates (overnight fees) work?",
      answer: "Swap rates are interest charges or credits applied when holding positions overnight (past 5pm EST). They're based on the interest rate differential between the two currencies in a pair, plus our small markup. Swap rates can be positive (you earn) or negative (you pay). They're calculated daily and triple on Wednesdays to account for weekends. View current swap rates for each instrument in the trading platform's contract specifications."
    },
    {
      question: "Can I get better spreads than what's shown here?",
      answer: "Yes, in several ways: (1) Upgrade to ECN or VIP account for significantly tighter spreads, (2) Trade during peak liquidity sessions (London-NY overlap), (3) High-volume traders can negotiate custom VIP pricing with dedicated account managers, (4) Our institutional clients receive the tightest possible spreads with direct market access. Contact support to discuss volume-based discounts."
    },
    {
      question: "Why are your rates competitive compared to other brokers?",
      answer: "We maintain competitive rates through: (1) Direct partnerships with top-tier liquidity providers, giving us access to institutional pricing, (2) Advanced technology infrastructure that reduces operating costs, (3) High trading volumes allowing better rates from liquidity providers, (4) Transparent fee structure with no hidden markups. Unlike many brokers, we don't profit from client losses—we earn from spreads/commissions, so we want you to succeed and trade more."
    },
    {
      question: "What happens to spreads during news events or high volatility?",
      answer: "Spreads can widen significantly during major news releases (NFP, central bank decisions, etc.) and periods of extreme volatility due to reduced liquidity and increased risk. This is standard across all brokers. We recommend avoiding trading during major news if you're sensitive to wider spreads, or use limit orders instead of market orders. Spreads typically return to normal within minutes after the event. VIP clients receive preferential treatment even during volatile periods."
    }
  ];

  const competitiveHighlights = [
    {
      icon: Zap,
      title: "Ultra-Low Spreads",
      description: "Starting from 0.3 pips on EUR/USD for VIP accounts",
      badge: "Industry Leading"
    },
    {
      icon: Shield,
      title: "No Hidden Fees",
      description: "100% transparent pricing with no surprise charges",
      badge: "Transparent"
    },
    {
      icon: Globe,
      title: "20+ Liquidity Providers",
      description: "Institutional-grade pricing from top-tier banks",
      badge: "Premium Access"
    },
    {
      icon: Award,
      title: "Volume Discounts",
      description: "Better rates for high-volume traders automatically applied",
      badge: "Rewarding"
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-rates-page">Pricing Information</Badge>
            <h1 className="text-4xl font-bold mb-4">Spreads, Commissions & Fees</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transparent, competitive pricing across all instruments. Compare rates by account type and trading session to find the best value for your trading strategy.
            </p>
          </div>

          <Alert className="mb-8" data-testid="alert-pricing-info">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Spreads shown are typical during normal market conditions. Live spreads may vary based on market volatility and liquidity. All spreads and commissions are displayed in real-time on our trading platform.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {competitiveHighlights.map((highlight, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-highlight-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <highlight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm">{highlight.title}</h3>
                        <Badge variant="outline" className="text-xs">{highlight.badge}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="account-comparison" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8" data-testid="tabs-comparison-type">
              <TabsTrigger value="account-comparison" data-testid="tab-account-comparison">
                By Account Type
              </TabsTrigger>
              <TabsTrigger value="session-comparison" data-testid="tab-session-comparison">
                By Trading Session
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account-comparison" data-testid="content-account-comparison">
              <div className="mb-8">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Account Type Comparison</CardTitle>
                    <CardDescription>
                      Compare spreads and commissions across Standard, ECN, and VIP account types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="font-semibold">Standard Account</div>
                        <div className="text-sm text-muted-foreground">No commission, standard spreads</div>
                        <div className="text-xs text-muted-foreground">Min deposit: $100</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">ECN Account</div>
                        <div className="text-sm text-muted-foreground">Low commission, tight spreads</div>
                        <div className="text-xs text-muted-foreground">Min deposit: $5,000</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">VIP Account</div>
                        <div className="text-sm text-muted-foreground">Custom pricing, best spreads</div>
                        <div className="text-xs text-muted-foreground">Min deposit: $50,000</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="forex" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-instrument-type">
                  <TabsTrigger value="forex" data-testid="tab-forex">
                    Forex <Badge variant="outline" className="ml-1">10</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="commodities" data-testid="tab-commodities">
                    Commodities <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="indices" data-testid="tab-indices">
                    Indices <Badge variant="outline" className="ml-1">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" data-testid="tab-crypto">
                    Crypto <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forex" data-testid="content-forex">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>Forex Spreads</CardTitle>
                          <CardDescription>Major, minor, and cross currency pairs</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(forexInstruments, "forex")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="commodities" data-testid="content-commodities">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>Commodity Spreads</CardTitle>
                          <CardDescription>Precious metals and energy products</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(commodityInstruments, "commodities")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="indices" data-testid="content-indices">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>Index CFD Spreads</CardTitle>
                          <CardDescription>Global stock market indices</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(indicesInstruments, "indices")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="crypto" data-testid="content-crypto">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>Cryptocurrency Spreads</CardTitle>
                          <CardDescription>Digital currencies vs US Dollar</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(cryptoInstruments, "crypto")}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="session-comparison" data-testid="content-session-comparison">
              <div className="mb-8">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Trading Session Impact</CardTitle>
                    <CardDescription>
                      Spreads vary by session based on market liquidity. Trade during peak hours for tightest spreads.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">Asian Session</div>
                        </div>
                        <div className="text-sm text-muted-foreground">12:00am - 9:00am GMT</div>
                        <div className="text-xs text-muted-foreground">Best for JPY, AUD, NZD pairs</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">London Session</div>
                        </div>
                        <div className="text-sm text-muted-foreground">8:00am - 5:00pm GMT</div>
                        <div className="text-xs text-muted-foreground">Highest liquidity for EUR, GBP</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">New York Session</div>
                        </div>
                        <div className="text-sm text-muted-foreground">1:00pm - 10:00pm GMT</div>
                        <div className="text-xs text-muted-foreground">Peak overlap: 1pm-5pm GMT</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="forex" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-session-instrument-type">
                  <TabsTrigger value="forex" data-testid="tab-session-forex">
                    Forex <Badge variant="outline" className="ml-1">10</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="commodities" data-testid="tab-session-commodities">
                    Commodities <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="indices" data-testid="tab-session-indices">
                    Indices <Badge variant="outline" className="ml-1">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" data-testid="tab-session-crypto">
                    Crypto <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forex" data-testid="content-session-forex">
                  <Card>
                    <CardHeader>
                      <CardTitle>Forex Spreads by Session</CardTitle>
                      <CardDescription>Average spreads (ECN account) across different trading sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(forexInstruments, "forex")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="commodities" data-testid="content-session-commodities">
                  <Card>
                    <CardHeader>
                      <CardTitle>Commodity Spreads by Session</CardTitle>
                      <CardDescription>Average spreads (ECN account) across different trading sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(commodityInstruments, "commodities")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="indices" data-testid="content-session-indices">
                  <Card>
                    <CardHeader>
                      <CardTitle>Index Spreads by Session</CardTitle>
                      <CardDescription>Average spreads (ECN account) across different trading sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(indicesInstruments, "indices")}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="crypto" data-testid="content-session-crypto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crypto Spreads by Session</CardTitle>
                      <CardDescription>Average spreads (ECN account) across different trading sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(cryptoInstruments, "crypto")}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>All Fees & Charges Explained</CardTitle>
              <CardDescription>Complete breakdown of all trading costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Spreads</h3>
                      <p className="text-sm text-muted-foreground">
                        The difference between buy and sell price. Variable based on market conditions, account type, and trading session. Tightest during London-NY overlap (1pm-5pm GMT).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Commissions</h3>
                      <p className="text-sm text-muted-foreground">
                        Standard: $0 on all instruments. ECN: $3.50 (forex), $5 (commodities), $8 (indices), $10 (crypto) per lot. VIP: Custom rates based on volume.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Swap Rates (Overnight Fees)</h3>
                      <p className="text-sm text-muted-foreground">
                        Interest charged/credited for positions held past 5pm EST. Based on interbank rates + our markup. Can be positive or negative. Triple swap on Wednesdays for weekend.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Deposit Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        Zero fees for all deposit methods (credit/debit cards, bank transfer, e-wallets, cryptocurrency). We cover all processing costs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Withdrawal Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        E-wallets & crypto: Free. Bank wire transfers: $25. Processing times: ECN 12-24hrs, VIP same-day, Standard 24-48hrs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Inactivity Fee</h3>
                      <p className="text-sm text-muted-foreground">
                        $15 per month charged after 6 consecutive months of no trading activity. Easily avoided by placing at least one trade every 6 months.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Conversion Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        Free automatic currency conversion for deposits/withdrawals. We use interbank rates with no markup for converting between account currencies.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Platform & Data Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        Zero platform fees. Free real-time market data for all clients. No monthly subscription or software licensing costs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about our pricing and fees</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-item-${index}`}>
                    <AccordionTrigger data-testid={`accordion-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent data-testid={`accordion-content-${index}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Why Our Rates Are Competitive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Institutional-Grade Liquidity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We partner with 20+ top-tier liquidity providers including major banks and financial institutions, giving us access to the same institutional pricing that large hedge funds receive.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Advanced Technology Infrastructure
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our state-of-the-art trading infrastructure with co-located servers reduces latency and operating costs, allowing us to pass savings to clients through tighter spreads.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Volume-Based Pricing Power
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our high trading volumes give us negotiating power with liquidity providers, securing better rates that we pass directly to our clients across all account types.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    No Conflict of Interest
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We operate on an agency model—we don't trade against you. Our revenue comes from spreads and commissions, so we're incentivized to help you succeed and trade more.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h4 className="font-semibold mb-1">Ready to experience competitive pricing?</h4>
                    <p className="text-sm text-muted-foreground">Open an account and start trading with institutional-grade spreads</p>
                  </div>
                  <Button data-testid="button-open-account">
                    Open Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Important Disclaimers
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Spreads shown are typical during normal market conditions and may widen significantly during high volatility, low liquidity periods, or major news events</li>
              <li>• All spreads are variable and subject to change without notice based on market conditions</li>
              <li>• Commission rates are per side per lot (charged on both opening and closing of positions)</li>
              <li>• Professional and VIP accounts receive preferential spreads based on trading volume and account balance</li>
              <li>• Current live spreads for all instruments are displayed in real-time on our trading platform</li>
              <li>• Swap rates (overnight financing charges) are updated daily based on interbank rates and are subject to change</li>
              <li>• Cryptocurrency spreads can vary significantly and widen during periods of extreme market volatility</li>
              <li>• Index CFD spreads are for cash indices; futures contracts may have different spread structures</li>
              <li>• Session times are approximate and spreads may vary within sessions based on liquidity conditions</li>
              <li>• All fees and charges are clearly disclosed before executing trades; there are no hidden costs</li>
            </ul>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
