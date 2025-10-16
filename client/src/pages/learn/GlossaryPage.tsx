import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";
import { useState } from "react";

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryTerms = [
    { term: "Ask Price", definition: "The price at which a currency pair can be bought. Also known as the offer price." },
    { term: "Bid Price", definition: "The price at which a currency pair can be sold." },
    { term: "Spread", definition: "The difference between the bid and ask price, representing the broker's commission." },
    { term: "Pip", definition: "The smallest price movement in a currency pair, typically 0.0001 for most pairs." },
    { term: "Lot", definition: "A standardized trading size. Standard lot = 100,000 units, Mini lot = 10,000 units, Micro lot = 1,000 units." },
    { term: "Leverage", definition: "The ability to control a large position with a small amount of capital. E.g., 1:100 leverage allows $100 to control $10,000." },
    { term: "Margin", definition: "The amount of money required to open and maintain a leveraged position." },
    { term: "Stop Loss", definition: "An order placed to automatically close a position at a specified price to limit losses." },
    { term: "Take Profit", definition: "An order placed to automatically close a position at a specified price to secure profits." },
    { term: "Long Position", definition: "Buying a currency pair with the expectation that its price will rise." },
    { term: "Short Position", definition: "Selling a currency pair with the expectation that its price will fall." },
    { term: "Support Level", definition: "A price level where buying pressure is expected to prevent further decline." },
    { term: "Resistance Level", definition: "A price level where selling pressure is expected to prevent further rise." },
    { term: "Bullish", definition: "Market sentiment expecting prices to rise. Bulls buy with the expectation of profit." },
    { term: "Bearish", definition: "Market sentiment expecting prices to fall. Bears sell with the expectation of profit." },
    { term: "Candlestick", definition: "A charting method showing open, high, low, and close prices for a specific period." },
    { term: "Trend", definition: "The general direction of price movement: uptrend (higher highs/lows), downtrend (lower highs/lows), or sideways." },
    { term: "Volatility", definition: "The degree of price fluctuation over time. High volatility means large price swings." },
    { term: "Liquidity", definition: "The ease with which an asset can be bought or sold without affecting its price." },
    { term: "Slippage", definition: "The difference between expected execution price and actual execution price, often during high volatility." },
    { term: "Swap", definition: "The interest earned or paid for holding a position overnight, based on interest rate differential." },
    { term: "Drawdown", definition: "The decline in account balance from peak to trough, measuring trading losses." },
    { term: "Equity", definition: "The current value of a trading account including unrealized profits/losses from open positions." },
    { term: "Free Margin", definition: "The amount of money available to open new positions, calculated as Equity minus Used Margin." },
    { term: "Margin Call", definition: "A warning from broker when account equity falls too low to support open positions." },
    { term: "Stop Out", definition: "Automatic closure of positions when margin level drops below broker's minimum requirement." },
    { term: "Scalping", definition: "A trading style that aims to profit from small price changes with very short holding periods." },
    { term: "Swing Trading", definition: "A trading style that holds positions for days to weeks to profit from price swings." },
    { term: "Day Trading", definition: "Opening and closing all positions within the same trading day to avoid overnight risk." },
    { term: "Technical Analysis", definition: "Trading approach based on chart patterns, indicators, and historical price data." },
    { term: "Fundamental Analysis", definition: "Trading approach based on economic data, news events, and intrinsic value." },
    { term: "RSI", definition: "Relative Strength Index - momentum oscillator measuring overbought/oversold conditions (0-100)." },
    { term: "MACD", definition: "Moving Average Convergence Divergence - trend-following indicator showing momentum changes." },
    { term: "Moving Average", definition: "Average price over a specific period, smoothing price data to identify trends (SMA, EMA)." },
    { term: "Fibonacci Retracement", definition: "Technical tool using horizontal lines at 23.6%, 38.2%, 50%, 61.8% to indicate potential support/resistance." },
    { term: "Breakout", definition: "Price movement beyond a defined support or resistance level, often signaling a new trend." },
    { term: "Consolidation", definition: "Period when price moves sideways within a range, showing market indecision." },
    { term: "Reversal", definition: "Change in trend direction from uptrend to downtrend or vice versa." },
    { term: "Risk-Reward Ratio", definition: "Comparison of potential profit to potential loss. E.g., 1:3 means risking $1 to make $3." }
  ];

  const filteredTerms = glossaryTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTerms = filteredTerms.reduce((acc, item) => {
    const firstLetter = item.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trading Glossary</h1>
            <p className="text-muted-foreground">Essential trading terms and definitions</p>
          </div>
          <Book className="w-8 h-8 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Terms</CardTitle>
            <CardDescription>Find definitions for trading terminology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for a term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-term"
              />
            </div>
          </CardContent>
        </Card>

        {Object.keys(groupedTerms).sort().map((letter) => (
          <div key={letter} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                {letter}
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <div className="grid gap-3">
              {groupedTerms[letter].map((item, index) => (
                <Card key={index} data-testid={`card-term-${item.term.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{item.term}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No terms found matching "{searchTerm}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
