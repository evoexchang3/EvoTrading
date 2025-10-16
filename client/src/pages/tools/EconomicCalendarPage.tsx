import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EconomicCalendarPage() {
  const [filter, setFilter] = useState("all");

  const events = [
    {
      time: "09:30",
      currency: "USD",
      event: "Non-Farm Payrolls",
      impact: "high",
      forecast: "185K",
      previous: "209K",
      actual: null
    },
    {
      time: "10:00",
      currency: "EUR",
      event: "ECB Interest Rate Decision",
      impact: "high",
      forecast: "4.50%",
      previous: "4.50%",
      actual: null
    },
    {
      time: "13:30",
      currency: "GBP",
      event: "GDP Growth Rate",
      impact: "medium",
      forecast: "0.2%",
      previous: "0.1%",
      actual: null
    },
    {
      time: "14:00",
      currency: "USD",
      event: "Consumer Confidence Index",
      impact: "medium",
      forecast: "102.5",
      previous: "101.3",
      actual: null
    },
    {
      time: "15:00",
      currency: "CAD",
      event: "Employment Change",
      impact: "medium",
      forecast: "22K",
      previous: "18K",
      actual: null
    },
    {
      time: "16:00",
      currency: "JPY",
      event: "BOJ Policy Statement",
      impact: "high",
      forecast: "-",
      previous: "-",
      actual: null
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high": return <TrendingUp className="w-3 h-3" />;
      case "medium": return <Minus className="w-3 h-3" />;
      case "low": return <TrendingDown className="w-3 h-3" />;
      default: return null;
    }
  };

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(e => e.impact === filter);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Economic Calendar</h1>
            <p className="text-muted-foreground">Track important economic events that impact markets</p>
          </div>
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="flex gap-4 items-center">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]" data-testid="select-impact-filter">
              <SelectValue placeholder="Filter by impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="high">High Impact</SelectItem>
              <SelectItem value="medium">Medium Impact</SelectItem>
              <SelectItem value="low">Low Impact</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Badge variant="destructive" className="gap-1">
              <TrendingUp className="w-3 h-3" />
              High Impact
            </Badge>
            <Badge variant="default" className="gap-1">
              <Minus className="w-3 h-3" />
              Medium Impact
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <TrendingDown className="w-3 h-3" />
              Low Impact
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Economic Events</CardTitle>
            <CardDescription>All times in your local timezone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 rounded-lg border hover-elevate"
                  data-testid={`event-${index}`}
                >
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono font-semibold">{event.time}</span>
                  </div>
                  
                  <Badge variant="outline" className="font-mono min-w-[50px] justify-center">
                    {event.currency}
                  </Badge>
                  
                  <div className="flex-1">
                    <p className="font-semibold">{event.event}</p>
                  </div>
                  
                  <Badge variant={getImpactColor(event.impact)} className="gap-1 min-w-[100px] justify-center">
                    {getImpactIcon(event.impact)}
                    {event.impact}
                  </Badge>
                  
                  <div className="grid grid-cols-3 gap-4 min-w-[300px] text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Forecast</p>
                      <p className="font-semibold">{event.forecast}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Previous</p>
                      <p className="font-semibold">{event.previous}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Actual</p>
                      <p className="font-semibold">{event.actual || "-"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">How to use the Economic Calendar</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• High impact events typically cause significant market volatility</li>
            <li>• Compare forecast vs actual values - large deviations often trigger sharp price movements</li>
            <li>• Plan your trades around major events to avoid unexpected volatility</li>
            <li>• Events are updated in real-time as data is released</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
