import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function PlatformStatusPage() {
  const stats = [
    {
      label: "Current Uptime",
      value: "99.97%",
      description: "Last 30 days",
      icon: TrendingUp,
      testId: "stat-uptime"
    },
    {
      label: "Monthly Uptime",
      value: "99.94%",
      description: "October 2025 average",
      icon: Activity,
      testId: "stat-monthly"
    },
    {
      label: "Last Incident",
      value: "23 days",
      description: "Sept 23, 2025 - 14 min",
      icon: Clock,
      testId: "stat-incident"
    },
    {
      label: "Next Maintenance",
      value: "Oct 20",
      description: "Sat 02:00-04:00 GMT",
      icon: Calendar,
      testId: "stat-maintenance"
    }
  ];

  const systemStatus = [
    {
      service: "Trading Platform (Web)",
      status: "operational",
      description: "All trading functions operational",
      uptime: "99.98%",
      icon: Activity,
      lastChecked: "2 minutes ago"
    },
    {
      service: "Mobile Apps (iOS/Android)",
      status: "operational",
      description: "Mobile trading apps fully functional",
      uptime: "99.96%",
      icon: Smartphone,
      lastChecked: "2 minutes ago"
    },
    {
      service: "Deposits & Funding",
      status: "operational",
      description: "All deposit methods accepting transactions",
      uptime: "99.99%",
      icon: Download,
      lastChecked: "1 minute ago"
    },
    {
      service: "Withdrawals & Payouts",
      status: "operational",
      description: "Withdrawal processing normal",
      uptime: "99.97%",
      icon: Upload,
      lastChecked: "3 minutes ago"
    },
    {
      service: "Market Data Feed",
      status: "operational",
      description: "Real-time price feeds streaming",
      uptime: "99.99%",
      icon: Wifi,
      lastChecked: "30 seconds ago"
    },
    {
      service: "Trading API (REST/WebSocket)",
      status: "operational",
      description: "API endpoints responding normally",
      uptime: "99.95%",
      icon: Code,
      lastChecked: "1 minute ago"
    },
    {
      service: "Customer Portal",
      status: "operational",
      description: "Account management and settings accessible",
      uptime: "99.98%",
      icon: Server,
      lastChecked: "2 minutes ago"
    },
    {
      service: "Payment Gateway",
      status: "operational",
      description: "Card processing and bank transfers active",
      uptime: "99.96%",
      icon: CreditCard,
      lastChecked: "1 minute ago"
    }
  ];

  const maintenanceSchedule = [
    {
      date: "October 20, 2025",
      time: "02:00 - 04:00 GMT (Saturday)",
      type: "Scheduled Maintenance",
      impact: "Trading platform unavailable for 2 hours",
      services: ["Web Platform", "Mobile Apps", "API"],
      reason: "Database optimization and security patch deployment",
      status: "scheduled"
    },
    {
      date: "October 27, 2025",
      time: "03:00 - 03:30 GMT (Sunday)",
      type: "System Update",
      impact: "Brief interruptions possible, no downtime expected",
      services: ["Market Data Feed"],
      reason: "Liquidity provider infrastructure upgrade",
      status: "scheduled"
    },
    {
      date: "November 3, 2025",
      time: "01:00 - 05:00 GMT (Sunday)",
      type: "Major Infrastructure Upgrade",
      impact: "All services unavailable for up to 4 hours",
      services: ["All Systems"],
      reason: "Data center migration to enhanced infrastructure (Singapore region)",
      status: "scheduled"
    },
    {
      date: "November 10, 2025",
      time: "02:30 - 03:00 GMT (Sunday)",
      type: "Security Patch",
      impact: "Login services may be briefly unavailable",
      services: ["Authentication", "Customer Portal"],
      reason: "Application security updates and SSL certificate renewal",
      status: "scheduled"
    }
  ];

  const incidentHistory = [
    {
      date: "September 23, 2025",
      time: "14:32 - 14:46 GMT",
      duration: "14 minutes",
      impact: "Trading Platform Unavailable",
      severity: "Major",
      affected: ["Web Platform", "Mobile Apps"],
      cause: "Database connection pool exhaustion during high volatility",
      resolution: "Connection pool limits increased, auto-scaling improved",
      status: "resolved"
    },
    {
      date: "September 8, 2025",
      time: "09:15 - 09:22 GMT",
      duration: "7 minutes",
      impact: "Delayed Market Data",
      severity: "Minor",
      affected: ["Market Data Feed"],
      cause: "Liquidity provider API rate limiting during NFP release",
      resolution: "Backup feed activated, rate limits renegotiated",
      status: "resolved"
    },
    {
      date: "August 19, 2025",
      time: "03:20 - 05:40 GMT",
      duration: "2 hours 20 minutes",
      impact: "Deposit Processing Delayed",
      severity: "Moderate",
      affected: ["Payment Gateway", "Deposits"],
      cause: "Third-party payment processor maintenance (unannounced)",
      resolution: "Alternative payment routes enabled, SLA review with processor",
      status: "resolved"
    },
    {
      date: "August 3, 2025",
      time: "22:10 - 22:18 GMT",
      duration: "8 minutes",
      impact: "API Requests Failing",
      severity: "Minor",
      affected: ["Trading API"],
      cause: "DDoS attack mitigated by Cloudflare",
      resolution: "Enhanced DDoS protection rules deployed",
      status: "resolved"
    },
    {
      date: "July 12, 2025",
      time: "11:45 - 12:30 GMT",
      duration: "45 minutes",
      impact: "Mobile App Login Issues",
      severity: "Moderate",
      affected: ["Mobile Apps (iOS/Android)"],
      cause: "Authentication service memory leak causing crashes",
      resolution: "Service restarted, memory leak patched in v2.8.1",
      status: "resolved"
    },
    {
      date: "June 28, 2025",
      time: "06:00 - 06:05 GMT",
      duration: "5 minutes",
      impact: "Chart Data Not Loading",
      severity: "Minor",
      affected: ["Web Platform - Charts"],
      cause: "CDN cache corruption for TradingView library",
      resolution: "CDN cache purged and refreshed",
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
        return <Badge variant="destructive">{severity}</Badge>;
      case "Moderate":
        return <Badge className="bg-amber-500">{severity}</Badge>;
      case "Minor":
        return <Badge variant="outline">{severity}</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const faqs = [
    {
      question: "Why does the platform go down for maintenance?",
      answer: "Scheduled maintenance is essential for platform security, performance, and reliability. We perform: 1) Security patches to protect against vulnerabilities, 2) Database optimization to maintain fast execution speeds, 3) Infrastructure upgrades for better scalability, 4) Bug fixes and feature deployments. Maintenance is always scheduled during low-volume periods (weekends, early morning GMT) to minimize disruption. We provide at least 48 hours notice via email, platform notifications, and this status page."
    },
    {
      question: "How will I know if there's a platform issue or maintenance?",
      answer: "We notify clients through multiple channels: 1) Email notifications sent to all active traders, 2) In-platform banner alerts (web and mobile), 3) SMS alerts for scheduled maintenance (opt-in), 4) Real-time updates on this Status Page, 5) Social media posts (Twitter @ExampleBroker_Status). For unplanned outages, we provide updates every 15 minutes until resolved. Subscribe to status.example-broker.com to receive instant incident notifications."
    },
    {
      question: "What happens to my open positions during downtime?",
      answer: "Your positions remain active in the market even if the platform is unavailable. Stop-losses and take-profits are held on our servers (not just your device) and continue to work during maintenance. However, you won't be able to manually close positions or place new trades during downtime. If downtime occurs during high volatility, we may manually monitor and execute stop-losses to protect clients. After service restoration, all positions are immediately visible and manageable again."
    },
    {
      question: "Can I still trade if the web platform is down?",
      answer: "Yes, we have redundancy: If the web platform is down, try the mobile app (iOS/Android) or vice versa. If both are unavailable, you can trade via our Trading API (for algo traders with API access). As a last resort during critical outages, you can call our emergency trading desk at +44 20 7946 0960 to manually close positions (identity verification required). However, during scheduled maintenance, all trading interfaces are typically offline simultaneously."
    },
    {
      question: "How do you achieve 99.9%+ uptime?",
      answer: "We maintain high availability through: 1) Redundant infrastructure across multiple data centers (London, Frankfurt, New York, Singapore, Tokyo), 2) Load balancing to distribute traffic and prevent server overload, 3) Auto-scaling to handle traffic spikes during news events, 4) Real-time monitoring with automated failover (switches to backup systems in <30 seconds), 5) DDoS protection via Cloudflare Enterprise, 6) Regular disaster recovery drills. We also maintain 'hot standby' servers that activate instantly if primary servers fail."
    },
    {
      question: "What's the difference between 'degraded' and 'outage' status?",
      answer: "'Degraded' means the service is operational but performing below normal standards - e.g., slower execution speeds, delayed data, or intermittent errors. You can still trade but may experience issues. 'Outage' means the service is completely unavailable and you cannot access it at all. During degraded status, we're actively working on restoration while maintaining partial service. We update status every 5 minutes during incidents to keep you informed."
    },
    {
      question: "Do you compensate clients for platform downtime?",
      answer: "Compensation depends on the nature and impact of downtime: Scheduled maintenance (announced 48hrs+ in advance) is not compensated as it's part of normal operations. Unplanned outages are assessed case-by-case: If downtime directly caused trading losses (e.g., stop-loss couldn't execute due to platform failure), we may provide compensation or trade reversal. Service credits or goodwill gestures may be offered for extended outages. File a complaint via complaints@example-broker.com with details of any losses incurred. Each case is reviewed individually by our Compliance team."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-status">System Status</Badge>
            <h1 className="text-4xl font-bold mb-4">Platform Status</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of our trading platform, infrastructure, and services. We maintain 99.9%+ uptime with transparent reporting of any incidents or scheduled maintenance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <Card key={stat.label} data-testid={stat.testId}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Systems Operational Alert */}
          <Alert className="mb-12 border-green-500/50 bg-green-500/10" data-testid="alert-status">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <strong>All Systems Operational:</strong> All trading services are currently running normally. Last updated: 2 minutes ago.
            </AlertDescription>
          </Alert>

          {/* System Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">System Status</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {systemStatus.map((system, index) => {
                const StatusIcon = getStatusIcon(system.status);
                return (
                  <Card key={index} data-testid={`card-system-${index}`}>
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
                        <span className="text-muted-foreground">Uptime: {system.uptime}</span>
                        <span className="text-muted-foreground">{system.lastChecked}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Scheduled Maintenance</h2>
            <div className="space-y-4">
              {maintenanceSchedule.map((maintenance, index) => (
                <Card key={index} data-testid={`card-maintenance-${index}`}>
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
                        <h4 className="text-sm font-semibold mb-2">Impact:</h4>
                        <p className="text-sm text-muted-foreground">{maintenance.impact}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Reason:</h4>
                        <p className="text-sm text-muted-foreground">{maintenance.reason}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Affected Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {maintenance.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Incident History */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Incident History (Last 6 Months)</h2>
            <Card data-testid="card-incidents">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold">Impact</th>
                        <th className="text-left py-3 px-4 font-semibold">Severity</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
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
                            <Badge className="bg-green-500">{incident.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

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
                          <h4 className="font-semibold text-sm mb-1">Root Cause:</h4>
                          <p className="text-sm text-muted-foreground">{incident.cause}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Resolution:</h4>
                          <p className="text-sm text-muted-foreground">{incident.resolution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Affected Systems:</h4>
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
                <span><strong>Stay Informed:</strong> Subscribe to status updates via email or SMS to receive instant notifications of incidents and maintenance.</span>
                <Button variant="outline" size="sm" className="ml-4" data-testid="button-subscribe">Subscribe</Button>
              </div>
            </AlertDescription>
          </Alert>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
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
      </div>
    </LandingLayout>
  );
}
