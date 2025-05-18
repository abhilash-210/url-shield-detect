
// This is a mock database for demonstration purposes
// In a real application, this would be replaced with an actual API call or database connection

export interface KnownThreat {
  pattern: string | RegExp;
  threatLevel: 'low' | 'medium' | 'high';
  description: string;
}

export const knownThreats: KnownThreat[] = [
  {
    pattern: /login.*\.tk/i,
    threatLevel: 'high',
    description: 'Suspicious TLD often used for phishing'
  },
  {
    pattern: /paypal.*\.com-/i,
    threatLevel: 'high',
    description: 'Imitation of PayPal domain'
  },
  {
    pattern: /bank.*login.*\.xyz/i,
    threatLevel: 'high',
    description: 'Banking phishing attempt'
  },
  {
    pattern: /amazon.*\.site/i,
    threatLevel: 'high',
    description: 'Suspicious Amazon impersonation'
  },
  {
    pattern: /google.*docs.*-secure/i,
    threatLevel: 'high',
    description: 'Google Docs phishing pattern'
  },
  {
    pattern: /facebook.*account.*verify/i,
    threatLevel: 'medium',
    description: 'Potential Facebook verification scam'
  },
  {
    pattern: /free.*gift.*card/i,
    threatLevel: 'medium',
    description: 'Potential scam offering free rewards'
  },
  {
    pattern: /crypto.*investment/i,
    threatLevel: 'medium',
    description: 'Potential cryptocurrency scam'
  },
  {
    pattern: /microsoft.*support/i,
    threatLevel: 'medium',
    description: 'Potential tech support scam'
  },
  {
    pattern: /verify.*account/i,
    threatLevel: 'low',
    description: 'Account verification request'
  },
  {
    pattern: /unsubscribe.*now/i,
    threatLevel: 'low',
    description: 'Aggressive marketing tactics'
  },
  {
    pattern: /bit\.ly/i,
    threatLevel: 'low',
    description: 'URL shortener can mask destinations'
  },
  {
    pattern: /tiny\.url/i,
    threatLevel: 'low',
    description: 'URL shortener can mask destinations'
  }
];

export const domainReputationDatabase: Record<string, number> = {
  'google.com': 95,
  'facebook.com': 90,
  'amazon.com': 92,
  'microsoft.com': 94,
  'apple.com': 93,
  'paypal.com': 91,
  'netflix.com': 89,
  'chase.com': 90,
  'bankofamerica.com': 91,
  'wellsfargo.com': 89
};

export const getSuspiciousTLDs = () => [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', 
  '.work', '.dating', '.loan', '.racing'
];

export const getPhishingKeywords = () => [
  'account', 'secure', 'banking', 'login', 'verify', 
  'update', 'password', 'credential', 'confirm', 'paypal',
  'suspension', 'verify', 'unusual', 'activity', 'access'
];
