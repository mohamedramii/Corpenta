'use client'

import { motion } from 'framer-motion'
import { Building2, Globe, Briefcase, Zap, Shield, MapPin, Target } from 'lucide-react'
import { navy, blue, bluePale, accentBg, IMG } from '@/lib/constants'

export default function WhySaudiSection() {
  const benefits = [
    { 
      icon: Building2, 
      title: 'ملكية أجنبية 100%', 
      desc: 'ملكية كاملة بدون شريك محلي في معظم القطاعات',
      color: blue
    },
    { 
      icon: Globe, 
      title: 'اقتصاد قوي', 
      desc: 'أكبر اقتصاد في الشرق الأوسط مع فرص نمو هائلة',
      color: navy
    },
    { 
      icon: Briefcase, 
      title: 'قطاعات متنوعة', 
      desc: 'فرص استثمارية في التقنية والخدمات والصناعة',
      color: blue
    },
    { 
      icon: Zap, 
      title: 'رؤية 2030', 
      desc: 'إصلاحات مستمرة وبيئة أعمال متطورة',
      color: navy
    },
    { 
      icon: Shield, 
      title: 'لا ضريبة دخل', 
      desc: 'على الرواتب والأجور الشخصية',
      color: blue
    },
  ]

  return (
    <section id="why-saudi" className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ borderColor: navy, backgroundColor: accentBg, color: navy }}>
              <MapPin className="w-4 h-4" />
              لماذا السعودية؟
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: navy }}>
              السعودية من أسرع الأسواق نموًا في المنطقة
            </h2>
            <p className="text-lg text-gray-600">
              توفر فرصًا قوية للمستثمرين الأجانب ضمن رؤية 2030
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-xl group"
          >
            <img
              src={IMG.skyline}
              alt="Saudi Arabia"
              className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: bluePale }}>
                <Target className="w-4 h-4" style={{ color: blue }} />
                <span className="text-sm font-bold" style={{ color: blue }}>رؤية 2030</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                بيئة استثمارية جاذبة
              </h3>
              <p className="text-gray-200 text-sm md:text-base max-w-lg">
                المملكة تشهد تحولاً اقتصادياً ضخماً مع إصلاحات جوهرية تجعل بيئة الأعمال أكثر جاذبية ومرونة للمستثمرين من مختلف القطاعات.
              </p>
            </div>
          </motion.div>

          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: benefit.color === blue ? bluePale : accentBg }}>
                <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: navy }}>
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
