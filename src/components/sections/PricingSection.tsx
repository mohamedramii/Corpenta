'use client'

import { motion } from 'framer-motion'
import { Star, Check } from 'lucide-react'
import BorderGlow from '@/components/BorderGlow'
import { navy, blue, blueLight, bluePale, accentBg } from '@/lib/constants'

export default function PricingSection() {
  const plans = [
    {
      name: 'FOUNDATION',
      nameAr: 'الباقة الأساسية',
      price: '12,500',
      desc: 'مناسبة لبدء تأسيس الشركة بشكل أساسي',
      features: [
        'تأسيس الشركة',
        'السجل التجاري',
        'توثيق العقود',
        'التسجيلات الحكومية الأساسية'
      ],
      cta: 'ابدأ الآن',
      popular: false,
      color: navy,
    },
    {
      name: 'OPERATIONAL',
      nameAr: 'الباقة التشغيلية',
      price: '19,900',
      desc: 'للمستثمرين الذين يريدون تشغيل الشركة بشكل متكامل',
      features: [
        'كل ما في الباقة الأساسية',
        'تفعيل المنصات الحكومية',
        'دعم العمليات الأساسية',
        'دعم إضافي للتشغيل'
      ],
      cta: 'احجز استشارة',
      popular: true,
      color: blue,
    },
    {
      name: 'VIP',
      nameAr: 'باقة VIP',
      price: '31,900',
      desc: 'حل متكامل مع دعم كامل وتجربة شاملة',
      features: [
        'جميع الخدمات',
        'أولوية في المتابعة',
        'دعم متقدم',
        'مساعدة تشغيلية موسعة'
      ],
      cta: 'تحدث معنا',
      popular: false,
      color: navy,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: bluePale, color: blue }}>
              <Star className="w-4 h-4" />
              الباقات
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: navy }}>
              باقات تناسب احتياجاتك
            </h2>
            <p className="text-lg text-gray-600">
              اختر الباقة المناسبة لبدء رحلتك في السعودية
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const cardContent = (
              <>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})`, zIndex: 20 }}>
                    الأكثر طلبًا
                  </div>
                )}

                <div className="text-center mb-6">
                  <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
                    {plan.name}
                  </span>
                  <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: navy }}>
                    {plan.nameAr}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {plan.desc}
                  </p>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="font-heading text-5xl font-bold" style={{ color: plan.color }}>
                      {plan.price}
                    </span>
                    <span className="text-lg text-gray-500">SAR</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: plan.color === blue ? bluePale : accentBg }}>
                        <Check className="w-3 h-3" style={{ color: plan.color }} />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-4 rounded-xl font-bold text-base transition-all hover:shadow-lg hover:scale-105 active:scale-95 ${
                    plan.popular ? 'text-white' : ''
                  }`}
                  style={
                    plan.popular
                      ? { background: `linear-gradient(135deg, ${blue}, ${blueLight})` }
                      : { border: `2px solid ${plan.color}`, color: plan.color }
                  }
                >
                  {plan.cta}
                </a>
              </>
            )

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular ? (
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="217 91 70"
                    backgroundColor="#ffffff"
                    borderRadius={24}
                    glowRadius={30}
                    glowIntensity={3}
                    coneSpread={1}
                    animated={true}
                    alwaysActive={true}
                    colors={['#3b82f6', '#60a5fa', '#93c5fd']}
                    fillOpacity={1}
                    className="h-full"
                  >
                    <div className="p-8 pt-12 h-full flex flex-col">
                      {cardContent}
                    </div>
                  </BorderGlow>
                ) : (
                  <div className="relative rounded-3xl p-8 bg-white shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 h-full flex flex-col">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
