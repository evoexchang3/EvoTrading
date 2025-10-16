import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Info, 
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileCheck,
  Smartphone,
  Globe,
  Database,
  ShieldCheck
} from "lucide-react";

export default function SecurityPage() {
  const stats = [
    {
      label: "Encryption Level",
      value: "AES-256",
      description: "Military-grade encryption",
      icon: Lock,
      testId: "stat-encryption"
    },
    {
      label: "2FA Users",
      value: "87%",
      description: "Clients using 2FA",
      icon: Smartphone,
      testId: "stat-2fa"
    },
    {
      label: "Security Audits",
      value: "4/year",
      description: "Independent assessments",
      icon: FileCheck,
      testId: "stat-audits"
    },
    {
      label: "Data Centers",
      value: "5",
      description: "Geo-redundant locations",
      icon: Server,
      testId: "stat-datacenters"
    }
  ];

  const securityMeasures = [
    {
      title: "SSL/TLS Encryption",
      icon: Lock,
      description: "All data transmitted between your device and our servers is protected by industry-standard encryption",
      details: [
        {
          feature: "TLS 1.3 Protocol",
          description: "Latest encryption standard for all web and API connections, protecting data in transit from interception"
        },
        {
          feature: "Perfect Forward Secrecy (PFS)",
          description: "Session keys cannot be compromised even if long-term keys are exposed in the future"
        },
        {
          feature: "Certificate Pinning",
          description: "Mobile apps verify server identity to prevent man-in-the-middle attacks"
        },
        {
          feature: "HSTS Enabled",
          description: "HTTP Strict Transport Security forces encrypted connections, preventing downgrade attacks"
        }
      ]
    },
    {
      title: "Two-Factor Authentication (2FA)",
      icon: Smartphone,
      description: "Add an extra layer of security beyond passwords to protect your account from unauthorized access",
      details: [
        {
          feature: "App-Based Authenticators",
          description: "Support for Google Authenticator, Authy, and Microsoft Authenticator (TOTP-based, more secure than SMS)"
        },
        {
          feature: "SMS Backup Codes",
          description: "Receive one-time codes via SMS as a fallback (available but app-based is recommended)"
        },
        {
          feature: "Hardware Security Keys",
          description: "YubiKey and FIDO2-compliant devices supported for maximum protection against phishing"
        },
        {
          feature: "Biometric Login (Mobile)",
          description: "Face ID and fingerprint authentication on mobile apps for convenient yet secure access"
        }
      ]
    },
    {
      title: "Data Encryption at Rest",
      icon: Database,
      description: "Your sensitive data is encrypted even when stored on our servers, protecting against database breaches",
      details: [
        {
          feature: "AES-256 Encryption",
          description: "All client data, including personal information and trading history, encrypted using military-grade AES-256"
        },
        {
          feature: "Encrypted Database Fields",
          description: "Sensitive fields (e.g., ID numbers, addresses, bank details) individually encrypted with unique keys"
        },
        {
          feature: "Key Management System (KMS)",
          description: "Encryption keys stored separately from data using AWS KMS with automatic rotation every 90 days"
        },
        {
          feature: "Encrypted Backups",
          description: "All database backups encrypted before storage and geographically distributed across secure facilities"
        }
      ]
    },
    {
      title: "Advanced Threat Protection",
      icon: Shield,
      description: "Multi-layered security infrastructure to detect and prevent cyber attacks in real-time",
      details: [
        {
          feature: "Web Application Firewall (WAF)",
          description: "Cloudflare Enterprise WAF blocks SQL injection, XSS, and other OWASP Top 10 attacks"
        },
        {
          feature: "DDoS Mitigation",
          description: "Automatic detection and mitigation of distributed denial-of-service attacks up to 100 Gbps"
        },
        {
          feature: "Intrusion Detection System (IDS)",
          description: "24/7 monitoring for suspicious network activity with automated blocking of malicious IPs"
        },
        {
          feature: "Rate Limiting & Anti-Bot",
          description: "API rate limits, CAPTCHA challenges, and behavioral analysis to prevent automated attacks"
        }
      ]
    }
  ];

  const dataProtection = [
    {
      title: "GDPR Compliance (EU)",
      description: "Full compliance with European General Data Protection Regulation",
      measures: [
        "Data Protection Officer (DPO) appointed: dpo@example-broker.com",
        "Right to access your data within 30 days of request",
        "Right to rectification, erasure ('right to be forgotten'), and data portability",
        "Privacy by design: minimal data collection, purpose limitation, storage limitation",
        "Data Processing Agreements (DPA) with all third-party processors",
        "Annual Data Protection Impact Assessments (DPIA) for high-risk processing",
        "Breach notification to authorities within 72 hours if required"
      ]
    },
    {
      title: "Data Handling & Retention",
      description: "Strict policies governing how your data is collected, used, and retained",
      measures: [
        "Data minimization: Only collect data necessary for service provision and regulatory compliance",
        "Purpose limitation: Data used only for stated purposes (trading, compliance, customer service)",
        "Retention policy: Financial records 7 years (regulatory), KYC documents 5 years, marketing data until consent withdrawn",
        "Secure deletion: Data permanently deleted (not just archived) after retention period using DOD 5220.22-M standard",
        "Cross-border transfers: EU-US Data Privacy Framework certified for transatlantic data flows",
        "Third-party sharing: Only with explicit consent or regulatory requirement (never sold to marketers)"
      ]
    },
    {
      title: "Privacy & Access Controls",
      description: "Who can access your data and how it's protected internally",
      measures: [
        "Role-Based Access Control (RBAC): Employees see only data needed for their role",
        "Principle of Least Privilege: Default deny, access granted only when necessary",
        "Multi-Factor Authentication (MFA) for all employee accounts",
        "Access logging and audit trails: All data access recorded and reviewed quarterly",
        "Background checks and NDA for all employees with data access",
        "Annual security awareness training for all staff"
      ]
    }
  ];

  const userResponsibilities = [
    {
      practice: "Use Strong, Unique Passwords",
      description: "Create complex passwords with 12+ characters, mixing uppercase, lowercase, numbers, and symbols. Never reuse passwords across sites.",
      tips: [
        "Use a password manager (e.g., Bitwarden, 1Password) to generate and store unique passwords",
        "Avoid personal information (names, birthdays) in passwords",
        "Change password immediately if you suspect compromise",
        "Never share your password with anyone, including support staff (we'll never ask for it)"
      ]
    },
    {
      practice: "Enable Two-Factor Authentication (2FA)",
      description: "Always enable 2FA on your trading account. App-based authenticators (Google Authenticator, Authy) are more secure than SMS.",
      tips: [
        "Set up 2FA immediately after account creation",
        "Save backup codes in a secure location (offline, not in email)",
        "If changing phones, disable 2FA on old device and re-enable on new one",
        "Avoid SMS 2FA if possible due to SIM-swapping attacks"
      ]
    },
    {
      practice: "Beware of Phishing Attempts",
      description: "Be vigilant against fake emails, SMS, or calls pretending to be from us. We'll never ask for your password or 2FA codes.",
      tips: [
        "Check sender email address carefully (genuine emails only from @example-broker.com)",
        "Hover over links before clicking to verify destination URL",
        "Don't click links in unsolicited emails - go directly to our website instead",
        "Report suspicious emails to security@example-broker.com",
        "We'll never ask for passwords, 2FA codes, or remote access to your device"
      ]
    },
    {
      practice: "Secure Your Devices",
      description: "Keep your computer, phone, and tablet secure as they're gateways to your trading account.",
      tips: [
        "Keep operating systems and browsers updated with latest security patches",
        "Use antivirus/anti-malware software on all devices",
        "Avoid public Wi-Fi for trading; use VPN if necessary",
        "Enable device encryption (FileVault on Mac, BitLocker on Windows)",
        "Lock devices when not in use and use biometric authentication when available"
      ]
    },
    {
      practice: "Monitor Account Activity",
      description: "Regularly review your account for any unauthorized activity or suspicious transactions.",
      tips: [
        "Enable email/SMS notifications for logins, trades, and withdrawals",
        "Check 'Recent Activity' in your account dashboard weekly",
        "Review trade history and transaction records monthly",
        "Report any unrecognized activity immediately to security@example-broker.com",
        "Set up withdrawal whitelist (only allow withdrawals to pre-approved bank accounts)"
      ]
    },
    {
      practice: "Be Cautious with Third-Party Apps",
      description: "Only use trusted trading bots, signals, or tools. Never give third parties your login credentials.",
      tips: [
        "Use API keys instead of passwords for third-party integrations",
        "Review and revoke API access regularly (Settings > API Management)",
        "Set read-only permissions on API keys when full access isn't needed",
        "Avoid 'account management' services that ask for your password",
        "Research third-party vendors thoroughly before granting access"
      ]
    }
  ];

  const faqs = [
    {
      question: "How secure is my money on your platform?",
      answer: "Your funds are protected through multiple layers: 1) Segregated accounts at Tier-1 banks (your money never mixes with company funds), 2) AES-256 encryption for all data at rest and TLS 1.3 for data in transit, 3) Two-factor authentication (2FA) to prevent unauthorized account access, 4) Regular security audits by independent firms (KPMG, BSI Group), 5) Statutory compensation schemes (FSCS, ICF) up to regulatory limits if the broker fails. Additionally, we're ISO 27001 certified for information security management, demonstrating compliance with international security standards."
    },
    {
      question: "What should I do if I suspect my account has been hacked?",
      answer: "Take immediate action: 1) Change your password immediately via 'Forgot Password' (don't log in with potentially compromised credentials), 2) Contact our security team at security@example-broker.com or call +44 20 7946 0961, 3) We'll temporarily freeze your account to prevent unauthorized trades/withdrawals, 4) Review recent account activity and report any suspicious trades or transactions, 5) Enable 2FA if not already active, 6) Check your email account security (hackers may have accessed your email first). We'll investigate, reverse any fraudulent transactions, and restore your account. If funds were withdrawn, we'll work with banks and law enforcement to recover them."
    },
    {
      question: "Is two-factor authentication (2FA) really necessary?",
      answer: "Absolutely. 2FA reduces account takeover risk by over 99%. Even if someone steals your password (via phishing, data breach, keylogger), they can't access your account without the second factor (authenticator app code, hardware key). We strongly recommend app-based 2FA (Google Authenticator, Authy) over SMS because SIM-swapping attacks can intercept SMS codes. For high-value accounts ($50K+), consider hardware security keys (YubiKey) for maximum protection. 87% of our clients use 2FA, and accounts without 2FA are 40x more likely to be compromised."
    },
    {
      question: "How do I spot a phishing attempt?",
      answer: "Red flags include: 1) Sender email not from @example-broker.com (e.g., @examp1e-broker.com with a '1'), 2) Urgent language pressuring immediate action ('Your account will be closed!'), 3) Requests for passwords, 2FA codes, or remote access, 4) Suspicious links (hover to see real URL before clicking), 5) Generic greetings ('Dear Customer' instead of your name), 6) Poor grammar or spelling errors. We will NEVER ask for your password or 2FA codes via email, phone, or chat. When in doubt, don't click links - go directly to our website by typing the URL. Report suspicious emails to security@example-broker.com."
    },
    {
      question: "What happens to my data if I close my account?",
      answer: "Your data is retained according to regulatory and legal requirements: Financial transaction records are kept for 7 years (required by FCA/AML regulations), KYC/identity documents for 5 years after account closure, Marketing communications deleted immediately upon account closure or consent withdrawal. After retention periods expire, data is securely deleted using DOD 5220.22-M erasure standards (data overwritten multiple times, unrecoverable). You can request a copy of your data before closure (data portability right under GDPR). Note: We cannot delete data still required for regulatory compliance, ongoing investigations, or legal disputes."
    },
    {
      question: "Do you share my data with third parties?",
      answer: "We share data only when necessary and with your consent or legal obligation: 1) Service providers (payment processors, ID verification, cloud hosting) under strict Data Processing Agreements (GDPR-compliant), 2) Regulators (FCA, CySEC, ASIC) when required by law, 3) Law enforcement with valid court orders or for fraud investigation, 4) Credit reference agencies for creditworthiness checks (professional accounts only). We NEVER sell your data to marketers or unrelated third parties. All sharing is logged and auditable. You can request a 'data sharing report' showing who accessed your data in the last 12 months (contact dpo@example-broker.com)."
    },
    {
      question: "How often do you conduct security audits?",
      answer: "We undergo multiple independent security assessments annually: 1) ISO 27001 audit by BSI Group (bi-annual) covering information security management systems, 2) Penetration testing by certified ethical hackers (quarterly) attempting to breach our systems, 3) Vulnerability scanning (monthly) using automated tools to identify security weaknesses, 4) Code security reviews (before every major release) checking for vulnerabilities like SQL injection, XSS, 5) Third-party security assessments by KPMG (annual) as part of financial audit. All critical vulnerabilities are patched within 24 hours. Audit summaries (non-sensitive parts) are published in our annual compliance report."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-security">Trust & Compliance</Badge>
            <h1 className="text-4xl font-bold mb-4">Security & Data Protection</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your security is our top priority. We employ military-grade encryption, multi-factor authentication, and regular security audits to protect your data and funds. We're fully compliant with GDPR and international data protection standards.
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
          <Alert className="mb-12" data-testid="alert-security-notice">
            <ShieldCheck className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Certified:</strong> We are ISO 27001 certified and undergo quarterly penetration testing by independent security firms. Your data is protected by bank-level security measures.
            </AlertDescription>
          </Alert>

          {/* Security Measures */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Security Measures</h2>
            <div className="space-y-6">
              {securityMeasures.map((measure, index) => (
                <Card key={index} data-testid={`card-measure-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <measure.icon className="w-5 h-5 text-primary" />
                      </div>
                      {measure.title}
                    </CardTitle>
                    <CardDescription>{measure.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {measure.details.map((detail, idx) => (
                        <div key={idx} className="border-l-2 border-primary/30 pl-4">
                          <h4 className="font-semibold text-sm mb-1">{detail.feature}</h4>
                          <p className="text-sm text-muted-foreground">{detail.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Protection Compliance */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Data Protection Compliance</h2>
            <div className="space-y-6">
              {dataProtection.map((section, index) => (
                <Card key={index} data-testid={`card-protection-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-primary" />
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* User Security Practices */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Security Responsibilities</h2>
            <p className="text-muted-foreground mb-6">
              While we provide robust security infrastructure, your actions play a crucial role in protecting your account. Follow these best practices to maintain maximum security.
            </p>
            <div className="space-y-6">
              {userResponsibilities.map((practice, index) => (
                <Card key={index} data-testid={`card-practice-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      {practice.practice}
                    </CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {practice.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Contact */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-report">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span><strong>Report Security Issues:</strong> If you discover a security vulnerability or suspect unauthorized account access, contact us immediately at security@example-broker.com or call +44 20 7946 0961.</span>
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
