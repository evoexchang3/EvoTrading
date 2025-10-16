import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function TradingSessionsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    {
      name: "Sydney",
      timezone: "Australia/Sydney",
      open: 21,
      close: 6,
      color: "bg-blue-500"
    },
    {
      name: "Tokyo",
      timezone: "Asia/Tokyo",
      open: 23,
      close: 8,
      color: "bg-red-500"
    },
    {
      name: "London",
      timezone: "Europe/London",
      open: 7,
      close: 16,
      color: "bg-green-500"
    },
    {
      name: "New York",
      timezone: "America/New_York",
      open: 12,
      close: 21,
      color: "bg-yellow-500"
    }
  ];

  const isSessionOpen = (session: typeof sessions[0]) => {
    const hour = currentTime.getUTCHours();
    if (session.close > session.open) {
      return hour >= session.open && hour < session.close;
    } else {
      return hour >= session.open || hour < session.close;
    }
  };

  const getSessionProgress = (session: typeof sessions[0]) => {
    const hour = currentTime.getUTCHours();
    const minute = currentTime.getUTCMinutes();
    const currentMinutes = hour * 60 + minute;
    
    let openMinutes = session.open * 60;
    let closeMinutes = session.close * 60;
    
    if (closeMinutes < openMinutes) {
      closeMinutes += 24 * 60;
    }
    
    let adjustedCurrent = currentMinutes;
    if (currentMinutes < openMinutes && closeMinutes > 24 * 60) {
      adjustedCurrent += 24 * 60;
    }
    
    if (adjustedCurrent < openMinutes || adjustedCurrent >= closeMinutes) {
      return 0;
    }
    
    const progress = ((adjustedCurrent - openMinutes) / (closeMinutes - openMinutes)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trading Sessions</h1>
            <p className="text-muted-foreground">Monitor global market hours and liquidity</p>
          </div>
          <Globe className="w-8 h-8 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Time (UTC)</CardTitle>
                <CardDescription>All times displayed in UTC timezone</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-2xl font-mono font-bold" data-testid="text-utc-time">
                  {currentTime.toUTCString().split(' ')[4]}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4">
          {sessions.map((session) => {
            const isOpen = isSessionOpen(session);
            const progress = getSessionProgress(session);
            
            return (
              <Card key={session.name} data-testid={`card-session-${session.name.toLowerCase()}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${session.color} ${isOpen ? 'animate-pulse' : 'opacity-30'}`} />
                      <div>
                        <CardTitle>{session.name}</CardTitle>
                        <CardDescription>
                          {String(session.open).padStart(2, '0')}:00 - {String(session.close).padStart(2, '0')}:00 UTC
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={isOpen ? "default" : "secondary"} data-testid={`badge-status-${session.name.toLowerCase()}`}>
                      {isOpen ? "OPEN" : "CLOSED"}
                    </Badge>
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Session Progress</span>
                        <span className="font-semibold">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${session.color} transition-all duration-1000`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Overlap Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">London/New York Overlap</h3>
              <p className="text-sm text-muted-foreground mb-2">12:00 - 16:00 UTC</p>
              <p className="text-sm">Highest liquidity period with major EUR/USD and GBP/USD movements. Best time for trading major forex pairs.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Tokyo/London Overlap</h3>
              <p className="text-sm text-muted-foreground mb-2">07:00 - 08:00 UTC</p>
              <p className="text-sm">Moderate liquidity with focus on EUR/JPY and GBP/JPY pairs. Good for yen cross trading.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Sydney/Tokyo Overlap</h3>
              <p className="text-sm text-muted-foreground mb-2">23:00 - 06:00 UTC</p>
              <p className="text-sm">Lower liquidity period ideal for AUD/JPY and NZD/JPY trading with tighter spreads.</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Trading Tips by Session</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Asian session (Sydney/Tokyo): Lower volatility, good for ranging strategies</li>
            <li>• European session (London): High volatility start, trend trading opportunities</li>
            <li>• US session (New York): Major news releases, strong directional moves</li>
            <li>• Session overlaps offer highest liquidity and tighter spreads</li>
            <li>• Avoid trading during low liquidity periods (late NY / early Sydney)</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
