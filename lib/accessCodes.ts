// Access code configuration
// In production, this should be stored securely (database, environment variables, etc.)

export interface AccessCodeEntry {
  phone: string
  accessCode: string
}

// Store access codes as a map for quick lookup
// Format: phone number (normalized) -> access code
export const ACCESS_CODES: Record<string, string> = {
  // Demo/Test entries - replace with your actual access codes in production
  // Phone numbers should be normalized (digits only, no spaces/dashes)
  
  // Demo Entry 1 - Easy to remember
  '1234567890': 'DEMO123',
  
  // Demo Entry 2
  '9876543210': 'TEST456',
  
  // Demo Entry 3 - Simple test
  '5555555555': 'PASS123',
  
  // Demo Entry 4
  '1111111111': 'DEMO999',
  
  // Demo Entry 5
  '9999999999': 'ACCESS',
  
  // Add more entries as needed
}

/**
 * Normalize phone number by removing all non-digit characters
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Verify if the provided phone number and access code combination is valid
 */
export function verifyAccessCode(phone: string, accessCode: string): boolean {
  const normalizedPhone = normalizePhone(phone)
  const storedCode = ACCESS_CODES[normalizedPhone]
  
  if (!storedCode) {
    return false
  }
  
  return storedCode.toUpperCase() === accessCode.toUpperCase()
}

