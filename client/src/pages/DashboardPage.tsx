import { useQuery } from "@tanstack/react-query";
import { useVariant } from "@/layouts/shared/useVariant";
import { DashboardRenderer } from "./dashboard/DashboardRenderer";
import type { Client, Account } from "@shared/schema";

export default function DashboardPage() {
  const variant = useVariant();
  
  const { data: client, isLoading: clientLoading } = useQuery<Client>({
    queryKey: ["/api/auth/me"],
  });

  const { data: account, isLoading: accountLoading } = useQuery<Account>({
    queryKey: ["/api/account"],
  });

  const { data: preferences } = useQuery<{ displayCurrency?: string }>({
    queryKey: ["/api/preferences"],
  });

  const displayCurrency = preferences?.displayCurrency || 'USD';
  const isLoading = clientLoading || accountLoading;

  return (
    <DashboardRenderer 
      client={client}
      account={account}
      displayCurrency={displayCurrency}
      isLoading={isLoading}
      variantId={variant.id}
    />
  );
}
