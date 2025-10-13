import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4" data-testid="cookie-consent-banner">
      <Card className="container mx-auto max-w-5xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
              By clicking "Accept", you consent to our use of cookies.{" "}
              <Link href="/legal/cookies">
                <span className="text-primary hover:underline cursor-pointer">
                  Learn more
                </span>
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              data-testid="button-decline-cookies"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              data-testid="button-accept-cookies"
            >
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
