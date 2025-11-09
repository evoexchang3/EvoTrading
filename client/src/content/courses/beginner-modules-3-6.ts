/**
 * Beginner Course - Modules 3-6
 * Module 3: Risk Management (6 lessons)
 * Module 4: Trading Psychology (5 lessons)
 * Module 5: Developing a Strategy (5 lessons)
 * Module 6: Practical Trading (8 lessons)
 */

import { LessonContent } from './beginner-lessons';

// Due to content length, summarizing key lessons per module
// Each module follows the same structure: sections, keyPoints, examples, summary, quiz

export const module3To6Lessons: Record<string, LessonContent> = {
  // MODULE 3: Risk Management
  "lesson-3-1": {
    sections: [
      {
        title: "The 1% Rule",
        content: [
          "Never risk more than 1-2% of your account on a single trade.",
          "If you have $10,000, risk only $100-200 per trade.",
          "This ensures you can survive 20+ consecutive losses without depleting your account.",
          "Most professional traders risk 0.5-1% per trade."
        ]
      },
      {
        title: "Why the 1% Rule Works",
        content: [
          "Even with a 50% win rate, you can survive long losing streaks.",
          "With 1% risk, you can lose 50 trades in a row and still have half your account.",
          "Compare to 10% risk: 10 losses = total wipeout.",
          "The rule allows you to trade through psychological pressure without catastrophic losses."
        ]
      },
      {
        title: "Implementing the Rule",
        content: [
          "Calculate 1% of your account balance before each trade.",
          "Adjust position size based on stop-loss distance to maintain 1% risk.",
          "Never increase risk after losses (chasing losses destroys accounts).",
          "As account grows, absolute risk grows with it (1% of larger account)."
        ]
      }
    ],
    keyPoints: [
      "Risk 1-2% of account per trade maximum",
      "Protects against devastating losing streaks",
      "Allows for long-term survival and growth",
      "Professional traders typically risk even less"
    ],
    examples: [
      {
        title: "1% vs 10% Risk Comparison",
        content: "$10,000 account. 1% risk = $100/trade. After 10 losses: $9,000 left (90%). 10% risk = $1,000/trade. After 10 losses: $3,487 left (35%). The difference is survival vs devastation."
      }
    ],
    summary: "The 1% rule is the foundation of risk management. By limiting risk per trade, you ensure your trading career survives inevitable losses.",
    quiz: [
      {
        question: "If you have a $5,000 account, what's the maximum you should risk per trade using the 1% rule?",
        options: ["$25", "$50", "$100", "$250"],
        correctAnswer: 1,
        explanation: "1% of $5,000 = $50. This is the maximum risk per trade under the 1% rule."
      }
    ]
  },

  "lesson-3-2": {
    sections: [
      {
        title: "Stop-Loss Orders",
        content: [
          "A stop-loss automatically closes your trade when price hits a predetermined level.",
          "Protects you from catastrophic losses.",
          "Never trade without a stop-loss - this is gambling, not trading.",
          "Place stops beyond support/resistance to avoid getting stopped by normal volatility."
        ]
      }
    ],
    keyPoints: [
      "Always use stop-losses on every trade",
      "Place them at logical levels beyond support/resistance",
      "Never move stop-loss further away (increasing risk)",
      "Stops protect you from emotional decision-making"
    ],
    summary: "Stop-losses are non-negotiable. They protect your capital and remove emotion from losing trades.",
    quiz: [
      {
        question: "Where should you place a stop-loss when buying at support?",
        options: ["Exactly at support", "Just below support", "Far above support", "No stop needed"],
        correctAnswer: 1,
        explanation: "Place stops just below support to allow for normal volatility while still protecting from true breakdowns."
      }
    ]
  },

  "lesson-3-3": {
    sections: [
      {
        title: "Risk-to-Reward Ratio",
        content: [
          "Risk-to-reward (R:R) compares potential loss to potential profit.",
          "Minimum acceptable R:R is 1:2 (risk $100 to make $200).",
          "With 1:2 R:R, you only need 33% win rate to be profitable.",
          "Professional traders often target 1:3 or better."
        ]
      }
    ],
    keyPoints: [
      "Minimum 1:2 risk-to-reward ratio",
      "Good R:R allows profitability with lower win rate",
      "Calculate before entering trade",
      "Never enter trade with poor R:R just because you 'feel' it"
    ],
    summary: "Risk-to-reward ratio determines long-term profitability. Even with a 40% win rate, you profit with good R:R.",
    quiz: [
      {
        question: "With a 1:3 risk-reward ratio, what win rate do you need to break even?",
        options: ["25%", "33%", "50%", "66%"],
        correctAnswer: 0,
        explanation: "With 1:3 R:R, you need only 25% win rate to break even (1 win of $300 covers 3 losses of $100)."
      }
    ]
  },

  "lesson-3-4": {
    sections: [
      {
        title: "Position Sizing",
        content: [
          "Position size determines how many lots you trade based on your risk.",
          "Formula: Position Size = (Account Risk ÷ Stop-Loss in Pips) ÷ Pip Value",
          "Larger stop-loss = smaller position size (and vice versa).",
          "Never use fixed lot size - always calculate based on stop distance."
        ]
      }
    ],
    keyPoints: [
      "Position size must be calculated for each trade",
      "Wider stops require smaller positions",
      "Maintains consistent dollar risk across all trades",
      "Use position size calculators until you master the math"
    ],
    summary: "Proper position sizing ensures consistent risk regardless of stop-loss distance. This is mathematics, not guesswork.",
    quiz: [
      {
        question: "If your stop-loss is wider, what should happen to your position size?",
        options: ["Increase", "Decrease", "Stay same", "Double"],
        correctAnswer: 1,
        explanation: "Wider stops require smaller position sizes to maintain the same dollar risk amount."
      }
    ]
  },

  "lesson-3-5": {
    sections: [
      {
        title: "Diversification and Correlation",
        content: [
          "Don't put all risk in one basket - diversify across different pairs.",
          "Understand correlation: EUR/USD and GBP/USD are 80%+ correlated.",
          "Trading highly correlated pairs = multiplying risk, not diversifying.",
          "Mix major, minor, and uncorrelated pairs for true diversification."
        ]
      }
    ],
    keyPoints: [
      "Diversify across uncorrelated currency pairs",
      "Avoid trading multiple correlated pairs simultaneously",
      "Check correlation coefficients before opening multiple positions",
      "True diversification reduces portfolio risk"
    ],
    summary: "Smart diversification means trading uncorrelated pairs. Trading EUR/USD and GBP/USD is NOT diversification.",
    quiz: [
      {
        question: "Which represents proper diversification?",
        options: ["EUR/USD + GBP/USD", "EUR/USD + USD/JPY", "EUR/GBP + GBP/JPY", "USD/CAD + USD/CHF"],
        correctAnswer: 1,
        explanation: "EUR/USD and USD/JPY have low correlation, providing true diversification."
      }
    ]
  },

  "lesson-3-6": {
    sections: [
      {
        title: "Maximum Drawdown",
        content: [
          "Drawdown is the peak-to-trough decline in your account.",
          "If you lose 50%, you need 100% gain to recover.",
          "Set maximum drawdown limit (e.g., 20%) and stop trading if hit.",
          "Preservation of capital is more important than catching every trade."
        ]
      }
    ],
    keyPoints: [
      "Monitor your drawdown continuously",
      "Larger losses require exponentially larger gains to recover",
      "Set hard stop at maximum acceptable drawdown",
      "Taking a break after drawdown prevents revenge trading"
    ],
    summary: "Understanding drawdown mathematics prevents catastrophic losses. A 50% loss requires a 100% gain just to break even.",
    quiz: [
      {
        question: "If you lose 30% of your account, what % gain is needed to recover?",
        options: ["30%", "35%", "43%", "50%"],
        correctAnswer: 2,
        explanation: "$10,000 - 30% = $7,000. To get back to $10,000, you need $3,000/$7,000 = 43% gain."
      }
    ]
  },

  // MODULE 4: Trading Psychology
  "lesson-4-1": {
    sections: [
      {
        title: "The Psychology of Trading",
        content: [
          "Trading is 80% psychology, 20% strategy.",
          "Emotions (fear, greed, hope) are your worst enemies.",
          "Successful trading requires emotional discipline and mental toughness.",
          "Your mindset determines long-term success more than your strategy."
        ]
      }
    ],
    keyPoints: [
      "Emotions sabotage even the best strategies",
      "Discipline beats intelligence in trading",
      "Develop mental resilience through experience",
      "Psychology is the hardest part to master"
    ],
    summary: "Trading psychology separates winners from losers. Master your emotions or they will master you.",
    quiz: [
      {
        question: "What percentage of trading success is attributed to psychology?",
        options: ["20%", "50%", "60%", "80%"],
        correctAnswer: 3,
        explanation: "Trading is widely considered to be 80% psychology and 20% strategy."
      }
    ]
  },

  "lesson-4-2": {
    sections: [
      {
        title: "Fear and Greed",
        content: [
          "Fear causes you to exit winning trades too early and avoid good setups.",
          "Greed causes you to overtrade, risk too much, and hold losers hoping they reverse.",
          "Both emotions destroy accounts faster than bad strategy.",
          "Recognize when fear or greed is influencing your decisions."
        ]
      }
    ],
    keyPoints: [
      "Fear prevents you from taking valid trades",
      "Greed leads to overtrading and excessive risk",
      "Both cause deviation from your plan",
      "Awareness is the first step to controlling emotions"
    ],
    summary: "Fear and greed are the primary emotional drivers that cause traders to abandon their plans and lose money.",
    quiz: [
      {
        question: "What emotion typically causes traders to exit winning trades too early?",
        options: ["Greed", "Fear", "Hope", "Confidence"],
        correctAnswer: 1,
        explanation: "Fear of losing profits causes traders to exit winners prematurely, limiting their gains."
      }
    ]
  },

  "lesson-4-3": {
    sections: [
      {
        title: "Revenge Trading",
        content: [
          "Revenge trading: trying to immediately recover losses through impulsive trades.",
          "Usually happens after a string of losses or one particularly painful loss.",
          "Results in even bigger losses and emotional devastation.",
          "Solution: Take a break after losses. Review what went wrong."
        ]
      }
    ],
    keyPoints: [
      "Revenge trading is emotional, not logical",
      "Always results in larger losses",
      "Take mandatory breaks after losing streaks",
      "Review losing trades, don't avenge them"
    ],
    summary: "Revenge trading is gambling, not trading. Step away, cool down, and return with a clear mind.",
    quiz: [
      {
        question: "What should you do after experiencing a significant loss?",
        options: ["Trade immediately to recover", "Increase position size", "Take a break and review", "Switch to different pairs"],
        correctAnswer: 2,
        explanation: "Taking a break and reviewing what went wrong prevents revenge trading and helps you learn."
      }
    ]
  },

  "lesson-4-4": {
    sections: [
      {
        title: "Overconfidence and Overtrading",
        content: [
          "After a winning streak, traders become overconfident and increase risk.",
          "Overtrading: taking too many trades, often forcing setups that aren't there.",
          "Quality over quantity - one good trade beats five mediocre ones.",
          "Stick to your plan regardless of recent results."
        ]
      }
    ],
    keyPoints: [
      "Winning streaks lead to dangerous overconfidence",
      "Trade less, trade better",
      "Every trade must meet your criteria",
      "Recent results don't predict future performance"
    ],
    summary: "Discipline means trading only high-quality setups, regardless of recent wins or losses.",
    quiz: [
      {
        question: "What is the main danger of a winning streak?",
        options: ["Boredom", "Overconfidence", "Fatigue", "Confusion"],
        correctAnswer: 1,
        explanation: "Winning streaks often lead to overconfidence, causing traders to take excessive risks."
      }
    ]
  },

  "lesson-4-5": {
    sections: [
      {
        title: "Developing Mental Discipline",
        content: [
          "Keep a trading journal - record trades, emotions, and lessons.",
          "Follow your trading plan 100% - no exceptions.",
          "Accept that losses are part of the business.",
          "Focus on process, not profits. Good process = good results."
        ]
      }
    ],
    keyPoints: [
      "Trading journal builds self-awareness",
      "Plan the trade, trade the plan",
      "Accept losses as business expenses",
      "Process focus beats profit focus"
    ],
    summary: "Mental discipline is built through journaling, plan adherence, and accepting the probabilistic nature of trading.",
    quiz: [
      {
        question: "What is the most effective tool for building trading discipline?",
        options: ["More indicators", "Bigger account", "Trading journal", "Faster computer"],
        correctAnswer: 2,
        explanation: "A trading journal helps you track patterns, learn from mistakes, and build mental discipline."
      }
    ]
  },

  // MODULE 5: Developing a Strategy (5 lessons)
  "lesson-5-1": {
    sections: [
      {
        title: "Components of a Trading Strategy",
        content: [
          "A complete trading strategy answers: What, When, How Much, and How Long.",
          "What: Which markets/pairs will you trade?",
          "When: What setups trigger your entries and exits?",
          "How Much: Position sizing and risk management rules.",
          "How Long: Time horizon and holding period expectations."
        ]
      },
      {
        title: "Strategy Types",
        content: [
          "Trend Following: Trade in direction of prevailing trend. Works in trending markets.",
          "Mean Reversion: Trade reversals when price deviates from average. Works in ranging markets.",
          "Breakout Trading: Enter when price breaks key levels. Works when volatility increases.",
          "Choose strategy that matches your personality and available time."
        ]
      }
    ],
    keyPoints: [
      "Every strategy must have clear entry and exit rules",
      "Match strategy to your personality and schedule",
      "No strategy works in all market conditions",
      "Consistency in execution matters more than the strategy itself"
    ],
    examples: [
      {
        title: "Simple Trend Strategy",
        content: "Buy when: Price above 50 EMA + RSI pullback to 40-50. Exit when: RSI exceeds 70 or price closes below 50 EMA."
      }
    ],
    summary: "A complete trading strategy defines exactly what you trade, when you enter/exit, how much you risk, and your timeframe. Choose a strategy that fits your personality.",
    quiz: [
      {
        question: "What are the four essential components a trading strategy must define?",
        options: ["Price, Volume, Time, Broker", "What, When, How Much, How Long", "Buy, Sell, Hold, Wait", "Charts, News, Indicators, Alerts"],
        correctAnswer: 1,
        explanation: "A complete strategy defines What (markets), When (setups), How Much (position size), and How Long (timeframe)."
      }
    ]
  },

  "lesson-5-2": {
    sections: [
      {
        title: "Backtesting Your Strategy",
        content: [
          "Backtesting applies your strategy rules to historical data to see how it would have performed.",
          "Manual backtesting: Review charts, mark entries/exits, calculate results.",
          "Automated backtesting: Use software to test thousands of trades quickly.",
          "Minimum 100 trades or 1 year of data for statistical significance."
        ]
      },
      {
        title: "Key Metrics to Track",
        content: [
          "Win Rate: Percentage of winning trades.",
          "Average Win vs Average Loss: How big are your winners vs losers?",
          "Profit Factor: Total profits divided by total losses. Above 1.5 is good.",
          "Maximum Drawdown: Largest peak-to-trough decline.",
          "Expectancy: Average amount you expect to make per trade."
        ]
      }
    ],
    keyPoints: [
      "Backtest on at least 100 trades or 1 year of data",
      "Good backtests don't guarantee future success",
      "Look for profit factor above 1.5 and manageable drawdown",
      "Test in different market conditions (trending, ranging)"
    ],
    examples: [
      {
        title: "Backtest Results",
        content: "100 trades, 45% win rate, Avg Win $200, Avg Loss $100, Profit Factor 1.64. Strategy is viable: (45×$200) ÷ (55×$100) = 1.64."
      }
    ],
    summary: "Backtesting validates your strategy using historical data. Track win rate, profit factor, and drawdown to ensure your strategy has an edge.",
    quiz: [
      {
        question: "What is considered a good profit factor?",
        options: ["Above 0.5", "Above 1.0", "Above 1.5", "Above 3.0"],
        correctAnswer: 2,
        explanation: "A profit factor above 1.5 indicates a robust strategy with healthy profit margins."
      }
    ]
  },

  "lesson-5-3": {
    sections: [
      {
        title: "Creating Your Trading Plan",
        content: [
          "A trading plan is your rulebook - it documents everything about your approach.",
          "Include: Markets traded, timeframes, entry/exit rules, risk management, daily routine.",
          "Write it down. Review it daily. Update it quarterly.",
          "Your plan removes emotion and provides accountability."
        ]
      },
      {
        title: "Essential Plan Components",
        content: [
          "Trading Goals: Specific, measurable objectives (e.g., 10% monthly return).",
          "Risk Rules: Maximum risk per trade, daily loss limit, position limits.",
          "Entry Criteria: Exact conditions that must be met before entering.",
          "Exit Criteria: When to take profits and cut losses.",
          "Daily Routine: Pre-market analysis, trading hours, post-trade review."
        ]
      }
    ],
    keyPoints: [
      "A written plan prevents emotional decisions",
      "Review your plan before every trading session",
      "Update plan based on performance data, not emotions",
      "Share plan with mentor or accountability partner"
    ],
    summary: "Your trading plan is your roadmap to success. It documents your strategy, risk rules, and routine, keeping you disciplined and accountable.",
    quiz: [
      {
        question: "Why is it important to write down your trading plan?",
        options: ["To impress others", "For tax purposes", "To prevent emotional decisions", "It's not important"],
        correctAnswer: 2,
        explanation: "A written plan prevents emotional, impulsive decisions by providing clear rules to follow."
      }
    ]
  },

  "lesson-5-4": {
    sections: [
      {
        title: "Forward Testing (Demo Trading)",
        content: [
          "After backtesting, trade your strategy in real-time using a demo account.",
          "Forward testing reveals issues that backtesting can't: slippage, emotions, execution delays.",
          "Trade demo account for at least 3 months before risking real money.",
          "If demo results don't match backtest, investigate why before going live."
        ]
      },
      {
        title: "Common Demo Trading Mistakes",
        content: [
          "Not taking it seriously - demo must mirror real account behavior.",
          "Using unrealistic position sizes - match what you'll actually trade.",
          "Skipping trades - follow your plan exactly as you would with real money.",
          "Rushing to live trading - patience in demo saves money later."
        ]
      }
    ],
    keyPoints: [
      "Demo trade for minimum 3 months",
      "Treat demo account like real money",
      "Match demo conditions to planned live trading",
      "Use demo to build confidence and refine execution"
    ],
    summary: "Forward testing on a demo account validates your strategy in real-time conditions. Trade demo seriously for at least 3 months before risking capital.",
    quiz: [
      {
        question: "What is the minimum recommended demo trading period before going live?",
        options: ["1 week", "1 month", "3 months", "1 year"],
        correctAnswer: 2,
        explanation: "At least 3 months of demo trading allows you to experience various market conditions and build confidence."
      }
    ]
  },

  "lesson-5-5": {
    sections: [
      {
        title: "Continuous Improvement",
        content: [
          "Trading is a skill that requires constant refinement.",
          "Review your trades weekly: What worked? What didn't? Why?",
          "Track performance metrics monthly: Are you meeting your goals?",
          "Adapt to changing markets - what worked last year may not work now."
        ]
      },
      {
        title: "Learning from Mistakes",
        content: [
          "Every losing trade is a learning opportunity.",
          "Categorize mistakes: Technical errors, psychological errors, or just unlucky?",
          "Focus on eliminating recurring mistakes first.",
          "Celebrate when you follow your plan perfectly, even if the trade loses."
        ]
      }
    ],
    keyPoints: [
      "Review performance weekly and monthly",
      "Learn from both winners and losers",
      "Adapt strategy to changing market conditions",
      "Focus on process improvement, not just profits"
    ],
    summary: "Trading mastery requires continuous improvement. Review trades regularly, learn from mistakes, and adapt your approach as markets evolve.",
    quiz: [
      {
        question: "What should you celebrate even if a trade loses money?",
        options: ["The loss itself", "Following your plan perfectly", "Cutting the loss quickly", "Nothing"],
        correctAnswer: 1,
        explanation: "Following your plan perfectly is success, regardless of outcome. You control your process, not the result of each trade."
      }
    ]
  },

  // MODULE 6: Practical Trading (8 lessons)
  "lesson-6-1": {
    sections: [
      {
        title: "Choosing a Broker",
        content: [
          "Your broker is your gateway to the markets. Choose wisely.",
          "Regulation: Only trade with regulated brokers (FCA, ASIC, CySEC, etc.).",
          "Spreads & Commissions: Compare costs across multiple brokers.",
          "Execution Quality: Fast, reliable execution without requotes.",
          "Platform: User-friendly with necessary tools and mobile access."
        ]
      },
      {
        title: "Red Flags to Avoid",
        content: [
          "Unregulated brokers or those in offshore tax havens.",
          "Promises of guaranteed profits or no-risk trading.",
          "Pressure to deposit more money or trade specific products.",
          "Poor customer reviews or withdrawal problems.",
          "Overly generous bonuses with impossible withdrawal conditions."
        ]
      }
    ],
    keyPoints: [
      "Only use regulated brokers from reputable jurisdictions",
      "Compare spreads, commissions, and execution quality",
      "Read reviews and check for withdrawal complaints",
      "Avoid brokers with aggressive sales tactics or unrealistic promises"
    ],
    summary: "Choosing the right broker is crucial. Prioritize regulation, fair pricing, and reliable execution over bonuses and marketing hype.",
    quiz: [
      {
        question: "What is the most important factor when choosing a broker?",
        options: ["Largest bonus", "Lowest spreads", "Proper regulation", "Best advertising"],
        correctAnswer: 2,
        explanation: "Proper regulation from recognized authorities is the most important factor for protecting your funds."
      }
    ]
  },

  "lesson-6-2": {
    sections: [
      {
        title: "Setting Up Your Trading Platform",
        content: [
          "Most brokers offer MetaTrader 4/5, cTrader, or proprietary platforms.",
          "Customize your workspace: charts, watchlists, indicators.",
          "Set up templates to quickly apply your preferred chart settings.",
          "Enable one-click trading for faster execution (use carefully!)."
        ]
      },
      {
        title: "Essential Platform Features",
        content: [
          "Multiple timeframe charts for comprehensive analysis.",
          "Drawing tools: trend lines, support/resistance, Fibonacci.",
          "Indicators: Add only those you actually use in your strategy.",
          "Trade management: Quick access to modify/close positions.",
          "Alerts: Notify you when price reaches key levels."
        ]
      }
    ],
    keyPoints: [
      "Customize platform to match your strategy needs",
      "Less is more - don't clutter with unused indicators",
      "Use templates for consistent chart setup",
      "Practice platform navigation before live trading"
    ],
    summary: "A well-organized trading platform improves efficiency and reduces errors. Customize it to support your strategy without overwhelming you with information.",
    quiz: [
      {
        question: "What is the benefit of creating chart templates?",
        options: ["Looks professional", "Impresses other traders", "Quickly apply preferred settings", "Required by brokers"],
        correctAnswer: 2,
        explanation: "Templates allow you to quickly apply your preferred chart settings across multiple currency pairs, saving time and ensuring consistency."
      }
    ]
  },

  "lesson-6-3": {
    sections: [
      {
        title: "Reading Economic Calendars",
        content: [
          "Economic events drive currency movements. The economic calendar lists upcoming releases.",
          "High-impact events (marked red): NFP, interest rates, GDP, inflation data.",
          "Medium-impact (marked orange): retail sales, housing data, PMI.",
          "Low-impact (marked yellow): minor data releases.",
          "Many traders avoid or reduce positions before high-impact events."
        ]
      },
      {
        title: "Trading Around News",
        content: [
          "News creates volatility and can invalidate technical analysis temporarily.",
          "Option 1: Close positions before major news (reduces risk).",
          "Option 2: Stay out until after news settles (safer for beginners).",
          "Option 3: Trade the news (requires experience and fast execution).",
          "Never hold large positions through unexpected major news."
        ]
      }
    ],
    keyPoints: [
      "Check economic calendar daily before trading",
      "High-impact news can cause extreme volatility",
      "Beginners should avoid trading during major releases",
      "Plan your approach to news events in advance"
    ],
    examples: [
      {
        title: "NFP Friday",
        content: "US Non-Farm Payrolls (NFP) released first Friday of month. USD pairs often move 100+ pips in minutes. Many traders close positions before 8:30 AM EST."
      }
    ],
    summary: "Economic calendars help you anticipate market-moving events. Beginners should avoid trading during high-impact news until they gain experience.",
    quiz: [
      {
        question: "What is the safest approach for beginners during high-impact news?",
        options: ["Trade with maximum leverage", "Stay out until news settles", "Increase position size", "Ignore the calendar"],
        correctAnswer: 1,
        explanation: "Staying out of the market until high-impact news settles is the safest approach for beginners."
      }
    ]
  },

  "lesson-6-4": {
    sections: [
      {
        title: "Your First Live Trade",
        content: [
          "Start small - use micro lots (0.01) or minimum position sizes.",
          "Risk even less than your plan (0.5% instead of 1%) on your first trades.",
          "Expect emotional reactions - live trading feels different than demo.",
          "Focus on executing your plan correctly, not on making money."
        ]
      },
      {
        title: "Common First-Trade Mistakes",
        content: [
          "Trading too large due to excitement or impatience.",
          "Abandoning your strategy at first sign of trouble.",
          "Checking positions constantly, increasing emotional stress.",
          "Comparing yourself to others' results.",
          "Expecting immediate profits instead of focusing on learning."
        ]
      }
    ],
    keyPoints: [
      "Start with smallest possible position sizes",
      "Risk less than normal on first live trades",
      "Emotions will be stronger than in demo",
      "Focus on process, not immediate results"
    ],
    summary: "Your first live trades are about learning to manage emotions, not making money. Start small and focus on executing your plan correctly.",
    quiz: [
      {
        question: "What should be your primary focus on your first live trades?",
        options: ["Making maximum profit", "Executing your plan correctly", "Proving you're right", "Beating other traders"],
        correctAnswer: 1,
        explanation: "Early live trading is about learning to follow your plan with real money, not about profits."
      }
    ]
  },

  "lesson-6-5": {
    sections: [
      {
        title: "Keeping a Trading Journal",
        content: [
          "Document every trade: entry/exit, reasoning, result, emotions.",
          "Screenshot your charts at entry and exit points.",
          "Note: What worked? What didn't? What would you do differently?",
          "Review journal weekly to identify patterns in your behavior."
        ]
      },
      {
        title: "What to Track",
        content: [
          "Trade details: pair, direction, entry/exit prices, lot size.",
          "Why you entered: setup, technical/fundamental reasons.",
          "Emotional state: confident, fearful, impatient, etc.",
          "Mistakes made: too early, too large, wrong setup, etc.",
          "Lessons learned: what this trade taught you."
        ]
      }
    ],
    keyPoints: [
      "Journal every single trade without exception",
      "Include screenshots for visual reference",
      "Track emotions, not just numbers",
      "Review regularly to identify improvement areas"
    ],
    summary: "A trading journal is your most valuable learning tool. It reveals patterns in your behavior and helps you learn from both winners and losers.",
    quiz: [
      {
        question: "Besides trade details, what is most important to track in your journal?",
        options: ["Broker used", "Time of day", "Emotional state", "Weather conditions"],
        correctAnswer: 2,
        explanation: "Tracking your emotional state helps you identify psychological patterns that affect your trading decisions."
      }
    ]
  },

  "lesson-6-6": {
    sections: [
      {
        title: "Managing Open Positions",
        content: [
          "Once in a trade, let your plan guide you - don't micromanage.",
          "Avoid constantly checking positions - set alerts instead.",
          "Never move stop-loss further away (increasing risk).",
          "Consider trailing stops to protect profits in trending moves.",
          "Don't add to losing positions (averaging down) - this multiplies risk."
        ]
      },
      {
        title: "Taking Profits",
        content: [
          "Have a profit target before entering the trade.",
          "Don't get greedy - take profits when target is hit.",
          "Consider scaling out: take partial profits, let rest run.",
          "Never let a winning trade turn into a loser - protect profits with stops."
        ]
      }
    ],
    keyPoints: [
      "Let your plan manage trades, not your emotions",
      "Use alerts instead of constant monitoring",
      "Never increase risk after entering",
      "Take profits at predetermined targets"
    ],
    summary: "Proper position management follows your predetermined plan. Set it and forget it - trust your analysis and let the trade work.",
    quiz: [
      {
        question: "What should you do if a trade is winning but hasn't hit your target?",
        options: ["Close immediately", "Move stop to breakeven", "Remove stop-loss", "Add more positions"],
        correctAnswer: 1,
        explanation: "Moving your stop-loss to breakeven protects profits while giving the trade room to reach your target."
      }
    ]
  },

  "lesson-6-7": {
    sections: [
      {
        title: "Handling Losing Streaks",
        content: [
          "Losing streaks are inevitable - even with a good strategy.",
          "With 60% win rate, you can still have 5+ losses in a row.",
          "Don't abandon your strategy after a few losses.",
          "Review trades: Are you following your plan? Is market structure different?",
          "If following plan correctly, continue. If not, identify and fix mistakes."
        ]
      },
      {
        title: "When to Stop Trading",
        content: [
          "Hit your daily/weekly loss limit - stop immediately.",
          "Feeling emotional, angry, or desperate - take a break.",
          "Making impulsive decisions outside your plan - step away.",
          "Physical/mental exhaustion - rest is essential for performance.",
          "Return when you're calm and can follow your plan objectively."
        ]
      }
    ],
    keyPoints: [
      "Losing streaks are normal and expected",
      "Stick to your plan if executing correctly",
      "Respect daily/weekly loss limits",
      "Take breaks when emotional or exhausted"
    ],
    summary: "Losing streaks test your discipline. If following your plan correctly, continue. If emotional or hitting loss limits, take a break.",
    quiz: [
      {
        question: "What should you do when you hit your daily loss limit?",
        options: ["Trade larger to recover", "Switch strategies", "Stop trading immediately", "Ignore the limit"],
        correctAnswer: 2,
        explanation: "Daily loss limits exist to protect you. Stop immediately when hit, regardless of how you feel."
      }
    ]
  },

  "lesson-6-8": {
    sections: [
      {
        title: "Long-Term Success Principles",
        content: [
          "Trading is a marathon, not a sprint. Focus on sustainable results.",
          "Protect your capital above all - you can't trade without it.",
          "Continuous education: markets evolve, you must evolve with them.",
          "Build a network: learn from other traders, share experiences.",
          "Maintain work-life balance - trading shouldn't consume your entire life."
        ]
      },
      {
        title: "Your Trading Journey",
        content: [
          "Year 1: Focus on learning and not losing money (breakeven is success).",
          "Year 2: Refine strategy and achieve consistent small profits.",
          "Year 3+: Scale up carefully as you prove consistent profitability.",
          "Most successful traders took years to become consistently profitable.",
          "Be patient with yourself and trust the process."
        ]
      }
    ],
    keyPoints: [
      "Focus on long-term sustainable success",
      "Capital preservation is priority one",
      "Continue learning and adapting",
      "Realistic timeline: years, not months",
      "Balance trading with rest of your life"
    ],
    riskWarning: "Trading involves substantial risk. Most traders lose money, especially in the first year. Only trade with money you can afford to lose, and never borrow money to trade.",
    summary: "Trading success is a long journey requiring patience, discipline, and continuous learning. Focus on process over profits, and sustainable growth over quick wins.",
    quiz: [
      {
        question: "What is a realistic goal for your first year of trading?",
        options: ["Double your account", "Quit your job", "Breakeven while learning", "Become an expert"],
        correctAnswer: 2,
        explanation: "Breakeven in your first year while learning and building experience is a realistic and successful outcome."
      }
    ]
  }
};
