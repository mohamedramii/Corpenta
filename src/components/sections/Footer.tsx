'use client'

import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { blue, CONTACT } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            linear-gradient(
              to bottom,
              #0a0a0a 0%,
              #10141aff 25%,
              #15182dff 50%,
              #231f4aff 75%,
              #483c8bff 100%
            )
          `
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <img 
              src="/Corpenta-Logo-Dark.png" 
              alt="Corpenta Logo" 
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              شريكك الموثوق لتأسيس الشركات الأجنبية في المملكة العربية السعودية. أكثر من 10 سنوات خبرة في حلول التأسيس الاحترافية.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'لماذا السعودية؟', href: '#why-saudi' },
                { label: 'خدماتنا', href: '#services' },
                { label: 'الباقات', href: '#pricing' },
                { label: 'أسئلة شائعة', href: '#faq' },
                { label: 'تواصل معنا', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: blue }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <a 
                href={CONTACT.whatsapp}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" style={{ color: blue }} /> 
                واتساب
              </a>
              <a 
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" style={{ color: blue }} /> 
                {CONTACT.phoneDisplay}
              </a>
              <a 
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors" 
                dir="ltr"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Corpenta. جميع الحقوق محفوظة.
          </p>
          <a 
            href={CONTACT.website}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            corpenta.com
          </a>
        </div>
      </div>
    </footer>
  )
}
