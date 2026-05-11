'use client'

import { MessageCircle } from 'lucide-react'
import { blue, blueLight } from '@/lib/constants'
import { CONTACT } from '@/lib/constants'

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
      style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping" style={{ backgroundColor: blueLight }} />
    </a>
  )
}
