/**
 * Shared Site Configuration
 * Single source of truth for default configuration across frontend and backend
 */

// Extended Site Configuration Type with all 10 new categories
export interface ExtendedSiteConfig {
  version: string;
  
  // Existing categories
  branding: BrandingConfig;
  layout: LayoutConfig;
  features: FeaturesConfig;
  localization: LocalizationConfig;
  trading: TradingConfig;
  metadata: MetadataConfig;
  advanced: AdvancedConfig;
  
  // NEW: 10 Additional categories
  tradingSettings: TradingSettingsConfig;
  accountSettings: AccountSettingsConfig;
  funding: FundingConfig;
  promotions: PromotionsConfig;
  platformFeatures: PlatformFeaturesConfig;
  communications: CommunicationsConfig;
  compliance: ComplianceConfig;
  technical: TechnicalConfig;
  regional: RegionalConfig;
  demoAccounts: DemoAccountsConfig;
}

// ====================
// EXISTING CONFIGS
// ====================

export interface BrandingConfig {
  companyName: string;
  supportEmail: string;
  logo: {
    enabled: boolean;
    path: string;
    altText: string;
  };
  copyright: {
    year: number;
    text: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  languageOverrides?: {
    [langCode: string]: {
      companyName?: string;
      supportEmail?: string;
    };
  };
}

export interface LayoutConfig {
  activeVariant: string;
  stickyHeader: boolean;
  showFooter: boolean;
  compactMode: boolean;
}

export interface FeaturesConfig {
  accountTypes: {
    standard: { enabled: boolean; visible: boolean };
    professional: { enabled: boolean; visible: boolean };
    vip: { enabled: boolean; visible: boolean };
  };
  paymentMethods: {
    bankTransfer: { enabled: boolean; international: boolean; local: boolean };
    cards: { enabled: boolean; visa: boolean; mastercard: boolean; debit: boolean };
    ewallets: { enabled: boolean; skrill: boolean; neteller: boolean; paypal: boolean };
    crypto: { enabled: boolean; bitcoin: boolean; ethereum: boolean; usdt: boolean };
  };
  publicPages: {
    partners: boolean;
    education: boolean;
    marketInfo: boolean;
    companyInfo: boolean;
  };
}

export interface LocalizationConfig {
  defaultLanguage: string;
  enabledLanguages: string[];
}

export interface TradingConfig {
  leverage: {
    standard: string;
    professional: string;
    vip: string;
  };
  minDeposit: {
    standard: number;
    professional: number;
    vip: number;
  };
  assetClasses: {
    forex: boolean;
    crypto: boolean;
    commodities: boolean;
    indices: boolean;
    stocks: boolean;
  };
}

export interface MetadataConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  ogImage: string;
  ogType: string;
}

export interface AdvancedConfig {
  customCSS: string;
  experimental: {
    customThemeEditor: boolean;
    advancedLayoutBuilder: boolean;
  };
}

// ====================
// NEW CONFIGS (10 categories)
// ====================

export interface TradingSettingsConfig {
  marketHours: {
    forex: {
      weekdayOpen: string;
      weekdayClose: string;
      timezone: string;
      closedWeekends: boolean;
    };
    crypto: {
      available24_7: boolean;
    };
    commodities: {
      sessionBreaks: Array<{
        start: string;
        end: string;
      }>;
    };
  };
  orderExecution: {
    maxSlippagePercent: number;
    allowMarketOrders: boolean;
    allowPendingOrders: boolean;
    maxOrderLifetimeDays: number;
    partialFillsAllowed: boolean;
  };
  restrictions: {
    hedgingAllowed: boolean;
    scalping: {
      allowed: boolean;
      minSecondsPerTrade: number;
    };
    newsTrading: {
      blockDuringHighImpact: boolean;
      blockWindowMinutes: number;
    };
  };
  riskManagement: {
    marginCallLevel: number;
    stopOutLevel: number;
    allowNegativeBalance: boolean;
    maxDrawdownAlert: number;
  };
}

export interface AccountSettingsConfig {
  registration: {
    requireEmailVerification: boolean;
    requirePhoneVerification: boolean;
    allowSocialLogin: boolean;
    minimumAge: number;
    restrictedCountries: string[];
  };
  verification: {
    kycLevels: {
      tier1: {
        enabled: boolean;
        depositLimit: number;
        withdrawalLimit: number;
        documentsRequired: string[];
      };
      tier2: {
        enabled: boolean;
        depositLimit: number;
        withdrawalLimit: number;
        documentsRequired: string[];
      };
      tier3: {
        enabled: boolean;
        depositLimit: number | null;
        withdrawalLimit: number | null;
        documentsRequired: string[];
      };
    };
  };
  security: {
    twoFactorAuth: {
      required: boolean;
      enforcedForWithdrawals: boolean;
      methods: string[];
    };
    sessionManagement: {
      timeout: number;
      allowMultipleSessions: boolean;
      maxConcurrentSessions: number;
    };
    ipWhitelist: {
      enabled: boolean;
      addresses: string[];
    };
  };
  dormancy: {
    inactiveDays: number;
    sendReminderAt: number[];
    autoCloseAfterDays: number;
  };
}

export interface FundingConfig {
  deposits: {
    minAmounts: {
      bankTransfer: number;
      card: number;
      crypto: number;
      ewallet: number;
    };
    maxAmounts: {
      bankTransfer: number;
      card: number;
      crypto: number;
      ewallet: number;
    };
    processing: {
      autoApprove: boolean;
      autoApproveLimit: number;
      reviewQueueEnabled: boolean;
    };
  };
  withdrawals: {
    minAmount: number;
    maxPerDay: number;
    maxPerMonth: number;
    processingTime: {
      bankTransfer: string;
      card: string;
      crypto: string;
      ewallet: string;
    };
    fees: {
      bankTransfer: number;
      card: number;
      crypto: number;
      ewallet: number;
    };
    verification: {
      requireKYC: boolean;
      requirePhoneOTP: boolean;
      manualReviewThreshold: number;
    };
  };
}

export interface PromotionsConfig {
  welcomeBonus: {
    enabled: boolean;
    type: string;
    percentage: number;
    maxBonus: number;
    minDeposit: number;
    tradingRequirement: number;
    expiryDays: number;
  };
  referralProgram: {
    enabled: boolean;
    referrerReward: number;
    refereeReward: number;
    minRefereeDeposit: number;
    payoutMethod: string;
  };
  loyaltyProgram: {
    enabled: boolean;
    pointsPerLot: number;
    tiers: Array<{
      name: string;
      minPoints: number;
      benefits: string[];
    }>;
  };
}

export interface PlatformFeaturesConfig {
  tradingTools: {
    economicCalendar: boolean;
    tradingSignals: boolean;
    marketSentiment: boolean;
    tradingCentral: boolean;
    autochartist: boolean;
  };
  socialTrading: {
    enabled: boolean;
    copyTrading: boolean;
    leaderboard: boolean;
    tradingCommunity: boolean;
  };
  education: {
    enabled: boolean;
    webinars: boolean;
    tutorials: boolean;
    eBooks: boolean;
    tradingAcademy: boolean;
    certificationProgram: boolean;
  };
  analytics: {
    tradingHistory: boolean;
    performanceReports: boolean;
    taxReporting: boolean;
    exportData: boolean;
    apiAccess: boolean;
  };
}

export interface CommunicationsConfig {
  supportChannels: {
    liveChat: {
      enabled: boolean;
      hours: string;
      averageResponseTime: string;
    };
    email: {
      enabled: boolean;
      addresses: {
        general: string;
        vip: string;
        compliance: string;
      };
    };
    phone: {
      enabled: boolean;
      numbers: Array<{
        region: string;
        number: string;
        hours: string;
      }>;
    };
  };
  notifications: {
    email: {
      enabled: boolean;
      types: {
        marketingEmails: boolean;
        tradingAlerts: boolean;
        accountUpdates: boolean;
        weeklyReports: boolean;
      };
    };
    sms: {
      enabled: boolean;
      types: {
        loginAlerts: boolean;
        withdrawalConfirm: boolean;
        marginCalls: boolean;
      };
    };
    push: {
      enabled: boolean;
      types: {
        priceAlerts: boolean;
        orderFills: boolean;
        newsAlerts: boolean;
      };
    };
  };
  announcements: {
    enabled: boolean;
    banner: {
      show: boolean;
      message: string;
      type: string;
      dismissible: boolean;
    };
    maintenanceMode: {
      enabled: boolean;
      message: string;
      allowedIPs: string[];
    };
  };
}

export interface ComplianceConfig {
  riskWarnings: {
    enabled: boolean;
    showOnLogin: boolean;
    showOnDeposit: boolean;
    customText: string;
  };
  documents: {
    termsOfService: {
      version: string;
      lastUpdated: string;
      acceptanceRequired: boolean;
    };
    privacyPolicy: {
      version: string;
      lastUpdated: string;
    };
    riskDisclosure: {
      version: string;
      requireSignature: boolean;
    };
  };
  dataProtection: {
    gdprCompliant: boolean;
    cookieConsent: boolean;
    rightToErasure: boolean;
    dataRetentionDays: number;
    encryptionEnabled: boolean;
  };
  responsibleTrading: {
    selfExclusionAvailable: boolean;
    depositLimitsAvailable: boolean;
    realityChecks: boolean;
    coolingOffPeriod: boolean;
  };
}

export interface TechnicalConfig {
  api: {
    enabled: boolean;
    rateLimit: number;
    rateLimitWindow: number;
    requireApiKey: boolean;
    allowedOrigins: string[];
  };
  webhooks: {
    enabled: boolean;
    endpoints: {
      deposit: string;
      withdrawal: string;
      trade: string;
      kyc: string;
    };
    retryAttempts: number;
    timeout: number;
  };
  analytics: {
    googleAnalytics: {
      enabled: boolean;
      trackingId: string;
    };
    facebookPixel: {
      enabled: boolean;
      pixelId: string;
    };
    customTracking: {
      enabled: boolean;
      script: string;
    };
  };
  performance: {
    caching: {
      enabled: boolean;
      ttl: number;
    };
    cdn: {
      enabled: boolean;
      provider: string;
    };
    compression: {
      enabled: boolean;
    };
  };
}

export interface RegionalConfig {
  currencies: {
    base: string;
    display: string[];
    accountCurrencies: string[];
  };
  dateTime: {
    dateFormat: string;
    timeFormat: string;
    timezone: string;
  };
  units: {
    distance: string;
    temperature: string;
  };
  regulations: {
    jurisdiction: string;
    regulatoryBody: string;
    compensationScheme: {
      enabled: boolean;
      name: string;
      coverage: number;
    };
  };
}

export interface DemoAccountsConfig {
  enabled: boolean;
  settings: {
    initialBalance: number;
    allowReset: boolean;
    resetCooldownDays: number;
    maxResetsPerMonth: number;
    expiryDays: number;
    warningBeforeExpiryDays: number;
    realTimeData: boolean;
    fullFeatureAccess: boolean;
  };
}

// ====================
// DEFAULT CONFIGURATION
// ====================

export const DEFAULT_SITE_CONFIG: ExtendedSiteConfig = {
  version: '2.0.0',
  
  branding: {
    companyName: 'Trading Platform',
    supportEmail: 'support@tradingplatform.com',
    logo: {
      enabled: true,
      path: '',
      altText: 'Trading Platform Logo'
    },
    copyright: {
      year: 2025,
      text: '© {{year}} {{companyName}}. All rights reserved.'
    },
    social: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: ''
    }
  },
  
  layout: {
    activeVariant: 'bloomberg-dark',
    stickyHeader: true,
    showFooter: true,
    compactMode: false
  },
  
  features: {
    accountTypes: {
      standard: { enabled: true, visible: true },
      professional: { enabled: true, visible: true },
      vip: { enabled: true, visible: true }
    },
    paymentMethods: {
      bankTransfer: { enabled: true, international: true, local: true },
      cards: { enabled: true, visa: true, mastercard: true, debit: true },
      ewallets: { enabled: true, skrill: true, neteller: true, paypal: true },
      crypto: { enabled: true, bitcoin: true, ethereum: true, usdt: true }
    },
    publicPages: {
      partners: true,
      education: true,
      marketInfo: true,
      companyInfo: true
    }
  },
  
  localization: {
    defaultLanguage: 'en',
    enabledLanguages: ['en', 'zh-CN', 'ja', 'de', 'fr', 'es', 'ar', 'ru', 'pt']
  },
  
  trading: {
    leverage: {
      standard: '1:100',
      professional: '1:200',
      vip: '1:400'
    },
    minDeposit: {
      standard: 100,
      professional: 5000,
      vip: 25000
    },
    assetClasses: {
      forex: true,
      crypto: true,
      commodities: true,
      indices: false,
      stocks: false
    }
  },
  
  metadata: {
    defaultTitle: 'Trading Platform - Forex, Crypto & Commodities Trading',
    defaultDescription: 'Professional trading platform for forex, cryptocurrencies, and commodities. Advanced charting, real-time data, and institutional-grade execution.',
    defaultKeywords: 'forex trading, crypto trading, commodities, CFD trading, online broker',
    ogImage: '/assets/og-image.png',
    ogType: 'website'
  },
  
  advanced: {
    customCSS: '',
    experimental: {
      customThemeEditor: false,
      advancedLayoutBuilder: false
    }
  },
  
  // NEW CATEGORIES WITH DEFAULTS
  
  tradingSettings: {
    marketHours: {
      forex: {
        weekdayOpen: '00:00',
        weekdayClose: '23:59',
        timezone: 'UTC',
        closedWeekends: false
      },
      crypto: {
        available24_7: true
      },
      commodities: {
        sessionBreaks: [
          { start: '21:00', end: '22:00' }
        ]
      }
    },
    orderExecution: {
      maxSlippagePercent: 0.5,
      allowMarketOrders: true,
      allowPendingOrders: true,
      maxOrderLifetimeDays: 90,
      partialFillsAllowed: true
    },
    restrictions: {
      hedgingAllowed: true,
      scalping: {
        allowed: true,
        minSecondsPerTrade: 3
      },
      newsTrading: {
        blockDuringHighImpact: false,
        blockWindowMinutes: 5
      }
    },
    riskManagement: {
      marginCallLevel: 80,
      stopOutLevel: 50,
      allowNegativeBalance: false,
      maxDrawdownAlert: 20
    }
  },
  
  accountSettings: {
    registration: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      allowSocialLogin: false,
      minimumAge: 18,
      restrictedCountries: ['US', 'IR', 'KP']
    },
    verification: {
      kycLevels: {
        tier1: {
          enabled: true,
          depositLimit: 1000,
          withdrawalLimit: 1000,
          documentsRequired: ['ID']
        },
        tier2: {
          enabled: true,
          depositLimit: 10000,
          withdrawalLimit: 10000,
          documentsRequired: ['ID', 'ProofOfAddress']
        },
        tier3: {
          enabled: true,
          depositLimit: null,
          withdrawalLimit: null,
          documentsRequired: ['ID', 'ProofOfAddress', 'ProofOfIncome']
        }
      }
    },
    security: {
      twoFactorAuth: {
        required: false,
        enforcedForWithdrawals: true,
        methods: ['totp', 'sms', 'email']
      },
      sessionManagement: {
        timeout: 3600,
        allowMultipleSessions: true,
        maxConcurrentSessions: 3
      },
      ipWhitelist: {
        enabled: false,
        addresses: []
      }
    },
    dormancy: {
      inactiveDays: 365,
      sendReminderAt: [180, 270, 330],
      autoCloseAfterDays: 730
    }
  },
  
  funding: {
    deposits: {
      minAmounts: {
        bankTransfer: 100,
        card: 50,
        crypto: 25,
        ewallet: 10
      },
      maxAmounts: {
        bankTransfer: 100000,
        card: 10000,
        crypto: 50000,
        ewallet: 5000
      },
      processing: {
        autoApprove: true,
        autoApproveLimit: 5000,
        reviewQueueEnabled: true
      }
    },
    withdrawals: {
      minAmount: 50,
      maxPerDay: 10000,
      maxPerMonth: 100000,
      processingTime: {
        bankTransfer: '1-3 business days',
        card: '3-5 business days',
        crypto: 'up to 24 hours',
        ewallet: 'instant'
      },
      fees: {
        bankTransfer: 0,
        card: 2.5,
        crypto: 0,
        ewallet: 1.0
      },
      verification: {
        requireKYC: true,
        requirePhoneOTP: true,
        manualReviewThreshold: 5000
      }
    }
  },
  
  promotions: {
    welcomeBonus: {
      enabled: true,
      type: 'deposit_match',
      percentage: 100,
      maxBonus: 500,
      minDeposit: 100,
      tradingRequirement: 30,
      expiryDays: 90
    },
    referralProgram: {
      enabled: true,
      referrerReward: 50,
      refereeReward: 25,
      minRefereeDeposit: 100,
      payoutMethod: 'bonus'
    },
    loyaltyProgram: {
      enabled: true,
      pointsPerLot: 10,
      tiers: [
        {
          name: 'Bronze',
          minPoints: 0,
          benefits: ['basic_support']
        },
        {
          name: 'Silver',
          minPoints: 1000,
          benefits: ['priority_support', 'reduced_spreads']
        },
        {
          name: 'Gold',
          minPoints: 5000,
          benefits: ['vip_support', 'no_commission', 'free_withdrawals']
        }
      ]
    }
  },
  
  platformFeatures: {
    tradingTools: {
      economicCalendar: true,
      tradingSignals: false,
      marketSentiment: true,
      tradingCentral: false,
      autochartist: false
    },
    socialTrading: {
      enabled: false,
      copyTrading: false,
      leaderboard: false,
      tradingCommunity: false
    },
    education: {
      enabled: true,
      webinars: true,
      tutorials: true,
      eBooks: true,
      tradingAcademy: false,
      certificationProgram: false
    },
    analytics: {
      tradingHistory: true,
      performanceReports: true,
      taxReporting: true,
      exportData: true,
      apiAccess: false
    }
  },
  
  communications: {
    supportChannels: {
      liveChat: {
        enabled: true,
        hours: '24/7',
        averageResponseTime: '< 2 minutes'
      },
      email: {
        enabled: true,
        addresses: {
          general: 'support@tradingplatform.com',
          vip: 'vip@tradingplatform.com',
          compliance: 'compliance@tradingplatform.com'
        }
      },
      phone: {
        enabled: true,
        numbers: [
          {
            region: 'International',
            number: '+1-800-TRADE',
            hours: '24/5'
          }
        ]
      }
    },
    notifications: {
      email: {
        enabled: true,
        types: {
          marketingEmails: true,
          tradingAlerts: true,
          accountUpdates: true,
          weeklyReports: true
        }
      },
      sms: {
        enabled: false,
        types: {
          loginAlerts: true,
          withdrawalConfirm: true,
          marginCalls: true
        }
      },
      push: {
        enabled: true,
        types: {
          priceAlerts: true,
          orderFills: true,
          newsAlerts: false
        }
      }
    },
    announcements: {
      enabled: true,
      banner: {
        show: false,
        message: '',
        type: 'info',
        dismissible: true
      },
      maintenanceMode: {
        enabled: false,
        message: 'Platform under maintenance',
        allowedIPs: []
      }
    }
  },
  
  compliance: {
    riskWarnings: {
      enabled: true,
      showOnLogin: true,
      showOnDeposit: true,
      customText: 'Trading involves risk of loss. Only trade with money you can afford to lose.'
    },
    documents: {
      termsOfService: {
        version: '2.0',
        lastUpdated: '2025-01-01',
        acceptanceRequired: true
      },
      privacyPolicy: {
        version: '2.0',
        lastUpdated: '2025-01-01'
      },
      riskDisclosure: {
        version: '1.5',
        requireSignature: true
      }
    },
    dataProtection: {
      gdprCompliant: true,
      cookieConsent: true,
      rightToErasure: true,
      dataRetentionDays: 2555,
      encryptionEnabled: true
    },
    responsibleTrading: {
      selfExclusionAvailable: true,
      depositLimitsAvailable: true,
      realityChecks: true,
      coolingOffPeriod: true
    }
  },
  
  technical: {
    api: {
      enabled: false,
      rateLimit: 100,
      rateLimitWindow: 60,
      requireApiKey: true,
      allowedOrigins: []
    },
    webhooks: {
      enabled: false,
      endpoints: {
        deposit: '',
        withdrawal: '',
        trade: '',
        kyc: ''
      },
      retryAttempts: 3,
      timeout: 30
    },
    analytics: {
      googleAnalytics: {
        enabled: false,
        trackingId: ''
      },
      facebookPixel: {
        enabled: false,
        pixelId: ''
      },
      customTracking: {
        enabled: false,
        script: ''
      }
    },
    performance: {
      caching: {
        enabled: true,
        ttl: 300
      },
      cdn: {
        enabled: false,
        provider: ''
      },
      compression: {
        enabled: true
      }
    }
  },
  
  regional: {
    currencies: {
      base: 'USD',
      display: ['USD', 'EUR', 'GBP', 'JPY'],
      accountCurrencies: ['USD', 'EUR', 'GBP']
    },
    dateTime: {
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      timezone: 'America/New_York'
    },
    units: {
      distance: 'miles',
      temperature: 'fahrenheit'
    },
    regulations: {
      jurisdiction: 'US',
      regulatoryBody: 'SEC',
      compensationScheme: {
        enabled: true,
        name: 'SIPC',
        coverage: 500000
      }
    }
  },
  
  demoAccounts: {
    enabled: true,
    settings: {
      initialBalance: 10000,
      allowReset: true,
      resetCooldownDays: 7,
      maxResetsPerMonth: 4,
      expiryDays: 90,
      warningBeforeExpiryDays: 7,
      realTimeData: true,
      fullFeatureAccess: true
    }
  }
};
