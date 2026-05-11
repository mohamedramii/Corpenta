/**
 * Email Configuration
 */

export const EMAIL_CONFIG = {
  // Sender configuration
  from: {
    name: 'Corpenta Contact Form',
    email: 'onboarding@resend.dev', // Change to your domain after verification
  },

  // Recipient configuration
  to: ['mohamedramy101@gmail.com'] as string[], // Change to sales@corpenta.com after domain verification

  // Logo URL
  logoUrl: 'https://i.ibb.co/dsJFm3qn/Corpenta-Logo-Dark.png',

  // Brand colors
  colors: {
    primary: '#2563eb',
    secondary: '#3b82f6',
    navy: '#03034d',
    background: '#f3f4f6',
  },

  // Website URL
  websiteUrl: 'https://corpenta.com',
} as const
