import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Camera, CheckCircle2, Clock } from "lucide-react";

export default function VerificationPage() {
  const steps = [
    {
      number: 1,
      title: "Personal Information",
      description: "Provide your full name, date of birth, address, and contact details",
      icon: FileText,
      time: "2-3 minutes"
    },
    {
      number: 2,
      title: "Identity Verification",
      description: "Upload a clear photo of your government-issued ID (passport, driver's license, or national ID card)",
      icon: Camera,
      time: "5 minutes"
    },
    {
      number: 3,
      title: "Proof of Address",
      description: "Submit a recent utility bill, bank statement, or government document showing your current address (dated within last 3 months)",
      icon: FileText,
      time: "5 minutes"
    },
    {
      number: 4,
      title: "Review & Approval",
      description: "Our compliance team reviews your documents",
      icon: CheckCircle2,
      time: "24-48 hours"
    }
  ];

  const requirements = {
    identityDocuments: [
      "Passport (bio-data page)",
      "National ID card (both sides)",
      "Driver's license (both sides)"
    ],
    proofOfAddress: [
      "Utility bill (electricity, water, gas)",
      "Bank statement",
      "Government correspondence",
      "Credit card statement"
    ],
    photoGuidelines: [
      "Document must be in color",
      "All corners of the document must be visible",
      "Text and photo must be clearly readable",
      "No glare or shadows on the document",
      "File format: JPG, PNG, or PDF",
      "Maximum file size: 10MB"
    ]
  };

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Account Verification (KYC)</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Know Your Customer (KYC) verification is required to protect your account and comply with financial regulations. The process is simple and typically completed within 48 hours.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Verification Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.number} data-testid={`card-step-${step.number}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {step.number}
                        </div>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{step.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Accepted Identity Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {requirements.identityDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accepted Proof of Address</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {requirements.proofOfAddress.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  * Document must be dated within the last 3 months
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Photo Upload Guidelines</CardTitle>
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
            </CardContent>
          </Card>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Why Verification is Required</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
                <p className="text-muted-foreground">
                  Financial regulations require us to verify the identity of all clients to prevent money laundering and fraud.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <p className="text-muted-foreground">
                  Verification protects your account from unauthorized access and ensures only you can withdraw funds.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Higher Limits</h3>
                <p className="text-muted-foreground">
                  Verified accounts enjoy higher deposit limits, faster withdrawals, and access to premium features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
