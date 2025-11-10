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

export interface AboutPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  };
  values: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export interface CompanyPageContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  stats: {
    years: string;
    clients: string;
    countries: string;
    volume: string;
  };
  info: {
    title: string;
    subtitle: string;
  };
  values: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    about: string;
  };
}

export interface ContactPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  form: {
    title: string;
    description: string;
  };
  info: {
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

export interface EducationPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  topics: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      content: string;
    }>;
  };
  resources: {
    title: string;
    subtitle: string;
  };
  academy: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    button: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
}

export interface VariantContent {
  home: PageContent;
  about: Partial<AboutPageContent>;
  company: Partial<CompanyPageContent>;
  contact: Partial<ContactPageContent>;
  education: Partial<EducationPageContent>;
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
  about: {
    hero: {
      title: 'Institutional Excellence in Financial Markets',
      subtitle: 'Delivering enterprise-grade trading infrastructure with regulatory oversight and institutional-quality execution since 2014.',
    },
    mission: {
      title: 'Our Institutional Mandate',
      paragraph1: 'We provide institutional-grade trading infrastructure designed for professional market participants who require sophisticated execution capabilities, comprehensive risk management frameworks, and full regulatory compliance.',
      paragraph2: 'Through strategic partnerships with tier-1 liquidity providers and advanced technology vendors, we deliver institutional-quality market access with transparent pricing structures and rigorous operational standards.',
      highlights: [
        {
          title: 'Regulatory Framework',
          description: 'Multi-jurisdictional licenses ensuring institutional-grade compliance and oversight.',
        },
        {
          title: 'Institutional Focus',
          description: 'Purpose-built infrastructure serving professional trading organizations globally.',
        },
      ],
    },
    values: {
      title: 'Institutional Principles',
      subtitle: 'Operating standards governing our institutional trading infrastructure and client relationships.',
      items: [
        {
          title: 'Regulatory Adherence',
          description: 'Strict compliance with international regulatory frameworks across all operational jurisdictions.',
        },
        {
          title: 'Operational Transparency',
          description: 'Comprehensive reporting and disclosure of execution quality, costs, and operational metrics.',
        },
        {
          title: 'Risk Management Excellence',
          description: 'Enterprise-grade risk frameworks with real-time monitoring and automated safeguard mechanisms.',
        },
        {
          title: 'Institutional Access',
          description: 'Direct connectivity to global liquidity venues with institutional pricing and execution priority.',
        },
      ],
    },
    services: {
      title: 'Institutional Trading Services',
      subtitle: 'Comprehensive suite of professional-grade trading infrastructure and execution capabilities.',
      items: [
        {
          title: 'FX Execution Infrastructure',
          description: 'Institutional FX trading with tier-1 bank liquidity, algorithmic execution, and pre-trade analytics for major and minor currency pairs.',
        },
        {
          title: 'Digital Asset Trading',
          description: 'Regulated cryptocurrency trading infrastructure with institutional custody solutions and deep liquidity pools for spot and derivative instruments.',
        },
        {
          title: 'Commodities Access',
          description: 'Professional commodity trading capabilities spanning precious metals, energy markets, and agricultural futures with institutional pricing models.',
        },
      ],
    },
    team: {
      title: 'Executive Leadership',
      subtitle: 'Seasoned financial market professionals with institutional trading and technology backgrounds.',
      description: 'Our executive team brings decades of combined experience from tier-1 investment banks, leading technology firms, and regulatory institutions, ensuring institutional-grade operational standards.',
    },
  },
  company: {
    hero: {
      badge: 'Institutional Trading Infrastructure',
      title: 'Enterprise-Grade Financial Market Access',
      subtitle: 'Regulated institutional trading platform serving professional organizations with sophisticated execution requirements and comprehensive risk management frameworks.',
      cta: 'View Regulatory Information',
    },
    stats: {
      years: '15+',
      clients: '50K+',
      countries: '120+',
      volume: '$2B+',
    },
    info: {
      title: 'Institutional Information & Compliance',
      subtitle: 'Comprehensive regulatory documentation, operational transparency, and institutional-grade compliance framework.',
    },
    values: {
      title: 'Institutional Operating Principles',
      subtitle: 'Core principles governing our institutional trading infrastructure and professional client relationships.',
      items: [
        {
          title: 'Regulatory Transparency',
          description: 'Full disclosure of regulatory licenses, execution quality metrics, and operational oversight frameworks.',
        },
        {
          title: 'Institutional Security',
          description: 'Bank-grade security infrastructure with segregated client funds and institutional custody solutions.',
        },
        {
          title: 'Operational Innovation',
          description: 'Continuous technology advancement maintaining institutional-quality execution standards and risk controls.',
        },
      ],
    },
    cta: {
      title: 'Institutional Partnership Inquiries',
      subtitle: 'Explore institutional trading infrastructure solutions tailored to professional organization requirements.',
      button: 'Contact Institutional Desk',
      about: 'Institutional Overview',
    },
  },
  contact: {
    hero: {
      title: 'Institutional Client Services',
      subtitle: 'Dedicated institutional support team available to address operational inquiries, technical requirements, and regulatory questions.',
    },
    form: {
      title: 'Institutional Inquiry Form',
      description: 'Submit detailed inquiries regarding institutional trading capabilities, regulatory framework, or operational infrastructure.',
    },
    info: {
      items: [
        {
          title: 'Institutional Support Desk',
          description: 'Dedicated institutional support available for operational and technical inquiries.',
        },
        {
          title: 'Operating Schedule',
          description: 'Round-the-clock institutional support coverage aligned with global trading sessions.',
        },
        {
          title: 'Corporate Headquarters',
          description: 'Primary regulatory office and institutional operations center.',
        },
        {
          title: 'Technical Support Channel',
          description: 'Priority institutional support for platform and connectivity technical issues.',
        },
      ],
    },
  },
  education: {
    hero: {
      title: 'Institutional Trading Resources',
      subtitle: 'Professional development materials covering institutional execution strategies, regulatory frameworks, and advanced market microstructure.',
    },
    topics: {
      title: 'Professional Trading Curriculum',
      subtitle: 'Comprehensive institutional trading education covering execution technology, regulatory compliance, and risk management frameworks.',
      items: [
        {
          title: 'Institutional Execution Models',
          description: 'Advanced Execution Frameworks',
          content: 'Professional-grade execution algorithms, liquidity sourcing strategies, and institutional order routing protocols for optimal execution quality.',
        },
        {
          title: 'Market Microstructure Analysis',
          description: 'Institutional Market Dynamics',
          content: 'Deep analysis of market structure, liquidity patterns, and execution venue characteristics for institutional trading optimization.',
        },
        {
          title: 'Enterprise Risk Frameworks',
          description: 'Institutional Risk Management',
          content: 'Comprehensive risk management protocols including pre-trade controls, real-time monitoring, and position management systems.',
        },
        {
          title: 'Algorithmic Trading Systems',
          description: 'Systematic Execution Strategies',
          content: 'Professional algorithmic trading methodologies, backtesting frameworks, and systematic strategy development for institutional applications.',
        },
        {
          title: 'Regulatory Compliance Standards',
          description: 'Institutional Regulatory Framework',
          content: 'Understanding regulatory requirements, reporting obligations, and compliance frameworks governing institutional trading operations.',
        },
        {
          title: 'Advanced Portfolio Construction',
          description: 'Institutional Portfolio Management',
          content: 'Sophisticated portfolio optimization, asset allocation frameworks, and institutional investment strategy development.',
        },
      ],
    },
    resources: {
      title: 'Professional Research & Analysis',
      subtitle: 'Institutional-grade market research, execution analysis, and professional trading documentation.',
    },
    academy: {
      title: 'Institutional Trading Academy',
      subtitle: 'Professional development platform for institutional traders and investment professionals.',
      features: [
        {
          title: 'Advanced Curriculum',
          description: 'Professional-grade courses covering institutional execution, risk management, and regulatory compliance.',
        },
        {
          title: 'Expert Instruction',
          description: 'Industry practitioners and subject matter experts delivering institutional trading education.',
        },
        {
          title: 'Professional Certification',
          description: 'Recognized certifications validating institutional trading competency and professional knowledge.',
        },
      ],
      button: 'Access Professional Resources',
    },
    cta: {
      title: 'Advance Your Institutional Trading Capabilities',
      subtitle: 'Access comprehensive professional development resources designed for institutional market participants.',
      button: 'Explore Institutional Academy',
    },
  },
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
  about: {
    hero: {
      title: 'Built for Modern Traders',
      subtitle: 'We\'re reimagining financial markets with cutting-edge technology and user-first design since 2014.',
    },
    mission: {
      title: 'Why We Built This',
      paragraph1: 'Trading shouldn\'t be complicated. We created a platform that combines powerful features with intuitive design, making professional-grade tools accessible to everyone.',
      paragraph2: 'Our tech stack leverages AI, machine learning, and modern cloud infrastructure to deliver lightning-fast execution and smart insights that help you trade better.',
      highlights: [
        {
          title: 'Regulation You Can Trust',
          description: 'Fully licensed and regulated to keep your funds safe and secure.',
        },
        {
          title: 'Built by Traders',
          description: 'Our team actually trades, so we know what tools you really need.',
        },
      ],
    },
    values: {
      title: 'What Drives Us',
      subtitle: 'The principles that guide how we build products and serve our community.',
      items: [
        {
          title: 'User-First Always',
          description: 'Every feature we build starts with asking: will this genuinely help traders succeed?',
        },
        {
          title: 'Radical Transparency',
          description: 'No hidden fees, no confusing terms. What you see is what you get.',
        },
        {
          title: 'Innovation Never Stops',
          description: 'We ship new features weekly because the markets never stand still.',
        },
        {
          title: 'Community Powered',
          description: 'Your feedback shapes our roadmap. We build what you actually want.',
        },
      ],
    },
    services: {
      title: 'What You Can Trade',
      subtitle: 'Access global markets from one sleek platform.',
      items: [
        {
          title: 'Forex Markets',
          description: 'Trade 50+ currency pairs with tight spreads and zero commissions. Perfect for beginners and pros alike.',
        },
        {
          title: 'Crypto Trading',
          description: 'Buy, sell, and trade 100+ cryptocurrencies with instant deposits and withdrawals. Welcome to the future.',
        },
        {
          title: 'Commodities & More',
          description: 'Diversify with gold, silver, oil, and agricultural products. All the markets you need in one place.',
        },
      ],
    },
    team: {
      title: 'Meet the Team',
      subtitle: 'Engineers, traders, and designers obsessed with building the best trading platform.',
      description: 'We\'re a diverse team from Silicon Valley startups, Wall Street firms, and crypto pioneers. United by one goal: democratizing access to financial markets.',
    },
  },
  company: {
    hero: {
      badge: 'Modern Fintech Platform',
      title: 'Making Trading Accessible to Everyone',
      subtitle: 'A next-generation platform combining professional tools, transparent pricing, and a community-first approach to trading.',
      cta: 'Explore Our Story',
    },
    stats: {
      years: '15+',
      clients: '50K+',
      countries: '120+',
      volume: '$2B+',
    },
    info: {
      title: 'Everything You Need to Know',
      subtitle: 'Transparency isn\'t just a buzzword for us. Here\'s all our info, regulations, and pricing in plain English.',
    },
    values: {
      title: 'Our Core Beliefs',
      subtitle: 'What we stand for and how we operate every single day.',
      items: [
        {
          title: 'Crystal Clear Transparency',
          description: 'We publish everything: our pricing, our licenses, our execution stats. No secrets.',
        },
        {
          title: 'Bank-Level Security',
          description: 'Your funds are segregated and protected. We take security seriously.',
        },
        {
          title: 'Constant Innovation',
          description: 'We\'re always testing, learning, and improving. Expect frequent updates.',
        },
      ],
    },
    cta: {
      title: 'Questions? We\'re Here',
      subtitle: 'Reach out anytime. Real humans respond, usually within minutes.',
      button: 'Chat with Us',
      about: 'Learn More',
    },
  },
  contact: {
    hero: {
      title: 'Let\'s Talk',
      subtitle: 'Got questions? Need help? Want to chat about markets? We\'re here and actually respond.',
    },
    form: {
      title: 'Drop Us a Message',
      description: 'Whether it\'s a quick question or detailed inquiry, we\'ll get back to you fast.',
    },
    info: {
      items: [
        {
          title: 'Email Support',
          description: 'Quick responses from real humans who actually trade.',
        },
        {
          title: 'We\'re Always Online',
          description: '24/7 support because markets never sleep (and neither do we).',
        },
        {
          title: 'Global Offices',
          description: 'Team members across time zones for instant help anywhere.',
        },
        {
          title: 'Live Chat',
          description: 'Instant support right in the platform. Click and chat.',
        },
      ],
    },
  },
  education: {
    hero: {
      title: 'Learn Trading the Modern Way',
      subtitle: 'No boring textbooks. Just practical, actionable trading education that actually works.',
    },
    topics: {
      title: 'What You\'ll Learn',
      subtitle: 'From zero to trading hero with our step-by-step guides designed for real people.',
      items: [
        {
          title: 'Trading 101',
          description: 'Start Here',
          content: 'The basics explained simply. No jargon, no BS. Just what you need to know to place your first trade confidently.',
        },
        {
          title: 'Chart Reading Made Easy',
          description: 'Technical Analysis',
          content: 'Learn to read charts like a pro without needing a finance degree. Practical patterns that actually work.',
        },
        {
          title: 'Risk Like a Pro',
          description: 'Stay Safe',
          content: 'How to protect your capital and avoid rookie mistakes. The rules successful traders actually follow.',
        },
        {
          title: 'Build Your Strategy',
          description: 'Trading Systems',
          content: 'Create a trading plan that fits your life and goals. Tested strategies you can start using today.',
        },
        {
          title: 'Trading Psychology',
          description: 'Master Your Mind',
          content: 'Emotions kill accounts. Learn how to stay disciplined and trade with confidence.',
        },
        {
          title: 'Advanced Tactics',
          description: 'Level Up',
          content: 'Once you\'ve got the basics down, here\'s how the pros find edge in competitive markets.',
        },
      ],
    },
    resources: {
      title: 'Free Trading Resources',
      subtitle: 'Guides, videos, and tools to accelerate your learning.',
    },
    academy: {
      title: 'Trading Academy',
      subtitle: 'Structured courses that take you from beginner to confident trader.',
      features: [
        {
          title: 'Video Courses',
          description: 'Binge-worthy trading content that\'s actually entertaining and useful.',
        },
        {
          title: 'Live Sessions',
          description: 'Weekly webinars with real traders sharing real strategies.',
        },
        {
          title: 'Earn Certificates',
          description: 'Complete courses and earn badges to showcase your skills.',
        },
      ],
      button: 'Start Learning Free',
    },
    cta: {
      title: 'Ready to Start Your Trading Journey?',
      subtitle: 'Join thousands learning to trade the smart way, one lesson at a time.',
      button: 'Begin Your Education',
    },
  },
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
  company: {},
  contact: {},
  education: {},
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
