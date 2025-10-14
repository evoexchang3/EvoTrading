import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import AboutPage from "@/pages/AboutPage";
import FAQPage from "@/pages/FAQPage";
import EducationPage from "@/pages/EducationPage";
import ContactPage from "@/pages/ContactPage";
import PartnersPage from "@/pages/PartnersPage";
import TermsPage from "@/pages/legal/TermsPage";
import PrivacyPage from "@/pages/legal/PrivacyPage";
import AMLPage from "@/pages/legal/AMLPage";
import RiskPage from "@/pages/legal/RiskPage";
import CookiesPage from "@/pages/legal/CookiesPage";
import DashboardPage from "@/pages/DashboardPage";
import TradingPage from "@/pages/TradingPage";
import DepositsPage from "@/pages/funding/DepositsPage";
import WithdrawalsPage from "@/pages/funding/WithdrawalsPage";
import ProfilePage from "@/pages/account/ProfilePage";
import SecurityPage from "@/pages/account/SecurityPage";
import KYCPage from "@/pages/account/KYCPage";
import SettingsPage from "@/pages/SettingsPage";
import { CookieConsent } from "@/components/CookieConsent";

function AppRoutes() {
  return (
    <>
      <CookieConsent />
      <Switch>
      {/* Public Landing Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/partners" component={PartnersPage} />
      
      {/* Legal Pages */}
      <Route path="/legal/terms" component={TermsPage} />
      <Route path="/legal/privacy" component={PrivacyPage} />
      <Route path="/legal/aml" component={AMLPage} />
      <Route path="/legal/risk" component={RiskPage} />
      <Route path="/legal/cookies" component={CookiesPage} />

      {/* Auth Routes */}
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />

      {/* Protected Routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/trading/:symbol?">
        {(params) => (
          <ProtectedRoute>
            <TradingPage symbol={params.symbol} />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/deposits">
        <ProtectedRoute>
          <DashboardLayout>
            <DepositsPage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/withdrawals">
        <ProtectedRoute>
          <DashboardLayout>
            <WithdrawalsPage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/profile">
        <ProtectedRoute>
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/settings">
        <ProtectedRoute>
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/kyc">
        <ProtectedRoute>
          <DashboardLayout>
            <KYCPage />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* 404 Fallback */}
      <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Router>
              <Toaster />
              <AppRoutes />
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
