import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Camera, CheckCircle2, Clock, HelpCircle, ArrowRight, AlertTriangle, Shield, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VerificationPage() {
  const steps = [
    {
      number: 1,
      title: "Personal Information",
      description: "Provide your full name, date of birth, address, and contact details",
      icon: FileText,
      time: "2-3 minutes",
      details: "Enter your legal name exactly as it appears on your ID. Provide current residential address and contact information."
    },
    {
      number: 2,
      title: "Identity Verification",
      description: "Upload a clear photo of your government-issued ID",
      icon: Camera,
      time: "5 minutes",
      details: "Accepted: Passport, driver's license, or national ID card. Ensure all text is readable and photo is clear."
    },
    {
      number: 3,
      title: "Proof of Address",
      description: "Submit a recent utility bill, bank statement, or government document",
      icon: FileText,
      time: "5 minutes",
      details: "Document must show your name and current address, dated within the last 3 months."
    },
    {
      number: 4,
      title: "Review & Approval",
      description: "Our compliance team reviews your documents",
      icon: CheckCircle2,
      time: "24-48 hours",
      details: "We verify all documents for authenticity and accuracy. You'll receive email confirmation once approved."
    }
  ];

  const requirements = {
    identityDocuments: [
      { name: "Passport (bio-data page)", accepted: true, note: "Most commonly accepted" },
      { name: "National ID card (both sides)", accepted: true, note: "Must be valid" },
      { name: "Driver's license (both sides)", accepted: true, note: "Government-issued only" },
      { name: "Military ID", accepted: true, note: "Active military only" }
    ],
    proofOfAddress: [
      { name: "Utility bill (electricity, water, gas)", accepted: true, note: "Last 3 months" },
      { name: "Bank statement", accepted: true, note: "Last 3 months" },
      { name: "Government correspondence", accepted: true, note: "Tax office, council" },
      { name: "Credit card statement", accepted: true, note: "Last 3 months" },
      { name: "Rental agreement", accepted: true, note: "Signed and current" },
      { name: "Mortgage statement", accepted: true, note: "Last 3 months" }
    ],
    photoGuidelines: [
      "Document must be in color (no black & white)",
      "All four corners of the document must be visible",
      "Text and photo must be clearly readable",
      "No glare or shadows covering information",
      "File format: JPG, PNG, or PDF only",
      "Maximum file size: 10MB per document",
      "Minimum resolution: 300 DPI recommended",
      "No screenshots or photocopies (original photos only)"
    ]
  };

  const commonIssues = [
    {
      issue: "Document Expired",
      solution: "Ensure your ID is current and not expired. Renew your ID if necessary before submitting.",
      prevention: "Check expiration dates before uploading"
    },
    {
      issue: "Poor Image Quality",
      solution: "Retake photos in good lighting. Avoid glare, shadows, and blur. Use a high-resolution camera.",
      prevention: "Take photos in natural daylight against a dark background"
    },
    {
      issue: "Address Mismatch",
      solution: "Ensure the address on your proof of address document exactly matches the address you provided during registration.",
      prevention: "Double-check your registration address before uploading documents"
    },
    {
      issue: "Document Too Old",
      solution: "Proof of address must be dated within the last 3 months. Submit a more recent document.",
      prevention: "Check the document date before uploading"
    },
    {
      issue: "Missing Pages",
      solution: "Upload both sides of ID cards and driver's licenses. Include all relevant pages of bank statements.",
      prevention: "Review the upload checklist before submitting"
    }
  ];

  const faqs = [
    {
      question: "Why is account verification required?",
      answer: "Account verification (KYC - Know Your Customer) is a legal requirement for all financial service providers. It prevents money laundering, fraud, and identity theft. Verification also protects your account by ensuring only you can withdraw funds. Additionally, it allows us to comply with international financial regulations and maintain our licenses."
    },
    {
      question: "How long does the verification process take?",
      answer: "Most verifications are completed within 24-48 hours during business days. Simple cases may be approved in as little as 2-4 hours. Complex cases requiring additional documentation can take up to 5 business days. VIP account applications may require enhanced due diligence taking 3-7 business days. You'll receive email notifications at each stage."
    },
    {
      question: "Can I trade before my account is verified?",
      answer: "Yes, you can deposit funds and start trading before verification is complete. However, you cannot withdraw funds until your account is fully verified. We recommend completing verification immediately after registration to avoid withdrawal delays. Some features like higher leverage and increased limits also require verified status."
    },
    {
      question: "What if my documents are rejected?",
      answer: "If documents are rejected, you'll receive an email explaining the specific reasons. Common reasons include poor image quality, expired documents, or address mismatches. You can immediately resubmit corrected documents. Our support team is available 24/5 to help you resolve any verification issues. Most rejections are resolved within 24 hours of resubmission."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. All documents are transmitted using bank-grade 256-bit SSL encryption. We store documents in secure, encrypted servers with restricted access. Our systems are regularly audited for security compliance. We comply with GDPR, CCPA, and other data protection regulations. Your information is never shared with third parties except as required by law or regulation."
    },
    {
      question: "Do I need to verify again if I change my address?",
      answer: "Yes, if you change your residential address, you must update your account information and provide new proof of address. This ensures accurate records and compliance. The process is the same as initial verification: upload a recent utility bill or bank statement showing your new address. Updates are typically processed within 24 hours."
    },
    {
      question: "Can someone else verify the account on my behalf?",
      answer: "No, you must verify your own account using your own documents. Third-party verification is not permitted due to regulatory requirements. For corporate accounts, authorized signatories and beneficial owners must provide their own documentation. We may require additional corporate documentation including certificates of incorporation and board resolutions."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-verification">Customer Information</Badge>
            <h1 className="text-4xl font-bold mb-4">Account Verification (KYC)</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Know Your Customer (KYC) verification is a simple, secure process that protects your account and ensures compliance with financial regulations. Most accounts are verified within 24-48 hours.
            </p>
          </div>

          {/* Timeline Progress */}
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">Verification Timeline</h2>
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                      {step.number}
                    </div>
                    <p className="text-xs text-center font-medium max-w-[100px]">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-border mx-2 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Verification Process Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.number} data-testid={`card-step-${step.number}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {step.number}
                        </div>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{step.details}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Clock className="w-4 h-4" />
                        <span>Estimated time: {step.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Document Requirements */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <CardTitle>Accepted Identity Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.identityDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover-elevate">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <CardTitle>Accepted Proof of Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.proofOfAddress.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover-elevate">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    All proof of address documents must be dated within the last 3 months
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Photo Guidelines */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                <CardTitle>Document Photo Upload Guidelines</CardTitle>
              </div>
              <CardDescription>Follow these guidelines to ensure quick approval</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-3">
                {requirements.photoGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{guideline}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Pro Tips for Perfect Document Photos
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use your phone camera in a well-lit room (natural daylight is best)</li>
                  <li>• Place the document on a dark, contrasting surface</li>
                  <li>• Hold the camera directly above the document, parallel to it</li>
                  <li>• Ensure all corners are visible with a small margin around the edges</li>
                  <li>• Review the photo before uploading - zoom in to check text clarity</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues & Solutions */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle>Common Verification Issues & Solutions</CardTitle>
              </div>
              <CardDescription>Avoid delays by preventing these common mistakes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonIssues.map((item, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                    <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{item.issue}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Solution:</strong> {item.solution}
                    </p>
                    <p className="text-sm text-primary">
                      <strong>Prevention:</strong> {item.prevention}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why Verification */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Financial regulations require us to verify the identity of all clients to prevent money laundering, terrorist financing, and fraud. We're licensed and regulated in multiple jurisdictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Account Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verification protects your account from unauthorized access and ensures only you can withdraw funds. It's an essential security measure that safeguards your assets and personal information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Enhanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verified accounts enjoy higher deposit limits, faster withdrawals, access to premium features, increased leverage options, and eligibility for promotional offers and bonuses.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
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

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Start Your Verification Now</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Complete your KYC verification in less than 15 minutes. Have your ID and proof of address ready, and you'll be approved within 24-48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-start-verification">
                Begin Verification
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-contact-support">
                Contact Support
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ Secure & encrypted</span>
              <span>✓ 24-48 hour approval</span>
              <span>✓ No hidden requirements</span>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
