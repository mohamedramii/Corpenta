/**
 * Validation Helpers
 */

import type { ContactFormData } from '@/types/contact'

export function validateContactForm(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, error: 'الرجاء إدخال الاسم' }
  }

  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'الرجاء إدخال بريد إلكتروني صحيح' }
  }

  if (!data.phone || data.phone.trim().length === 0) {
    return { valid: false, error: 'الرجاء إدخال رقم الهاتف' }
  }

  return { valid: true }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}
