/**
 * Contact Form Types
 */

export interface ContactFormData {
  name: string
  email: string
  phone: string
  activity?: string
  message?: string
}

export interface ContactFormResponse {
  success: boolean
  messageId?: string
  error?: string
  details?: unknown
  hint?: string
}
