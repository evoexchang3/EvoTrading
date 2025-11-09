/**
 * Beginner Trading Course - Comprehensive Lesson Content
 * 30 lessons across 5 modules (6 lessons per module)
 * English content - multi-language support to be added later
 */

export interface LessonSection {
  title: string;
  content: string[];
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  sections: LessonSection[];
  keyPoints: string[];
  examples?: { title: string; content: string }[];
  riskWarning?: string;
  summary: string;
  quiz: LessonQuiz[];
}

export const beginnerLessons: Record<string, LessonContent> = {
  // MODULE 1: Trading Basics (6 lessons)
  "lesson-1-1": {
    sections: [
      {
        title: "What is Forex Trading?",
        content: [
          "Forex trading, also known as foreign exchange or FX trading, is the simultaneous buying of one currency and selling of another. Currencies are traded in pairs, such as EUR/USD (Euro vs. US Dollar).",
          "The forex market is the largest and most liquid financial market in the world, with a daily trading volume exceeding $7 trillion. This enormous volume ensures that you can enter and exit positions quickly at competitive prices.",
          "Unlike stock markets that close at the end of the business day, the forex market operates 24 hours a day, 5 days a week, allowing you to trade whenever news breaks or opportunities arise."
        ]
      },
      {
        title: "Why Trade Forex?",
        content: [
          "High Liquidity: The massive trading volume means you can execute large trades without significant price movement.",
          "24-Hour Market: Trade at your convenience across different time zones.",
          "Leverage Opportunities: Control larger positions with smaller capital (though this increases risk).",
          "Low Transaction Costs: Tight spreads and low commissions compared to other markets."
        ]
      }
    ],
    keyPoints: [
      "Forex involves trading currency pairs, not individual currencies",
      "The market operates 24/5 across major financial centers globally",
      "Daily volume exceeds $7 trillion, making it the world's largest market",
      "High liquidity allows for quick execution and tight spreads"
    ],
    riskWarning: "Trading forex involves substantial risk of loss and is not suitable for all investors. Only trade with money you can afford to lose.",
    summary: "Forex trading is the act of simultaneously buying one currency while selling another. As the world's largest financial market with over $7 trillion in daily volume, it offers high liquidity, 24-hour trading, and opportunities for traders of all levels.",
    quiz: [
      {
        question: "What is the approximate daily trading volume of the forex market?",
        options: ["$1 trillion", "$3 trillion", "$7 trillion", "$10 trillion"],
        correctAnswer: 2,
        explanation: "The forex market's daily trading volume exceeds $7 trillion, making it the largest financial market in the world."
      },
      {
        question: "How many hours per day is the forex market open?",
        options: ["8 hours", "12 hours", "16 hours", "24 hours"],
        correctAnswer: 3,
        explanation: "The forex market operates 24 hours a day, 5 days a week, across major financial centers worldwide."
      }
    ]
  },

  "lesson-1-2": {
    sections: [
      {
        title: "Understanding Currency Pairs",
        content: [
          "In forex trading, currencies are always quoted in pairs because you're simultaneously buying one currency and selling another. For example, in EUR/USD, you're buying Euros and selling US Dollars (or vice versa).",
          "The first currency is the 'base currency', and the second is the 'quote currency'. The price represents how much of the quote currency is needed to purchase one unit of the base currency."
        ]
      },
      {
        title: "Reading Prices",
        content: [
          "If EUR/USD is trading at 1.1000, this means 1 Euro equals 1.10 US Dollars. If it rises to 1.1100, the Euro has strengthened against the Dollar.",
          "Currency pairs are quoted to four or five decimal places. The smallest price movement is called a 'pip' (percentage in point), usually the fourth decimal place."
        ]
      },
      {
        title: "Pair Types",
        content: [
          "Major Pairs: Include USD and another major currency (EUR/USD, GBP/USD, USD/JPY). Highest liquidity and tightest spreads.",
          "Minor Pairs: Don't include USD (EUR/GBP, EUR/JPY, GBP/JPY). Slightly wider spreads but still liquid.",
          "Exotic Pairs: One major currency and one from an emerging economy (USD/TRY, EUR/ZAR). Higher spreads and more volatile."
        ]
      }
    ],
    keyPoints: [
      "Base currency is always listed first in a pair",
      "Quote currency shows how much is needed to buy one unit of base",
      "Major pairs offer the highest liquidity and lowest spreads",
      "A pip is the smallest price movement, usually the 4th decimal place"
    ],
    examples: [
      {
        title: "EUR/USD = 1.1250",
        content: "This means 1 Euro costs 1.1250 US Dollars. If you believe the Euro will strengthen, you would BUY. If you believe it will weaken, you would SELL."
      }
    ],
    summary: "Currency pairs are the foundation of forex trading. Understanding base vs. quote currencies, reading prices, and recognizing major, minor, and exotic pairs helps you make informed decisions.",
    quiz: [
      {
        question: "In GBP/USD, which is the base currency?",
        options: ["USD", "GBP", "Both equally", "Neither"],
        correctAnswer: 1,
        explanation: "GBP (British Pound) is the base currency as it appears first. USD is the quote currency."
      },
      {
        question: "Which type of currency pair typically has the tightest spreads?",
        options: ["Exotic pairs", "Minor pairs", "Major pairs", "All pairs have equal spreads"],
        correctAnswer: 2,
        explanation: "Major pairs have the highest liquidity and therefore the tightest spreads."
      }
    ]
  },

  "lesson-1-3": {
    sections: [
      {
        title: "How the Market Operates",
        content: [
          "The forex market is decentralized, with no central exchange. Trading occurs electronically over-the-counter (OTC) through a global network of banks, brokers, and institutions.",
          "The market follows the sun around the globe: Sydney, Tokyo, London, and New York. This 24-hour cycle provides continuous trading opportunities."
        ]
      },
      {
        title: "Four Major Trading Sessions",
        content: [
          "Sydney Session (10 PM - 7 AM EST): Lower volatility, good for AUD and NZD pairs.",
          "Tokyo Session (7 PM - 4 AM EST): Increased activity in Asian currencies, particularly JPY.",
          "London Session (3 AM - 12 PM EST): Most active session, ~35% of daily volume.",
          "New York Session (8 AM - 5 PM EST): High volatility, especially during overlap with London (8 AM - 12 PM EST)."
        ]
      }
    ],
    keyPoints: [
      "Forex is a decentralized, over-the-counter (OTC) market",
      "Trading occurs 24/5 across four major sessions",
      "London session has the highest trading volume",
      "Session overlaps create the most volatility and opportunity"
    ],
    examples: [
      {
        title: "London-New York Overlap",
        content: "8 AM - 12 PM EST is the most volatile period, offering the best opportunities for day traders due to high liquidity and rapid price movements."
      }
    ],
    summary: "The forex market's decentralized structure and 24-hour operation create unique trading opportunities. Understanding different sessions helps you choose the best times to trade.",
    quiz: [
      {
        question: "Which session accounts for approximately 35% of daily volume?",
        options: ["Sydney", "Tokyo", "London", "New York"],
        correctAnswer: 2,
        explanation: "The London session is the most active, accounting for about 35% of daily forex trading volume."
      },
      {
        question: "What does OTC mean?",
        options: ["Over-the-counter", "On-time-close", "Official trading center", "Overnight trading capability"],
        correctAnswer: 0,
        explanation: "OTC stands for over-the-counter, meaning trading occurs directly between parties without a centralized exchange."
      }
    ]
  },

  "lesson-1-4": {
    sections: [
      {
        title: "Market Participants",
        content: [
          "Central Banks: Control monetary policy, set interest rates, may intervene to stabilize currency. Most influential participants.",
          "Commercial Banks: Facilitate client transactions and engage in proprietary trading. Provide market liquidity.",
          "Investment Firms & Hedge Funds: Trade large volumes for profit. Their positioning can create or reinforce trends.",
          "Corporations: Exchange currencies for international business operations.",
          "Retail Traders: Individual traders accessing the market through brokers."
        ]
      },
      {
        title: "Central Bank Impact",
        content: [
          "Interest rate decisions are among the most important events for forex traders. Higher rates typically attract foreign capital, strengthening the currency.",
          "Central banks like the Federal Reserve, European Central Bank, and Bank of Japan shape currency values through policy decisions."
        ]
      }
    ],
    keyPoints: [
      "Central banks have the greatest influence through policy decisions",
      "Banks and institutions provide liquidity and market depth",
      "Corporate flows reflect fundamental economic activity",
      "Retail traders can profit by understanding institutional behavior"
    ],
    summary: "The forex market is shaped by diverse participants, from central banks setting monetary policy to retail traders seeking profit. Recognizing their motivations helps you interpret price action.",
    quiz: [
      {
        question: "Which participant typically has the most influence on currency values?",
        options: ["Retail traders", "Corporations", "Central banks", "Hedge funds"],
        correctAnswer: 2,
        explanation: "Central banks have the most influence through their control of interest rates, money supply, and direct market intervention."
      },
      {
        question: "Why do corporations participate in forex?",
        options: ["To speculate on movements", "To conduct international business", "To manipulate rates", "To earn interest"],
        correctAnswer: 1,
        explanation: "Corporations exchange currencies primarily to facilitate international business operations."
      }
    ]
  },

  "lesson-1-5": {
    sections: [
      {
        title: "Liquidity and Spreads",
        content: [
          "Liquidity refers to how easily you can buy or sell without causing price changes. High liquidity means tighter bid-ask spreads and lower transaction costs.",
          "Every currency pair has two prices: the bid (sell price) and ask (buy price). The difference is the spread, representing broker profit and market liquidity.",
          "Major pairs typically have spreads of 0.1-3 pips, while exotic pairs can have 10-100+ pips."
        ]
      },
      {
        title: "Order Types",
        content: [
          "Market Orders: Execute immediately at current price. Best for fast execution.",
          "Limit Orders: Execute only at your specified price or better.",
          "Stop Orders: Trigger a market order when price reaches your specified level.",
          "Stop-Loss Orders: Automatically close position to limit your loss."
        ]
      }
    ],
    keyPoints: [
      "High liquidity ensures tight spreads and quick execution",
      "The bid-ask spread is a key cost in trading",
      "Different order types serve different strategies",
      "Slippage can occur during volatile conditions"
    ],
    examples: [
      {
        title: "Spread Comparison",
        content: "EUR/USD: 0.2 pips = $2/lot cost. USD/TRY: 50 pips = $500/lot cost. This is why traders prefer major pairs."
      }
    ],
    summary: "Understanding liquidity and order types is essential. High liquidity provides tight spreads and excellent execution, while knowing order types gives you precise trade control.",
    quiz: [
      {
        question: "What is the bid-ask spread?",
        options: ["Time between placing and executing", "Difference between buying and selling price", "Broker's commission fee", "Distance between support and resistance"],
        correctAnswer: 1,
        explanation: "The bid-ask spread is the difference between the sell price (bid) and buy price (ask)."
      },
      {
        question: "Which order type executes immediately at current market price?",
        options: ["Limit order", "Stop order", "Market order", "Pending order"],
        correctAnswer: 2,
        explanation: "Market orders execute immediately at the best available current price."
      }
    ]
  },

  "lesson-1-6": {
    sections: [
      {
        title: "Pips, Lots, and Position Sizing",
        content: [
          "A pip (percentage in point) is the smallest price movement, typically 0.0001 for most pairs. For JPY pairs, it's 0.01.",
          "Position size determines how much each pip movement is worth. Standard lot = 100,000 units, Mini lot = 10,000 units, Micro lot = 1,000 units.",
          "For a standard lot of EUR/USD, each pip = $10. For a mini lot, each pip = $1."
        ]
      },
      {
        title: "Calculating Profit and Loss",
        content: [
          "If you buy EUR/USD at 1.1000 with 1 standard lot and sell at 1.1050, you've gained 50 pips = $500 profit.",
          "If you sell GBP/USD at 1.3000 with 1 mini lot and it rises to 1.3030, you've lost 30 pips = $30.",
          "Always calculate potential profit/loss before entering a trade."
        ]
      },
      {
        title: "Position Sizing for Risk Management",
        content: [
          "Never risk more than 1-2% of your account on a single trade.",
          "If you have a $10,000 account and risk 1% ($100), with a 20-pip stop-loss, you can trade 0.5 standard lots.",
          "Proper position sizing is crucial for long-term survival in trading."
        ]
      }
    ],
    keyPoints: [
      "A pip is the smallest price movement in most currency pairs",
      "Lot size determines the value of each pip movement",
      "Calculate potential P/L before entering trades",
      "Risk management requires proper position sizing"
    ],
    examples: [
      {
        title: "Position Sizing Example",
        content: "Account: $5,000. Risk per trade: 2% = $100. Stop-loss: 25 pips. Required position: $100 ÷ 25 pips = $4 per pip = 0.4 mini lots."
      }
    ],
    summary: "Understanding pips, lots, and position sizing is fundamental to risk management. Proper calculation ensures you control your risk and maximize your chances of long-term success.",
    quiz: [
      {
        question: "For most currency pairs, what is a pip?",
        options: ["0.01", "0.001", "0.0001", "0.00001"],
        correctAnswer: 2,
        explanation: "A pip is typically 0.0001 for most currency pairs (the fourth decimal place)."
      },
      {
        question: "How many units are in a standard lot?",
        options: ["1,000", "10,000", "100,000", "1,000,000"],
        correctAnswer: 2,
        explanation: "A standard lot equals 100,000 units of the base currency."
      }
    ]
  }
};

// Note: This file contains Module 1 (6 lessons). Modules 2-5 will be added separately to keep file size manageable.
