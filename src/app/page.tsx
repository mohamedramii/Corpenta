'use client'

import './design2/design2.css'
import { motion } from 'framer-motion'
import { Shield, Building2, Rocket, Check, Star, FileText, Handshake, Users, Globe, Briefcase, Zap, Languages, Phone, ArrowLeft, Target, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import MagicRings from '@/components/MagicRings'
import { navy, CONTACT } from '@/lib/constants'
import { ASSETS } from '@/lib/paths'

const gold = '#d4af37'

export default function Design2Page() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Light theme colors only
  const theme = {
    bg: '#ffffff',
    card: 'rgba(0, 0, 0, 0.02)',
    border: 'rgba(0, 0, 0, 0.1)',
    text: '#0a0a1a',
    textSecondary: '#6b7280',
    accent: navy,
    accentLight: '#0a0a6e',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ في إرسال الرسالة')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', activity: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ. الرجاء المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="design2-page min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-colors duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src={ASSETS.logo} 
                alt="Corpenta" 
                className="h-10 w-auto transition-all"
              />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['الخدمات', 'الباقات', 'من نحن', 'تواصل'].map((item, i) => (
                <a key={item} href={`#${['services', 'pricing', 'about', 'contact'][i]}`} className="text-sm font-medium transition-colors" style={{ color: theme.textSecondary }}>
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)` }}>
                احجز استشارة
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl leading-tight transition-colors" style={{ color: theme.text, fontWeight: 500 }}>
              أسس شركتك في السعودية{' '}
              <span className="italic" style={{ color: theme.accent }}>بثقة ووضوح</span>
            </h1>
            <p className="text-xl mb-8 leading-relaxed transition-colors" style={{ color: theme.textSecondary, fontWeight: 500 }}>
              نساعد المستثمرين ورواد الأعمال الأجانب على تأسيس شركاتهم في السعودية بشكل قانوني واحترافي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="px-8 py-4 rounded-xl text-white transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)`, fontWeight: 600 }}>
                احجز استشارة مجانية
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl border-2 transition-all hover:scale-105" style={{ borderColor: theme.border, backgroundColor: theme.card, color: theme.text, fontWeight: 600 }}>
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>

          {/* Hero Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: 'رخصة استثمار', desc: 'معتمد من MISA', features: ['ملكية أجنبية 100%', 'إجراءات سريعة', 'دعم كامل'] },
              { icon: Building2, title: 'تأسيس الشركة', desc: 'سجل تجاري', features: ['توثيق العقود', 'تسجيل حكومي', 'متابعة احترافية'] },
              { icon: Rocket, title: 'بدء التشغيل', desc: 'منصات حكومية', features: ['تفعيل ZATCA', 'تسجيل GOSI', 'تفعيل Qiwa'] },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="rounded-2xl p-6 border transition-colors" style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: theme.accent }}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl mb-1 transition-colors" style={{ color: theme.text, fontWeight: 700 }}>{card.title}</h3>
                <p className="text-sm mb-4" style={{ color: gold, fontWeight: 500 }}>{card.desc}</p>
                <div className="space-y-2">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm transition-colors" style={{ color: theme.textSecondary, fontWeight: 500 }}>
                      <Check className="w-4 h-4" style={{ color: theme.accent }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Saudi Section */}
      <section id="why-saudi" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm mb-4 inline-block" style={{ color: gold, fontWeight: 600 }}>لماذا السعودية؟</span>
            <h2 className="text-4xl md:text-6xl mb-4 transition-colors" style={{ color: theme.text, fontWeight: 800 }}>
              السعودية من <span className="italic" style={{ color: theme.accent }}>أسرع الأسواق</span> نموًا
            </h2>
            <p className="text-xl transition-colors" style={{ color: theme.textSecondary, fontWeight: 500 }}>توفر فرصًا قوية للمستثمرين الأجانب ضمن رؤية 2030</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'ملكية أجنبية 100%', desc: 'ملكية كاملة بدون شريك محلي في معظم القطاعات' },
              { icon: Globe, title: 'اقتصاد قوي', desc: 'أكبر اقتصاد في الشرق الأوسط مع فرص نمو هائلة' },
              { icon: Briefcase, title: 'قطاعات متنوعة', desc: 'فرص استثمارية في التقنية والخدمات والصناعة' },
              { icon: Zap, title: 'رؤية 2030', desc: 'إصلاحات مستمرة وبيئة أعمال متطورة' },
              { icon: Shield, title: 'لا ضريبة دخل', desc: 'على الرواتب والأجور الشخصية' },
              { icon: Target, title: 'بيئة جاذبة', desc: 'تحول اقتصادي ضخم مع إصلاحات جوهرية' },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl p-6 border transition-colors" style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <benefit.icon className="w-8 h-8 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-lg font-bold mb-2 transition-colors" style={{ color: theme.text }}>{benefit.title}</h3>
                <p className="text-sm transition-colors" style={{ color: theme.textSecondary }}>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold mb-4 inline-block" style={{ color: gold }}>خدماتنا</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 transition-colors" style={{ color: theme.text }}>
              دعم <span className="italic" style={{ color: theme.accent }}>متكامل</span> لتأسيس شركتك
            </h2>
            <p className="text-xl transition-colors" style={{ color: theme.textSecondary }}>نقدم جميع الخدمات التي تحتاجها لتأسيس وتشغيل شركتك</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'إصدار رخصة الاستثمار', desc: 'الحصول على ترخيص الاستثمار الأجنبي من MISA' },
              { icon: FileText, title: 'تأسيس الشركة', desc: 'إصدار السجل التجاري وإعداد مستندات التأسيس' },
              { icon: Handshake, title: 'توثيق العقود', desc: 'توثيق عقود الشركة لدى الجهات المختصة' },
              { icon: Building2, title: 'تسجيل ZATCA', desc: 'تسجيل الشركة في هيئة الزكاة والضريبة' },
              { icon: Users, title: 'تسجيل GOSI', desc: 'تسجيل الموظفين في التأمينات الاجتماعية' },
              { icon: Globe, title: 'تفعيل Qiwa', desc: 'تفعيل حساب الشركة على منصة قوى' },
              { icon: Briefcase, title: 'فتح حساب بنكي', desc: 'مساعدة في إجراءات فتح الحساب البنكي' },
              { icon: Star, title: 'تأشيرة المدير', desc: 'المساعدة في استخراج تأشيرة المدير العام' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="rounded-2xl p-6 border transition-colors" style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <service.icon className="w-8 h-8 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-base font-bold mb-2 transition-colors" style={{ color: theme.text }}>{service.title}</h3>
                <p className="text-sm transition-colors" style={{ color: theme.textSecondary }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold mb-4 inline-block" style={{ color: gold }}>خطوات التأسيس</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 transition-colors" style={{ color: theme.text }}>
              من الفكرة إلى <span className="italic" style={{ color: theme.accent }}>التشغيل</span>
            </h2>
            <p className="text-xl transition-colors" style={{ color: theme.textSecondary }}>خطوات واضحة ومباشرة</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { icon: FileText, title: 'مراجعة النشاط والمتطلبات', desc: 'نراجع نوع النشاط والمتطلبات المناسبة لتأسيس الشركة ونحدد أفضل مسار قانوني' },
              { icon: FileText, title: 'تجهيز المستندات', desc: 'نساعدك في تجهيز كافة المستندات والتصديقات المطلوبة لبدء الإجراءات' },
              { icon: Shield, title: 'إصدار الرخصة', desc: 'التقديم على الإجراءات الرسمية ومتابعتها حتى إصدار رخصة الاستثمار' },
              { icon: Building2, title: 'تأسيس الشركة', desc: 'إصدار السجل التجاري وتوثيق العقود الرسمية للشركة' },
              { icon: Rocket, title: 'تشغيل المنصات', desc: 'تفعيل وربط المنصات الحكومية الأساسية لبدء العمليات' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl p-8 border flex items-start gap-6 transition-colors" style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: theme.accent }}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold transition-colors" style={{ color: theme.text }}>{step.title}</h3>
                    <span className="text-sm font-bold px-3 py-1 rounded-full transition-colors" style={{ backgroundColor: theme.card, color: gold }}>
                      {i + 1}/{5}
                    </span>
                  </div>
                  <p className="transition-colors" style={{ color: theme.textSecondary }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold mb-4 inline-block" style={{ color: gold }}>الباقات</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 transition-colors" style={{ color: theme.text }}>
              باقات تناسب <span className="italic" style={{ color: theme.accent }}>احتياجاتك</span>
            </h2>
            <p className="text-xl transition-colors" style={{ color: theme.textSecondary }}>اختر الباقة المناسبة لبدء رحلتك</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'FOUNDATION', nameAr: 'الباقة الأساسية', price: '12,500', desc: 'مناسبة لبدء تأسيس الشركة بشكل أساسي', features: ['تأسيس الشركة', 'السجل التجاري', 'توثيق العقود', 'التسجيلات الحكومية الأساسية'], popular: false },
              { name: 'OPERATIONAL', nameAr: 'الباقة التشغيلية', price: '19,900', desc: 'للمستثمرين الذين يريدون تشغيل الشركة بشكل متكامل', features: ['كل ما في الباقة الأساسية', 'تفعيل المنصات الحكومية', 'دعم العمليات الأساسية', 'دعم إضافي للتشغيل'], popular: true },
              { name: 'VIP', nameAr: 'باقة VIP', price: '31,900', desc: 'حل متكامل مع دعم كامل وتجربة شاملة', features: ['جميع الخدمات', 'أولوية في المتابعة', 'دعم متقدم', 'مساعدة تشغيلية موسعة'], popular: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white z-10" style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)` }}>
                    الأكثر طلبًا
                  </div>
                )}
                <div className={`rounded-2xl p-8 border h-full transition-colors ${plan.popular ? 'border-2' : ''}`} style={{ backgroundColor: theme.card, borderColor: plan.popular ? theme.accent : theme.border }}>
                  <span className="text-xs font-bold tracking-wider uppercase block mb-2 transition-colors" style={{ color: theme.textSecondary }}>{plan.name}</span>
                  <h3 className="text-2xl font-bold mb-2 transition-colors" style={{ color: theme.text }}>{plan.nameAr}</h3>
                  <p className="text-sm mb-6 transition-colors" style={{ color: theme.textSecondary }}>{plan.desc}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold transition-colors" style={{ color: theme.text }}>{plan.price}</span>
                    <span className="text-lg transition-colors" style={{ color: theme.textSecondary }}>SAR</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                        <span className="text-sm transition-colors" style={{ color: theme.textSecondary }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`block text-center py-4 rounded-xl font-bold transition-all hover:scale-105 ${plan.popular ? 'text-white' : 'border-2'}`} style={plan.popular ? { background: `linear-gradient(135deg, ${navy}, #0a0a6e)` } : { borderColor: theme.border, color: theme.text }}>
                    {plan.popular ? 'احجز استشارة' : 'ابدأ الآن'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <MagicRings
            color={navy}
            colorTwo={navy}
            ringCount={8}
            speed={0.8}
            attenuation={8}
            lineThickness={2}
            baseRadius={0.4}
            radiusStep={0.12}
            scaleRate={0.15}
            opacity={1}
            blur={0}
            noiseAmount={0.05}
            rotation={0}
            ringGap={1.8}
            fadeIn={0.6}
            fadeOut={0.4}
            followMouse={false}
            mouseInfluence={0}
            hoverScale={1}
            parallax={0}
            clickBurst={false}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold mb-4 inline-block" style={{ color: gold }}>تواصل معنا</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 transition-colors" style={{ color: theme.text }}>
              جاهز لبدء <span className="italic" style={{ color: theme.accent }}>شركتك</span>؟
            </h2>
            <p className="text-xl transition-colors" style={{ color: theme.textSecondary }}>تواصل معنا الآن واحصل على استشارة أولية مجانية</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 mb-8">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 rounded-2xl border transition-all" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)` }}>
                    <img 
                      src={ASSETS.whatsappIcon} 
                      alt="WhatsApp" 
                      className="w-7 h-7"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-bold transition-colors" style={{ color: theme.text }}>تواصل عبر واتساب</div>
                    <div className="text-sm transition-colors" style={{ color: theme.textSecondary }}>رد سريع خلال دقائق</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: theme.accent }} />
                </a>

                <a href={`tel:${CONTACT.phone}`} className="group flex items-center gap-4 p-6 rounded-2xl border transition-all" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-bold transition-colors" style={{ color: theme.text }}>اتصل بنا</div>
                    <div className="text-sm transition-colors" style={{ color: theme.textSecondary }} dir="ltr">{CONTACT.phoneDisplay}</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: theme.accent }} />
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, text: 'معتمد من MISA' },
                  { icon: CheckCircle2, text: 'أسعار شفافة' },
                  { icon: Languages, text: 'عربي / إنجليزي' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5" style={{ color: theme.accent }} />
                    <span className="text-sm transition-colors" style={{ color: theme.textSecondary }}>{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl p-8 border transition-colors" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
                      <CheckCircle2 className="w-10 h-10" style={{ color: theme.accent }} />
                    </div>
                    <h3 className="font-bold text-2xl mb-2 transition-colors" style={{ color: theme.text }}>شكرًا لتواصلك!</h3>
                    <p className="transition-colors" style={{ color: theme.textSecondary }}>سنتواصل معك في أقرب وقت ممكن.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-4 rounded-xl border-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                        <p className="text-sm text-red-400 text-center font-medium">{error}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 transition-colors" style={{ color: theme.text }}>الاسم الكامل</label>
                      <input 
                        type="text" 
                        required 
                        disabled={loading}
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all disabled:opacity-50" 
                        style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                        placeholder="أدخل اسمك" 
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 transition-colors" style={{ color: theme.text }}>البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          required 
                          disabled={loading}
                          value={formData.email} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all disabled:opacity-50" 
                          style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                          placeholder="email@example.com" 
                          dir="ltr" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 transition-colors" style={{ color: theme.text }}>رقم الهاتف</label>
                        <input 
                          type="tel" 
                          required 
                          disabled={loading}
                          value={formData.phone} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all disabled:opacity-50" 
                          style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                          placeholder="+966 5X XXX XXXX" 
                          dir="ltr" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 transition-colors" style={{ color: theme.text }}>نوع النشاط</label>
                      <select 
                        disabled={loading}
                        value={formData.activity} 
                        onChange={(e) => setFormData({ ...formData, activity: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all disabled:opacity-50"
                        style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                      >
                        <option value="">اختر نوع النشاط</option>
                        <option value="استشارات">استشارات</option>
                        <option value="تجارة">تجارة</option>
                        <option value="تقنية المعلومات">تقنية المعلومات</option>
                        <option value="خدمات مهنية">خدمات مهنية</option>
                        <option value="صناعة">صناعة</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 transition-colors" style={{ color: theme.text }}>رسالتك</label>
                      <textarea 
                        disabled={loading}
                        value={formData.message} 
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                        rows={4} 
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-all resize-none disabled:opacity-50" 
                        style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                        placeholder="أخبرنا عن مشروعك أو استفسارك..." 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-4 rounded-xl text-white font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" 
                      style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)` }}
                    >
                      {loading ? 'جاري الإرسال...' : 'أرسل استفسارك'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t transition-colors" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img 
                src={ASSETS.logo} 
                alt="Corpenta" 
                className="h-8 w-auto transition-all"
              />
            </div>
            <div className="text-sm text-center transition-colors" style={{ color: theme.textSecondary }}>
              © 2026 Corpenta. جميع الحقوق محفوظة.
            </div>
            <div className="flex items-center gap-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: theme.textSecondary }}>
                <img 
                  src={ASSETS.whatsappIcon} 
                  alt="WhatsApp" 
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) invert(0.4)' }}
                />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors" style={{ color: theme.textSecondary }}>
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 whatsapp-float"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        aria-label="تواصل عبر واتساب"
      >
        <img 
          src={ASSETS.whatsappIcon} 
          alt="WhatsApp" 
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </a>
    </div>
  )
}