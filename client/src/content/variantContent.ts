/**
 * Variant-Specific Content
 * Each variant has completely different text content with unique phrasing
 */

export interface PageContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  benefits: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    headline: string;
    description: string;
    buttonText: string;
  };
}

export interface VariantContent {
  home: PageContent;
  about: Partial<PageContent>;
  markets: Partial<PageContent>;
  // Add more pages as needed
}

/**
 * Variant 1: Professional Institutional - Formal, data-driven tone
 */
const variant1Content: VariantContent = {
  home: {
    hero: {
      headline: 'Institutional-Grade Trading Infrastructure',
      subheadline: 'Access enterprise-level execution technology with institutional pricing models and advanced risk management protocols.',
      cta: 'Access Platform',
    },
    benefits: {
      title: 'Enterprise Trading Capabilities',
      items: [
        {
          title: 'Tier-1 Liquidity Access',
          description: 'Direct market access with institutional-grade liquidity aggregation across major venues.',
        },
        {
          title: 'Advanced Risk Controls',
          description: 'Comprehensive risk management framework with real-time monitoring and automated safeguards.',
        },
        {
          title: 'Regulatory Compliance',
          description: 'Fully regulated operations with transparent reporting and adherence to international standards.',
        },
      ],
    },
    cta: {
      headline: 'Deploy Your Trading Strategy',
      description: 'Join institutional traders leveraging our enterprise infrastructure.',
      buttonText: 'Request Access',
    },
  },
  about: {},
  markets: {},
};

/**
 * Variant 2: Modern Fintech - Casual, innovation-focused tone
 */
const variant2Content: VariantContent = {
  home: {
    hero: {
      headline: 'Trade Smarter, Not Harder',
      subheadline: 'Experience next-generation trading with intelligent tools designed for modern traders who demand speed and simplicity.',
      cta: 'Start Trading',
    },
    benefits: {
      title: 'Why Traders Choose Us',
      items: [
        {
          title: 'Lightning-Fast Execution',
          description: 'Trade at the speed of thought with our optimized infrastructure built for performance.',
        },
        {
          title: 'Smart Trading Tools',
          description: 'AI-powered insights and intuitive charts help you make informed decisions faster.',
        },
        {
          title: 'Mobile-First Design',
          description: 'Trade anywhere with our seamless mobile experience that never compromises on features.',
        },
      ],
    },
    cta: {
      headline: 'Ready to Level Up Your Trading?',
      description: 'Join thousands of traders who upgraded to smarter trading.',
      buttonText: 'Get Started Free',
    },
  },
  about: {},
  markets: {},
};

/**
 * Variant 3: Wealth Management - Premium, trust-focused tone
 */
const variant3Content: VariantContent = {
  home: {
    hero: {
      headline: 'Preserve and Grow Your Wealth',
      subheadline: 'Partner with a trusted financial institution offering sophisticated investment solutions and personalized wealth management services.',
      cta: 'Schedule Consultation',
    },
    benefits: {
      title: 'Premium Financial Services',
      items: [
        {
          title: 'Dedicated Relationship Manager',
          description: 'Receive personalized guidance from experienced wealth advisors committed to your financial success.',
        },
        {
          title: 'Diversified Investment Portfolio',
          description: 'Access curated investment opportunities across global markets with comprehensive risk assessment.',
        },
        {
          title: 'Legacy Planning Support',
          description: 'Comprehensive estate and succession planning services to protect your family\'s future.',
        },
      ],
    },
    cta: {
      headline: 'Begin Your Wealth Journey',
      description: 'Discover how our private banking services can help achieve your financial goals.',
      buttonText: 'Speak with Advisor',
    },
  },
  about: {},
  markets: {},
};

/**
 * Variant 4: Crypto-Native - Web3, decentralization-focused tone
 */
const variant4Content: VariantContent = {
  home: {
    hero: {
      headline: 'Decentralized Trading for the New Economy',
      subheadline: 'Trade digital assets with complete transparency on a platform built for the blockchain generation.',
      cta: 'Connect Wallet',
    },
    benefits: {
      title: 'Web3 Trading Advantages',
      items: [
        {
          title: 'Non-Custodial Architecture',
          description: 'Maintain full control of your assets with our decentralized trading infrastructure.',
        },
        {
          title: 'Cross-Chain Compatibility',
          description: 'Seamlessly trade across multiple blockchain networks with unified liquidity pools.',
        },
        {
          title: 'Transparent On-Chain Settlement',
          description: 'Every transaction verified and recorded on-chain with complete auditability.',
        },
      ],
    },
    cta: {
      headline: 'Enter the Decentralized Future',
      description: 'Join the Web3 revolution with trustless, permissionless trading.',
      buttonText: 'Launch dApp',
    },
  },
  about: {},
  markets: {},
};

/**
 * Variant 5: Social Trading - Community, education-focused tone
 */
const variant5Content: VariantContent = {
  home: {
    hero: {
      headline: 'Learn. Copy. Profit. Together.',
      subheadline: 'Join a vibrant community of traders sharing strategies, insights, and success stories in real-time.',
      cta: 'Join Community',
    },
    benefits: {
      title: 'Social Trading Benefits',
      items: [
        {
          title: 'Copy Expert Traders',
          description: 'Automatically replicate the trades of proven traders with transparent performance metrics.',
        },
        {
          title: 'Interactive Learning Hub',
          description: 'Access live webinars, strategy guides, and mentorship from experienced market professionals.',
        },
        {
          title: 'Community Leaderboards',
          description: 'Track top performers, compare strategies, and participate in community challenges.',
        },
      ],
    },
    cta: {
      headline: 'Start Your Trading Journey with Friends',
      description: 'Never trade alone again. Learn from the best, share your wins.',
      buttonText: 'Explore Traders',
    },
  },
  about: {},
  markets: {},
};

// Content for remaining 10 variants (6-15) with unique phrasing
const variant6Content: VariantContent = {
  home: {
    hero: {
      headline: 'Algorithmic Trading Simplified',
      subheadline: 'Deploy sophisticated trading algorithms without writing code. Backtest, optimize, and automate your strategies.',
      cta: 'Build Strategy',
    },
    benefits: {
      title: 'Automated Trading Power',
      items: [
        {
          title: 'Visual Strategy Builder',
          description: 'Create complex trading logic using drag-and-drop interface with pre-built indicators.',
        },
        {
          title: 'Historical Backtesting',
          description: 'Validate strategies against years of market data before risking real capital.',
        },
        {
          title: '24/7 Automated Execution',
          description: 'Strategies run continuously, capturing opportunities even while you sleep.',
        },
      ],
    },
    cta: {
      headline: 'Automate Your Trading Edge',
      description: 'Let algorithms handle the execution while you focus on strategy.',
      buttonText: 'Start Building',
    },
  },
  about: {},
  markets: {},
};

const variant7Content: VariantContent = {
  home: {
    hero: {
      headline: 'Zero-Commission Global Markets',
      subheadline: 'Trade forex, stocks, crypto, and commodities without paying a single cent in commissions or hidden fees.',
      cta: 'Trade Free',
    },
    benefits: {
      title: 'Transparent Pricing Benefits',
      items: [
        {
          title: 'No Trading Commissions',
          description: 'Keep 100% of your profits with our zero-commission pricing model.',
        },
        {
          title: 'Tight Spreads',
          description: 'Competitive spreads from 0.0 pips on major currency pairs.',
        },
        {
          title: 'No Hidden Costs',
          description: 'Transparent fee structure with no deposit, withdrawal, or inactivity charges.',
        },
      ],
    },
    cta: {
      headline: 'Start Trading for Free Today',
      description: 'More profit in your pocket with every trade.',
      buttonText: 'Open Free Account',
    },
  },
  about: {},
  markets: {},
};

const variant8Content: VariantContent = {
  home: {
    hero: {
      headline: 'Professional Charts. Real-Time Data. Unlimited Tools.',
      subheadline: 'Advanced technical analysis platform with institutional-quality charting and data feeds.',
      cta: 'Explore Platform',
    },
    benefits: {
      title: 'Professional Analysis Tools',
      items: [
        {
          title: '200+ Technical Indicators',
          description: 'Comprehensive indicator library with custom scripting support.',
        },
        {
          title: 'Multi-Timeframe Analysis',
          description: 'Analyze multiple instruments and timeframes simultaneously.',
        },
        {
          title: 'Real-Time Market Scanner',
          description: 'Identify trading opportunities across thousands of instruments instantly.',
        },
      ],
    },
    cta: {
      headline: 'Upgrade Your Market Analysis',
      description: 'Professional traders deserve professional tools.',
      buttonText: 'Access Tools',
    },
  },
  about: {},
  markets: {},
};

const variant9Content: VariantContent = {
  home: {
    hero: {
      headline: 'Beginner-Friendly Trading Made Simple',
      subheadline: 'Start your investment journey with guided tutorials, demo accounts, and educational resources designed for newcomers.',
      cta: 'Learn & Trade',
    },
    benefits: {
      title: 'Perfect for Beginners',
      items: [
        {
          title: 'Interactive Tutorials',
          description: 'Step-by-step guides teach you trading basics at your own pace.',
        },
        {
          title: 'Risk-Free Demo Account',
          description: 'Practice with virtual money before investing real capital.',
        },
        {
          title: '24/7 Support Team',
          description: 'Friendly experts ready to answer your questions anytime.',
        },
      ],
    },
    cta: {
      headline: 'Begin Your Trading Education',
      description: 'Everyone starts somewhere. Start here, start smart.',
      buttonText: 'Start Learning',
    },
  },
  about: {},
  markets: {},
};

const variant10Content: VariantContent = {
  home: {
    hero: {
      headline: 'High-Leverage Trading with Smart Risk Controls',
      subheadline: 'Access up to 1:500 leverage with built-in safeguards, margin monitoring, and automated risk management.',
      cta: 'Maximize Potential',
    },
    benefits: {
      title: 'Leverage Trading Features',
      items: [
        {
          title: 'Flexible Leverage Options',
          description: 'Choose your leverage level from 1:1 to 1:500 based on your risk tolerance.',
        },
        {
          title: 'Negative Balance Protection',
          description: 'Never lose more than your account balance with guaranteed stop-loss.',
        },
        {
          title: 'Margin Call Alerts',
          description: 'Real-time notifications before margin levels become critical.',
        },
      ],
    },
    cta: {
      headline: 'Amplify Your Trading Power',
      description: 'Leverage magnifies both profits and risks. Trade responsibly.',
      buttonText: 'Understand Leverage',
    },
  },
  about: {},
  markets: {},
};

const variant11Content: VariantContent = {
  home: {
    hero: {
      headline: 'Islamic Trading Accounts - Swap-Free & Sharia-Compliant',
      subheadline: 'Trade with confidence knowing your account adheres to Islamic finance principles with zero overnight interest.',
      cta: 'Open Islamic Account',
    },
    benefits: {
      title: 'Sharia-Compliant Features',
      items: [
        {
          title: 'Zero Swap Fees',
          description: 'Hold positions overnight without interest charges or credits.',
        },
        {
          title: 'Certified Compliance',
          description: 'Accounts reviewed and certified by Islamic scholars.',
        },
        {
          title: 'Full Market Access',
          description: 'Trade all halal instruments without compromise.',
        },
      ],
    },
    cta: {
      headline: 'Trade in Accordance with Your Faith',
      description: 'Ethical trading that respects Islamic financial principles.',
      buttonText: 'Learn More',
    },
  },
  about: {},
  markets: {},
};

const variant12Content: VariantContent = {
  home: {
    hero: {
      headline: 'Mobile Trading Revolution - Trade Anywhere, Anytime',
      subheadline: 'Full-featured mobile app with fingerprint login, push notifications, and one-tap trading.',
      cta: 'Download App',
    },
    benefits: {
      title: 'Mobile-First Features',
      items: [
        {
          title: 'Native iOS & Android Apps',
          description: 'Optimized performance with native mobile development.',
        },
        {
          title: 'Biometric Security',
          description: 'Secure login with fingerprint and Face ID support.',
        },
        {
          title: 'Price Alerts & Notifications',
          description: 'Never miss a trading opportunity with instant push alerts.',
        },
      ],
    },
    cta: {
      headline: 'Take Trading in Your Pocket',
      description: 'Desktop power in a mobile package.',
      buttonText: 'Get Mobile App',
    },
  },
  about: {},
  markets: {},
};

const variant13Content: VariantContent = {
  home: {
    hero: {
      headline: 'VIP Trading Program - Exclusive Benefits for Serious Traders',
      subheadline: 'Unlock premium features, dedicated account managers, and institutional pricing with our VIP membership.',
      cta: 'Apply for VIP',
    },
    benefits: {
      title: 'VIP Member Benefits',
      items: [
        {
          title: 'Dedicated Account Manager',
          description: 'Personal trading advisor available 24/7 via phone, email, or chat.',
        },
        {
          title: 'Priority Execution',
          description: 'VIP routing ensures fastest possible execution speeds.',
        },
        {
          title: 'Exclusive Market Research',
          description: 'Daily analysis and trade ideas from institutional research desk.',
        },
      ],
    },
    cta: {
      headline: 'Elevate Your Trading Experience',
      description: 'VIP treatment for VIP traders.',
      buttonText: 'View Requirements',
    },
  },
  about: {},
  markets: {},
};

const variant14Content: VariantContent = {
  home: {
    hero: {
      headline: 'Instant Funding - Deposit & Trade in Under 60 Seconds',
      subheadline: 'Lightning-fast deposits via credit card, e-wallets, crypto, and instant bank transfers.',
      cta: 'Fund Account',
    },
    benefits: {
      title: 'Funding Convenience',
      items: [
        {
          title: 'Instant Payment Methods',
          description: 'Funds available immediately with Visa, Mastercard, PayPal, and crypto.',
        },
        {
          title: 'Zero Deposit Fees',
          description: 'We cover all deposit costs - 100% of your money goes to trading.',
        },
        {
          title: 'Fast Withdrawals',
          description: 'Withdraw profits within 24 hours to your preferred payment method.',
        },
      ],
    },
    cta: {
      headline: 'Start Trading Immediately',
      description: 'No waiting. No delays. Just instant access to markets.',
      buttonText: 'Deposit Now',
    },
  },
  about: {},
  markets: {},
};

const variant15Content: VariantContent = {
  home: {
    hero: {
      headline: 'Regulated & Trusted Since 2014',
      subheadline: 'Multi-jurisdictional regulation, segregated client funds, and tier-1 banking relationships ensure your capital is protected.',
      cta: 'Trust & Safety',
    },
    benefits: {
      title: 'Security & Compliance',
      items: [
        {
          title: 'Multi-Jurisdictional Licenses',
          description: 'Authorized and regulated by FCA, CySEC, ASIC, and IFSC.',
        },
        {
          title: 'Segregated Client Accounts',
          description: 'Your funds held separately from company operating capital.',
        },
        {
          title: 'Investor Compensation Coverage',
          description: 'Eligible for investor protection schemes up to €20,000.',
        },
      ],
    },
    cta: {
      headline: 'Trade with Confidence',
      description: 'Decade of trust, transparency, and regulatory compliance.',
      buttonText: 'View Licenses',
    },
  },
  about: {},
  markets: {},
};

// Registry mapping variant IDs to content (aligned with variantConfig.ts IDs)
export const variantContentRegistry: Record<string, VariantContent> = {
  'bloomberg-dark': variant1Content,        // Technical, institutional-grade
  'charcoal-pro': variant2Content,          // Professional, modern fintech
  'navy-institutional': variant3Content,    // Authoritative, wealth management
  'arctic-minimal': variant4Content,        // Minimalist, crypto-native
  'nordic-clean': variant5Content,          // Friendly, social trading
  'modern-light': variant6Content,          // Innovative, algorithmic trading
  'crypto-neon': variant7Content,           // Crypto-native, zero-commission
  'carbon-sleek': variant8Content,          // Premium, professional charts
  'emerald-trader': variant9Content,        // Energetic, beginner-friendly
  'terracotta-warm': variant10Content,      // Warm, high-leverage
  'sunset-trading': variant11Content,       // Casual, Islamic trading
  'sapphire-finance': variant12Content,     // Trustworthy, mobile trading
  'financial-times': variant13Content,      // Authoritative, VIP program
  'midnight-premium': variant14Content,     // Elite, instant funding
  'minimalist-corporate': variant15Content, // Corporate, regulated & trusted
};
