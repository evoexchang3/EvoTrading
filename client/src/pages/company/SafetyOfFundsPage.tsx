import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  DollarSign, 
  Building2, 
  Info, 
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Landmark,
  ShieldCheck,
  TrendingDown,
  FileCheck
} from "lucide-react";

export default function SafetyOfFundsPage() {
  const stats = [
    {
      label: "Segregated Accounts",
      value: "100%",
      description: "All client funds separated",
      icon: Lock,
      testId: "stat-segregated"
    },
    {
      label: "Insurance Coverage",
      value: "£5M",
      description: "Professional indemnity",
      icon: Shield,
      testId: "stat-insurance"
    },
    {
      label: "Tier-1 Banks",
      value: "12",
      description: "Global banking partners",
      icon: Building2,
      testId: "stat-banks"
    },
    {
      label: "Client Protection",
      value: "£85K",
      description: "FSCS max compensation",
      icon: ShieldCheck,
      testId: "stat-protection"
    }
  ];

  const segregationDetails = {
    overview: "We maintain strict segregation of client funds from company operational funds, ensuring your money is protected at all times. Client funds are held in designated segregated accounts at major Tier-1 banks and never used for company operations, hedging, or any other business activities.",
    process: [
      {
        step: "Deposit Received",
        description: "When you deposit funds, they are immediately identified as client money and must be segregated within 1 business day (UK) or by close of next business day (EU)."
      },
      {
        step: "Segregated Account Transfer",
        description: "Funds are transferred to designated client money accounts at our partner banks. These accounts are clearly titled 'Client Segregated Funds' and cannot be used for any company purposes."
      },
      {
        step: "Daily Reconciliation",
        description: "Our finance team performs daily reconciliation to ensure 100% of client funds are properly segregated. Any discrepancies trigger immediate investigation and resolution within 24 hours."
      },
      {
        step: "Regular Audits",
        description: "External auditors verify segregation compliance quarterly. Regulatory authorities can request segregation reports at any time and conduct surprise audits."
      }
    ],
    banks: [
      {
        name: "Barclays Bank PLC",
        country: "United Kingdom",
        accountType: "Client Segregated Account (FCA Compliant)",
        tier: "Tier-1",
        protection: "FSCS Protected up to £85,000 per client"
      },
      {
        name: "Deutsche Bank AG",
        country: "Germany",
        accountType: "Client Money Account (MiFID II Compliant)",
        tier: "Tier-1",
        protection: "EdB Protection up to €100,000"
      },
      {
        name: "National Australia Bank (NAB)",
        country: "Australia",
        accountType: "Trust Account (ASIC Regulated)",
        tier: "Tier-1",
        protection: "Australian Government Guarantee up to AUD $250,000"
      },
      {
        name: "Standard Chartered Bank",
        country: "Singapore",
        accountType: "Segregated Client Fund Account",
        tier: "Tier-1",
        protection: "MAS Regulated Segregation"
      }
    ]
  };

  const compensationSchemes = [
    {
      scheme: "Financial Services Compensation Scheme (FSCS)",
      jurisdiction: "United Kingdom (FCA)",
      coverage: "Up to £85,000 per client",
      description: "UK clients benefit from FSCS protection if we become insolvent. The FSCS is the UK's statutory deposit insurance and investors compensation scheme, funded by levies on regulated financial firms.",
      eligibility: [
        "Individuals and small businesses",
        "Must be an eligible claimant under FCA rules",
        "Covers deposits, investments, and insurance claims",
        "Claim must be submitted within 6 years of firm default"
      ],
      claimProcess: "Automatic notification by FSCS → Claim form submitted → Verification (typically 3 months) → Compensation paid"
    },
    {
      scheme: "Investor Compensation Fund (ICF)",
      jurisdiction: "Cyprus (CySEC) / EU",
      coverage: "Up to €20,000 per client",
      description: "EU/EEA clients under our CySEC entity are protected by the Investor Compensation Fund. This is a harmonized EU-wide scheme ensuring minimum protection levels across all member states.",
      eligibility: [
        "Retail and professional clients",
        "EU/EEA residents trading with CySEC entity",
        "Covers inability to return client funds or assets",
        "Excludes claims from money laundering or fraud by client"
      ],
      claimProcess: "CySEC declares broker default → ICF notifies eligible clients → 5-month claim period → Assessment and payment within 9 months"
    },
    {
      scheme: "Australian Financial Complaints Authority (AFCA)",
      jurisdiction: "Australia (ASIC)",
      coverage: "Up to AUD $1,085,000 (investments)",
      description: "While ASIC doesn't provide a compensation scheme, AFCA offers free dispute resolution. Claims above compensation limits may be pursued through liquidators or legal action.",
      eligibility: [
        "Australian residents or entities",
        "Complaints about financial services",
        "Must first attempt resolution with broker",
        "Claim within 6 years of issue or 2 years of discovering it"
      ],
      claimProcess: "File complaint with AFCA → Broker response period (30 days) → AFCA investigation → Binding determination issued"
    }
  ];

  const negativeBalanceProtection = {
    overview: "We provide Negative Balance Protection (NBP) to all retail clients, ensuring you never lose more than your account balance. If extreme market volatility causes your account to go negative, we will reset it to zero at no cost to you.",
    coverage: [
      {
        clientType: "Retail Clients (FCA, CySEC, ASIC)",
        protection: "Full negative balance protection (mandatory under regulation)",
        details: "If your account balance goes below zero due to market movements, we absorb the loss and reset your account to $0. You will never owe us money."
      },
      {
        clientType: "Professional Clients (Elective Pro Status)",
        protection: "No negative balance protection (regulatory exclusion)",
        details: "Professional clients who opt-in sacrifice negative balance protection in exchange for higher leverage. You may be liable for negative balances and must sign acknowledgment."
      },
      {
        clientType: "Institutional Clients",
        protection: "Negotiated terms based on credit agreement",
        details: "Institutional accounts operate under bespoke credit agreements with customized margin and liability terms."
      }
    ],
    conditions: [
      "NBP applies only to market-related losses during normal trading",
      "Does not cover negative balances from non-market fees (e.g., overnight financing, withdrawal fees)",
      "Client must not have engaged in abusive trading practices (bonus arbitrage, scalping errors, etc.)",
      "NBP reset processed within 24 hours of negative balance detection"
    ],
    examples: [
      {
        scenario: "Swiss Franc Flash Crash (Jan 2015 equivalent)",
        situation: "Client has $5,000 account, holding EUR/CHF position. Market gaps 2000 pips on SNB announcement.",
        outcome: "Without NBP: Client owes $12,000. With NBP: Account reset to $0, client owes nothing."
      },
      {
        scenario: "Weekend Gap on News Event",
        situation: "Client holds $2,000 position over weekend. Market opens 500 pips against them on Monday due to unexpected election result.",
        outcome: "Account goes to -$800. NBP triggers, balance reset to $0 within 24 hours."
      }
    ]
  };

  const faqs = [
    {
      question: "How do I know my funds are actually segregated?",
      answer: "We are legally required to segregate client funds and face severe penalties (license revocation, fines, criminal charges) for non-compliance. You can verify through: 1) Our quarterly segregation reports published on our website, 2) External audit reports by KPMG confirming segregation compliance, 3) Direct confirmation from regulators (FCA, CySEC) that segregation is verified during inspections. Additionally, our bank partners (Barclays, Deutsche Bank, NAB) provide confirmation that accounts are designated as 'Client Segregated Funds'."
    },
    {
      question: "What happens to my money if the broker goes bankrupt?",
      answer: "If we become insolvent, your segregated funds are protected through a 'statutory trust' (UK) or equivalent legal structure. Client money is not considered company assets and cannot be used to pay creditors. The process: 1) Regulator appoints a Special Administrator, 2) Client funds are identified and frozen, 3) Clients are contacted to claim funds, 4) Funds are returned directly from segregated accounts (typically within 3-6 months). If there's a shortfall due to fraud or mismanagement, compensation schemes (FSCS, ICF) cover up to their limits."
    },
    {
      question: "Is FSCS protection automatic or do I need to apply?",
      answer: "FSCS protection is automatic for all eligible clients of FCA-regulated firms. You don't need to register or pay anything. If we fail, the FSCS will automatically contact you using our client records. However, you must: 1) Trade with the UK entity (verify your account is under FRN 742681), 2) Be an eligible claimant (individuals, small businesses qualify; large corporates may not), 3) Submit a claim within 6 years if not auto-contacted. Keep records of your account statements as proof of funds."
    },
    {
      question: "What's the difference between segregation and compensation schemes?",
      answer: "Segregation is the first line of defense: your money is kept separate from company money in protected bank accounts. If the broker fails, segregated funds should be returned in full (no compensation needed). Compensation schemes (FSCS, ICF) are the second line of defense: they cover shortfalls if segregated funds are missing due to fraud, theft, or mismanagement. Think of segregation as preventing the problem, compensation schemes as insurance if prevention fails. Best case: segregation works, you get 100% back. Worst case: segregation failed, compensation scheme covers up to their limit (£85K FSCS, €20K ICF)."
    },
    {
      question: "Does negative balance protection mean I can't lose money trading?",
      answer: "No, you can still lose your entire account balance through normal trading losses. Negative Balance Protection (NBP) only prevents you from owing money beyond your deposited amount. Example: You deposit $1,000 and lose it all → You lose $1,000 (NBP doesn't help). You deposit $1,000, market gaps, account goes to -$500 → NBP resets to $0, you lose $1,000 but don't owe the extra $500. NBP protects from debt, not from losing your capital. Always trade responsibly with money you can afford to lose."
    },
    {
      question: "Why do some brokers offer higher compensation than others?",
      answer: "Compensation depends on which regulator oversees the entity you trade with, not the broker's choice. FCA (UK) offers £85,000 via FSCS, CySEC (Cyprus/EU) offers €20,000 via ICF, ASIC (Australia) has no compensation scheme but strong segregation laws. Many brokers operate multiple entities under different regulators. Check which entity holds your account: UK residents typically get FCA protection, EU residents get CySEC protection, etc. Some brokers also buy additional private insurance (we carry £5M professional indemnity), but this is not the same as statutory compensation schemes."
    },
    {
      question: "Can the broker use my segregated funds for anything?",
      answer: "Absolutely not. Segregated funds cannot be used for: company operations, paying creditors, hedging broker positions, earning interest for the company, or any other business purpose. The only permitted uses are: 1) Facilitating your trades (margin requirements), 2) Processing your withdrawals, 3) Paying charges you authorized (e.g., swap fees, commissions). Any unauthorized use is a criminal offense and grounds for immediate license revocation. Regulators audit this monthly, and external auditors verify quarterly. If you suspect misuse, report immediately to the regulator (FCA, CySEC, ASIC)."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-safety">Trust & Compliance</Badge>
            <h1 className="text-4xl font-bold mb-4">Safety of Funds</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your funds are protected through strict segregation, Tier-1 banking partners, statutory compensation schemes, and negative balance protection. We prioritize the security of your capital above all else.
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
          <Alert className="mb-12" data-testid="alert-segregation-notice">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Client Money Protection:</strong> All client funds are held in segregated accounts at Tier-1 banks, separate from company operational funds. Your money is protected by statutory compensation schemes up to regulatory limits.
            </AlertDescription>
          </Alert>

          {/* Segregation Explanation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Client Fund Segregation</h2>
            <Card className="mb-6" data-testid="card-segregation-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  How Your Funds Are Protected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{segregationDetails.overview}</p>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Segregation Process:</h3>
                  {segregationDetails.process.map((item, index) => (
                    <div key={index} className="flex gap-4" data-testid={`segregation-step-${index}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.step}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bank Partners */}
            <h3 className="text-xl font-bold mb-4">Our Banking Partners</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {segregationDetails.banks.map((bank, index) => (
                <Card key={index} data-testid={`card-bank-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{bank.name}</CardTitle>
                        <CardDescription>{bank.country}</CardDescription>
                      </div>
                      <Badge variant="outline">{bank.tier}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Account Type:</span>
                      <p className="font-medium">{bank.accountType}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Protection:</span>
                      <p className="font-medium">{bank.protection}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compensation Schemes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Compensation Schemes</h2>
            <div className="space-y-6">
              {compensationSchemes.map((scheme, index) => (
                <Card key={index} data-testid={`card-compensation-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{scheme.scheme}</CardTitle>
                        <CardDescription>{scheme.jurisdiction}</CardDescription>
                      </div>
                      <Badge className="ml-2">{scheme.coverage}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Eligibility Requirements:</h4>
                      <ul className="space-y-1">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-semibold">Claim Process: </span>
                        {scheme.claimProcess}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Negative Balance Protection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Negative Balance Protection</h2>
            <Card className="mb-6" data-testid="card-nbp-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  You'll Never Owe Us Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{negativeBalanceProtection.overview}</p>

                <div>
                  <h3 className="font-semibold mb-4">Protection by Client Type:</h3>
                  <div className="space-y-3">
                    {negativeBalanceProtection.coverage.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4" data-testid={`nbp-coverage-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{item.clientType}</h4>
                          <Badge variant={item.protection.includes('Full') ? 'default' : 'outline'}>
                            {item.protection.includes('Full') ? 'Protected' : 'Not Protected'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Important Conditions:</h3>
                  <ul className="space-y-2">
                    {negativeBalanceProtection.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Real-World Examples:</h3>
                  <div className="space-y-3">
                    {negativeBalanceProtection.examples.map((example, idx) => (
                      <div key={idx} className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">{example.scenario}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{example.situation}</p>
                        <p className="text-sm">
                          <span className="font-semibold">Outcome: </span>
                          {example.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warning Alert */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-warning">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>Important:</strong> While we provide multiple layers of fund protection, no investment is risk-free. You can lose your entire trading capital through market losses. Negative balance protection prevents debt, not capital loss. Never trade with money you cannot afford to lose.
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
