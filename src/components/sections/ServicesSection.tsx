'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText, Handshake, Building2, Users, Globe, Briefcase, Star, Sparkles } from 'lucide-react'
import { navy, navyLight, blue, blueLight, bluePale } from '@/lib/constants'

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const spotlight = document.createElement('div')
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(59, 130, 246, 0.15) 0%,
        rgba(59, 130, 246, 0.08) 15%,
        rgba(59, 130, 246, 0.04) 25%,
        rgba(59, 130, 246, 0.02) 40%,
        rgba(59, 130, 246, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)

    const handleMouseMove = (e: MouseEvent) => {
      const section = gridRef.current?.closest('section')
      const rect = section?.getBoundingClientRect()
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      if (!mouseInside) {
        spotlight.style.opacity = '0'
        gridRef.current?.querySelectorAll('.magic-service-card').forEach((card: Element) => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0')
        })
        return
      }

      spotlight.style.left = `${e.clientX}px`
      spotlight.style.top = `${e.clientY}px`
      spotlight.style.opacity = '0.8'

      gridRef.current?.querySelectorAll('.magic-service-card').forEach((card: Element) => {
        const cardElement = card as HTMLElement
        const cardRect = cardElement.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)
        
        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100

        cardElement.style.setProperty('--glow-x', `${relativeX}%`)
        cardElement.style.setProperty('--glow-y', `${relativeY}%`)

        const glowIntensity = distance < 300 ? 1 : distance < 500 ? (500 - distance) / 200 : 0
        cardElement.style.setProperty('--glow-intensity', String(glowIntensity))
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      spotlight.remove()
    }
  }, [])

  const services = [
    { icon: Shield, title: 'إصدار رخصة الاستثمار', desc: 'الحصول على ترخيص الاستثمار الأجنبي من وزارة الاستثمار (MISA)', gradient: `linear-gradient(135deg, ${blue}, ${blueLight})` },
    { icon: FileText, title: 'تأسيس الشركة', desc: 'إصدار السجل التجاري وإعداد كافة مستندات التأسيس الرسمية', gradient: `linear-gradient(135deg, ${navy}, ${navyLight})` },
    { icon: Handshake, title: 'توثيق العقود', desc: 'توثيق عقود الشركة لدى الجهات المختصة', gradient: `linear-gradient(135deg, ${blue}, ${blueLight})` },
    { icon: Building2, title: 'تسجيل ZATCA', desc: 'تسجيل الشركة في هيئة الزكاة والضريبة والجمارك', gradient: `linear-gradient(135deg, ${navy}, ${navyLight})` },
    { icon: Users, title: 'تسجيل GOSI', desc: 'تسجيل الموظفين في المؤسسة العامة للتأمينات الاجتماعية', gradient: `linear-gradient(135deg, ${blue}, ${blueLight})` },
    { icon: Globe, title: 'تفعيل Qiwa', desc: 'تفعيل حساب الشركة على منصة قوى لإدارة شؤون العمالة', gradient: `linear-gradient(135deg, ${navy}, ${navyLight})` },
    { icon: Briefcase, title: 'فتح حساب بنكي', desc: 'مساعدة في إجراءات فتح الحساب البنكي التجاري', gradient: `linear-gradient(135deg, ${blue}, ${blueLight})` },
    { icon: Star, title: 'تأشيرة المدير', desc: 'المساعدة في استخراج تأشيرة المدير العام', gradient: `linear-gradient(135deg, ${navy}, ${navyLight})` },
  ]

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: bluePale, color: blue }}>
              <Sparkles className="w-4 h-4" />
              خدماتنا
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: navy }}>
              دعم متكامل لتأسيس شركتك
            </h2>
            <p className="text-lg text-gray-600">
              نقدم جميع الخدمات التي تحتاجها لتأسيس وتشغيل شركتك في السعودية
            </p>
          </motion.div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="magic-service-card relative rounded-2xl p-6 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              style={{
                '--glow-x': '50%',
                '--glow-y': '50%',
                '--glow-intensity': '0',
              } as React.CSSProperties}
            >
              <div 
                className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 200px at var(--glow-x) var(--glow-y), rgba(59, 130, 246, calc(0.15 * var(--glow-intensity))), transparent)`,
                  opacity: 'var(--glow-intensity)',
                }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: service.gradient }}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-base mb-2" style={{ color: navy }}>
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
