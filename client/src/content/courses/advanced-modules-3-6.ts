/**
 * Advanced Course - Modules 3-6
 * Module 3: Fundamental Analysis (remaining lessons)
 * Module 4: Advanced Strategies (5 lessons)
 * Module 5: Algorithmic & System Trading (5 lessons)
 * Module 6: Professional Trading (5 lessons)
 */

import type { LessonContent } from './beginner-lessons';

export const advancedModules3To6: Record<string, LessonContent> = {
  // MODULE 4: Advanced Strategies (5 lessons)
  "advanced-4-1": {
    sections: [
      {
        title: "Scalping Strategy",
        content: [
          "Scalping: Very short-term trading (seconds to minutes per trade).",
          "Goal: Small profits many times per day (5-20 pips per trade).",
          "Requires tight spreads, fast execution, and intense focus.",
          "Best during high-liquidity sessions (London/New York overlap).",
          "Not suitable for beginners - requires experience and discipline."
        ]
      },
      {
        title: "Scalping Requirements",
        content: [
          "Ultra-low latency platform and connection.",
          "Pairs with tightest spreads (EUR/USD, USD/JPY).",
          "Very tight risk management (3-5 pip stops).",
          "High win rate needed (70%+) due to small R:R.",
          "Significant time commitment during trading hours."
        ]
      }
    ],
    keyPoints: [
      "Scalping targets 5-20 pips multiple times daily",
      "Requires very tight spreads and fast execution",
      "High win rate necessary with small R:R ratios",
      "Intense time and mental commitment required"
    ],
    examples: [
      {
        title: "EUR/USD Scalp",
        content: "Enter long at 1.1000 during London open. Target +10 pips (1.1010), stop -5 pips (1.0995). 2:1 R:R, 70% win rate needed for profitability."
      }
    ],
    summary: "Scalping requires speed, precision, and discipline. It's profitable for experienced traders with proper setup but unsuitable for beginners.",
    quiz: [
      {
        question: "What win rate is typically needed for profitable scalping?",
        options: ["40%", "55%", "70%+", "90%+"],
        correctAnswer: 2,
        explanation: "Scalping uses small R:R ratios (often 2:1), so a win rate of 70% or higher is typically needed for consistent profitability."
      }
    ]
  },

  "advanced-4-2": {
    sections: [
      {
        title: "Swing Trading Strategy",
        content: [
          "Swing trading: Hold positions for days to weeks.",
          "Capture larger price swings (50-200+ pips).",
          "Less time-intensive than day trading or scalping.",
          "Based on higher timeframes (H4, Daily charts).",
          "Suitable for traders with full-time jobs."
        ]
      },
      {
        title: "Swing Trading Approach",
        content: [
          "Identify trend on Daily chart.",
          "Wait for pullback to key support/resistance or moving average.",
          "Enter on lower timeframe confirmation (H1).",
          "Set wider stops (50-100 pips) to accommodate swings.",
          "Target major S/R levels for exits (100-300 pips)."
        ]
      }
    ],
    keyPoints: [
      "Hold trades for days to weeks",
      "Capture larger price swings",
      "Less time-intensive than day trading",
      "Suitable for those with limited screen time"
    ],
    examples: [
      {
        title: "GBP/USD Swing",
        content: "Daily uptrend. Enter on pullback to 50 EMA at 1.2500. Stop below structure at 1.2400 (-100 pips). Target resistance at 1.2800 (+300 pips). 3:1 R:R."
      }
    ],
    summary: "Swing trading offers excellent risk-reward while requiring minimal screen time. Perfect for traders who can't monitor markets constantly.",
    quiz: [
      {
        question: "What is the typical holding period for swing trades?",
        options: ["Minutes to hours", "Hours to days", "Days to weeks", "Months to years"],
        correctAnswer: 2,
        explanation: "Swing trades are typically held for days to weeks to capture larger price swings."
      }
    ]
  },

  "advanced-4-3": {
    sections: [
      {
        title: "Breakout Trading Strategy",
        content: [
          "Trade breakouts from consolidation ranges or chart patterns.",
          "High-probability when combined with volume confirmation.",
          "False breakouts are the main risk - wait for confirmation.",
          "Best during start of trading sessions when volatility increases.",
          "Works in both ranging and trending markets."
        ]
      },
      {
        title: "Breakout Confirmation",
        content: [
          "Wait for strong close beyond level (not just a wick).",
          "Look for volume increase on breakout.",
          "Enter on retest of broken level (lower risk).",
          "Or enter on continuation after brief consolidation.",
          "Tight stops below/above the broken level."
        ]
      }
    ],
    keyPoints: [
      "Trade breakouts from ranges or patterns",
      "Confirm with volume and strong close",
      "Retests offer safer entries",
      "False breakouts are primary risk"
    ],
    examples: [
      {
        title: "Triangle Breakout",
        content: "EUR/USD consolidates in triangle for 2 weeks. Breaks above 1.1050 resistance with volume. Enter on retest at 1.1055, stop below 1.1040. Target 1.1150."
      }
    ],
    summary: "Breakout trading captures explosive moves from consolidation. Confirm with volume and structure to avoid false breakouts.",
    quiz: [
      {
        question: "What is the safest way to trade a breakout?",
        options: ["Enter immediately on break", "Wait for retest of broken level", "Enter before breakout", "Avoid breakouts entirely"],
        correctAnswer: 1,
        explanation: "Waiting for a retest of the broken level provides confirmation and often a better entry price with tighter stops."
      }
    ]
  },

  "advanced-4-4": {
    sections: [
      {
        title: "Range Trading Strategy",
        content: [
          "Trade between well-defined support and resistance.",
          "Buy at support, sell at resistance.",
          "Works in sideways, non-trending markets.",
          "Requires patience to wait for edges of range.",
          "Exit when range breaks (trend emerges)."
        ]
      },
      {
        title: "Range Trading Rules",
        content: [
          "Identify clear, tested support and resistance levels.",
          "Wait for price to reach extremes before entering.",
          "Use oscillators (RSI, Stochastics) for timing.",
          "Tight stops just beyond support/resistance.",
          "Take profits near opposite side of range."
        ]
      }
    ],
    keyPoints: [
      "Trade bounces between support and resistance",
      "Works best in clearly ranging markets",
      "Use oscillators for entry timing",
      "Exit when range breaks"
    ],
    examples: [
      {
        title: "USD/CAD Range",
        content: "Trading between 1.3200-1.3400 for 3 weeks. Buy at 1.3210 when RSI oversold, target 1.3390, stop 1.3180. Sell at 1.3390 when RSI overbought."
      }
    ],
    summary: "Range trading is profitable in sideways markets. Identify clear boundaries and trade bounces with tight risk management.",
    quiz: [
      {
        question: "When should you exit a range trading strategy?",
        options: ["After one trade", "When bored", "When range breaks", "Never"],
        correctAnswer: 2,
        explanation: "Exit range trading when the range breaks, as this signals a potential trend is beginning."
      }
    ]
  },

  "advanced-4-5": {
    sections: [
      {
        title: "News Trading Strategy",
        content: [
          "Trade volatile moves following major economic releases.",
          "High risk, high reward approach.",
          "Requires fast execution and wide stops.",
          "Focus on high-impact events: NFP, interest rates, GDP.",
          "Not recommended for beginners due to extreme volatility."
        ]
      },
      {
        title: "News Trading Approaches",
        content: [
          "Breakout approach: Set pending orders both ways, cancel one after breakout.",
          "Fade approach: Trade reversals after initial spike (contrarian).",
          "Confirmation approach: Wait 15-30 min for direction, then enter.",
          "All approaches require wider stops (50-100 pips) due to volatility."
        ]
      }
    ],
    keyPoints: [
      "Extreme volatility during major news releases",
      "Requires fast execution and wide stops",
      "Multiple approaches: breakout, fade, or confirmation",
      "High risk - only for experienced traders"
    ],
    riskWarning: "News trading involves extreme volatility, slippage, and widened spreads. Only trade news with capital you can afford to lose and after extensive practice.",
    summary: "News trading capitalizes on volatility from economic releases. It's high-risk and requires experience, but can be very profitable.",
    quiz: [
      {
        question: "Why are wider stops necessary for news trading?",
        options: ["Brokers require it", "Extreme volatility and slippage", "To make more profit", "It's not necessary"],
        correctAnswer: 1,
        explanation: "Major news causes extreme volatility, slippage, and rapid price swings that require wider stops to avoid premature stop-outs."
      }
    ]
  },

  // MODULE 5: Algorithmic & System Trading (5 lessons)
  "advanced-5-1": {
    sections: [
      {
        title: "Introduction to Algorithmic Trading",
        content: [
          "Algorithmic trading: Using computer programs to execute trades automatically.",
          "Removes emotion and ensures consistent execution.",
          "Can test strategies on years of data in minutes.",
          "Operates 24/7 without fatigue.",
          "Requires programming skills or trading platform expertise (MetaTrader, etc.)."
        ]
      },
      {
        title: "Types of Trading Algorithms",
        content: [
          "Trend-following algos: Follow moving averages and momentum.",
          "Mean-reversion algos: Trade reversals from extremes.",
          "Arbitrage algos: Exploit price differences across markets.",
          "Market-making algos: Provide liquidity for profit.",
          "Choose based on market conditions and available tools."
        ]
      }
    ],
    keyPoints: [
      "Algorithms execute trades automatically based on rules",
      "Eliminates emotional decision-making",
      "Enables rapid backtesting and 24/7 operation",
      "Requires technical skills or expert advisors (EAs)"
    ],
    summary: "Algorithmic trading automates strategy execution, removing emotion and enabling systematic testing. It's powerful but requires technical expertise.",
    quiz: [
      {
        question: "What is the primary benefit of algorithmic trading?",
        options: ["Guaranteed profits", "Removes emotional decisions", "No risk", "Less work"],
        correctAnswer: 1,
        explanation: "The primary benefit is removing emotional decision-making by executing pre-defined rules consistently."
      }
    ]
  },

  "advanced-5-2": {
    sections: [
      {
        title: "Building Trading Systems",
        content: [
          "Define clear entry and exit rules that can be coded.",
          "Must be objective - no subjective interpretation.",
          "Include risk management: position sizing, stops, targets.",
          "Test extensively on historical data (backtest).",
          "Forward test on demo before live deployment."
        ]
      },
      {
        title: "System Components",
        content: [
          "Entry logic: Specific conditions that trigger trades.",
          "Exit logic: When to close for profit or loss.",
          "Risk management: Position sizing and stop placement.",
          "Filters: Additional conditions to improve quality.",
          "Money management: How much to risk per trade."
        ]
      }
    ],
    keyPoints: [
      "Systems require objective, codeable rules",
      "Must include complete risk and money management",
      "Extensive testing is mandatory",
      "Forward test before live trading"
    ],
    summary: "Building robust trading systems requires clear rules, comprehensive testing, and disciplined execution. Objectivity is essential.",
    quiz: [
      {
        question: "What does it mean for trading rules to be 'objective'?",
        options: ["They make money", "They can be clearly defined and coded", "They're complex", "They're secret"],
        correctAnswer: 1,
        explanation: "Objective rules can be clearly defined, measured, and programmed without subjective interpretation."
      }
    ]
  },

  "advanced-5-3": {
    sections: [
      {
        title: "Backtesting Methodologies",
        content: [
          "Historical testing: Apply rules to past data to evaluate performance.",
          "Walk-forward analysis: Test on one period, validate on next period.",
          "Out-of-sample testing: Reserve data that system hasn't seen.",
          "Monte Carlo simulation: Test robustness under random scenarios.",
          "All methods help validate system before risking capital."
        ]
      },
      {
        title: "Avoiding Curve-Fitting",
        content: [
          "Curve-fitting (over-optimization): System works perfectly on past data but fails live.",
          "Use simple systems with few parameters.",
          "Test across multiple markets and timeframes.",
          "Require minimum sample size (100+ trades).",
          "If performance seems too good, it's probably curve-fit."
        ]
      }
    ],
    keyPoints: [
      "Multiple testing methods validate system robustness",
      "Curve-fitting makes systems fail in live trading",
      "Simplicity and broad testing prevent over-optimization",
      "Require statistical significance (100+ trades)"
    ],
    summary: "Proper backtesting validates your system while avoiding curve-fitting. Use multiple methodologies and maintain simplicity.",
    quiz: [
      {
        question: "What is curve-fitting in trading systems?",
        options: ["Making charts curved", "Over-optimization to past data", "Fitting stops to price", "Chart pattern trading"],
        correctAnswer: 1,
        explanation: "Curve-fitting is over-optimizing a system to past data, making it perform perfectly historically but fail in live trading."
      }
    ]
  },

  "advanced-5-4": {
    sections: [
      {
        title: "Risk of Ruin Analysis",
        content: [
          "Risk of Ruin: Probability of losing your entire account.",
          "Calculated from win rate, R:R, and risk per trade.",
          "Even profitable systems have non-zero risk of ruin.",
          "Lower risk per trade = lower risk of ruin.",
          "Target risk of ruin below 1% for safety."
        ]
      },
      {
        title: "Calculating Risk of Ruin",
        content: [
          "Simple formula: Risk of Ruin = [(1-W)/(1+W)]^N",
          "W = edge percentage, N = number of trades to zero.",
          "Online calculators available for complex scenarios.",
          "Reduce by: lower risk per trade, improve win rate, better R:R."
        ]
      }
    ],
    keyPoints: [
      "Risk of ruin is probability of total account loss",
      "Even winning systems have non-zero risk",
      "Lower risk per trade dramatically reduces risk of ruin",
      "Target below 1% for long-term survival"
    ],
    summary: "Understanding risk of ruin helps size positions appropriately. Even good systems fail without proper risk management.",
    quiz: [
      {
        question: "What is the best way to reduce risk of ruin?",
        options: ["Trade more often", "Increase position size", "Lower risk per trade", "Use more leverage"],
        correctAnswer: 2,
        explanation: "Lowering risk per trade is the most effective way to reduce risk of ruin and ensure long-term survival."
      }
    ]
  },

  "advanced-5-5": {
    sections: [
      {
        title: "System Monitoring and Optimization",
        content: [
          "Monitor system performance continuously.",
          "Track: win rate, profit factor, drawdown, expectancy.",
          "Compare live results to backtest - significant deviation needs investigation.",
          "Markets change - systems need periodic review and adjustment.",
          "Don't abandon system after short losing streak."
        ]
      },
      {
        title: "When to Stop a System",
        content: [
          "Drawdown exceeds historical maximum by 50%.",
          "Win rate or profit factor significantly below backtest.",
          "Market structure fundamentally changes.",
          "System logic no longer makes sense for current conditions.",
          "Never stop due to short-term losses within normal parameters."
        ]
      }
    ],
    keyPoints: [
      "Continuously monitor performance metrics",
      "Compare live results to backtest expectations",
      "Systems need periodic review and adjustment",
      "Only stop system for objective, significant reasons"
    ],
    summary: "Successful system trading requires ongoing monitoring and disciplined execution. React to real problems, not normal variance.",
    quiz: [
      {
        question: "When should you stop trading a system?",
        options: ["After any loss", "After 3 losses in a row", "When drawdown significantly exceeds backtest", "Never"],
        correctAnswer: 2,
        explanation: "Stop a system when drawdown significantly exceeds historical expectations, indicating something fundamental has changed."
      }
    ]
  },

  // MODULE 6: Professional Trading (5 lessons)
  "advanced-6-1": {
    sections: [
      {
        title: "Transitioning to Professional Trading",
        content: [
          "Professional trading means consistent profitability over years.",
          "Requires: proven track record (2+ years), adequate capital, risk management.",
          "Don't quit your job until you have 12 months expenses + trading capital.",
          "Most professionals took 3-5 years to reach consistent profitability.",
          "Mental and emotional resilience is as important as strategy."
        ]
      },
      {
        title: "Capital Requirements",
        content: [
          "Minimum $50,000 to trade full-time profitably.",
          "10% annual return = $5,000/year on $50k (not enough to live on).",
          "Realistically need $200,000+ for comfortable living income.",
          "Or trade prop firm capital to leverage skills without large capital.",
          "Never borrow money or use family's savings to trade."
        ]
      }
    ],
    keyPoints: [
      "Professional trading requires years of proven success",
      "Need substantial capital or prop firm funding",
      "Mental resilience equals technical skill in importance",
      "Don't quit day job prematurely"
    ],
    riskWarning: "Most traders fail to achieve consistent profitability. Trading should never risk money needed for living expenses, debt payments, or emergencies.",
    summary: "The path to professional trading is long and demanding. Ensure you have proven profitability, adequate capital, and emotional resilience.",
    quiz: [
      {
        question: "What is a realistic minimum capital requirement for full-time trading?",
        options: ["$5,000", "$10,000", "$50,000+", "$1,000,000+"],
        correctAnswer: 2,
        explanation: "Realistically, $50,000 minimum is needed, though $200,000+ is more comfortable for generating living income from trading returns."
      }
    ]
  },

  "advanced-6-2": {
    sections: [
      {
        title: "Proprietary Trading Firms",
        content: [
          "Prop firms provide capital to skilled traders.",
          "You trade their money, keep 50-90% of profits.",
          "Must pass evaluation (challenge) to get funded.",
          "Lower personal capital requirement.",
          "Restrictions: daily loss limits, drawdown limits, prohibited instruments."
        ]
      },
      {
        title: "Prop Firm Evaluation",
        content: [
          "Typical challenge: Achieve 10% profit within 30-60 days.",
          "Must respect maximum daily loss (5%) and total drawdown (10%).",
          "Once passed, trade live funded account.",
          "Failed challenges forfeit evaluation fee ($100-500).",
          "Research firm reputation - many scams exist."
        ]
      }
    ],
    keyPoints: [
      "Prop firms fund traders in exchange for profit split",
      "Must pass evaluation to get funded",
      "Lower capital requirement than solo trading",
      "Research firm reputation carefully"
    ],
    summary: "Prop firms offer a path to professional trading with less personal capital. Choose reputable firms and understand their rules completely.",
    quiz: [
      {
        question: "What is the main benefit of trading with a prop firm?",
        options: ["Guaranteed salary", "Trade larger capital than you own", "No risk", "Instant profits"],
        correctAnswer: 1,
        explanation: "Prop firms allow you to trade much larger capital than you personally own, in exchange for sharing profits."
      }
    ]
  },

  "advanced-6-3": {
    sections: [
      {
        title: "Tax and Legal Considerations",
        content: [
          "Trading profits are taxable income in most countries.",
          "Keep detailed records of all trades.",
          "Consult tax professional familiar with trading.",
          "Some jurisdictions allow trader tax status with additional deductions.",
          "Legal structure (LLC, etc.) may provide benefits.",
          "Ensure you're trading legally in your jurisdiction."
        ]
      },
      {
        title: "Record Keeping",
        content: [
          "Document every trade: entry, exit, P/L.",
          "Save monthly/annual statements from broker.",
          "Track expenses: data fees, platform costs, education.",
          "Use trading software or spreadsheets for organization.",
          "Maintain records for 5-7 years (tax requirements)."
        ]
      }
    ],
    keyPoints: [
      "Trading profits are taxable - consult tax professional",
      "Keep meticulous records of all trades and expenses",
      "Consider legal structure for tax benefits",
      "Ensure compliance with local regulations"
    ],
    summary: "Proper tax planning and record-keeping are essential for professional traders. Consult experts to optimize your legal and tax situation.",
    quiz: [
      {
        question: "Why is detailed record-keeping important for traders?",
        options: ["Impresses friends", "Required for taxes", "Wastes time", "Not important"],
        correctAnswer: 1,
        explanation: "Detailed records are required for tax purposes and help you analyze performance to improve your trading."
      }
    ]
  },

  "advanced-6-4": {
    sections: [
      {
        title: "Building a Trading Business",
        content: [
          "Treat trading as a business, not gambling.",
          "Business plan: strategy, capital, risk management, goals.",
          "Separate trading capital from personal funds.",
          "Reinvest profits for compound growth.",
          "Regular withdrawals for living expenses (salary).",
          "Continue education and strategy refinement."
        ]
      },
      {
        title: "Performance Metrics",
        content: [
          "Track ROI, Sharpe ratio, maximum drawdown monthly.",
          "Compare against benchmarks and past performance.",
          "Set realistic annual goals (15-30% for retail traders).",
          "Focus on consistency over huge wins.",
          "Bad month? Analyze, learn, adjust - don't panic."
        ]
      }
    ],
    keyPoints: [
      "Treat trading as a professional business",
      "Separate trading and personal finances",
      "Track comprehensive performance metrics",
      "Set realistic, achievable goals"
    ],
    summary: "Building a sustainable trading business requires professional structure, realistic goals, and continuous improvement.",
    quiz: [
      {
        question: "What is a realistic annual return goal for retail traders?",
        options: ["5-10%", "15-30%", "100-200%", "1000%+"],
        correctAnswer: 1,
        explanation: "Realistic annual returns for retail traders range from 15-30%. Anything significantly higher involves excessive risk."
      }
    ]
  },

  "advanced-6-5": {
    sections: [
      {
        title: "Long-Term Success Principles",
        content: [
          "Consistency beats perfection - small edge over time wins.",
          "Preserve capital above all else.",
          "Adapt to changing markets - what worked yesterday may not work tomorrow.",
          "Network with other professional traders.",
          "Maintain work-life balance and physical/mental health.",
          "Never stop learning and improving."
        ]
      },
      {
        title: "Avoiding Burnout",
        content: [
          "Trading is mentally exhausting - take regular breaks.",
          "Don't trade when tired, emotional, or distracted.",
          "Have hobbies and interests outside trading.",
          "Exercise regularly for mental clarity.",
          "Build support system: family, friends, trading community.",
          "Remember: You can't trade if you're burned out."
        ]
      }
    ],
    keyPoints: [
      "Consistency and capital preservation are paramount",
      "Continuous learning and adaptation required",
      "Work-life balance prevents burnout",
      "Physical and mental health directly impact performance"
    ],
    riskWarning: "Trading is inherently stressful. Prioritize mental and physical health. Seek professional help if trading negatively impacts your well-being.",
    summary: "Long-term trading success requires balance, continuous improvement, and prioritizing health. It's a marathon, not a sprint.",
    quiz: [
      {
        question: "What is the most important factor for long-term trading success?",
        options: ["Finding the perfect strategy", "Making millions quickly", "Consistency and capital preservation", "Trading 24/7"],
        correctAnswer: 2,
        explanation: "Long-term success comes from consistent execution, capital preservation, and sustainable risk management - not quick wins."
      }
    ]
  }
};
