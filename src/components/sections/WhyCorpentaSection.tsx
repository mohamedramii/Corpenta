'use client'

import { motion } from 'framer-motion'
import { Award, Building2, Star, Globe, Shield, Zap, Languages, Clock } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import { navy, blue, blueLight, bluePale, accentBg, IMG } from '@/lib/constants'

export default function WhyCorpentaSection() {
  const stats = [
    { num: 10, suffix: '+', label: 'سنوات خبرة', icon: Award },
    { num: 500, suffix: '+', label: 'شركة أسسناها', icon: Building2 },
    { num: 98, suffix: '%', label: 'رضا العملاء', icon: Star },
    { num: 50, suffix: '+', label: 'جنسية مختلفة', icon: Globe },
  ]

  const reasons = [
    { icon: Shield, title: 'خبرة متخصصة', desc: 'أكثر من 10 سنوات في تأسيس الشركات الأجنبية' },
    { icon: Zap, title: 'تنفيذ مباشر', desc: 'نتعامل مباشرة مع الجهات الحكومية' },
    { icon: Languages, title: 'دعم متعدد اللغات', desc: 'فريقنا يقدم الدعم بالعربية والإنجليزية' },
    { icon: Clock, title: 'متابعة احترافية', desc: 'تحديثات دورية على حالة الإجراءات' },
  ]

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: accentBg, color: navy }}>
              <Award className="w-4 h-4" />
              لماذا Corpenta؟
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: navy }}>
              لماذا يختارنا العملاء؟
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={IMG.business}
                alt="Business Team"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>

          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}>
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base mb-1" style={{ color: navy }}>
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: i % 2 === 0 ? bluePale : accentBg }}>
                <stat.icon className="w-6 h-6" style={{ color: i % 2 === 0 ? blue : navy }} />
              </div>
              <div className="font-heading text-3xl font-bold mb-1" style={{ color: i % 2 === 0 ? blue : navy }}>
                <AnimatedCounter target={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
