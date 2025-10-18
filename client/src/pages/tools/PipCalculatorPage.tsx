import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, TrendingDown, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";

export default function PipCalculatorPage() {
  const { t } = useLanguage();
  const [symbol, setSymbol] = useState("EURUSD");
  const [lots, setLots] = useState("1");
  const [pips, setPips] = useState("50");
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const calculatePipValue = () => {
    const lotSize = parseFloat(lots) || 0;
    const pipCount = parseFloat(pips) || 0;

    let pipValue = 0;
    if (symbol.includes("JPY")) {
      pipValue = (0.01 * lotSize * 100000) / 1;
    } else {
      pipValue = (0.0001 * lotSize * 100000) / 1;
    }

    const profitLoss = pipValue * pipCount;

    return {
      pipValue: pipValue.toFixed(2),
      profitLoss: profitLoss.toFixed(2),
      isProfit: pipCount > 0
    };
  };

  const calculationExamples = [
    {
      scenario: t('tools.pipCalculator.examples.example1.scenario'),
      inputs: t('tools.pipCalculator.examples.example1.inputs'),
      calculation: t('tools.pipCalculator.examples.example1.calculation'),
      result: t('tools.pipCalculator.examples.example1.result'),
      explanation: t('tools.pipCalculator.examples.example1.explanation')
    },
    {
      scenario: t('tools.pipCalculator.examples.example2.scenario'),
      inputs: t('tools.pipCalculator.examples.example2.inputs'),
      calculation: t('tools.pipCalculator.examples.example2.calculation'),
      result: t('tools.pipCalculator.examples.example2.result'),
      explanation: t('tools.pipCalculator.examples.example2.explanation')
    },
    {
      scenario: t('tools.pipCalculator.examples.example3.scenario'),
      inputs: t('tools.pipCalculator.examples.example3.inputs'),
      calculation: t('tools.pipCalculator.examples.example3.calculation'),
      result: t('tools.pipCalculator.examples.example3.result'),
      explanation: t('tools.pipCalculator.examples.example3.explanation')
    },
    {
      scenario: t('tools.pipCalculator.examples.example4.scenario'),
      inputs: t('tools.pipCalculator.examples.example4.inputs'),
      calculation: t('tools.pipCalculator.examples.example4.calculation'),
      result: t('tools.pipCalculator.examples.example4.result'),
      explanation: t('tools.pipCalculator.examples.example4.explanation')
    }
  ];

  const useCases = [
    {
      title: t('tools.pipCalculator.useCases.preTradeRisk.title'),
      icon: Target,
      scenario: t('tools.pipCalculator.useCases.preTradeRisk.scenario'),
      howToUse: t('tools.pipCalculator.useCases.preTradeRisk.howToUse'),
      benefit: t('tools.pipCalculator.useCases.preTradeRisk.benefit')
    },
    {
      title: t('tools.pipCalculator.useCases.profitTarget.title'),
      icon: TrendingUp,
      scenario: t('tools.pipCalculator.useCases.profitTarget.scenario'),
      howToUse: t('tools.pipCalculator.useCases.profitTarget.howToUse'),
      benefit: t('tools.pipCalculator.useCases.profitTarget.benefit')
    },
    {
      title: t('tools.pipCalculator.useCases.comparingPairs.title'),
      icon: Calculator,
      scenario: t('tools.pipCalculator.useCases.comparingPairs.scenario'),
      howToUse: t('tools.pipCalculator.useCases.comparingPairs.howToUse'),
      benefit: t('tools.pipCalculator.useCases.comparingPairs.benefit')
    },
    {
      title: t('tools.pipCalculator.useCases.positionSizing.title'),
      icon: AlertTriangle,
      scenario: t('tools.pipCalculator.useCases.positionSizing.scenario'),
      howToUse: t('tools.pipCalculator.useCases.positionSizing.howToUse'),
      benefit: t('tools.pipCalculator.useCases.positionSizing.benefit')
    }
  ];

  const proTips = [
    {
      tip: t('tools.pipCalculator.proTips.jpyPairs.tip'),
      detail: t('tools.pipCalculator.proTips.jpyPairs.detail')
    },
    {
      tip: t('tools.pipCalculator.proTips.accountCurrency.tip'),
      detail: t('tools.pipCalculator.proTips.accountCurrency.detail')
    },
    {
      tip: t('tools.pipCalculator.proTips.microLots.tip'),
      detail: t('tools.pipCalculator.proTips.microLots.detail')
    },
    {
      tip: t('tools.pipCalculator.proTips.linearScaling.tip'),
      detail: t('tools.pipCalculator.proTips.linearScaling.detail')
    },
    {
      tip: t('tools.pipCalculator.proTips.riskFirst.tip'),
      detail: t('tools.pipCalculator.proTips.riskFirst.detail')
    },
    {
      tip: t('tools.pipCalculator.proTips.saveScenarios.tip'),
      detail: t('tools.pipCalculator.proTips.saveScenarios.detail')
    }
  ];

  const faqs = [
    {
      question: t('tools.pipCalculator.faq.q1.question'),
      answer: t('tools.pipCalculator.faq.q1.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q2.question'),
      answer: t('tools.pipCalculator.faq.q2.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q3.question'),
      answer: t('tools.pipCalculator.faq.q3.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q4.question'),
      answer: t('tools.pipCalculator.faq.q4.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q5.question'),
      answer: t('tools.pipCalculator.faq.q5.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q6.question'),
      answer: t('tools.pipCalculator.faq.q6.answer')
    },
    {
      question: t('tools.pipCalculator.faq.q7.question'),
      answer: t('tools.pipCalculator.faq.q7.answer')
    }
  ];

  const result = calculatePipValue();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-pip-calculator">{t('tools.pipCalculator.title')}</h1>
            <p className="text-muted-foreground">{t('tools.pipCalculator.description')}</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-standard-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.pipCalculator.stats.standardLot')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.pipCalculator.stats.standardLotDescription')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-mini-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.pipCalculator.stats.miniLot')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.pipCalculator.stats.miniLotDescription')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-micro-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.pipCalculator.stats.microLot')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.pipCalculator.stats.microLotDescription')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-jpy-multiplier">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.pipCalculator.stats.jpyPipSize')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.pipCalculator.stats.jpyPipSizeDescription')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.pipCalculator.form.title')}</CardTitle>
              <CardDescription>{t('tools.pipCalculator.form.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">{t('tools.pipCalculator.form.symbol')}</Label>
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger id="symbol" data-testid="select-symbol">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EURUSD">EUR/USD</SelectItem>
                    <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                    <SelectItem value="USDJPY">USD/JPY</SelectItem>
                    <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                    <SelectItem value="USDCAD">USD/CAD</SelectItem>
                    <SelectItem value="NZDUSD">NZD/USD</SelectItem>
                    <SelectItem value="EURGBP">EUR/GBP</SelectItem>
                    <SelectItem value="EURJPY">EUR/JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lots">{t('tools.pipCalculator.form.lotSize')}</Label>
                <Input
                  id="lots"
                  type="number"
                  step="0.01"
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                  data-testid="input-lots"
                  placeholder={t('tools.pipCalculator.form.lotSizePlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pips">{t('tools.pipCalculator.form.pipMovement')}</Label>
                <Input
                  id="pips"
                  type="number"
                  value={pips}
                  onChange={(e) => setPips(e.target.value)}
                  data-testid="input-pips"
                  placeholder={t('tools.pipCalculator.form.pipMovementPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-currency">{t('tools.pipCalculator.form.accountCurrency')}</Label>
                <Select value={accountCurrency} onValueChange={setAccountCurrency}>
                  <SelectTrigger id="account-currency" data-testid="select-account-currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tools.pipCalculator.result.title')}</CardTitle>
              <CardDescription>{t('tools.pipCalculator.result.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('tools.pipCalculator.result.pipValue')}</p>
                <p className="text-2xl font-bold" data-testid="text-pip-value-result">
                  {accountCurrency} {result.pipValue} {t('tools.pipCalculator.result.perPip')}
                </p>
              </div>

              <div className={`p-6 rounded-lg ${result.isProfit ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.isProfit ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {result.isProfit ? t('tools.pipCalculator.result.profit') : t('tools.pipCalculator.result.loss')}
                  </p>
                </div>
                <p className={`text-3xl font-bold ${result.isProfit ? 'text-green-500' : 'text-red-500'}`} data-testid="text-profit-loss">
                  {result.isProfit ? '+' : ''}{accountCurrency} {result.profitLoss}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">{t('tools.pipCalculator.result.positionSize')}</span>
                  <span className="font-semibold">{lots} {t('tools.pipCalculator.result.lots')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">{t('tools.pipCalculator.result.pipMovement')}</span>
                  <span className="font-semibold">{pips} {t('tools.pipCalculator.result.pips')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">{t('tools.pipCalculator.result.symbol')}</span>
                  <span className="font-semibold">{symbol}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculation Examples */}
        <Card data-testid="card-calculation-examples">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.pipCalculator.examples.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.pipCalculator.examples.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {calculationExamples.map((example, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">{example.scenario}</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">{t('tools.pipCalculator.examples.inputs')}</p>
                      <p className="text-sm text-muted-foreground">{example.inputs}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">{t('tools.pipCalculator.examples.calculation')}</p>
                      <p className="text-sm text-muted-foreground font-mono whitespace-pre-line">{example.calculation}</p>
                    </div>
                    <Alert>
                      <AlertDescription>
                        <strong className="text-primary">{t('tools.pipCalculator.examples.result')}</strong> {example.result}<br />
                        <span className="text-sm">{example.explanation}</span>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card data-testid="card-use-cases">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.pipCalculator.useCases.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.pipCalculator.useCases.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{useCase.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">{t('tools.pipCalculator.useCases.scenario')}</p>
                        <p className="text-sm text-muted-foreground">{useCase.scenario}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">{t('tools.pipCalculator.useCases.howToUse')}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{useCase.howToUse}</p>
                      </div>
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm"><strong className="text-primary">{t('tools.pipCalculator.useCases.benefit')}</strong> {useCase.benefit}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card data-testid="card-pro-tips">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>{t('tools.pipCalculator.proTips.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.pipCalculator.proTips.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {proTips.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item.tip}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export & Save */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.pipCalculator.export.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.pipCalculator.export.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.pipCalculator.export.save.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.pipCalculator.export.save.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-save-calculation">{t('tools.pipCalculator.export.save.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.pipCalculator.export.csv.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.pipCalculator.export.csv.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-export-csv">{t('tools.pipCalculator.export.csv.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.pipCalculator.export.copy.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.pipCalculator.export.copy.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-copy-results">{t('tools.pipCalculator.export.copy.button')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.pipCalculator.faq.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.pipCalculator.faq.description')}</CardDescription>
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

        {/* Quick Reference */}
        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-3">{t('tools.pipCalculator.quickReference.title')}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">{t('tools.pipCalculator.quickReference.standardLot.title')}</p>
              <p className="text-muted-foreground">{t('tools.pipCalculator.quickReference.standardLot.description')}</p>
            </div>
            <div>
              <p className="font-medium">{t('tools.pipCalculator.quickReference.miniLot.title')}</p>
              <p className="text-muted-foreground">{t('tools.pipCalculator.quickReference.miniLot.description')}</p>
            </div>
            <div>
              <p className="font-medium">{t('tools.pipCalculator.quickReference.microLot.title')}</p>
              <p className="text-muted-foreground">{t('tools.pipCalculator.quickReference.microLot.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
