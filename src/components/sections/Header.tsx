'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Menu, X } from 'lucide-react'
import { blue, blueLight } from '@/lib/constants'
import { CONTACT } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'لماذا السعودية؟', href: '#why-saudi' },
    { label: 'خدماتنا', href: '#services' },
    { label: 'الخطوات', href: '#steps' },
    { label: 'الباقات', href: '#pricing' },
    { label: 'أسئلة شائعة', href: '#faq' },
  ]

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-7xl mx-auto rounded-2xl border-2 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-gray-200/50' 
            : 'bg-white/10 backdrop-blur-md border-white/20'
        }`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            <a href={CONTACT.website} className="flex items-center gap-2.5 group" aria-label="Corpenta Home">
              <img 
                src="/Corpenta-Logo-Dark.png" 
                alt="Corpenta Logo" 
                className="h-10 w-auto transition-all group-hover:scale-105"
              />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    scrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-white/20 text-gray-800'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all hover:shadow-md hover:scale-105 border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-bold rounded-xl text-white transition-all hover:shadow-lg hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}
              >
                احجز استشارة
              </a>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" 
              onClick={() => setMobileOpen(!mobileOpen)} 
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200/30"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setMobileOpen(false)} 
                    className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 space-y-2 border-t border-gray-200/30 mt-2">
                  <a 
                    href={CONTACT.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold rounded-xl border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  >
                    <MessageCircle className="w-4 h-4" /> 
                    تواصل عبر واتساب
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileOpen(false)} 
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold rounded-xl text-white" 
                    style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}
                  >
                    احجز استشارة مجانية
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
