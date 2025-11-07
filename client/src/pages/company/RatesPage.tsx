import { LandingLayout } from "@/components/LandingLayout";
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
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

type InstrumentData = {
  symbol: string;
  nameKey: string;
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
  const { t } = useLanguage();
  const [selectedAccountType, setSelectedAccountType] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");

  const forexInstruments: InstrumentData[] = [
    { 
      symbol: "EUR/USD", 
      nameKey: "company.rates.instrumentNames.EURUSD",
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
      nameKey: "company.rates.instrumentNames.GBPUSD",
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
      nameKey: "company.rates.instrumentNames.USDJPY",
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
      nameKey: "company.rates.instrumentNames.AUDUSD",
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
      nameKey: "company.rates.instrumentNames.USDCAD",
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
      nameKey: "company.rates.instrumentNames.USDCHF",
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
      nameKey: "company.rates.instrumentNames.NZDUSD",
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
      nameKey: "company.rates.instrumentNames.EURGBP",
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
      nameKey: "company.rates.instrumentNames.EURJPY",
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
      nameKey: "company.rates.instrumentNames.GBPJPY",
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
      nameKey: "company.rates.instrumentNames.XAUUSD",
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
      nameKey: "company.rates.instrumentNames.XAGUSD",
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
      nameKey: "company.rates.instrumentNames.WTI",
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
      nameKey: "company.rates.instrumentNames.BRENT",
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
      nameKey: "company.rates.instrumentNames.NATGAS",
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
      nameKey: "company.rates.instrumentNames.US30",
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
      nameKey: "company.rates.instrumentNames.SPX500",
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
      nameKey: "company.rates.instrumentNames.NAS100",
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
      nameKey: "company.rates.instrumentNames.UK100",
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
      nameKey: "company.rates.instrumentNames.GER40",
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
      nameKey: "company.rates.instrumentNames.JPN225",
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
      nameKey: "company.rates.instrumentNames.BTCUSD",
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
      nameKey: "company.rates.instrumentNames.ETHUSD",
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
      nameKey: "company.rates.instrumentNames.XRPUSD",
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
      nameKey: "company.rates.instrumentNames.LTCUSD",
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
      nameKey: "company.rates.instrumentNames.ADAUSD",
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
              <th className="text-left py-3 px-4 font-semibold">{t('company.rates.table.instrument')}</th>
              <th className="text-center py-3 px-4 font-semibold">{t('company.rates.table.standard')}</th>
              <th className="text-center py-3 px-4 font-semibold">{t('company.rates.table.ecn')}</th>
              <th className="text-center py-3 px-4 font-semibold">{t('company.rates.table.vip')}</th>
              <th className="text-center py-3 px-4 font-semibold">{t('company.rates.table.commission')}</th>
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
                    <div className="text-xs text-muted-foreground">{t(item.nameKey)}</div>
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
              <th className="text-left py-3 px-4 font-semibold">{t('company.rates.table.instrument')}</th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  {t('company.rates.table.asian')}
                </div>
                <div className="text-xs font-normal text-muted-foreground">{t('company.rates.table.asianTime')}</div>
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  {t('company.rates.table.london')}
                </div>
                <div className="text-xs font-normal text-muted-foreground">{t('company.rates.table.londonTime')}</div>
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  {t('company.rates.table.newYork')}
                </div>
                <div className="text-xs font-normal text-muted-foreground">{t('company.rates.table.newYorkTime')}</div>
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
                    <div className="text-xs text-muted-foreground">{t(item.nameKey)}</div>
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
      questionKey: "company.rates.faq.q1.question",
      answerKey: "company.rates.faq.q1.answer"
    },
    {
      questionKey: "company.rates.faq.q2.question",
      answerKey: "company.rates.faq.q2.answer"
    },
    {
      questionKey: "company.rates.faq.q3.question",
      answerKey: "company.rates.faq.q3.answer"
    },
    {
      questionKey: "company.rates.faq.q4.question",
      answerKey: "company.rates.faq.q4.answer"
    },
    {
      questionKey: "company.rates.faq.q5.question",
      answerKey: "company.rates.faq.q5.answer"
    },
    {
      questionKey: "company.rates.faq.q6.question",
      answerKey: "company.rates.faq.q6.answer"
    },
    {
      questionKey: "company.rates.faq.q7.question",
      answerKey: "company.rates.faq.q7.answer"
    }
  ];

  const competitiveHighlights = [
    {
      icon: Zap,
      titleKey: "company.rates.highlights.ultraLow.title",
      descriptionKey: "company.rates.highlights.ultraLow.description",
      badgeKey: "company.rates.highlights.ultraLow.badge"
    },
    {
      icon: Shield,
      titleKey: "company.rates.highlights.noHidden.title",
      descriptionKey: "company.rates.highlights.noHidden.description",
      badgeKey: "company.rates.highlights.noHidden.badge"
    },
    {
      icon: Globe,
      titleKey: "company.rates.highlights.liquidity.title",
      descriptionKey: "company.rates.highlights.liquidity.description",
      badgeKey: "company.rates.highlights.liquidity.badge"
    },
    {
      icon: Award,
      titleKey: "company.rates.highlights.volume.title",
      descriptionKey: "company.rates.highlights.volume.description",
      badgeKey: "company.rates.highlights.volume.badge"
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-rates-page">{t('company.rates.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.rates.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.rates.description')}
              </VariantText>
            </div>

          <Alert className="mb-8" data-testid="alert-pricing-info">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('company.rates.alert')}
            </AlertDescription>
          </Alert>

          <VariantGrid className="mb-12">
            {competitiveHighlights.map((highlight, index) => (
              <VariantCard key={index} className="hover-elevate" data-testid={`card-highlight-${index}`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <highlight.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{t(highlight.titleKey)}</h3>
                      <Badge variant="outline" className="text-xs">{t(highlight.badgeKey)}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{t(highlight.descriptionKey)}</p>
                  </div>
                </div>
              </VariantCard>
            ))}
          </VariantGrid>

          <Tabs defaultValue="account-comparison" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8" data-testid="tabs-comparison-type">
              <TabsTrigger value="account-comparison" data-testid="tab-account-comparison">
                {t('company.rates.tabs.accountComparison')}
              </TabsTrigger>
              <TabsTrigger value="session-comparison" data-testid="tab-session-comparison">
                {t('company.rates.tabs.sessionComparison')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account-comparison" data-testid="content-account-comparison">
              <div className="mb-8">
                <VariantCard className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('company.rates.accountComparison.title')}</CardTitle>
                    <CardDescription>
                      {t('company.rates.accountComparison.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="font-semibold">{t('company.rates.accountComparison.standard.title')}</div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.accountComparison.standard.description')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.accountComparison.standard.minDeposit')}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">{t('company.rates.accountComparison.ecn.title')}</div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.accountComparison.ecn.description')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.accountComparison.ecn.minDeposit')}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">{t('company.rates.accountComparison.vip.title')}</div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.accountComparison.vip.description')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.accountComparison.vip.minDeposit')}</div>
                      </div>
                    </div>
                  </CardContent>
                </VariantCard>
              </div>

              <Tabs defaultValue="forex" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-instrument-type">
                  <TabsTrigger value="forex" data-testid="tab-forex">
                    {t('company.rates.instruments.forex')} <Badge variant="outline" className="ml-1">10</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="commodities" data-testid="tab-commodities">
                    {t('company.rates.instruments.commodities')} <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="indices" data-testid="tab-indices">
                    {t('company.rates.instruments.indices')} <Badge variant="outline" className="ml-1">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" data-testid="tab-crypto">
                    {t('company.rates.instruments.crypto')} <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forex" data-testid="content-forex">
                  <VariantCard>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>{t('company.rates.forex.title')}</CardTitle>
                          <CardDescription>{t('company.rates.forex.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(forexInstruments, "forex")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="commodities" data-testid="content-commodities">
                  <VariantCard>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>{t('company.rates.commodities.title')}</CardTitle>
                          <CardDescription>{t('company.rates.commodities.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(commodityInstruments, "commodities")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="indices" data-testid="content-indices">
                  <VariantCard>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>{t('company.rates.indices.title')}</CardTitle>
                          <CardDescription>{t('company.rates.indices.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(indicesInstruments, "indices")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="crypto" data-testid="content-crypto">
                  <VariantCard>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <div>
                          <CardTitle>{t('company.rates.crypto.title')}</CardTitle>
                          <CardDescription>{t('company.rates.crypto.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderInstrumentTable(cryptoInstruments, "crypto")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="session-comparison" data-testid="content-session-comparison">
              <div className="mb-8">
                <VariantCard className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('company.rates.sessionComparison.title')}</CardTitle>
                    <CardDescription>
                      {t('company.rates.sessionComparison.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">{t('company.rates.sessionComparison.asian.title')}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.sessionComparison.asian.time')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.sessionComparison.asian.description')}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">{t('company.rates.sessionComparison.london.title')}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.sessionComparison.london.time')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.sessionComparison.london.description')}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div className="font-semibold">{t('company.rates.sessionComparison.newYork.title')}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{t('company.rates.sessionComparison.newYork.time')}</div>
                        <div className="text-xs text-muted-foreground">{t('company.rates.sessionComparison.newYork.description')}</div>
                      </div>
                    </div>
                  </CardContent>
                </VariantCard>
              </div>

              <Tabs defaultValue="forex" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-session-instrument-type">
                  <TabsTrigger value="forex" data-testid="tab-session-forex">
                    {t('company.rates.instruments.forex')} <Badge variant="outline" className="ml-1">10</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="commodities" data-testid="tab-session-commodities">
                    {t('company.rates.instruments.commodities')} <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="indices" data-testid="tab-session-indices">
                    {t('company.rates.instruments.indices')} <Badge variant="outline" className="ml-1">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" data-testid="tab-session-crypto">
                    {t('company.rates.instruments.crypto')} <Badge variant="outline" className="ml-1">5</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forex" data-testid="content-session-forex">
                  <VariantCard>
                    <CardHeader>
                      <CardTitle>{t('company.rates.session.forex.title')}</CardTitle>
                      <CardDescription>{t('company.rates.session.forex.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(forexInstruments, "forex")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="commodities" data-testid="content-session-commodities">
                  <VariantCard>
                    <CardHeader>
                      <CardTitle>{t('company.rates.session.commodities.title')}</CardTitle>
                      <CardDescription>{t('company.rates.session.commodities.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(commodityInstruments, "commodities")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="indices" data-testid="content-session-indices">
                  <VariantCard>
                    <CardHeader>
                      <CardTitle>{t('company.rates.session.indices.title')}</CardTitle>
                      <CardDescription>{t('company.rates.session.indices.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(indicesInstruments, "indices")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>

                <TabsContent value="crypto" data-testid="content-session-crypto">
                  <VariantCard>
                    <CardHeader>
                      <CardTitle>{t('company.rates.session.crypto.title')}</CardTitle>
                      <CardDescription>{t('company.rates.session.crypto.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderSessionTable(cryptoInstruments, "crypto")}
                    </CardContent>
                  </VariantCard>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>

          <VariantCard className="mb-12">
            <CardHeader>
              <CardTitle>{t('company.rates.allFees.title')}</CardTitle>
              <CardDescription>{t('company.rates.allFees.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.spreads.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.spreads.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.commissions.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.commissions.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.swapRates.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.swapRates.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.depositFees.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.depositFees.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.withdrawalFees.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.withdrawalFees.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.inactivityFee.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.inactivityFee.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.conversionFees.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.conversionFees.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{t('company.rates.allFees.platformFees.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('company.rates.allFees.platformFees.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </VariantCard>

          <VariantCard className="mb-12">
            <CardHeader>
              <CardTitle>{t('company.rates.faq.title')}</CardTitle>
              <CardDescription>{t('company.rates.faq.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-item-${index}`}>
                    <AccordionTrigger data-testid={`accordion-trigger-${index}`}>
                      {t(faq.questionKey)}
                    </AccordionTrigger>
                    <AccordionContent data-testid={`accordion-content-${index}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(faq.answerKey)}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </VariantCard>

          <VariantCard className="mb-12 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                {t('company.rates.competitive.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {t('company.rates.competitive.liquidity.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('company.rates.competitive.liquidity.description')}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {t('company.rates.competitive.technology.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('company.rates.competitive.technology.description')}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {t('company.rates.competitive.volume.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('company.rates.competitive.volume.description')}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {t('company.rates.competitive.noConflict.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('company.rates.competitive.noConflict.description')}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h4 className="font-semibold mb-1">{t('company.rates.competitive.cta.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('company.rates.competitive.cta.description')}</p>
                  </div>
                  <Button data-testid="button-open-account">
                    {t('company.rates.competitive.cta.button')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </VariantCard>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              {t('company.rates.disclaimers.title')}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t('company.rates.disclaimers.item1')}</li>
              <li>• {t('company.rates.disclaimers.item2')}</li>
              <li>• {t('company.rates.disclaimers.item3')}</li>
              <li>• {t('company.rates.disclaimers.item4')}</li>
              <li>• {t('company.rates.disclaimers.item5')}</li>
              <li>• {t('company.rates.disclaimers.item6')}</li>
              <li>• {t('company.rates.disclaimers.item7')}</li>
              <li>• {t('company.rates.disclaimers.item8')}</li>
              <li>• {t('company.rates.disclaimers.item9')}</li>
              <li>• {t('company.rates.disclaimers.item10')}</li>
            </ul>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
