'use client'

import { motion } from 'framer-motion'
import { FileText, Shield, Building2, Rocket, TrendingUp } from 'lucide-react'
import { navy, blue, bluePale } from '@/lib/constants'

export default function StepsSection() {
  const steps = [
    { 
      title: 'مراجعة النشاط والمتطلبات', 
      desc: 'نراجع نوع النشاط والمتطلبات المناسبة لتأسيس الشركة ونحدد أفضل مسار قانوني',
      icon: FileText,
      color: blue
    },
    { 
      title: 'تجهيز المستندات', 
      desc: 'نساعدك في تجهيز كافة المستندات والتصديقات المطلوبة لبدء الإجراءات',
      icon: FileText,
      color: navy
    },
    { 
      title: 'إصدار الرخصة', 
      desc: 'التقديم على الإجراءات الرسمية ومتابعتها حتى إصدار رخصة الاستثمار',
      icon: Shield,
      color: blue
    },
    { 
      title: 'تأسيس الشركة', 
      desc: 'إصدار السجل التجاري وتوثيق العقود الرسمية للشركة',
      icon: Building2,
      color: navy
    },
    { 
      title: 'تشغيل المنصات', 
      desc: 'تفعيل وربط المنصات الحكومية الأساسية لبدء العمليات',
      icon: Rocket,
      color: blue
    },
  ]

  return (
    <section id="steps" className="relative bg-gray-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: bluePale, color: blue }}>
              <TrendingUp className="w-4 h-4" />
              خطوات التأسيس
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: navy }}>
              من الفكرة إلى التشغيل بخطوات واضحة
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="mb-4 md:mb-8 last:mb-0 md:sticky"
            style={{
              top: `${120 + i * 40}px`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:z-auto"
              style={{
                zIndex: steps.length - i,
              }}
            >
              <div 
                className="relative w-full overflow-hidden bg-white rounded-2xl md:rounded-3xl border-2 shadow-xl"
                style={{ 
                  borderColor: step.color,
                }}
              >
                <div 
                  className="absolute -bottom-12 -left-12 opacity-[0.08] pointer-events-none hidden md:block"
                  style={{ color: step.color }}
                >
                  <step.icon className="w-80 h-80" strokeWidth={0.5} />
                </div>

                <div className="relative z-10 p-5 md:p-10">
                  <div className="flex items-start gap-4 mb-4 md:mb-6">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-heading text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3"
                        style={{ color: navy }}
                      >
                        {step.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 md:hidden">
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-heading text-xs font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                          {i + 1}/{steps.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 md:mb-8">
                    {step.desc}
                  </p>

                  <div className="hidden md:flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-heading text-xl font-bold text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                      الخطوة {i + 1} من {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="h-16 md:h-32" />
    </section>
  )
}
