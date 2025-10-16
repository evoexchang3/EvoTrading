import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search, BookOpen, TrendingUp, Star, Filter } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const glossaryTerms = [
    { term: "Ask Price", definition: "The price at which a currency pair can be bought. Also known as the offer price. This is the higher price in the bid-ask spread and represents the price at which market makers are willing to sell.", category: "Basics", difficulty: "Beginner" },
    { term: "Bid Price", definition: "The price at which a currency pair can be sold. This is the lower price in the bid-ask spread and represents the price at which market makers are willing to buy.", category: "Basics", difficulty: "Beginner" },
    { term: "Spread", definition: "The difference between the bid and ask price, representing the broker's commission or market liquidity cost. Tighter spreads indicate better liquidity and lower transaction costs.", category: "Basics", difficulty: "Beginner" },
    { term: "Pip", definition: "The smallest price movement in a currency pair, typically 0.0001 for most pairs (or 0.01 for JPY pairs). Stands for 'percentage in point' or 'price interest point'.", category: "Basics", difficulty: "Beginner" },
    { term: "Lot", definition: "A standardized trading size. Standard lot = 100,000 units, Mini lot = 10,000 units, Micro lot = 1,000 units. Position size is measured in lots.", category: "Basics", difficulty: "Beginner" },
    { term: "Leverage", definition: "The ability to control a large position with a small amount of capital. E.g., 1:100 leverage allows $100 to control $10,000. Amplifies both profits and losses proportionally.", category: "Risk", difficulty: "Beginner" },
    { term: "Margin", definition: "The amount of money required to open and maintain a leveraged position. It's essentially a good-faith deposit held by the broker to cover potential losses.", category: "Risk", difficulty: "Beginner" },
    { term: "Stop Loss", definition: "An order placed to automatically close a position at a specified price to limit losses. Essential risk management tool that should be used on every trade.", category: "Orders", difficulty: "Beginner" },
    { term: "Take Profit", definition: "An order placed to automatically close a position at a specified price to secure profits. Allows traders to lock in gains without monitoring positions constantly.", category: "Orders", difficulty: "Beginner" },
    { term: "Long Position", definition: "Buying a currency pair with the expectation that its price will rise. 'Going long' means you profit when the price increases.", category: "Trading", difficulty: "Beginner" },
    { term: "Short Position", definition: "Selling a currency pair with the expectation that its price will fall. 'Going short' means you profit when the price decreases.", category: "Trading", difficulty: "Beginner" },
    { term: "Support Level", definition: "A price level where buying pressure is expected to prevent further decline. Historical price floor where demand typically increases.", category: "Technical", difficulty: "Beginner" },
    { term: "Resistance Level", definition: "A price level where selling pressure is expected to prevent further rise. Historical price ceiling where supply typically increases.", category: "Technical", difficulty: "Beginner" },
    { term: "Bullish", definition: "Market sentiment expecting prices to rise. Bulls buy with the expectation of profit. Characterized by higher highs and higher lows on charts.", category: "Trading", difficulty: "Beginner" },
    { term: "Bearish", definition: "Market sentiment expecting prices to fall. Bears sell with the expectation of profit. Characterized by lower highs and lower lows on charts.", category: "Trading", difficulty: "Beginner" },
    { term: "Candlestick", definition: "A charting method showing open, high, low, and close prices for a specific period. Body shows open-close range, wicks show high-low range.", category: "Technical", difficulty: "Beginner" },
    { term: "Trend", definition: "The general direction of price movement: uptrend (higher highs/lows), downtrend (lower highs/lows), or sideways (ranging). 'The trend is your friend' is a common trading maxim.", category: "Technical", difficulty: "Beginner" },
    { term: "Volatility", definition: "The degree of price fluctuation over time. High volatility means large price swings, creating both opportunity and risk. Measured by indicators like ATR or Bollinger Bands.", category: "Analysis", difficulty: "Beginner" },
    { term: "Liquidity", definition: "The ease with which an asset can be bought or sold without affecting its price. Major pairs have high liquidity with tight spreads and minimal slippage.", category: "Basics", difficulty: "Beginner" },
    { term: "Slippage", definition: "The difference between expected execution price and actual execution price, often during high volatility or when trading large positions during low liquidity periods.", category: "Trading", difficulty: "Intermediate" },
    { term: "Swap", definition: "The interest earned or paid for holding a position overnight, based on interest rate differential between the two currencies. Also called rollover.", category: "Trading", difficulty: "Intermediate" },
    { term: "Drawdown", definition: "The decline in account balance from peak to trough, measuring trading losses. Maximum drawdown is a key performance metric for risk assessment.", category: "Risk", difficulty: "Intermediate" },
    { term: "Equity", definition: "The current value of a trading account including unrealized profits/losses from open positions. Calculated as Balance + Floating P/L.", category: "Risk", difficulty: "Intermediate" },
    { term: "Free Margin", definition: "The amount of money available to open new positions, calculated as Equity minus Used Margin. When this reaches zero, you cannot open new positions.", category: "Risk", difficulty: "Intermediate" },
    { term: "Margin Call", definition: "A warning from broker when account equity falls too low to support open positions. Signals danger of stop out if losses continue.", category: "Risk", difficulty: "Intermediate" },
    { term: "Stop Out", definition: "Automatic closure of positions when margin level drops below broker's minimum requirement (typically 20-50%). Protection mechanism preventing negative balance.", category: "Risk", difficulty: "Intermediate" },
    { term: "Scalping", definition: "A trading style that aims to profit from small price changes with very short holding periods (seconds to minutes). Requires tight spreads and fast execution.", category: "Strategies", difficulty: "Advanced" },
    { term: "Swing Trading", definition: "A trading style that holds positions for days to weeks to profit from price swings. Based on technical analysis and market momentum.", category: "Strategies", difficulty: "Intermediate" },
    { term: "Day Trading", definition: "Opening and closing all positions within the same trading day to avoid overnight risk and swap charges. Requires significant time commitment.", category: "Strategies", difficulty: "Intermediate" },
    { term: "Technical Analysis", definition: "Trading approach based on chart patterns, indicators, and historical price data. Assumes price reflects all available information.", category: "Analysis", difficulty: "Beginner" },
    { term: "Fundamental Analysis", definition: "Trading approach based on economic data, news events, and intrinsic value. Focuses on supply/demand factors affecting currency values.", category: "Analysis", difficulty: "Intermediate" },
    { term: "RSI", definition: "Relative Strength Index - momentum oscillator measuring overbought/oversold conditions (0-100). Above 70 is overbought, below 30 is oversold.", category: "Indicators", difficulty: "Intermediate" },
    { term: "MACD", definition: "Moving Average Convergence Divergence - trend-following indicator showing momentum changes. Consists of MACD line, signal line, and histogram.", category: "Indicators", difficulty: "Intermediate" },
    { term: "Moving Average", definition: "Average price over a specific period, smoothing price data to identify trends. SMA (simple) and EMA (exponential) are most common types.", category: "Indicators", difficulty: "Beginner" },
    { term: "Fibonacci Retracement", definition: "Technical tool using horizontal lines at 23.6%, 38.2%, 50%, 61.8%, 78.6% to indicate potential support/resistance based on golden ratio.", category: "Technical", difficulty: "Advanced" },
    { term: "Breakout", definition: "Price movement beyond a defined support or resistance level, often signaling a new trend. High-volume breakouts are more reliable.", category: "Technical", difficulty: "Intermediate" },
    { term: "Consolidation", definition: "Period when price moves sideways within a range, showing market indecision. Often precedes significant breakout moves.", category: "Technical", difficulty: "Intermediate" },
    { term: "Reversal", definition: "Change in trend direction from uptrend to downtrend or vice versa. Confirmed by price action and indicator signals.", category: "Technical", difficulty: "Intermediate" },
    { term: "Risk-Reward Ratio", definition: "Comparison of potential profit to potential loss. E.g., 1:3 means risking $1 to make $3. Minimum 1:2 recommended for consistent profitability.", category: "Risk", difficulty: "Beginner" },
    { term: "Order Flow", definition: "The process of buy and sell orders being filled in the market. Advanced traders analyze order flow to understand institutional activity and liquidity.", category: "Advanced", difficulty: "Advanced" },
    { term: "Smart Money", definition: "Large institutional traders (banks, hedge funds) whose activity can move markets. Retail traders try to identify and follow smart money movements.", category: "Advanced", difficulty: "Advanced" },
    { term: "Elliott Wave", definition: "Technical theory that market prices move in repetitive wave patterns based on investor psychology. Consists of impulse waves (5) and corrective waves (3).", category: "Advanced", difficulty: "Advanced" },
    { term: "Harmonic Patterns", definition: "Advanced price patterns based on Fibonacci ratios (Gartley, Butterfly, Bat, Crab). Used to identify high-probability reversal zones.", category: "Advanced", difficulty: "Advanced" },
    { term: "Correlation", definition: "Statistical relationship between two currency pairs. Positive correlation means they move together, negative means they move opposite. Important for portfolio risk.", category: "Analysis", difficulty: "Advanced" },
    { term: "Hedging", definition: "Opening positions to offset risk in existing positions. Common strategy for protecting against adverse market moves while maintaining exposure.", category: "Strategies", difficulty: "Advanced" },
    { term: "Pivot Points", definition: "Technical indicators calculating potential support and resistance levels based on previous period's high, low, and close prices.", category: "Technical", difficulty: "Intermediate" },
    { term: "Bollinger Bands", definition: "Volatility indicator consisting of moving average with upper and lower bands set at standard deviations. Price touching bands can signal overbought/oversold.", category: "Indicators", difficulty: "Intermediate" },
    { term: "ATR", definition: "Average True Range - volatility indicator measuring average price movement over specified period. Used for position sizing and stop loss placement.", category: "Indicators", difficulty: "Intermediate" },
    { term: "Carry Trade", definition: "Strategy of borrowing in low interest rate currency and investing in high interest rate currency to profit from interest differential.", category: "Strategies", difficulty: "Advanced" }
  ];

  const categories = [
    { name: "All Terms", value: "all", count: glossaryTerms.length },
    { name: "Basics", value: "Basics", count: glossaryTerms.filter(t => t.category === "Basics").length },
    { name: "Technical Analysis", value: "Technical", count: glossaryTerms.filter(t => t.category === "Technical").length },
    { name: "Indicators", value: "Indicators", count: glossaryTerms.filter(t => t.category === "Indicators").length },
    { name: "Risk Management", value: "Risk", count: glossaryTerms.filter(t => t.category === "Risk").length },
    { name: "Trading Strategies", value: "Strategies", count: glossaryTerms.filter(t => t.category === "Strategies").length },
    { name: "Orders", value: "Orders", count: glossaryTerms.filter(t => t.category === "Orders").length },
    { name: "Analysis", value: "Analysis", count: glossaryTerms.filter(t => t.category === "Analysis").length },
    { name: "Advanced Concepts", value: "Advanced", count: glossaryTerms.filter(t => t.category === "Advanced").length }
  ];

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, item) => {
    const firstLetter = item.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const faqs = [
    {
      question: "How can I best use this glossary to improve my trading knowledge?",
      answer: "Start by reading through the 'Basics' category to build a strong foundation. When you encounter a new term during your studies or trading, search for it here. We recommend reading 5-10 terms daily and trying to use them in context. The difficulty levels help you progress from beginner to advanced terminology systematically."
    },
    {
      question: "What's the difference between beginner, intermediate, and advanced terms?",
      answer: "Beginner terms are fundamental concepts every trader must know before their first trade (pip, spread, leverage). Intermediate terms are used by active traders managing positions (drawdown, correlation, pivot points). Advanced terms involve professional concepts and institutional strategies (order flow, smart money, harmonic patterns)."
    },
    {
      question: "Why do some terms have multiple definitions or seem contradictory?",
      answer: "Trading terminology can vary by context or region. For example, 'lot' has a specific meaning (100,000 units) but some brokers use it differently. We provide the most widely accepted definitions with context. When in doubt, always verify with your broker's specific terminology."
    },
    {
      question: "Should I memorize all these terms before I start trading?",
      answer: "No, memorization isn't necessary. Focus on understanding 15-20 core beginner terms first (pip, lot, leverage, margin, stop loss, support/resistance). Learn additional terms progressively as you encounter them in courses or trading. Understanding context and practical application is more important than memorization."
    },
    {
      question: "How often is this glossary updated with new trading terms?",
      answer: "We update the glossary monthly to include emerging trading concepts, new strategies, and evolving market terminology. Recent additions include smart money concepts, institutional order flow, and modern algorithmic trading terms. Follow the 'Recently Added' section to stay current."
    },
    {
      question: "Are there any terms specific to forex that differ from stock trading?",
      answer: "Yes, several terms are forex-specific: pips (instead of ticks/points), lots (standardized forex position size), swap/rollover (overnight interest), and currency pair notation (EUR/USD vs stock symbols). However, many technical analysis and risk management terms apply across all markets."
    },
    {
      question: "Can I suggest new terms to be added to the glossary?",
      answer: "Absolutely! We encourage community contributions. If you encounter a trading term not in our glossary, submit it through the feedback form or contact support. Include the term, your understanding of its definition, and context where you found it. We review all submissions."
    }
  ];

  const usageTips = [
    { tip: "Use the search function to quickly find terms during live trading", icon: Search },
    { tip: "Filter by category to study related concepts together", icon: Filter },
    { tip: "Focus on beginner terms first before advancing to complex concepts", icon: Star },
    { tip: "Bookmark commonly referenced terms for quick access", icon: BookOpen },
    { tip: "Practice using new terms in your trading journal", icon: TrendingUp }
  ];

  const beginnerCount = glossaryTerms.filter(t => t.difficulty === "Beginner").length;
  const intermediateCount = glossaryTerms.filter(t => t.difficulty === "Intermediate").length;
  const advancedCount = glossaryTerms.filter(t => t.difficulty === "Advanced").length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-glossary">Learning Resource</Badge>
            <h1 className="text-3xl font-bold">Trading Glossary</h1>
            <p className="text-muted-foreground">Comprehensive forex trading terminology dictionary</p>
          </div>
          <Book className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card data-testid="card-stat-total">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Terms</p>
                  <p className="text-2xl font-bold" data-testid="text-total-terms">{glossaryTerms.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-beginner">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Beginner</p>
                  <p className="text-2xl font-bold" data-testid="text-beginner-terms">{beginnerCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-intermediate">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Intermediate</p>
                  <p className="text-2xl font-bold" data-testid="text-intermediate-terms">{intermediateCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-advanced">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Advanced</p>
                  <p className="text-2xl font-bold" data-testid="text-advanced-terms">{advancedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Tips */}
        <Card data-testid="card-usage-tips">
          <CardHeader>
            <CardTitle>How to Use This Glossary</CardTitle>
            <CardDescription>Tips for effective learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usageTips.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{item.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card data-testid="card-search">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find definitions quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for a term or definition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-term"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat.value)}
                  data-testid={`filter-${cat.value}`}
                >
                  {cat.name} ({cat.count})
                </Badge>
              ))}
            </div>

            {searchTerm && (
              <p className="text-sm text-muted-foreground">
                Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Terms Display */}
        <Tabs defaultValue="alphabetical" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="alphabetical" data-testid="tab-alphabetical">Alphabetical</TabsTrigger>
            <TabsTrigger value="category" data-testid="tab-category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="alphabetical" className="space-y-6 mt-6">
            {Object.keys(groupedTerms).sort().map((letter) => (
              <div key={letter} className="space-y-3" data-testid={`section-letter-${letter}`}>
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
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <CardTitle className="text-lg">{item.term}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge 
                              variant={
                                item.difficulty === 'Beginner' ? 'default' :
                                item.difficulty === 'Intermediate' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {item.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.definition}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="category" className="space-y-6 mt-6">
            {categories.filter(c => c.value !== "all" && glossaryTerms.some(t => t.category === c.value)).map((cat) => (
              <div key={cat.value} className="space-y-3" data-testid={`section-category-${cat.value}`}>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                    {cat.name}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                  <Badge variant="outline">{cat.count} terms</Badge>
                </div>
                
                <div className="grid gap-3">
                  {glossaryTerms
                    .filter(t => t.category === cat.value)
                    .map((item, index) => (
                      <Card key={index} data-testid={`card-term-cat-${item.term.toLowerCase().replace(/\s+/g, '-')}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <CardTitle className="text-lg">{item.term}</CardTitle>
                            <Badge 
                              variant={
                                item.difficulty === 'Beginner' ? 'default' :
                                item.difficulty === 'Intermediate' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {item.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{item.definition}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {filteredTerms.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground" data-testid="text-no-results">
                No terms found matching "{searchTerm}"
              </p>
            </CardContent>
          </Card>
        )}

        {/* Related Learning Resources */}
        <Card data-testid="card-learning-resources">
          <CardHeader>
            <CardTitle>Continue Your Learning</CardTitle>
            <CardDescription>Recommended courses based on glossary usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover-elevate cursor-pointer" data-testid="link-beginner-course">
                <h4 className="font-semibold mb-2">Beginner Trading Course</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Master the fundamental terms and concepts from this glossary with practical examples
                </p>
                <Badge>4.5 hours • {beginnerCount} terms covered</Badge>
              </div>

              <div className="p-4 border rounded-lg hover-elevate cursor-pointer" data-testid="link-advanced-course">
                <h4 className="font-semibold mb-2">Advanced Trading Course</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Deep dive into advanced terminology and professional trading concepts
                </p>
                <Badge>8.5 hours • {advancedCount} terms covered</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card data-testid="card-faqs">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about trading terminology</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
