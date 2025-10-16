import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  Globe, 
  Info, 
  Award,
  Building,
  AlertTriangle,
  Scale,
  ExternalLink,
  HelpCircle
} from "lucide-react";

export default function RegulatoryPage() {
  const stats = [
    {
      label: "Jurisdictions",
      value: "8",
      description: "Operating licenses worldwide",
      icon: Globe,
      testId: "stat-jurisdictions"
    },
    {
      label: "Years Operating",
      value: "15+",
      description: "Established track record",
      icon: Award,
      testId: "stat-years"
    },
    {
      label: "Regulators",
      value: "6",
      description: "Major financial authorities",
      icon: Building,
      testId: "stat-regulators"
    },
    {
      label: "Compliance Score",
      value: "98.5%",
      description: "Annual audit rating",
      icon: CheckCircle,
      testId: "stat-compliance"
    }
  ];

  const regulatoryBodies = [
    {
      name: "Financial Conduct Authority (FCA)",
      country: "United Kingdom",
      license: "FRN 742681",
      type: "Full Authorization",
      description: "Authorized and regulated by the UK's premier financial regulator, ensuring the highest standards of client protection and market conduct.",
      requirements: [
        "Segregated client funds in UK banks",
        "£1 million minimum capital requirement",
        "Quarterly regulatory reporting",
        "FSCS protection up to £85,000 per client"
      ]
    },
    {
      name: "Cyprus Securities and Exchange Commission (CySEC)",
      country: "Cyprus (EU)",
      license: "License No. 247/14",
      type: "MiFID II Compliant",
      description: "Licensed under European MiFID II framework, allowing passporting rights across all EU member states with harmonized investor protection.",
      requirements: [
        "ICF protection up to €20,000 per client",
        "€730,000 minimum capital requirement",
        "Compliance with MiFID II directive",
        "Annual external audits by Big 4 firms"
      ]
    },
    {
      name: "Australian Securities and Investments Commission (ASIC)",
      country: "Australia",
      license: "AFSL 428901",
      type: "Market Maker License",
      description: "Holds Australian Financial Services License with full authority to provide derivatives and leveraged products to retail and wholesale clients.",
      requirements: [
        "Segregated accounts with Tier-1 Australian banks",
        "Negative balance protection for retail clients",
        "Product intervention orders compliance",
        "External dispute resolution via AFCA"
      ]
    },
    {
      name: "Financial Sector Conduct Authority (FSCA)",
      country: "South Africa",
      license: "FSP No. 48896",
      type: "Category I FSP",
      description: "Licensed to provide over-the-counter derivatives and foreign exchange services under South Africa's stringent financial services framework.",
      requirements: [
        "Minimum capital: 500,000 ZAR",
        "Quarterly compliance officer reports",
        "Ombud for Financial Services Providers access",
        "Segregated client accounts mandatory"
      ]
    },
    {
      name: "Financial Services Authority (FSA)",
      country: "Seychelles",
      license: "SD089",
      type: "Securities Dealer License",
      description: "International securities dealer license for serving clients in Asia-Pacific and emerging markets with flexible leverage options.",
      requirements: [
        "Minimum capital: $50,000 USD",
        "Annual external audit requirement",
        "Client fund segregation at regulated banks",
        "Professional Indemnity Insurance coverage"
      ]
    },
    {
      name: "Dubai Financial Services Authority (DFSA)",
      country: "United Arab Emirates",
      license: "F004822",
      type: "Category 3C License",
      description: "Licensed in Dubai International Financial Centre (DIFC) for providing dealing services in investments to retail and professional clients.",
      requirements: [
        "Base capital: $500,000 USD",
        "DFSA Client Money Rules compliance",
        "Risk management framework approval",
        "Quarterly regulatory returns"
      ]
    }
  ];

  const complianceFramework = [
    {
      title: "Anti-Money Laundering (AML)",
      description: "Comprehensive AML procedures in line with FATF recommendations",
      measures: [
        "Enhanced Due Diligence (EDD) for high-risk clients",
        "Ongoing transaction monitoring and suspicious activity reporting",
        "Source of funds and source of wealth verification",
        "Regular staff training on AML/CFT procedures",
        "Annual independent AML audit by external firm"
      ]
    },
    {
      title: "Know Your Customer (KYC)",
      description: "Rigorous client identification and verification processes",
      measures: [
        "Government-issued ID verification (passport, driver's license)",
        "Proof of address verification (utility bill, bank statement <3 months)",
        "Biometric verification for high-value accounts",
        "Politically Exposed Persons (PEP) screening",
        "Beneficial ownership identification for corporate accounts"
      ]
    },
    {
      title: "Data Protection & Privacy",
      description: "Full compliance with GDPR, DPA 2018, and international privacy laws",
      measures: [
        "Data Protection Officer (DPO) appointed and contactable",
        "Client data encrypted at rest (AES-256) and in transit (TLS 1.3)",
        "Right to access, rectification, and erasure honored within 30 days",
        "Data retention policy: 7 years for financial records, 5 years for KYC",
        "Annual Data Protection Impact Assessments (DPIA)"
      ]
    },
    {
      title: "Best Execution Policy",
      description: "Commitment to obtaining the best possible results for client orders",
      measures: [
        "Multi-venue execution across 15+ liquidity providers",
        "Price, cost, speed, and likelihood of execution considered",
        "Annual best execution reports published on website",
        "Client order priority: Client orders filled before proprietary trading",
        "No last look rejections on retail client orders"
      ]
    }
  ];

  const auditReporting = [
    {
      type: "External Financial Audit",
      frequency: "Annual",
      auditor: "KPMG International",
      lastCompleted: "March 2025",
      nextDue: "March 2026",
      scope: "Full financial statements, internal controls, and regulatory capital adequacy"
    },
    {
      type: "Regulatory Compliance Audit",
      frequency: "Quarterly",
      auditor: "Internal Compliance Team + External Consultant",
      lastCompleted: "January 2025",
      nextDue: "April 2025",
      scope: "AML/KYC procedures, client fund segregation, best execution, complaints handling"
    },
    {
      type: "Information Security Audit (ISO 27001)",
      frequency: "Bi-Annual",
      auditor: "BSI Group",
      lastCompleted: "September 2024",
      nextDue: "September 2025",
      scope: "Cybersecurity controls, data protection, incident response, business continuity"
    },
    {
      type: "Penetration Testing",
      frequency: "Quarterly",
      auditor: "Certified Ethical Hackers (CEH)",
      lastCompleted: "January 2025",
      nextDue: "April 2025",
      scope: "Trading platform, mobile apps, API endpoints, internal network infrastructure"
    }
  ];

  const faqs = [
    {
      question: "Why is regulation important when choosing a forex broker?",
      answer: "Regulation provides critical client protections: segregated funds (your money kept separate from broker's), compensation schemes (insurance if broker fails), dispute resolution mechanisms, and oversight by government authorities. Regulated brokers must maintain minimum capital reserves, submit to regular audits, and follow strict conduct rules. Unregulated brokers can freeze accounts, manipulate prices, or disappear with client funds without recourse."
    },
    {
      question: "What does it mean to be FCA or CySEC regulated?",
      answer: "FCA (UK) regulation is considered the gold standard, requiring brokers to hold £1M+ capital, segregate client funds in UK banks, and provide FSCS protection up to £85,000. CySEC (Cyprus) regulation offers EU-wide MiFID II protections, including ICF compensation up to €20,000, segregated accounts, and negative balance protection for retail clients. Both regulators conduct regular audits and can revoke licenses for non-compliance."
    },
    {
      question: "How can I verify your regulatory licenses are legitimate?",
      answer: "You can independently verify all our licenses: FCA Register (register.fca.org.uk, search FRN 742681), CySEC Register (cysec.gov.cy, License 247/14), ASIC Register (connectonline.asic.gov.au, AFSL 428901). Each regulator maintains a public database. We also publish our license certificates and annual compliance reports in the 'Legal Documents' section of our website. Never trust a broker that refuses to provide verifiable license numbers."
    },
    {
      question: "Which regulatory jurisdiction protects me best as a client?",
      answer: "Depends on your location and trading style: UK (FCA) offers the strongest retail protections with FSCS insurance and strict leverage limits (1:30). EU (CySEC) provides MiFID II harmonized protections across Europe. Australia (ASIC) offers negative balance protection and AFCA dispute resolution. Offshore licenses (Seychelles, Mauritius) allow higher leverage but weaker protections. Choose the entity that regulates in your country of residence for maximum protection."
    },
    {
      question: "What happens to my funds if the broker goes bankrupt?",
      answer: "With FCA regulation, the Financial Services Compensation Scheme (FSCS) protects up to £85,000 per client. CySEC clients get Investor Compensation Fund (ICF) coverage up to €20,000. ASIC doesn't have a compensation scheme but requires segregated accounts with Australian banks. Your funds are kept separate from company assets, so in bankruptcy, client money is returned first before creditors. This is why choosing a regulated broker is critical."
    },
    {
      question: "Do you have to follow different rules for professional vs retail clients?",
      answer: "Yes, under MiFID II and FCA rules. Retail clients receive maximum protection: leverage limits (1:30 forex, 1:20 indices), negative balance protection, 50% margin close-out rule, and stricter marketing restrictions. Professional clients (€500K portfolio, high trade volume, or financial sector experience) get higher leverage but fewer protections. Clients must opt-in and meet strict criteria to be classified as professional."
    },
    {
      question: "How often are you audited and by whom?",
      answer: "We undergo multiple audits annually: Financial audit by KPMG (annual), compliance audit (quarterly by internal team + external consultants), ISO 27001 security audit by BSI Group (bi-annual), and penetration testing (quarterly). Regulators also conduct surprise inspections. All audit reports (excluding sensitive security details) are summarized in our annual compliance report, published each April on our website."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-regulatory">Trust & Compliance</Badge>
            <h1 className="text-4xl font-bold mb-4">Regulatory & Licenses</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We operate under the oversight of six major financial regulators across eight jurisdictions, ensuring the highest standards of client protection, fund security, and regulatory compliance.
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
          <Alert className="mb-12" data-testid="alert-regulation-notice">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Different group entities operate under different licenses. Your regulatory protection depends on which entity you open an account with, typically determined by your country of residence. Always verify which regulated entity serves your jurisdiction.
            </AlertDescription>
          </Alert>

          {/* Regulatory Bodies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Regulatory Licenses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regulatoryBodies.map((regulator, index) => (
                <Card key={index} data-testid={`card-regulator-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{regulator.name}</CardTitle>
                        <CardDescription>{regulator.country}</CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2">{regulator.type}</Badge>
                    </div>
                    <div className="bg-muted rounded-md p-3 mt-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono font-semibold" data-testid={`text-license-${index}`}>{regulator.license}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" data-testid={`button-verify-${index}`}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{regulator.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {regulator.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compliance Framework */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Compliance Framework</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {complianceFramework.map((framework, index) => (
                <Card key={index} data-testid={`card-compliance-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      {framework.title}
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {framework.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Audit & Reporting */}
          <Card className="mb-12" data-testid="card-audit-reporting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Audit & Reporting Transparency
              </CardTitle>
              <CardDescription>
                We maintain the highest standards of accountability through regular independent audits and transparent reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditReporting.map((audit, index) => (
                  <div key={index} className="border rounded-lg p-4" data-testid={`audit-${index}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{audit.type}</h4>
                        <p className="text-sm text-muted-foreground">{audit.auditor}</p>
                      </div>
                      <Badge variant="outline">{audit.frequency}</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Completed:</span>
                        <span className="ml-2 font-medium">{audit.lastCompleted}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Due:</span>
                        <span className="ml-2 font-medium">{audit.nextDue}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{audit.scope}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning Alert */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-warning">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>Beware of Clone Firms:</strong> Fraudsters sometimes impersonate regulated brokers. Always verify our license numbers directly on regulator websites, never through links we provide. Check the FCA Warning List for known scams.
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
