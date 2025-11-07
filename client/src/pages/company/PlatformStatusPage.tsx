import { LandingLayout } from "@/components/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Info,
  HelpCircle,
  TrendingUp,
  Wifi,
  Server,
  Smartphone,
  Code,
  CreditCard,
  Download,
  Upload,
  Calendar,
  XCircle,
  MinusCircle
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function PlatformStatusPage() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('company.platformStatus.stats.uptime.label'),
      value: t('company.platformStatus.stats.uptime.value'),
      description: t('company.platformStatus.stats.uptime.description'),
      icon: TrendingUp,
      testId: "stat-uptime"
    },
    {
      label: t('company.platformStatus.stats.monthly.label'),
      value: t('company.platformStatus.stats.monthly.value'),
      description: t('company.platformStatus.stats.monthly.description'),
      icon: Activity,
      testId: "stat-monthly"
    },
    {
      label: t('company.platformStatus.stats.incident.label'),
      value: t('company.platformStatus.stats.incident.value'),
      description: t('company.platformStatus.stats.incident.description'),
      icon: Clock,
      testId: "stat-incident"
    },
    {
      label: t('company.platformStatus.stats.maintenance.label'),
      value: t('company.platformStatus.stats.maintenance.value'),
      description: t('company.platformStatus.stats.maintenance.description'),
      icon: Calendar,
      testId: "stat-maintenance"
    }
  ];

  const systemStatus = [
    {
      service: t('company.platformStatus.services.tradingWeb.name'),
      status: "operational",
      description: t('company.platformStatus.services.tradingWeb.description'),
      uptime: "99.98%",
      icon: Activity,
      lastChecked: t('company.platformStatus.services.lastChecked.2min')
    },
    {
      service: t('company.platformStatus.services.mobileApps.name'),
      status: "operational",
      description: t('company.platformStatus.services.mobileApps.description'),
      uptime: "99.96%",
      icon: Smartphone,
      lastChecked: t('company.platformStatus.services.lastChecked.2min')
    },
    {
      service: t('company.platformStatus.services.deposits.name'),
      status: "operational",
      description: t('company.platformStatus.services.deposits.description'),
      uptime: "99.99%",
      icon: Download,
      lastChecked: t('company.platformStatus.services.lastChecked.1min')
    },
    {
      service: t('company.platformStatus.services.withdrawals.name'),
      status: "operational",
      description: t('company.platformStatus.services.withdrawals.description'),
      uptime: "99.97%",
      icon: Upload,
      lastChecked: t('company.platformStatus.services.lastChecked.3min')
    },
    {
      service: t('company.platformStatus.services.marketData.name'),
      status: "operational",
      description: t('company.platformStatus.services.marketData.description'),
      uptime: "99.99%",
      icon: Wifi,
      lastChecked: t('company.platformStatus.services.lastChecked.30sec')
    },
    {
      service: t('company.platformStatus.services.api.name'),
      status: "operational",
      description: t('company.platformStatus.services.api.description'),
      uptime: "99.95%",
      icon: Code,
      lastChecked: t('company.platformStatus.services.lastChecked.1min')
    },
    {
      service: t('company.platformStatus.services.portal.name'),
      status: "operational",
      description: t('company.platformStatus.services.portal.description'),
      uptime: "99.98%",
      icon: Server,
      lastChecked: t('company.platformStatus.services.lastChecked.2min')
    },
    {
      service: t('company.platformStatus.services.payment.name'),
      status: "operational",
      description: t('company.platformStatus.services.payment.description'),
      uptime: "99.96%",
      icon: CreditCard,
      lastChecked: t('company.platformStatus.services.lastChecked.1min')
    }
  ];

  const maintenanceSchedule = [
    {
      date: t('company.platformStatus.maintenance.item1.date'),
      time: t('company.platformStatus.maintenance.item1.time'),
      type: t('company.platformStatus.maintenance.type.scheduled'),
      impact: t('company.platformStatus.maintenance.item1.impact'),
      services: [t('company.platformStatus.maintenance.item1.service1'), t('company.platformStatus.maintenance.item1.service2'), t('company.platformStatus.maintenance.item1.service3')],
      reason: t('company.platformStatus.maintenance.item1.reason'),
      status: "scheduled"
    },
    {
      date: t('company.platformStatus.maintenance.item2.date'),
      time: t('company.platformStatus.maintenance.item2.time'),
      type: t('company.platformStatus.maintenance.type.systemUpdate'),
      impact: t('company.platformStatus.maintenance.item2.impact'),
      services: [t('company.platformStatus.maintenance.item2.service1')],
      reason: t('company.platformStatus.maintenance.item2.reason'),
      status: "scheduled"
    },
    {
      date: t('company.platformStatus.maintenance.item3.date'),
      time: t('company.platformStatus.maintenance.item3.time'),
      type: t('company.platformStatus.maintenance.type.majorUpgrade'),
      impact: t('company.platformStatus.maintenance.item3.impact'),
      services: [t('company.platformStatus.maintenance.item3.service1')],
      reason: t('company.platformStatus.maintenance.item3.reason'),
      status: "scheduled"
    },
    {
      date: t('company.platformStatus.maintenance.item4.date'),
      time: t('company.platformStatus.maintenance.item4.time'),
      type: t('company.platformStatus.maintenance.type.securityPatch'),
      impact: t('company.platformStatus.maintenance.item4.impact'),
      services: [t('company.platformStatus.maintenance.item4.service1'), t('company.platformStatus.maintenance.item4.service2')],
      reason: t('company.platformStatus.maintenance.item4.reason'),
      status: "scheduled"
    }
  ];

  const incidentHistory = [
    {
      date: t('company.platformStatus.incidents.item1.date'),
      time: t('company.platformStatus.incidents.item1.time'),
      duration: t('company.platformStatus.incidents.item1.duration'),
      impact: t('company.platformStatus.incidents.item1.impact'),
      severity: "Major",
      affected: [t('company.platformStatus.incidents.item1.affected1'), t('company.platformStatus.incidents.item1.affected2')],
      cause: t('company.platformStatus.incidents.item1.cause'),
      resolution: t('company.platformStatus.incidents.item1.resolution'),
      status: "resolved"
    },
    {
      date: t('company.platformStatus.incidents.item2.date'),
      time: t('company.platformStatus.incidents.item2.time'),
      duration: t('company.platformStatus.incidents.item2.duration'),
      impact: t('company.platformStatus.incidents.item2.impact'),
      severity: "Minor",
      affected: [t('company.platformStatus.incidents.item2.affected1')],
      cause: t('company.platformStatus.incidents.item2.cause'),
      resolution: t('company.platformStatus.incidents.item2.resolution'),
      status: "resolved"
    },
    {
      date: t('company.platformStatus.incidents.item3.date'),
      time: t('company.platformStatus.incidents.item3.time'),
      duration: t('company.platformStatus.incidents.item3.duration'),
      impact: t('company.platformStatus.incidents.item3.impact'),
      severity: "Moderate",
      affected: [t('company.platformStatus.incidents.item3.affected1'), t('company.platformStatus.incidents.item3.affected2')],
      cause: t('company.platformStatus.incidents.item3.cause'),
      resolution: t('company.platformStatus.incidents.item3.resolution'),
      status: "resolved"
    },
    {
      date: t('company.platformStatus.incidents.item4.date'),
      time: t('company.platformStatus.incidents.item4.time'),
      duration: t('company.platformStatus.incidents.item4.duration'),
      impact: t('company.platformStatus.incidents.item4.impact'),
      severity: "Minor",
      affected: [t('company.platformStatus.incidents.item4.affected1')],
      cause: t('company.platformStatus.incidents.item4.cause'),
      resolution: t('company.platformStatus.incidents.item4.resolution'),
      status: "resolved"
    },
    {
      date: t('company.platformStatus.incidents.item5.date'),
      time: t('company.platformStatus.incidents.item5.time'),
      duration: t('company.platformStatus.incidents.item5.duration'),
      impact: t('company.platformStatus.incidents.item5.impact'),
      severity: "Moderate",
      affected: [t('company.platformStatus.incidents.item5.affected1')],
      cause: t('company.platformStatus.incidents.item5.cause'),
      resolution: t('company.platformStatus.incidents.item5.resolution'),
      status: "resolved"
    },
    {
      date: t('company.platformStatus.incidents.item6.date'),
      time: t('company.platformStatus.incidents.item6.time'),
      duration: t('company.platformStatus.incidents.item6.duration'),
      impact: t('company.platformStatus.incidents.item6.impact'),
      severity: "Minor",
      affected: [t('company.platformStatus.incidents.item6.affected1')],
      cause: t('company.platformStatus.incidents.item6.cause'),
      resolution: t('company.platformStatus.incidents.item6.resolution'),
      status: "resolved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "degraded":
        return "text-amber-500";
      case "outage":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle;
      case "degraded":
        return MinusCircle;
      case "outage":
        return XCircle;
      default:
        return Activity;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Major":
        return <Badge variant="destructive">{t('company.platformStatus.incidents.severity.major')}</Badge>;
      case "Moderate":
        return <Badge className="bg-amber-500">{t('company.platformStatus.incidents.severity.moderate')}</Badge>;
      case "Minor":
        return <Badge variant="outline">{t('company.platformStatus.incidents.severity.minor')}</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const faqs = [
    {
      question: t('company.platformStatus.faq.q1.question'),
      answer: t('company.platformStatus.faq.q1.answer')
    },
    {
      question: t('company.platformStatus.faq.q2.question'),
      answer: t('company.platformStatus.faq.q2.answer')
    },
    {
      question: t('company.platformStatus.faq.q3.question'),
      answer: t('company.platformStatus.faq.q3.answer')
    },
    {
      question: t('company.platformStatus.faq.q4.question'),
      answer: t('company.platformStatus.faq.q4.answer')
    },
    {
      question: t('company.platformStatus.faq.q5.question'),
      answer: t('company.platformStatus.faq.q5.answer')
    },
    {
      question: t('company.platformStatus.faq.q6.question'),
      answer: t('company.platformStatus.faq.q6.answer')
    },
    {
      question: t('company.platformStatus.faq.q7.question'),
      answer: t('company.platformStatus.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-status">{t('company.platformStatus.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.platformStatus.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.platformStatus.description')}
              </VariantText>
            </div>

            {/* Stats Cards */}
            <VariantGrid className="mb-12">
              {stats.map((stat) => (
                <VariantCard key={stat.label} data-testid={stat.testId}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </VariantCard>
              ))}
            </VariantGrid>

          {/* All Systems Operational Alert */}
          <Alert className="mb-12 border-green-500/50 bg-green-500/10" data-testid="alert-status">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <strong>{t('company.platformStatus.alert.operational')}</strong> {t('company.platformStatus.alert.description')}
            </AlertDescription>
          </Alert>

          {/* System Status */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.platformStatus.systemStatus.title')}</VariantHeading>
            <div className="grid md:grid-cols-2 gap-4">
              {systemStatus.map((system, index) => {
                const StatusIcon = getStatusIcon(system.status);
                return (
                  <VariantCard key={index} data-testid={`card-system-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <system.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{system.service}</h3>
                            <p className="text-sm text-muted-foreground">{system.description}</p>
                          </div>
                        </div>
                        <StatusIcon className={`w-5 h-5 flex-shrink-0 ml-2 ${getStatusColor(system.status)}`} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('company.platformStatus.services.uptime', { uptime: system.uptime })}</span>
                        <span className="text-muted-foreground">{system.lastChecked}</span>
                      </div>
                    </CardContent>
                  </VariantCard>
                );
              })}
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.platformStatus.maintenance.title')}</VariantHeading>
            <div className="space-y-4">
              {maintenanceSchedule.map((maintenance, index) => (
                <VariantCard key={index} data-testid={`card-maintenance-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <CardTitle className="text-lg">{maintenance.date}</CardTitle>
                          <Badge variant="outline">{maintenance.type}</Badge>
                        </div>
                        <CardDescription>{maintenance.time}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">{t('company.platformStatus.maintenance.impact')}</h4>
                        <p className="text-sm text-muted-foreground">{maintenance.impact}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">{t('company.platformStatus.maintenance.reason')}</h4>
                        <p className="text-sm text-muted-foreground">{maintenance.reason}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">{t('company.platformStatus.maintenance.affectedServices')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {maintenance.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* Incident History */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.platformStatus.incidents.title')}</VariantHeading>
            <VariantCard data-testid="card-incidents">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">{t('company.platformStatus.incidents.table.dateTime')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('company.platformStatus.incidents.table.duration')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('company.platformStatus.incidents.table.impact')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('company.platformStatus.incidents.table.severity')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('company.platformStatus.incidents.table.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidentHistory.map((incident, index) => (
                        <tr key={index} className="border-b" data-testid={`incident-${index}`}>
                          <td className="py-3 px-4">
                            <div className="font-medium">{incident.date}</div>
                            <div className="text-sm text-muted-foreground">{incident.time}</div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{incident.duration}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-sm">{incident.impact}</div>
                            <div className="text-xs text-muted-foreground">{incident.affected.join(", ")}</div>
                          </td>
                          <td className="py-3 px-4">
                            {getSeverityBadge(incident.severity)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-500">{t('company.platformStatus.incidents.status.resolved')}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </VariantCard>

            {/* Incident Details Accordion */}
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full" data-testid="accordion-incidents">
                {incidentHistory.map((incident, index) => (
                  <AccordionItem key={index} value={`incident-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`incident-trigger-${index}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{incident.date}</span>
                        <span className="text-sm text-muted-foreground">- {incident.impact}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent data-testid={`incident-details-${index}`}>
                      <div className="space-y-3 pl-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{t('company.platformStatus.incidents.rootCause')}</h4>
                          <p className="text-sm text-muted-foreground">{incident.cause}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{t('company.platformStatus.incidents.resolution')}</h4>
                          <p className="text-sm text-muted-foreground">{incident.resolution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{t('company.platformStatus.incidents.affectedSystems')}</h4>
                          <div className="flex flex-wrap gap-2">
                            {incident.affected.map((service, idx) => (
                              <Badge key={idx} variant="outline">{service}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Subscribe Alert */}
          <Alert className="mb-12" data-testid="alert-subscribe">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span><strong>{t('company.platformStatus.subscribe.strong')}</strong> {t('company.platformStatus.subscribe.message')}</span>
                <Button variant="outline" size="sm" className="ml-4" data-testid="button-subscribe">{t('company.platformStatus.subscribe.button')}</Button>
              </div>
            </AlertDescription>
          </Alert>

          {/* FAQ Section */}
          <div>
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.platformStatus.faq.title')}</VariantHeading>
            <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-question-${index}`}>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-8" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
