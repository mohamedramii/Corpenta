'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Shield,
  FileText,
  Building2,
  Globe,
  Users,
  Briefcase,
  Star,
  Zap,
  Clock,
  Award,
  Languages,
  Handshake,
  ChevronUp,
  Menu,
  X,
} from 'lucide-react'

/* ─── Corpenta Brand Colors ─── */
const navy = '#03034d'
const navyLight = '#0a0a6e'
const green = '#039146'
const greenLight = '#56c477'
const greenPale = '#c4f2d4'
const greenBg = '#eafaf0'

/* ─── Animated Section Wrapper ─── */
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Sticky Header ─── */
function Header() {
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
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="https://corpenta.com" className="flex items-center gap-2 group" aria-label="Corpenta Home">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: navy }}>
              <span className="text-white font-heading font-bold text-sm">C</span>
            </div>
            <span className="font-heading font-bold text-xl" style={{ color: navy }}>
              Corpenta
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: navy }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:shadow-md"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <MessageCircle className="w-4 h-4" />
              واتساب
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold rounded-lg text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: green }}
            >
              احجز استشارة
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" style={{ color: navy }} /> : <Menu className="w-6 h-6" style={{ color: navy }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50"
                  style={{ color: navy }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-lg"
                  style={{ backgroundColor: '#25D366', color: '#fff' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل عبر واتساب
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-lg text-white"
                  style={{ backgroundColor: green }}
                >
                  احجز استشارة مجانية
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${navy} 0%, ${navyLight} 50%, #0d0d5c 100%)` }} />
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-white" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full border border-white" />
      </div>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(196,242,212,0.15)', border: '1px solid rgba(196,242,212,0.3)' }}
            >
              <Zap className="w-3.5 h-3.5" style={{ color: greenLight }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: greenPale }}>
                أسعار محدثة لتكاليف التأسيس بالسعودية
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight text-white mb-5"
            >
              أسس شركتك في السعودية{' '}
              <span style={{ color: greenLight }}>بثقة ووضوح</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              نساعد المستثمرين ورواد الأعمال الأجانب على تأسيس شركاتهم في السعودية بشكل قانوني واحترافي، مع دعم كامل من بداية الإجراءات وحتى تشغيل الشركة.
            </motion.p>

            {/* Checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {[
                'تأسيس شركة للأجانب',
                'دعم كامل للإجراءات الحكومية',
                'تسجيل المنصات الحكومية',
                'دعم باللغة العربية والإنجليزية',
                'أسعار واضحة واحترافية',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: greenLight }} />
                  <span className="text-sm text-gray-200">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: green }}
              >
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl transition-all hover:bg-white/10 active:scale-[0.98]"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                تواصل عبر واتساب
              </a>
            </motion.div>
          </div>

          {/* Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: green }}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-heading font-semibold text-lg">تأسيس شركة</div>
                      <div className="text-gray-400 text-sm">في المملكة العربية السعودية</div>
                    </div>
                  </div>
                  
                  {/* Progress-like items */}
                  {[
                    { label: 'إصدار رخصة الاستثمار', done: true },
                    { label: 'السجل التجاري', done: true },
                    { label: 'توثيق العقود', done: true },
                    { label: 'تسجيل ZATCA & GOSI', done: false },
                    { label: 'تفعيل Qiwa', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: item.done ? 'rgba(3,145,70,0.15)' : 'rgba(255,255,255,0.05)' }}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? '' : 'border border-white/30'}`} style={{ backgroundColor: item.done ? green : 'transparent' }}>
                        {item.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">التقدم في الإجراءات</span>
                      <span className="font-semibold" style={{ color: greenLight }}>60%</span>
                    </div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: '60%', backgroundColor: green }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: greenBg }}>
                  <Shield className="w-4 h-4" style={{ color: green }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: navy }}>معتمد من MISA</div>
                  <div className="text-[10px] text-gray-400">رخصة استثمار أجنبي</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 26C840 32 960 40 1080 40C1200 40 1320 32 1380 28L1440 24V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

/* ─── Why Saudi Section ─── */
function WhySaudiSection() {
  const benefits = [
    { icon: Building2, label: 'إمكانية ملكية أجنبية 100%' },
    { icon: Globe, label: 'اقتصاد قوي وسوق ضخم' },
    { icon: Briefcase, label: 'فرص في قطاعات متعددة' },
    { icon: Zap, label: 'بيئة أعمال تتطور بسرعة' },
    { icon: Shield, label: 'لا توجد ضريبة دخل شخصية على الرواتب' },
  ]

  return (
    <section id="why-saudi" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
              لماذا السعودية؟
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
              السعودية اليوم من أسرع الأسواق نموًا في المنطقة
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              توفر فرصًا قوية للمستثمرين الأجانب ضمن رؤية 2030، مع إصلاحات جوهرية تجعل بيئة الأعمال أكثر جاذبية ومرونة للمستثمرين من مختلف القطاعات.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {benefits.map((item, i) => (
            <RevealSection key={i} delay={i * 0.08}>
              <div className="group text-center p-6 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-lg cursor-default" style={{ ':hover': {} }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300" style={{ backgroundColor: greenBg }}>
                  <item.icon className="w-6 h-6 transition-colors duration-300" style={{ color: green }} />
                </div>
                <p className="font-heading font-semibold text-sm" style={{ color: navy }}>{item.label}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services Section ─── */
function ServicesSection() {
  const services = [
    { icon: Shield, title: 'إصدار رخصة الاستثمار', desc: 'الحصول على ترخيص الاستثمار الأجنبي من وزارة الاستثمار (MISA) وفقاً للمتطلبات النظامية.' },
    { icon: FileText, title: 'تأسيس الشركة والسجل التجاري', desc: 'إصدار السجل التجاري وإعداد كافة مستندات التأسيس الرسمية وعقود الشركة.' },
    { icon: Handshake, title: 'توثيق العقود', desc: 'توثيق عقود الشركة لدى الجهات المختصة لضمان الاعتراف القانوني بالشركة.' },
    { icon: Building2, title: 'تسجيل ZATCA', desc: 'تسجيل الشركة في هيئة الزكاة والضريبة والجمارك للامتثال الضريبي.' },
    { icon: Users, title: 'تسجيل GOSI', desc: 'تسجيل الموظفين في المؤسسة العامة للتأمينات الاجتماعية حسب الأنظمة.' },
    { icon: Globe, title: 'تفعيل Qiwa', desc: 'تفعيل حساب الشركة على منصة قوى لإدارة شؤون العمالة والتحاقق.' },
    { icon: Briefcase, title: 'دعم فتح الحساب البنكي', desc: 'مساعدة في إجراءات فتح الحساب البنكي التجاري للشركة في البنوك المحلية.' },
    { icon: Star, title: 'دعم تأشيرة المدير العام', desc: 'المساعدة في استخراج تأشيرة المدير العام والمقيمين الرئيسيين للشركة.' },
  ]

  return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: '#f8fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
              خدماتنا
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
              نقدم دعمًا متكاملاً لتأسيس الشركات في السعودية
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <RevealSection key={i} delay={i * 0.06}>
              <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: greenBg }}>
                  <service.icon className="w-5 h-5" style={{ color: green }} />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: navy }}>{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Steps Section ─── */
function StepsSection() {
  const steps = [
    { num: '١', title: 'مراجعة النشاط والمتطلبات', desc: 'نراجع نوع النشاط والمتطلبات المناسبة لتأسيس الشركة ونحدد أفضل مسار قانوني.', icon: FileText },
    { num: '٢', title: 'تجهيز المستندات', desc: 'نساعدك في تجهيز كافة المستندات والتصديقات المطلوبة لبدء الإجراءات.', icon: FileText },
    { num: '٣', title: 'إصدار الرخصة', desc: 'التقديم على الإجراءات الرسمية ومتابعتها حتى إصدار رخصة الاستثمار.', icon: Shield },
    { num: '٤', title: 'تأسيس الشركة', desc: 'إصدار السجل التجاري وتوثيق العقود الرسمية للشركة.', icon: Building2 },
    { num: '٥', title: 'تشغيل المنصات الحكومية', desc: 'تفعيل وربط المنصات الحكومية الأساسية لبدء العمليات.', icon: Globe },
  ]

  return (
    <section id="steps" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
              خطوات تأسيس الشركة
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
              من الفكرة إلى التشغيل بخطوات واضحة
            </h2>
          </div>
        </RevealSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line - hidden on mobile */}
          <div className="hidden md:block absolute top-0 bottom-0 right-1/2 w-px" style={{ backgroundColor: greenPale }} />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-8 md:mb-0">
                  {/* Right side (content) */}
                  <div className={`md:pr-12 ${i % 2 === 0 ? '' : 'md:order-2 md:pr-0 md:pl-12 md:text-left'}`}>
                    <div className="flex md:hidden items-start gap-4 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-white text-sm" style={{ backgroundColor: green }}>
                        {step.num}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg" style={{ color: navy }}>{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: navy }}>{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {/* Left side (dot on line) - desktop only */}
                  <div className={`hidden md:flex items-center ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-gray-100" style={{ backgroundColor: greenBg }}>
                      <step.icon className="w-7 h-7" style={{ color: green }} />
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const plans = [
    {
      name: 'FOUNDATION PACKAGE',
      nameAr: 'الباقة الأساسية',
      price: '12,500',
      desc: 'مناسبة لبدء تأسيس الشركة بشكل أساسي',
      features: [
        'تأسيس الشركة',
        'السجل التجاري',
        'توثيق العقود',
        'التسجيلات الحكومية الأساسية',
      ],
      cta: 'ابدأ الآن',
      ctaStyle: 'outline' as const,
      popular: false,
    },
    {
      name: 'OPERATIONAL PACKAGE',
      nameAr: 'الباقة التشغيلية',
      price: '19,900',
      desc: 'للمستثمرين الذين يريدون تشغيل الشركة بشكل متكامل',
      features: [
        'كل ما في الباقة الأساسية',
        'تفعيل المنصات الحكومية',
        'دعم العمليات الأساسية',
        'دعم إضافي للتشغيل',
      ],
      cta: 'احجز استشارة',
      ctaStyle: 'filled' as const,
      popular: true,
    },
    {
      name: 'VIP PACKAGE',
      nameAr: 'باقة VIP',
      price: '31,900',
      desc: 'حل متكامل للمستثمرين الباحثين عن تجربة تأسيس شاملة ودعم كامل',
      features: [
        'جميع الخدمات',
        'أولوية في المتابعة',
        'دعم متقدم',
        'مساعدة تشغيلية موسعة',
      ],
      cta: 'تحدث معنا',
      ctaStyle: 'outline' as const,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24" style={{ backgroundColor: '#f8fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
              الباقات
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
              باقات تناسب احتياجاتك
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <div className={`relative bg-white rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-xl h-full flex flex-col ${
                plan.popular ? 'border-2 shadow-lg' : 'border-gray-100'
              }`} style={plan.popular ? { borderColor: green } : {}}>
                {plan.popular && (
                  <div className="absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: green }}>
                    الأكثر طلبًا
                  </div>
                )}
                <div className="mb-5">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1">{plan.name}</span>
                  <h3 className="font-heading font-bold text-lg mb-1" style={{ color: navy }}>{plan.nameAr}</h3>
                  <p className="text-sm text-gray-400">{plan.desc}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-3xl md:text-4xl font-bold" style={{ color: navy }}>{plan.price}</span>
                    <span className="text-sm text-gray-400">SAR</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: plan.popular ? green : '#9ca3af' }} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-md ${
                    plan.ctaStyle === 'filled'
                      ? 'text-white hover:opacity-90'
                      : 'hover:opacity-90'
                  }`}
                  style={plan.ctaStyle === 'filled'
                    ? { backgroundColor: green, color: '#fff' }
                    : { backgroundColor: 'transparent', color: navy, border: `2px solid ${navy}` }
                  }
                >
                  {plan.cta}
                </a>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Why Corpenta Section ─── */
function WhyCorpentaSection() {
  const reasons = [
    { icon: Shield, title: 'خبرة في تأسيس الشركات للأجانب', desc: 'أكثر من 10 سنوات من الخبرة المتخصصة في تأسيس الشركات الأجنبية في السعودية.' },
    { icon: Zap, title: 'تنفيذ مباشر للإجراءات', desc: 'نتعامل مباشرة مع الجهات الحكومية لضمان سرعة ودقة في تنفيذ كافة الإجراءات.' },
    { icon: Languages, title: 'دعم متعدد اللغات', desc: 'فريقنا يقدم الدعم باللغتين العربية والإنجليزية لضمان تواصل فعال.' },
    { icon: FileText, title: 'وضوح في الإجراءات والأسعار', desc: 'نقدم تفاصيل واضحة عن كل خطوة وتكاليف شفافة بدون رسوم مخفية.' },
    { icon: Clock, title: 'متابعة احترافية وسريعة', desc: 'نوفر متابعة مستمرة وتحديثات دورية على حالة الإجراءات والتقدم المحرز.' },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Visual */}
          <RevealSection>
            <div className="relative">
              <div className="rounded-2xl p-8 md:p-10" style={{ background: `linear-gradient(135deg, ${navy} 0%, ${navyLight} 100%)` }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: green }}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-heading font-semibold">Corpenta</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { num: '10+', label: 'سنوات خبرة' },
                      { num: '500+', label: 'شركة أسسناها' },
                      { num: '98%', label: 'نسبة رضا العملاء' },
                      { num: '50+', label: 'جنسية مختلفة' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <div className="font-heading text-2xl font-bold mb-1" style={{ color: greenLight }}>{stat.num}</div>
                        <div className="text-xs text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: green }} />
                  <span className="text-sm font-semibold" style={{ color: navy }}>شريك معتمد</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Right - Content */}
          <div>
            <RevealSection>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
                لماذا Corpenta؟
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: navy }}>
                لماذا يختارنا العملاء؟
              </h2>
            </RevealSection>

            <div className="space-y-5 mt-8">
              {reasons.map((reason, i) => (
                <RevealSection key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors" style={{ backgroundColor: greenBg }}>
                      <reason.icon className="w-5 h-5" style={{ color: green }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-base mb-1" style={{ color: navy }}>{reason.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ Section ─── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'هل يمكن للأجانب تأسيس شركة في السعودية؟',
      a: 'نعم، يمكن للمستثمر الأجنبي تأسيس شركة في السعودية حسب النشاط والمتطلبات النظامية. نظام الاستثمار الأجنبي يتيح ملكية أجنبية كاملة في العديد من القطاعات، مع الحصول على رخصة استثمار من وزارة الاستثمار (MISA).',
    },
    {
      q: 'كم تستغرق الإجراءات؟',
      a: 'تختلف المدة حسب نوع النشاط والمستندات المطلوبة، لكننا نعمل على تسريع العملية قدر الإمكان. عادةً ما تستغرق الإجراءات من أسبوعين إلى 6 أسابيع من بداية تجهيز المستندات حتى إصدار الرخصة والسجل التجاري.',
    },
    {
      q: 'هل تقدمون دعم بعد التأسيس؟',
      a: 'نعم، نقدم دعمًا مستمرًا بعد تأسيس الشركة يشمل تسجيل المنصات الحكومية، الامتثال الضريبي، تجديد الرخص، وأي إجراءات تشغيلية تحتاجها شركتك للعمل بشكل قانوني وسلس في السعودية.',
    },
    {
      q: 'ما هي المستندات المطلوبة للتأسيس؟',
      a: 'تختلف المستندات حسب نوع الشركة والنشاط، لكن بشكل عام نحتاج جواز سفر ساري، صور شخصية، بيانات النشاط التجاري، وأحيانًا شهادات خبرة أو تصديقات من الغرفة التجارية في بلدك. نساعدك في تجهيز كافة المستندات المطلوبة.',
    },
    {
      q: 'هل يمكنني امتلاك الشركة 100% كأجنبي؟',
      a: 'نعم، في معظم القطاعات يتيح النظام السعودي ملكية أجنبية 100% من خلال رخصة استثمار من MISA. هناك بعض القطاعات التي تتطلب شريكًا محليًا، لكن الفعاليات التجارية الأكثر شيوعًا تسمح بالملكية الكاملة للأجانب.',
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24" style={{ backgroundColor: '#f8fafb' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
              أسئلة شائعة
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: navy }}>
              إجابات على أسئلتك
            </h2>
          </div>
        </RevealSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 0.06}>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-heading font-semibold text-sm md:text-base" style={{ color: navy }}>{faq.q}</span>
                  <div className="shrink-0 mr-4">
                    {openIndex === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact / Final CTA Section ─── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would submit to an API
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - CTA Content */}
          <RevealSection>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: greenBg, color: green }}>
                تواصل معنا
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
                جاهز لبدء شركتك في السعودية؟
              </h2>
              <p className="text-gray-500 text-base mb-8 leading-relaxed">
                تواصل معنا الآن واحصل على استشارة أولية مجانية. فريقنا المتخصص جاهز لمساعدتك في كل خطوة من خطوات تأسيس شركتك.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-semibold text-sm" style={{ color: navy }}>تواصل عبر واتساب</div>
                    <div className="text-xs text-gray-400">رد سريع خلال دقائق</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 mr-auto text-gray-300 group-hover:translate-x-[-4px] transition-transform" />
                </a>

                <a
                  href="tel:+966500000000"
                  className="flex items-center gap-4 w-full p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: navy }}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-semibold text-sm" style={{ color: navy }}>اتصل بنا</div>
                    <div className="text-xs text-gray-400">966500000000+</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 mr-auto text-gray-300 group-hover:translate-x-[-4px] transition-transform" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" style={{ color: green }} />
                  <span className="text-xs text-gray-400">معتمد من MISA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" style={{ color: green }} />
                  <span className="text-xs text-gray-400">أسعار شفافة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4" style={{ color: green }} />
                  <span className="text-xs text-gray-400">عربي / إنجليزي</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Right - Form */}
          <RevealSection delay={0.15}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: greenBg }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: green }} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: navy }}>شكرًا لتواصلك!</h3>
                  <p className="text-sm text-gray-500">سنتواصل معك في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': green } as React.CSSProperties}
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ '--tw-ring-color': green } as React.CSSProperties}
                        placeholder="email@example.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>رقم الهاتف</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ '--tw-ring-color': green } as React.CSSProperties}
                        placeholder="+966 5X XXX XXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>نوع النشاط</label>
                    <select
                      value={formData.activity}
                      onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white"
                      style={{ '--tw-ring-color': green } as React.CSSProperties}
                    >
                      <option value="">اختر نوع النشاط</option>
                      <option value="consulting">استشارات</option>
                      <option value="trading">تجارة</option>
                      <option value="tech">تقنية المعلومات</option>
                      <option value="services">خدمات مهنية</option>
                      <option value="manufacturing">صناعة</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>رسالتك</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                      style={{ '--tw-ring-color': green } as React.CSSProperties}
                      placeholder="أخبرنا عن مشروعك أو استفسارك..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: green }}
                  >
                    أرسل استفسارك
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">
                    بالضغط على إرسال، أنت توافق على سياسة الخصوصية الخاصة بنا.
                  </p>
                </form>
              )}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ backgroundColor: navy }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: green }}>
                <span className="text-white font-heading font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Corpenta</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              شريكك الموثوق لتأسيس الشركات الأجنبية في المملكة العربية السعودية. أكثر من 10 سنوات من الخبرة في تقديم حلول تأسيس احترافية ومتكاملة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'لماذا السعودية؟', href: '#why-saudi' },
                { label: 'خدماتنا', href: '#services' },
                { label: 'الباقات', href: '#pricing' },
                { label: 'أسئلة شائعة', href: '#faq' },
                { label: 'تواصل معنا', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" style={{ color: '#25D366' }} />
                واتساب
              </a>
              <a href="tel:+966500000000" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                966500000000+
              </a>
              <a href="mailto:info@corpenta.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors" dir="ltr">
                info@corpenta.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Corpenta. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="https://corpenta.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition-colors">
              corpenta.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── WhatsApp Floating Button ─── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg whatsapp-pulse transition-transform hover:scale-110"
      style={{ backgroundColor: '#25D366' }}
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhySaudiSection />
        <ServicesSection />
        <StepsSection />
        <PricingSection />
        <WhyCorpentaSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
