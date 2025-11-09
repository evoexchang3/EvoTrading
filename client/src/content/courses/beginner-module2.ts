/**
 * Beginner Course - Module 2: Technical Analysis Foundations
 * 6 lessons covering chart patterns, indicators, and analysis tools
 */

import { LessonContent } from './beginner-lessons';

export const module2Lessons: Record<string, LessonContent> = {
  "lesson-2-1": {
    sections: [
      {
        title: "Introduction to Technical Analysis",
        content: [
          "Technical analysis is the study of historical price action to forecast future price movements. Unlike fundamental analysis (which examines economic factors), technical analysis focuses purely on charts and price patterns.",
          "The core belief is that all available information is already reflected in the price, and that price movements follow identifiable patterns that repeat over time.",
          "Technical traders use charts, indicators, and patterns to identify high-probability trading opportunities."
        ]
      },
      {
        title: "Chart Types",
        content: [
          "Line Charts: Connect closing prices with a line. Simple but limited information.",
          "Bar Charts: Show open, high, low, and close (OHLC) for each period. More detailed than line charts.",
          "Candlestick Charts: Most popular among forex traders. Visual representation of OHLC with color-coded bodies showing bullish (green/white) or bearish (red/black) movements."
        ]
      }
    ],
    keyPoints: [
      "Technical analysis studies price action to predict future movements",
      "All information is reflected in the price",
      "Candlestick charts are the most popular and informative",
      "Patterns tend to repeat due to human psychology"
    ],
    summary: "Technical analysis provides a framework for analyzing price movements and identifying trading opportunities. Candlestick charts offer the most visual information, making them the preferred choice for most forex traders.",
    quiz: [
      {
        question: "What does technical analysis primarily focus on?",
        options: ["Economic news", "Historical price action", "Company earnings", "Political events"],
        correctAnswer: 1,
        explanation: "Technical analysis focuses on historical price action and chart patterns to forecast future movements."
      },
      {
        question: "Which chart type is most popular among forex traders?",
        options: ["Line charts", "Bar charts", "Candlestick charts", "Point and figure"],
        correctAnswer: 2,
        explanation: "Candlestick charts are most popular because they display OHLC data in an easy-to-read visual format."
      }
    ]
  },

  "lesson-2-2": {
    sections: [
      {
        title: "Support and Resistance",
        content: [
          "Support is a price level where buying pressure historically overcomes selling pressure, preventing further decline.",
          "Resistance is a price level where selling pressure historically overcomes buying pressure, preventing further rise.",
          "These levels act as psychological barriers where traders make decisions to buy or sell."
        ]
      },
      {
        title: "Identifying Key Levels",
        content: [
          "Look for price levels where reversals have occurred multiple times.",
          "The more times a level is tested, the stronger it becomes.",
          "Round numbers (1.2000, 1.3000) often act as psychological support/resistance.",
          "Previous highs become resistance; previous lows become support."
        ]
      },
      {
        title: "Role Reversal",
        content: [
          "When resistance is broken, it often becomes support.",
          "When support is broken, it often becomes resistance.",
          "This role reversal principle is crucial for identifying entry and exit points."
        ]
      }
    ],
    keyPoints: [
      "Support prevents price from falling; resistance prevents rising",
      "Psychological levels and round numbers are significant",
      "The more times a level is tested, the stronger it becomes",
      "Broken support becomes resistance and vice versa"
    ],
    examples: [
      {
        title: "Role Reversal Example",
        content: "EUR/USD has resistance at 1.2000. Once broken, price pulls back to 1.2000 which now acts as support before continuing higher."
      }
    ],
    summary: "Support and resistance levels are fundamental concepts in technical analysis. They represent price zones where supply and demand dynamics create predictable behavior patterns.",
    quiz: [
      {
        question: "What happens when price breaks through resistance?",
        options: ["It always reverses", "It often becomes support", "It disappears", "It doubles in strength"],
        correctAnswer: 1,
        explanation: "Broken resistance often becomes support in a phenomenon called role reversal."
      },
      {
        question: "What makes a support/resistance level stronger?",
        options: ["Its round number", "Number of times tested", "Recent news", "Broker recommendation"],
        correctAnswer: 1,
        explanation: "The more times a level is tested and holds, the stronger and more significant it becomes."
      }
    ]
  },

  "lesson-2-3": {
    sections: [
      {
        title: "Trend Analysis",
        content: [
          "A trend is the general direction of price movement over time. 'The trend is your friend' is a fundamental trading principle.",
          "Uptrend: Series of higher highs and higher lows. Bulls are in control.",
          "Downtrend: Series of lower highs and lower lows. Bears are in control.",
          "Sideways/Range: Price moves between support and resistance without clear direction."
        ]
      },
      {
        title: "Trend Lines",
        content: [
          "Uptrend Line: Connect two or more higher lows. Price bouncing off this line confirms the uptrend.",
          "Downtrend Line: Connect two or more lower highs. Price bouncing off confirms the downtrend.",
          "Trend lines act as dynamic support/resistance that changes with time."
        ]
      },
      {
        title: "Trading with Trends",
        content: [
          "Buy pullbacks in uptrends (buy low in an overall upward movement).",
          "Sell rallies in downtrends (sell high in an overall downward movement).",
          "Avoid trading against strong trends - 'Don't fight the tape'.",
          "Trend reversals can be identified when trend lines are broken."
        ]
      }
    ],
    keyPoints: [
      "Trends represent the overall direction of price movement",
      "Trade with the trend, not against it",
      "Trend lines provide dynamic support/resistance",
      "Broken trend lines can signal reversals"
    ],
    examples: [
      {
        title: "Uptrend Strategy",
        content: "USD/JPY is in uptrend. Wait for pullback to uptrend line or support, then buy with stop-loss below the trend line."
      }
    ],
    summary: "Trend analysis is essential for successful trading. Identifying the trend direction and trading with it significantly improves your probability of success.",
    quiz: [
      {
        question: "What characterizes an uptrend?",
        options: ["Lower highs and lows", "Higher highs and lows", "Sideways movement", "Random price action"],
        correctAnswer: 1,
        explanation: "An uptrend is characterized by a series of higher highs and higher lows."
      },
      {
        question: "What is the best strategy in a strong uptrend?",
        options: ["Sell at resistance", "Buy pullbacks", "Wait for reversal", "Trade sideways"],
        correctAnswer: 1,
        explanation: "The best strategy in an uptrend is to buy on pullbacks (temporary dips) before the trend continues."
      }
    ]
  },

  "lesson-2-4": {
    sections: [
      {
        title: "Candlestick Patterns",
        content: [
          "Candlestick patterns reveal market psychology and potential reversals or continuations.",
          "Each candle shows four prices: open, high, low, close. The body (thick part) shows open-to-close range. Wicks/shadows show the high and low.",
          "Green/white candles: Close > Open (bullish). Red/black candles: Close < Open (bearish)."
        ]
      },
      {
        title: "Single Candle Patterns",
        content: [
          "Doji: Open equals close. Shows indecision, potential reversal.",
          "Hammer: Small body, long lower wick. Bullish reversal after downtrend.",
          "Shooting Star: Small body, long upper wick. Bearish reversal after uptrend.",
          "Marubozu: No wicks, large body. Strong momentum in one direction."
        ]
      },
      {
        title: "Multiple Candle Patterns",
        content: [
          "Engulfing: Second candle completely covers the first. Bullish or bearish reversal signal.",
          "Morning/Evening Star: Three-candle reversal pattern. Morning star (bullish), Evening star (bearish).",
          "Three White Soldiers: Three consecutive strong bullish candles. Strong upward momentum.",
          "Three Black Crows: Three consecutive strong bearish candles. Strong downward momentum."
        ]
      }
    ],
    keyPoints: [
      "Candlesticks reveal market sentiment and psychology",
      "Single candle patterns signal potential reversals",
      "Multiple candle patterns provide stronger confirmation",
      "Always confirm patterns with support/resistance levels"
    ],
    examples: [
      {
        title: "Hammer Example",
        content: "After a downtrend, price forms a hammer at support. This suggests sellers exhausted, buyers stepping in. Bullish reversal likely."
      }
    ],
    summary: "Candlestick patterns are powerful tools for identifying potential reversals and continuations. Understanding these patterns helps you anticipate market moves before they happen.",
    quiz: [
      {
        question: "What does a Doji candlestick indicate?",
        options: ["Strong buying", "Strong selling", "Market indecision", "Trend continuation"],
        correctAnswer: 2,
        explanation: "A Doji shows that open equals close, indicating market indecision and potential reversal."
      },
      {
        question: "Which pattern is a bullish reversal signal after a downtrend?",
        options: ["Shooting Star", "Hammer", "Evening Star", "Three Black Crows"],
        correctAnswer: 1,
        explanation: "A Hammer (small body, long lower wick) after a downtrend signals a potential bullish reversal."
      }
    ]
  },

  "lesson-2-5": {
    sections: [
      {
        title: "Moving Averages",
        content: [
          "Moving averages smooth price data to identify trends and potential support/resistance.",
          "Simple Moving Average (SMA): Average price over X periods. Equal weight to all periods.",
          "Exponential Moving Average (EMA): Gives more weight to recent prices. More responsive to new data.",
          "Common periods: 20, 50, 100, 200. Longer periods = smoother, slower to react."
        ]
      },
      {
        title: "Using Moving Averages",
        content: [
          "Price above MA = uptrend. Price below MA = downtrend.",
          "MA can act as dynamic support/resistance. Price often bounces off popular MAs.",
          "Golden Cross: Short MA crosses above long MA. Bullish signal.",
          "Death Cross: Short MA crosses below long MA. Bearish signal."
        ]
      },
      {
        title: "Multiple MA Systems",
        content: [
          "Fast MA (20-period) + Slow MA (50-period): Crossovers signal trend changes.",
          "When price is above both MAs and they're aligned upward: strong uptrend.",
          "When price is below both MAs and they're aligned downward: strong downtrend.",
          "MAs converging = potential breakout or reversal coming."
        ]
      }
    ],
    keyPoints: [
      "Moving averages smooth price and identify trends",
      "EMA is more responsive than SMA to recent price changes",
      "MAs can act as dynamic support/resistance levels",
      "Crossovers signal potential trend changes"
    ],
    examples: [
      {
        title: "MA Support Example",
        content: "EUR/USD uptrend with price bouncing off 50-period EMA multiple times. This MA acts as reliable support for entries."
      }
    ],
    summary: "Moving averages are versatile tools for trend identification and dynamic support/resistance. Using multiple MAs together provides stronger signals and better trade timing.",
    quiz: [
      {
        question: "What is a Golden Cross?",
        options: ["Price crosses MA", "Short MA crosses above long MA", "Long MA crosses above short MA", "Two MAs touch"],
        correctAnswer: 1,
        explanation: "A Golden Cross occurs when a short-term MA crosses above a long-term MA, signaling bullish momentum."
      },
      {
        question: "Which MA is more responsive to recent price changes?",
        options: ["SMA", "EMA", "Both equal", "Neither responds"],
        correctAnswer: 1,
        explanation: "EMA (Exponential Moving Average) gives more weight to recent prices, making it more responsive than SMA."
      }
    ]
  },

  "lesson-2-6": {
    sections: [
      {
        title: "Popular Technical Indicators",
        content: [
          "Indicators use mathematical formulas applied to price and volume data to generate trading signals.",
          "Leading Indicators: Try to predict future price movements (RSI, Stochastics).",
          "Lagging Indicators: Confirm trends already in motion (MACD, Moving Averages).",
          "Use indicators to confirm your analysis, not as standalone signals."
        ]
      },
      {
        title: "RSI (Relative Strength Index)",
        content: [
          "Measures momentum on a scale of 0-100.",
          "Above 70 = overbought (potential reversal down).",
          "Below 30 = oversold (potential reversal up).",
          "Divergence: Price makes new high but RSI doesn't = bearish divergence."
        ]
      },
      {
        title: "MACD (Moving Average Convergence Divergence)",
        content: [
          "Shows relationship between two moving averages.",
          "MACD Line crosses above Signal Line = bullish.",
          "MACD Line crosses below Signal Line = bearish.",
          "Histogram shows strength of momentum."
        ]
      },
      {
        title: "Using Indicators Effectively",
        content: [
          "Never rely on a single indicator - use multiple for confirmation.",
          "Combine indicators with support/resistance and price action.",
          "Too many indicators create 'analysis paralysis' - keep it simple.",
          "Backtest your indicator strategy before live trading."
        ]
      }
    ],
    keyPoints: [
      "Indicators help confirm trading decisions, not make them",
      "RSI identifies overbought/oversold conditions",
      "MACD shows trend direction and momentum",
      "Use 2-3 complementary indicators maximum"
    ],
    examples: [
      {
        title: "RSI + Support Combo",
        content: "Price hits support level AND RSI shows oversold (below 30). This double confirmation increases probability of bounce."
      }
    ],
    summary: "Technical indicators are powerful tools when used correctly. They should confirm your analysis based on support/resistance, trends, and price action - never replace it.",
    quiz: [
      {
        question: "What does RSI above 70 indicate?",
        options: ["Oversold", "Overbought", "Neutral", "Trend reversal confirmed"],
        correctAnswer: 1,
        explanation: "RSI above 70 indicates overbought conditions, suggesting price may be due for a pullback."
      },
      {
        question: "What is the best way to use technical indicators?",
        options: ["Use as many as possible", "Rely on one indicator only", "Combine with price action analysis", "Ignore them completely"],
        correctAnswer: 2,
        explanation: "Indicators should be used in combination with price action, support/resistance, and trend analysis for confirmation."
      }
    ]
  }
};
