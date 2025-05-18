
import { knownThreats, domainReputationDatabase, getSuspiciousTLDs, getPhishingKeywords } from './mockDatabase';

export interface ThreatFactor {
  name: string;
  description: string;
  level: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
  url: string;
  safetyScore: number;
  threatFactors: ThreatFactor[];
  isPhishing: boolean;
}

export const analyzeUrl = (url: string): AnalysisResult => {
  // Parse URL
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const fullPath = urlObj.pathname + urlObj.search;
  
  // Initialize threat factors
  const threatFactors: ThreatFactor[] = [];
  let safetyPoints = 100; // Start with 100 points and deduct

  // Check domain reputation in our mock database
  const domainParts = domain.split('.');
  const baseDomain = domainParts.length >= 2 ? 
    `${domainParts[domainParts.length - 2]}.${domainParts[domainParts.length - 1]}` : domain;
  
  const domainReputation = domainReputationDatabase[baseDomain];
  
  if (!domainReputation) {
    // Domain not in our trusted database
    safetyPoints -= 10;
    
    // Check TLD against suspicious list
    const suspiciousTLDs = getSuspiciousTLDs();
    const tld = `.${domainParts[domainParts.length - 1]}`;
    
    if (suspiciousTLDs.includes(tld)) {
      safetyPoints -= 25;
      threatFactors.push({
        name: 'Suspicious TLD',
        description: `The domain uses a TLD (${tld}) commonly associated with free domains and abuse.`,
        level: 'high'
      });
    }
    
    // Check domain length (very long domains are suspicious)
    if (domain.length > 30) {
      safetyPoints -= 15;
      threatFactors.push({
        name: 'Unusually Long Domain',
        description: 'The domain name is unusually long, which is a common phishing tactic.',
        level: 'medium'
      });
    }
    
    // Check for numbers in domain (can be suspicious)
    if (/\d/.test(domain)) {
      safetyPoints -= 5;
      threatFactors.push({
        name: 'Numbers in Domain',
        description: 'The domain contains numbers, which can sometimes indicate a generated phishing domain.',
        level: 'low'
      });
    }
    
    // Check for hyphens (multiple hyphens can be suspicious)
    const hyphenCount = (domain.match(/-/g) || []).length;
    if (hyphenCount > 1) {
      safetyPoints -= 10;
      threatFactors.push({
        name: 'Multiple Hyphens',
        description: 'The domain uses multiple hyphens, which is sometimes used in phishing domains.',
        level: 'medium'
      });
    }
  } else {
    // Known domain with good reputation
    threatFactors.push({
      name: 'Recognized Domain',
      description: 'This is a well-known domain with established reputation.',
      level: 'low'
    });
  }
  
  // Check for phishing keywords in URL
  const phishingKeywords = getPhishingKeywords();
  const urlLower = url.toLowerCase();
  
  const foundKeywords = phishingKeywords.filter(keyword => urlLower.includes(keyword));
  if (foundKeywords.length >= 3) {
    safetyPoints -= 25;
    threatFactors.push({
      name: 'Phishing Keywords',
      description: `URL contains multiple suspicious keywords: ${foundKeywords.slice(0, 3).join(', ')}`,
      level: 'high'
    });
  } else if (foundKeywords.length > 0) {
    safetyPoints -= 10;
    threatFactors.push({
      name: 'Suspicious Keywords',
      description: `URL contains potentially suspicious keywords: ${foundKeywords.join(', ')}`,
      level: 'medium'
    });
  }
  
  // Check for HTTP (not HTTPS)
  if (urlObj.protocol === 'http:') {
    safetyPoints -= 20;
    threatFactors.push({
      name: 'Insecure Protocol',
      description: 'The URL uses HTTP instead of secure HTTPS protocol.',
      level: 'high'
    });
  }
  
  // Check for IP address as hostname
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
    safetyPoints -= 30;
    threatFactors.push({
      name: 'IP Address URL',
      description: 'The URL uses an IP address instead of a domain name, which is highly suspicious.',
      level: 'high'
    });
  }
  
  // Check against known threat patterns
  for (const threat of knownThreats) {
    if (typeof threat.pattern === 'string' && url.includes(threat.pattern) || 
        threat.pattern instanceof RegExp && threat.pattern.test(url)) {
      
      // Adjust safety points based on threat level
      switch (threat.threatLevel) {
        case 'high':
          safetyPoints -= 50;
          break;
        case 'medium':
          safetyPoints -= 30;
          break;
        case 'low':
          safetyPoints -= 15;
          break;
      }
      
      threatFactors.push({
        name: 'Known Threat Pattern',
        description: threat.description,
        level: threat.threatLevel
      });
      
      break; // Only count the highest threat level match
    }
  }

  // Mock additional analyses that would be done with real ML/AI
  // For now we'll randomly determine if we detect anything suspicious based on the domain
  const domainHash = hashString(domain);
  
  // Use hash to semi-deterministically assess URL
  if (domainHash % 17 === 0 && safetyPoints > 40) {
    safetyPoints -= 15;
    threatFactors.push({
      name: 'Suspicious Structure',
      description: 'The URL structure matches patterns seen in phishing campaigns.',
      level: 'medium'
    });
  }
  
  if (domainHash % 23 === 0 && safetyPoints > 30) {
    safetyPoints -= 10;
    threatFactors.push({
      name: 'Recent Registration',
      description: 'This domain appears to be recently registered, which can be a risk factor.',
      level: 'medium'
    });
  }
  
  // Clamp safety score between 0 and 100
  safetyPoints = Math.max(0, Math.min(100, safetyPoints));
  
  // Generate final result
  return {
    url,
    safetyScore: safetyPoints,
    threatFactors: threatFactors.length > 0 ? threatFactors : [
      {
        name: 'No Threats Detected',
        description: 'Our analysis did not find any suspicious patterns in this URL.',
        level: 'low'
      }
    ],
    isPhishing: safetyPoints < 50
  };
};

// Helper function to generate a hash from a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
