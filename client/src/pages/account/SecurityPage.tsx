import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Shield, QrCode, Key } from "lucide-react";

export default function SecurityPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showQrCode, setShowQrCode] = useState(false);

  const enable2FAMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/2fa/setup", {});
    },
    onSuccess: (data) => {
      setShowQrCode(true);
      toast({
        title: "2FA Setup Started",
        description: "Scan the QR code with your authenticator app",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to setup 2FA",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const disable2FAMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/2fa/disable", {});
    },
    onSuccess: () => {
      setShowQrCode(false);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to disable 2FA",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <div className="font-medium">2FA Status</div>
              <div className="text-sm text-muted-foreground">
                {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
              </div>
            </div>
            <Button
              variant={user?.twoFactorEnabled ? "destructive" : "default"}
              onClick={() =>
                user?.twoFactorEnabled
                  ? disable2FAMutation.mutate()
                  : enable2FAMutation.mutate()
              }
              data-testid={user?.twoFactorEnabled ? "button-disable-2fa" : "button-enable-2fa"}
            >
              {user?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>

          {showQrCode && (
            <div className="space-y-4 rounded-md border p-4">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                <h3 className="font-medium">Setup Instructions</h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                <li>Scan the QR code below with your app</li>
                <li>Enter the 6-digit code to verify</li>
              </ol>
              <div className="flex justify-center p-4 bg-muted rounded-md">
                <div className="h-48 w-48 bg-background rounded-md flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    data-testid="input-2fa-verify"
                  />
                  <Button data-testid="button-verify-2fa">Verify</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password regularly for better security
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" data-testid="input-current-password" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" data-testid="input-new-password" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" data-testid="input-confirm-password" />
          </div>
          <Button data-testid="button-change-password">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
