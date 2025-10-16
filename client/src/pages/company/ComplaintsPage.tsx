import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Info,
  HelpCircle,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Scale
} from "lucide-react";

export default function ComplaintsPage() {
  const stats = [
    {
      label: "Resolution Time",
      value: "48hrs",
      description: "Average first response",
      icon: Clock,
      testId: "stat-resolution-time"
    },
    {
      label: "Success Rate",
      value: "94%",
      description: "Resolved satisfactorily",
      icon: TrendingUp,
      testId: "stat-success-rate"
    },
    {
      label: "Open Channels",
      value: "5",
      description: "Ways to reach us",
      icon: MessageSquare,
      testId: "stat-channels"
    },
    {
      label: "Escalation Levels",
      value: "4",
      description: "Fair review process",
      icon: Users,
      testId: "stat-levels"
    }
  ];

  const resolutionProcess = [
    {
      level: "Level 1: Customer Support",
      timeframe: "0-5 business days",
      description: "Initial complaint submission and first-line resolution attempt",
      icon: MessageSquare,
      steps: [
        "Submit complaint via email, phone, live chat, or online form",
        "Receive acknowledgment within 24 hours with case reference number",
        "Assigned support agent investigates and attempts resolution",
        "Receive initial response within 48 hours (target)",
        "Resolution communicated within 5 business days for simple cases"
      ],
      contacts: [
        { method: "Email", detail: "complaints@example-broker.com", available: "24/7" },
        { method: "Phone", detail: "+44 20 7946 0958 (UK) / +1 888 555 0123 (US)", available: "Mon-Fri 8am-8pm GMT" },
        { method: "Live Chat", detail: "Available on website/platform", available: "24/5 (Mon-Fri)" },
        { method: "Online Form", detail: "www.example-broker.com/complaints", available: "24/7" }
      ]
    },
    {
      level: "Level 2: Customer Relations Manager",
      timeframe: "5-15 business days",
      description: "Escalation for unresolved or complex complaints",
      icon: Users,
      steps: [
        "Request escalation if unsatisfied with Level 1 response",
        "Case reviewed by Senior Customer Relations Manager",
        "Independent assessment of complaint and broker's actions",
        "Additional evidence may be requested from both parties",
        "Detailed written response provided within 10 business days"
      ],
      contacts: [
        { method: "Email", detail: "escalations@example-broker.com", available: "24/7" },
        { method: "Direct Phone", detail: "+44 20 7946 0959 (ask for CRM)", available: "Mon-Fri 9am-6pm GMT" },
        { method: "Written", detail: "Customer Relations Team, 123 Financial St, London EC2V 7QQ", available: "Postal mail" }
      ]
    },
    {
      level: "Level 3: Compliance Department",
      timeframe: "15-30 business days",
      description: "Formal review for regulatory or serious disputes",
      icon: Scale,
      steps: [
        "Escalate to Compliance if still unresolved or involves regulatory breach",
        "Head of Compliance personally reviews case",
        "Full investigation including trade logs, communications, system records",
        "Assessment against FCA Conduct of Business rules and internal policies",
        "Final internal decision issued within 8 weeks (UK regulatory requirement)"
      ],
      contacts: [
        { method: "Email", detail: "compliance@example-broker.com", available: "24/7" },
        { method: "Secure Mail", detail: "Compliance Department via secure client portal", available: "24/7" },
        { method: "Regulatory Copy", detail: "You may cc your regulator (FCA, CySEC) on correspondence", available: "N/A" }
      ]
    },
    {
      level: "Level 4: External Ombudsman",
      timeframe: "30+ business days",
      description: "Independent external dispute resolution if internal process fails",
      icon: FileText,
      steps: [
        "After 8 weeks or receiving 'final response letter', escalate to Ombudsman",
        "Financial Ombudsman Service (UK), CySEC Ombudsman (EU), or AFCA (Australia)",
        "Submit complaint with all documentation and correspondence",
        "Ombudsman investigates independently (can take 3-6 months)",
        "Binding decision issued - broker must comply or face regulatory penalties"
      ],
      contacts: [
        { method: "Financial Ombudsman (UK)", detail: "complaint.info@financial-ombudsman.org.uk / 0800 023 4567", available: "Mon-Fri 8am-8pm, Sat 9am-1pm" },
        { method: "CySEC Ombudsman (EU)", detail: "www.financialombudsman.gov.cy", available: "Online submission" },
        { method: "AFCA (Australia)", detail: "info@afca.org.au / 1800 931 678", available: "Mon-Fri 9am-5pm AEST" }
      ]
    }
  ];

  const escalationTimeline = [
    { stage: "Complaint Submitted", days: "Day 0", action: "Acknowledge within 24hrs" },
    { stage: "Initial Investigation", days: "Days 1-5", action: "Support team resolves or escalates" },
    { stage: "Manager Review", days: "Days 5-15", action: "If escalated, senior review" },
    { stage: "Compliance Assessment", days: "Days 15-30", action: "If still unresolved, formal review" },
    { stage: "Final Response", days: "Day 30-56 (max 8 weeks UK)", action: "Internal final decision issued" },
    { stage: "Ombudsman Eligible", days: "After 8 weeks or final response", action: "External review available" }
  ];

  const complaintCategories = [
    {
      category: "Trading Disputes",
      examples: ["Order execution issues", "Slippage complaints", "Stop-loss not triggered", "Platform freezing during trades"],
      typicalResolution: "Trade log analysis, system review, potential compensation if broker error"
    },
    {
      category: "Withdrawal Issues",
      examples: ["Delayed withdrawals", "Rejected withdrawal requests", "Unexpected fees deducted", "Verification delays"],
      typicalResolution: "Payment processing review, compliance verification, expedited withdrawal if valid"
    },
    {
      category: "Account Access",
      examples: ["Account locked/suspended", "Login issues", "Platform access denied", "Margin call disputes"],
      typicalResolution: "Account status review, verification completion, access restoration or explanation"
    },
    {
      category: "Fees & Charges",
      examples: ["Unexpected swap charges", "Commission discrepancies", "Inactivity fees", "Currency conversion disputes"],
      typicalResolution: "Fee calculation review, refund if incorrect, explanation of charges"
    },
    {
      category: "Customer Service",
      examples: ["Poor communication", "Misleading information", "Unresponsive support", "Rude staff behavior"],
      typicalResolution: "Staff review, process improvement, apology and service recovery"
    }
  ];

  const faqs = [
    {
      question: "How do I file a complaint?",
      answer: "You can file a complaint through multiple channels: 1) Email complaints@example-broker.com with your account number and detailed issue description, 2) Call our complaints hotline +44 20 7946 0958, 3) Use the 'File Complaint' form on our website under Help > Complaints, 4) Live chat (ask to speak to a complaints specialist), or 5) Secure message via your client portal. You'll receive an acknowledgment within 24 hours with a case reference number. Include all relevant details: dates, trade IDs, screenshots, and what resolution you're seeking."
    },
    {
      question: "How long does the complaint process take?",
      answer: "Timelines depend on complexity: Simple issues (e.g., withdrawal delays) are often resolved within 48 hours at Level 1. More complex cases (e.g., trading disputes) may take 5-10 business days at Level 2. If escalated to Compliance (Level 3), you'll receive a final response within 8 weeks (UK regulatory requirement). If still unsatisfied, external Ombudsman review typically takes 3-6 months. At each stage, you'll receive updates every 5 business days minimum."
    },
    {
      question: "What happens if I'm not satisfied with the resolution?",
      answer: "You have the right to escalate: If unsatisfied with Level 1 (Support), request escalation to Level 2 (Manager). If Level 2 doesn't resolve it, escalate to Level 3 (Compliance). After receiving our 'final response letter' or 8 weeks have passed, you can escalate to the external Ombudsman (Financial Ombudsman Service for UK, CySEC Ombudsman for EU, AFCA for Australia). The Ombudsman's decision is binding on us. You always retain the right to pursue legal action if preferred."
    },
    {
      question: "Can I get compensation for my complaint?",
      answer: "Compensation depends on the nature of the complaint and fault determination: If we made an error (e.g., platform failure caused loss, withdrawal wrongly delayed), compensation may include financial remedy, trade reversal, or fee refunds. If the issue was due to market conditions or client error, no compensation is provided but we'll explain why. For service failures (e.g., poor communication), non-financial remedies like apology, process improvement, or goodwill gestures may be offered. The Ombudsman can award up to £415,000 (UK) if they find in your favor."
    },
    {
      question: "Will filing a complaint affect my account or trading?",
      answer: "Absolutely not. You have the right to complain without any negative consequences. Your account will not be restricted, closed, or limited in any way for filing a complaint. All trading services remain available as normal. We are prohibited by FCA rules from retaliating against complainants. In fact, filing a complaint often improves service as it highlights issues we can fix. Your complaint is confidential and handled professionally by dedicated teams separate from trading operations."
    },
    {
      question: "What documentation should I provide with my complaint?",
      answer: "Provide as much evidence as possible: 1) Account number and personal details, 2) Dates and times of incidents, 3) Trade IDs or transaction references for specific trades, 4) Screenshots of errors, platform issues, or conversations, 5) Email correspondence with support team, 6) Bank statements showing withdrawal delays or incorrect charges, 7) Any previous complaint reference numbers. The more detail you provide initially, the faster we can investigate. If we need additional information, we'll request it."
    },
    {
      question: "Can I complain to the regulator directly instead of the broker?",
      answer: "Yes, but regulators (FCA, CySEC, ASIC) typically require you to first attempt resolution with the broker. File your complaint with us and give us 8 weeks to resolve (UK rule). If unresolved, you can then contact the regulator. However, you can immediately contact the regulator if: 1) You suspect fraud or serious misconduct, 2) The broker refuses to accept your complaint, 3) You believe your funds are at risk, or 4) The broker has ceased operations. Regulators may investigate but won't award individual compensation - that's what Ombudsmen do."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-complaints">Trust & Compliance</Badge>
            <h1 className="text-4xl font-bold mb-4">Complaints & Disputes</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are committed to resolving any issues fairly and efficiently. Our structured complaint process ensures your concerns are heard and addressed at the appropriate level, with access to external dispute resolution if needed.
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

          {/* Important Notice */}
          <Alert className="mb-12" data-testid="alert-complaints-rights">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Your Rights:</strong> You have the right to complain and receive a fair review. Filing a complaint will not affect your account or trading. If unsatisfied with our response, you can escalate to an independent Ombudsman at no cost to you.
            </AlertDescription>
          </Alert>

          {/* Resolution Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Resolution Process</h2>
            <div className="space-y-6">
              {resolutionProcess.map((level, index) => (
                <Card key={index} data-testid={`card-level-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <level.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{level.level}</CardTitle>
                          <CardDescription>{level.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">{level.timeframe}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3">Process Steps:</h4>
                      <div className="space-y-2">
                        {level.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-3">Contact Methods:</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {level.contacts.map((contact, idx) => (
                          <div key={idx} className="bg-muted rounded-lg p-3">
                            <div className="font-medium text-sm mb-1">{contact.method}</div>
                            <div className="text-sm text-muted-foreground mb-1">{contact.detail}</div>
                            <div className="text-xs text-muted-foreground">{contact.available}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Escalation Timeline */}
          <Card className="mb-12" data-testid="card-timeline">
            <CardHeader>
              <CardTitle>Escalation Timeline</CardTitle>
              <CardDescription>What to expect at each stage of the complaint process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalationTimeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4" data-testid={`timeline-${index}`}>
                    <div className="w-24 text-sm font-medium flex-shrink-0">{item.days}</div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 border-b pb-4">
                      <div className="font-semibold text-sm">{item.stage}</div>
                      <div className="text-sm text-muted-foreground">{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complaint Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Common Complaint Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {complaintCategories.map((category, index) => (
                <Card key={index} data-testid={`card-category-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Common Examples:</h4>
                      <ul className="space-y-1">
                        {category.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-semibold">Typical Resolution: </span>
                        {category.typicalResolution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <Card className="mb-12 bg-primary/5" data-testid="card-contact">
            <CardHeader>
              <CardTitle>File a Complaint Now</CardTitle>
              <CardDescription>Choose your preferred contact method to begin the resolution process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button className="h-auto py-4 flex-col" data-testid="button-email-complaint">
                  <Mail className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Email</span>
                  <span className="text-xs mt-1">complaints@example-broker.com</span>
                </Button>
                <Button className="h-auto py-4 flex-col" data-testid="button-phone-complaint">
                  <Phone className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Phone</span>
                  <span className="text-xs mt-1">+44 20 7946 0958</span>
                </Button>
                <Button className="h-auto py-4 flex-col" data-testid="button-form-complaint">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Online Form</span>
                  <span className="text-xs mt-1">Complete in 2 minutes</span>
                </Button>
              </div>
            </CardContent>
          </Card>

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
