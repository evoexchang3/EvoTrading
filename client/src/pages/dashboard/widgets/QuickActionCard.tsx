import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon?: LucideIcon;
  variant?: 'default' | 'outline';
  testId?: string;
}

export function QuickActionCard({ 
  title, 
  description, 
  buttonLabel, 
  href, 
  icon: Icon,
  variant = 'default',
  testId 
}: QuickActionCardProps) {
  return (
    <Card className="hover-elevate transition-all">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button variant={variant} className="w-full" data-testid={testId}>
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {buttonLabel}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
