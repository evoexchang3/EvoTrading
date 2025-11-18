/**
 * Phone URI Utilities
 * 
 * Utilities for generating phone URIs compatible with various VoIP clients and protocols.
 * Supports Zoiper, standard tel:, callto:, and SIP protocols.
 */

export type PhoneProtocol = 'zoiper' | 'callto' | 'tel' | 'sip';

export interface PhoneUriOptions {
  protocol?: PhoneProtocol;
  domain?: string;
}

/**
 * Sanitizes a phone number by removing all non-numeric characters except '+'
 * @param phoneNumber - The phone number to sanitize
 * @returns Sanitized phone number (e.g., "+15551234567")
 */
export function sanitizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[^0-9+]/g, '');
}

/**
 * Generates a phone URI for click-to-dial functionality
 * 
 * Supports multiple protocols:
 * - 'zoiper': zoiper:+15551234567 (Recommended - won't be hijacked by other apps)
 * - 'callto': callto:+15551234567 (May conflict with Skype/FaceTime)
 * - 'tel': tel:+15551234567 (Standard, may show OS dialog)
 * - 'sip': sip:user@domain (For SIP URIs with domain)
 * 
 * @param phoneNumber - The phone number to call
 * @param options - Configuration options
 * @returns URI string (e.g., "zoiper:+15551234567")
 * 
 * @example
 * // Default protocol from environment or 'zoiper'
 * getPhoneUri('+1 (555) 123-4567')
 * // => "zoiper:+15551234567"
 * 
 * @example
 * // Specific protocol
 * getPhoneUri('+15551234567', { protocol: 'tel' })
 * // => "tel:+15551234567"
 * 
 * @example
 * // SIP with domain
 * getPhoneUri('john', { protocol: 'sip', domain: 'example.com' })
 * // => "sip:john@example.com"
 */
export function getPhoneUri(
  phoneNumber: string,
  options: PhoneUriOptions = {}
): string {
  const protocol = options.protocol || 
    (import.meta.env.VITE_PHONE_PROTOCOL as PhoneProtocol) || 
    'zoiper';

  if (protocol === 'sip' && options.domain) {
    const username = phoneNumber.replace(/[^a-zA-Z0-9._-]/g, '');
    return `sip:${username}@${options.domain}`;
  }

  const cleanNumber = sanitizePhoneNumber(phoneNumber);
  return `${protocol}:${cleanNumber}`;
}

/**
 * Gets the configured default phone protocol from environment
 * Falls back to 'zoiper' if not configured
 * 
 * @returns The configured phone protocol
 */
export function getDefaultPhoneProtocol(): PhoneProtocol {
  return (import.meta.env.VITE_PHONE_PROTOCOL as PhoneProtocol) || 'zoiper';
}

/**
 * Validates if a string is a valid phone protocol
 * 
 * @param protocol - The protocol to validate
 * @returns true if valid protocol, false otherwise
 */
export function isValidPhoneProtocol(protocol: string): protocol is PhoneProtocol {
  return ['zoiper', 'callto', 'tel', 'sip'].includes(protocol);
}
