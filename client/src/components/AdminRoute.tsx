import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AdminRouteProps = {
  children: React.ReactNode;
};

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("accessToken");
    
    if (!token && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Still loading user data
  if (!user && localStorage.getItem("accessToken")) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Authenticated but not admin
  if (user.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>Access Denied</CardTitle>
            </div>
            <CardDescription>
              You do not have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This page is restricted to administrators only. If you believe you should have access, please contact support.
            </p>
            <Button 
              onClick={() => setLocation("/dashboard")} 
              className="w-full"
              data-testid="button-back-to-dashboard"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin user - allow access
  return <>{children}</>;
}
