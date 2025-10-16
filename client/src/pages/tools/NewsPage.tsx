import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewsPage() {
  const [category, setCategory] = useState("all");

  const newsItems = [
    {
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      source: "Reuters",
      category: "central-banks",
      time: "2 hours ago",
      impact: "high",
      summary: "Fed Chair Jerome Powell indicated the central bank may consider lowering interest rates if inflation continues its downward trend, sending USD lower across major pairs."
    },
    {
      title: "ECB Maintains Hawkish Stance Despite Slowing Growth",
      source: "Bloomberg",
      category: "central-banks",
      time: "4 hours ago",
      impact: "high",
      summary: "European Central Bank keeps rates unchanged but signals vigilance on inflation, supporting EUR strength against commodity currencies."
    },
    {
      title: "Gold Reaches New Yearly High on Safe Haven Demand",
      source: "Financial Times",
      category: "commodities",
      time: "5 hours ago",
      impact: "medium",
      summary: "XAU/USD breaks through $2,050 resistance as geopolitical tensions and dovish Fed expectations drive investors to safe haven assets."
    },
    {
      title: "US Jobless Claims Fall Below Expectations",
      source: "MarketWatch",
      category: "economic-data",
      time: "6 hours ago",
      impact: "medium",
      summary: "Initial jobless claims drop to 201K, beating forecast of 215K, indicating continued labor market strength and complicating Fed rate cut timeline."
    },
    {
      title: "Bitcoin Surges Past $45,000 on ETF Approval Hopes",
      source: "CoinDesk",
      category: "crypto",
      time: "7 hours ago",
      impact: "high",
      summary: "BTC/USD rallies 8% as institutional investors anticipate spot Bitcoin ETF approvals, with analysts projecting further upside to $50K."
    },
    {
      title: "Oil Prices Decline on Demand Concerns",
      source: "Reuters",
      category: "commodities",
      time: "8 hours ago",
      impact: "medium",
      summary: "WTI crude falls 2.3% to $78.50 amid worries about Chinese economic slowdown and potential increase in OPEC+ production quotas."
    }
  ];

  const categories = {
    all: "All News",
    "central-banks": "Central Banks",
    "economic-data": "Economic Data",
    commodities: "Commodities",
    crypto: "Cryptocurrency"
  };

  const filteredNews = category === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === category);

  const getImpactColor = (impact: string) => {
    return impact === "high" ? "destructive" : "default";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Market News</h1>
            <p className="text-muted-foreground">Stay updated with real-time financial news</p>
          </div>
          <Newspaper className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="flex gap-4 items-center">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]" data-testid="select-news-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categories).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Auto-refresh every 5 minutes</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNews.map((news, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-news-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getImpactColor(news.impact)}>
                        {news.impact} impact
                      </Badge>
                      <Badge variant="outline">{categories[news.category as keyof typeof categories]}</Badge>
                      <span className="text-sm text-muted-foreground">{news.time}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{news.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{news.source}</span>
                    </CardDescription>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{news.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">How to Use Market News</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• High impact news can cause significant price volatility - adjust position sizes accordingly</li>
            <li>• Central bank announcements often lead to multi-hour trends in forex markets</li>
            <li>• Economic data releases are best traded with a clear directional bias</li>
            <li>• Combine news analysis with technical levels for optimal entry/exit points</li>
            <li>• Avoid holding positions through major unexpected news events</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
