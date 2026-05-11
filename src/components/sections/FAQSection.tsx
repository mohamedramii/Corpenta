'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ChevronDown } from 'lucide-react'
import { navy, blue, bluePale, accentBg } from '@/lib/constants'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { 
      q: 'هل يمكن للأجانب تأسيس شركة في السعودية؟', 
      a: 'نعم، يمكن للمستثمر الأجنبي تأسيس شركة في السعودية حسب النشاط والمتطلبات النظامية. نظام الاستثمار الأجنبي يتيح ملكية أجنبية كاملة في العديد من القطاعات، مع الحصول على رخصة استثمار من وزارة الاستثمار (MISA).' 
    },
    { 
      q: 'كم تستغرق الإجراءات؟', 
      a: 'تختلف المدة حسب نوع النشاط والمستندات المطلوبة، لكننا نعمل على تسريع العملية قدر الإمكان. عادةً ما تستغرق الإجراءات من أسبوعين إلى 6 أسابيع من بداية تجهيز المستندات حتى إصدار الرخصة والسجل التجاري.' 
    },
    { 
      q: 'هل تقدمون دعم بعد التأسيس؟', 
      a: 'نعم، نقدم دعمًا مستمرًا بعد تأسيس الشركة يشمل تسجيل المنصات الحكومية، الامتثال الضريبي، تجديد الرخص، وأي إجراءات تشغيلية تحتاجها شركتك للعمل بشكل قانوني وسلس في السعودية.' 
    },
    { 
      q: 'ما هي المستندات المطلوبة للتأسيس؟', 
      a: 'تختلف المستندات حسب نوع الشركة والنشاط، لكن بشكل عام نحتاج جواز سفر ساري، صور شخصية، بيانات النشاط التجاري، وأحيانًا شهادات خبرة أو تصديقات من الغرفة التجارية في بلدك.' 
    },
    { 
      q: 'هل يمكنني امتلاك الشركة 100% كأجنبي؟', 
      a: 'نعم، في معظم القطاعات يتيح النظام السعودي ملكية أجنبية 100% من خلال رخصة استثمار من MISA. هناك بعض القطاعات التي تتطلب شريكًا محليًا، لكن الفعاليات التجارية الأكثر شيوعًا تسمح بالملكية الكاملة.' 
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: bluePale, color: blue }}>
              <MessageCircle className="w-4 h-4" />
              أسئلة شائعة
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: navy }}>
              إجابات على أسئلتك
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-right transition-colors hover:bg-gray-100/50"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-heading font-bold text-base md:text-lg pr-4" style={{ color: navy }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: openIndex === i ? blue : accentBg }}>
                    <ChevronDown className="w-5 h-5" style={{ color: openIndex === i ? 'white' : navy }} />
                  </div>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
