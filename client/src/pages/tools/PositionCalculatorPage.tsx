import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download, Shield } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";

export default function PositionCalculatorPage() {
  const { t } = useLanguage();
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [entryPrice, setEntryPrice] = useState("1.1000");
  const [stopLoss, setStopLoss] = useState("1.0950");
  const [currency, setCurrency] = useState("USD");

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;

    const riskAmount = (balance * risk) / 100;
    const pipDiff = Math.abs(entry - sl) * 10000;
    
    if (pipDiff === 0) return { lots: 0, units: 0, riskAmount: 0, pipValue: 0, pipDiff: 0 };

    const pipValue = riskAmount / pipDiff;
    const units = Math.floor(pipValue * 100000) / 10;
    const lots = units / 100000;

    return {
      lots: lots.toFixed(2),
      units: Math.floor(units),
      riskAmount: riskAmount.toFixed(2),
      pipValue: pipValue.toFixed(2),
      pipDiff: pipDiff.toFixed(1)
    };
  };

  const calculationExamples = [
    {
      scenario: t('tools.positionCalculator.examples.example1.scenario'),
      inputs: t('tools.positionCalculator.examples.example1.inputs'),
      calculation: t('tools.positionCalculator.examples.example1.calculation'),
      result: t('tools.positionCalculator.examples.example1.result'),
      explanation: t('tools.positionCalculator.examples.example1.explanation')
    },
    {
      scenario: t('tools.positionCalculator.examples.example2.scenario'),
      inputs: t('tools.positionCalculator.examples.example2.inputs'),
      calculation: t('tools.positionCalculator.examples.example2.calculation'),
      result: t('tools.positionCalculator.examples.example2.result'),
      explanation: t('tools.positionCalculator.examples.example2.explanation')
    },
    {
      scenario: t('tools.positionCalculator.examples.example3.scenario'),
      inputs: t('tools.positionCalculator.examples.example3.inputs'),
      calculation: t('tools.positionCalculator.examples.example3.calculation'),
      result: t('tools.positionCalculator.examples.example3.result'),
      explanation: t('tools.positionCalculator.examples.example3.explanation')
    },
    {
      scenario: t('tools.positionCalculator.examples.example4.scenario'),
      inputs: t('tools.positionCalculator.examples.example4.inputs'),
      calculation: t('tools.positionCalculator.examples.example4.calculation'),
      result: t('tools.positionCalculator.examples.example4.result'),
      explanation: t('tools.positionCalculator.examples.example4.explanation')
    }
  ];

  const riskManagementRules = [
    {
      rule: t('tools.positionCalculator.riskRules.rule1.name'),
      icon: Shield,
      description: t('tools.positionCalculator.riskRules.rule1.description'),
      reasoning: t('tools.positionCalculator.riskRules.rule1.reasoning'),
      example: t('tools.positionCalculator.riskRules.rule1.example')
    },
    {
      rule: t('tools.positionCalculator.riskRules.rule2.name'),
      icon: AlertTriangle,
      description: t('tools.positionCalculator.riskRules.rule2.description'),
      reasoning: t('tools.positionCalculator.riskRules.rule2.reasoning'),
      example: t('tools.positionCalculator.riskRules.rule2.example')
    },
    {
      rule: t('tools.positionCalculator.riskRules.rule3.name'),
      icon: Zap,
      description: t('tools.positionCalculator.riskRules.rule3.description'),
      reasoning: t('tools.positionCalculator.riskRules.rule3.reasoning'),
      example: t('tools.positionCalculator.riskRules.rule3.example')
    },
    {
      rule: t('tools.positionCalculator.riskRules.rule4.name'),
      icon: Target,
      description: t('tools.positionCalculator.riskRules.rule4.description'),
      reasoning: t('tools.positionCalculator.riskRules.rule4.reasoning'),
      example: t('tools.positionCalculator.riskRules.rule4.example')
    }
  ];

  const useCases = [
    {
      title: t('tools.positionCalculator.useCases.case1.title'),
      scenario: t('tools.positionCalculator.useCases.case1.scenario'),
      calculation: t('tools.positionCalculator.useCases.case1.calculation'),
      insight: t('tools.positionCalculator.useCases.case1.insight')
    },
    {
      title: t('tools.positionCalculator.useCases.case2.title'),
      scenario: t('tools.positionCalculator.useCases.case2.scenario'),
      calculation: t('tools.positionCalculator.useCases.case2.calculation'),
      insight: t('tools.positionCalculator.useCases.case2.insight')
    },
    {
      title: t('tools.positionCalculator.useCases.case3.title'),
      scenario: t('tools.positionCalculator.useCases.case3.scenario'),
      calculation: t('tools.positionCalculator.useCases.case3.calculation'),
      insight: t('tools.positionCalculator.useCases.case3.insight')
    },
    {
      title: t('tools.positionCalculator.useCases.case4.title'),
      scenario: t('tools.positionCalculator.useCases.case4.scenario'),
      calculation: t('tools.positionCalculator.useCases.case4.calculation'),
      insight: t('tools.positionCalculator.useCases.case4.insight')
    }
  ];

  const proTips = [
    {
      tip: t('tools.positionCalculator.proTips.tip1.title'),
      detail: t('tools.positionCalculator.proTips.tip1.detail')
    },
    {
      tip: t('tools.positionCalculator.proTips.tip2.title'),
      detail: t('tools.positionCalculator.proTips.tip2.detail')
    },
    {
      tip: t('tools.positionCalculator.proTips.tip3.title'),
      detail: t('tools.positionCalculator.proTips.tip3.detail')
    },
    {
      tip: t('tools.positionCalculator.proTips.tip4.title'),
      detail: t('tools.positionCalculator.proTips.tip4.detail')
    },
    {
      tip: t('tools.positionCalculator.proTips.tip5.title'),
      detail: t('tools.positionCalculator.proTips.tip5.detail')
    },
    {
      tip: t('tools.positionCalculator.proTips.tip6.title'),
      detail: t('tools.positionCalculator.proTips.tip6.detail')
    }
  ];

  const faqs = [
    {
      question: t('tools.positionCalculator.faq.q1.question'),
      answer: t('tools.positionCalculator.faq.q1.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q2.question'),
      answer: t('tools.positionCalculator.faq.q2.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q3.question'),
      answer: t('tools.positionCalculator.faq.q3.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q4.question'),
      answer: t('tools.positionCalculator.faq.q4.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q5.question'),
      answer: t('tools.positionCalculator.faq.q5.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q6.question'),
      answer: t('tools.positionCalculator.faq.q6.answer')
    },
    {
      question: t('tools.positionCalculator.faq.q7.question'),
      answer: t('tools.positionCalculator.faq.q7.answer')
    }
  ];

  const result = calculatePositionSize();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-position-calculator">
              {t('tools.positionCalculator.title')}
            </h1>
            <p className="text-muted-foreground">{t('tools.positionCalculator.description')}</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-recommended-risk">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">1-2%</div>
              <p className="text-sm text-muted-foreground">{t('tools.positionCalculator.stats.recommendedRisk')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-max-exposure">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">6%</div>
              <p className="text-sm text-muted-foreground">{t('tools.positionCalculator.stats.maxExposure')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-stop-required">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <p className="text-sm text-muted-foreground">{t('tools.positionCalculator.stats.stopRequired')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-survival">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <p className="text-sm text-muted-foreground">{t('tools.positionCalculator.stats.survival')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.positionCalculator.calculator.title')}</CardTitle>
              <CardDescription>{t('tools.positionCalculator.calculator.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-balance">{t('tools.positionCalculator.calculator.accountBalance')}</Label>
                <Input
                  id="account-balance"
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  data-testid="input-account-balance"
                  placeholder="10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">{t('tools.positionCalculator.calculator.currency')}</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency" data-testid="select-currency">
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

              <div className="space-y-2">
                <Label htmlFor="risk-percent">{t('tools.positionCalculator.calculator.riskPercent')}</Label>
                <Input
                  id="risk-percent"
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  data-testid="input-risk-percent"
                  placeholder="1-2% recommended"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entry-price">{t('tools.positionCalculator.calculator.entryPrice')}</Label>
                <Input
                  id="entry-price"
                  type="number"
                  step="0.0001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  data-testid="input-entry-price"
                  placeholder="1.1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop-loss">{t('tools.positionCalculator.calculator.stopLoss')}</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  step="0.0001"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  data-testid="input-stop-loss"
                  placeholder="1.0950"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tools.positionCalculator.results.title')}</CardTitle>
              <CardDescription>{t('tools.positionCalculator.results.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{t('tools.positionCalculator.results.positionSize')}</p>
                  <p className="text-3xl font-bold" data-testid="text-position-lots">
                    {result.lots} {t('tools.positionCalculator.results.lots')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ({result.units} {t('tools.positionCalculator.results.units')})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t('tools.positionCalculator.results.riskAmount')}</p>
                    <p className="text-xl font-semibold" data-testid="text-risk-amount">
                      {currency} {result.riskAmount}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Stop Loss {t('tools.positionCalculator.results.pips')}</p>
                    <p className="text-xl font-semibold" data-testid="text-pip-diff">
                      {result.pipDiff}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">{t('tools.positionCalculator.results.pipValue')}</p>
                    <p className="text-xl font-semibold" data-testid="text-pip-value">
                      {currency} {result.pipValue} {t('tools.positionCalculator.results.perPip')}
                    </p>
                  </div>
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
              <CardTitle>{t('tools.positionCalculator.examples.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.examples.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {calculationExamples.map((example, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">{example.scenario}</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">{t('tools.positionCalculator.examples.inputs')}</p>
                      <p className="text-sm text-muted-foreground">{example.inputs}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">{t('tools.positionCalculator.examples.calculation')}</p>
                      <p className="text-sm text-muted-foreground font-mono whitespace-pre-line">{example.calculation}</p>
                    </div>
                    <Alert>
                      <AlertDescription>
                        <strong className="text-primary">{t('tools.positionCalculator.examples.result')}</strong> {example.result}<br />
                        <span className="text-sm">{example.explanation}</span>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Management Rules */}
        <Card data-testid="card-risk-rules">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.positionCalculator.riskRules.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.riskRules.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {riskManagementRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{rule.rule}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg mb-3">
                      <p className="text-sm"><strong>{t('tools.positionCalculator.riskRules.reasoning')}</strong> {rule.reasoning}</p>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm"><strong className="text-primary">{t('tools.positionCalculator.riskRules.example')}</strong> {rule.example}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card data-testid="card-use-cases">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.positionCalculator.useCases.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.useCases.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">{useCase.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground">{useCase.scenario}</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <p className="font-medium">{t('tools.positionCalculator.useCases.calculation')}</p>
                      <p className="text-muted-foreground">{useCase.calculation}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>{t('tools.positionCalculator.useCases.insight')}</strong> {useCase.insight}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card data-testid="card-pro-tips">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>{t('tools.positionCalculator.proTips.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.proTips.description')}</CardDescription>
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
              <CardTitle>{t('tools.positionCalculator.export.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.export.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.positionCalculator.export.save.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.positionCalculator.export.save.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-save-calculation">{t('tools.positionCalculator.export.save.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.positionCalculator.export.table.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.positionCalculator.export.table.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-export-table">{t('tools.positionCalculator.export.table.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.positionCalculator.export.journal.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.positionCalculator.export.journal.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-copy-journal">{t('tools.positionCalculator.export.journal.button')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.positionCalculator.faq.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.positionCalculator.faq.description')}</CardDescription>
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
      </div>
    </DashboardLayout>
  );
}
