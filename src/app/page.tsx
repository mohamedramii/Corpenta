'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
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
  MapPin,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

/* ─── Brand Colors ─── */
const navy = '#03034d'
const navyLight = '#0a0a6e'
const green = '#039146'
const greenLight = '#56c477'
const greenPale = '#c4f2d4'
const greenBg = '#eafaf0'

/* ─── Unsplash Images ─── */
const IMG = {
  riyadh: 'https://images.unsplash.com/photo-1779983968577-8e488a5f7bc5?w=800&q=80',
  skyline: 'https://images.unsplash.com/photo-1560185008-a33f5c7b1846?w=800&q=80',
  business: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  meeting: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  saudi: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
  tower: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  handshake: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
}

/* ─── Parallax Wrapper ─── */
function ParallaxSection({ children, className = '', speed = 0.3 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── Animated Section Wrapper ─── */
function RevealSection({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  }
  return (
    <motion.div
      ref={ref}
      initial={variants[direction].hidden}
      animate={isInView ? variants[direction].visible : variants[direction].hidden}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stagger Container ─── */
function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const stepTime = 16
    const steps = duration / stepTime
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

/* ─── Mesh Gradient Orbs (decorative) ─── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, rgba(3,145,70,0.3) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full opacity-15 animate-float-delayed" style={{ background: 'radial-gradient(circle, rgba(86,196,119,0.3) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(196,242,212,0.4) 0%, transparent 70%)' }} />
    </div>
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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="https://corpenta.com" className="flex items-center gap-2.5 group" aria-label="Corpenta Home">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${navy}, ${navyLight})` }}>
              <span className="text-white font-heading font-bold text-sm">C</span>
            </div>
            <span className={`font-heading font-bold text-xl transition-colors ${scrolled ? '' : 'text-white'}`} style={scrolled ? { color: navy } : undefined}>
              Corpenta
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10 text-white'}`}
                style={scrolled ? { color: navy } : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all hover:shadow-md hover:scale-[1.02]"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <MessageCircle className="w-4 h-4" />
              واتساب
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}
            >
              احجز استشارة
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" style={{ color: navy }} /> : <Menu className="w-6 h-6" style={{ color: scrolled ? navy : '#fff' }} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50" style={{ color: navy }}>
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-xl" style={{ backgroundColor: '#25D366', color: '#fff' }}>
                  <MessageCircle className="w-4 h-4" /> تواصل عبر واتساب
                </a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
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
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-hero noise-overlay" />
      
      {/* Animated floating orbs */}
      <FloatingOrbs />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: greenLight }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: greenPale }}>
                أسعار محدثة لتكاليف التأسيس بالسعودية
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-[2rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.8rem] font-extrabold leading-[1.2] text-white mb-6"
            >
              أسس شركتك في السعودية{' '}
              <span className="gradient-text">بثقة ووضوح</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-medium text-sm sm:text-base mb-2" style={{ color: greenLight }}
            >
              Your Trusted Partner for Foreign Company Formation
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 leading-[1.8] mb-8 max-w-xl mx-auto lg:mx-0"
            >
              نساعد المستثمرين ورواد الأعمال الأجانب على تأسيس شركاتهم في السعودية بشكل قانوني واحترافي، مع دعم كامل من بداية الإجراءات وحتى تشغيل الشركة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2.5 mb-8"
            >
              {['تأسيس شركة للأجانب', 'دعم كامل للإجراءات الحكومية', 'تسجيل المنصات الحكومية', 'دعم بالعربية والإنجليزية', 'أسعار واضحة واحترافية'].map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(3,145,70,0.3)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: greenLight }} />
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold rounded-2xl text-white transition-all hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}
              >
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold rounded-2xl transition-all hover:bg-white/15 active:scale-[0.98] glass"
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                <span className="text-white">تواصل عبر واتساب</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Visual - Image with glassmorphism overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMG.riyadh}
                  alt="Riyadh Skyline"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03034d]/80 via-[#03034d]/20 to-transparent" />
                
                {/* Glass overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-heading font-semibold">تأسيس شركة في السعودية</div>
                        <div className="text-gray-300 text-xs">إجراءات قانونية متكاملة</div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${green}, ${greenLight})` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>تقدم الإجراءات</span>
                      <span style={{ color: greenLight }}>65%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating glass badge - top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 glass-dark rounded-2xl px-5 py-3.5 shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5" style={{ color: greenLight }} />
                  <div>
                    <div className="text-white text-xs font-semibold">معتمد من MISA</div>
                    <div className="text-gray-400 text-[10px]">رخصة استثمار أجنبي</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stats badge - bottom left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 -right-6 glass-dark rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: greenLight }} />
                  <span className="text-white text-xs font-semibold">+500 شركة</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 69.3C960 69 1056 59 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

/* ─── Why Saudi Section ─── */
function WhySaudiSection() {
  const benefits = [
    { icon: Building2, label: 'إمكانية ملكية أجنبية 100%', desc: 'ملكية كاملة بدون شريك محلي' },
    { icon: Globe, label: 'اقتصاد قوي وسوق ضخم', desc: 'أكبر اقتصاد في الشرق الأوسط' },
    { icon: Briefcase, label: 'فرص في قطاعات متعددة', desc: 'تنوع في الفرص الاستثمارية' },
    { icon: Zap, label: 'بيئة أعمال تتطور بسرعة', desc: 'إصلاحات مستمرة لرؤية 2030' },
    { icon: Shield, label: 'لا ضريبة دخل شخصية', desc: 'على الرواتب والأجور' },
  ]

  return (
    <section id="why-saudi" className="py-20 md:py-28 mesh-white relative overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Image */}
          <RevealSection direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src={IMG.skyline} alt="Saudi Arabia Skyline" className="w-full h-[380px] md:h-[440px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03034d]/60 to-transparent" />
              </div>
              {/* Glass stat card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-4 md:right-6 glass-dark rounded-2xl px-6 py-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold" style={{ color: greenLight }}>
                    <AnimatedCounter target={2030} />
                  </div>
                  <div className="text-gray-300 text-xs mt-1">رؤية الاستثمار</div>
                </div>
              </motion.div>
              {/* Floating accent */}
              <div className="absolute -top-3 -left-3 w-20 h-20 rounded-2xl pulse-glow" style={{ backgroundColor: greenBg }} />
            </div>
          </RevealSection>

          {/* Right - Content */}
          <div>
            <RevealSection>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
                <MapPin className="w-3 h-3" />
                لماذا السعودية؟
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
                السعودية من أسرع الأسواق نموًا في المنطقة
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                توفر فرصًا قوية للمستثمرين الأجانب ضمن رؤية 2030، مع إصلاحات جوهرية تجعل بيئة الأعمال أكثر جاذبية ومرونة للمستثمرين من مختلف القطاعات.
              </p>
            </RevealSection>

            <StaggerContainer className="space-y-3">
              {benefits.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default border border-transparent hover:border-gray-100">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: greenBg }}>
                      <item.icon className="w-5 h-5" style={{ color: green }} />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-sm" style={{ color: navy }}>{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 mr-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: green }} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
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
    { icon: Handshake, title: 'توثيق العقود', desc: 'توثيق عقود الشركة لدى الجهات المختصة لضمان الاعتراف القانوني.' },
    { icon: Building2, title: 'تسجيل ZATCA', desc: 'تسجيل الشركة في هيئة الزكاة والضريبة والجمارك للامتثال الضريبي.' },
    { icon: Users, title: 'تسجيل GOSI', desc: 'تسجيل الموظفين في المؤسسة العامة للتأمينات الاجتماعية.' },
    { icon: Globe, title: 'تفعيل Qiwa', desc: 'تفعيل حساب الشركة على منصة قوى لإدارة شؤون العمالة.' },
    { icon: Briefcase, title: 'دعم فتح الحساب البنكي', desc: 'مساعدة في إجراءات فتح الحساب البنكي التجاري في البنوك المحلية.' },
    { icon: Star, title: 'دعم تأشيرة المدير العام', desc: 'المساعدة في استخراج تأشيرة المدير العام والمقيمين الرئيسيين.' },
  ]

  return (
    <section id="services" className="py-20 md:py-28 mesh-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
            <Sparkles className="w-3 h-3" />
            خدماتنا
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
            دعم متكامل لتأسيس شركاتك في السعودية
          </h2>
          <p className="text-gray-500 text-base">من الترخيص إلى التشغيل — كافة الخدمات تحت سقف واحد</p>
        </RevealSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/80 hover:border-transparent hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1">
                {/* Hover gradient border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(3,145,70,0.05), rgba(86,196,119,0.05))' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md" style={{ backgroundColor: greenBg }}>
                    <service.icon className="w-5 h-5 transition-colors" style={{ color: green }} />
                  </div>
                  <h3 className="font-heading font-semibold text-base mb-2" style={{ color: navy }}>{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
    <section id="steps" className="py-20 md:py-28 mesh-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
            <TrendingUp className="w-3 h-3" />
            خطوات التأسيس
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
            من الفكرة إلى التشغيل بخطوات واضحة
          </h2>
        </RevealSection>

        {/* Modern horizontal scroll on mobile, vertical timeline on desktop */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 right-[calc(50%+2rem)] left-[calc(50%+2rem)] h-0.5" style={{ background: `linear-gradient(90deg, ${green}, ${greenLight}, ${greenPale})` }} />

          <StaggerContainer className="space-y-6 lg:space-y-0">
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-center">
                  {/* Content side */}
                  <div className={`lg:py-6 ${i % 2 === 0 ? 'lg:text-left lg:order-1' : 'lg:order-3 lg:text-right'}`}>
                    <div className="glass-green rounded-2xl p-5 md:p-6 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-heading text-2xl font-bold" style={{ color: green }}>{step.num}</span>
                        <h3 className="font-heading font-semibold text-lg" style={{ color: navy }}>{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {/* Center node */}
                  <div className="hidden lg:flex items-center justify-center order-2 relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {/* Empty side */}
                  <div className={`hidden lg:block ${i % 2 === 0 ? 'order-3' : 'order-1'}`} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
      features: ['تأسيس الشركة', 'السجل التجاري', 'توثيق العقود', 'التسجيلات الحكومية الأساسية'],
      cta: 'ابدأ الآن',
      popular: false,
    },
    {
      name: 'OPERATIONAL PACKAGE',
      nameAr: 'الباقة التشغيلية',
      price: '19,900',
      desc: 'للمستثمرين الذين يريدون تشغيل الشركة بشكل متكامل',
      features: ['كل ما في الباقة الأساسية', 'تفعيل المنصات الحكومية', 'دعم العمليات الأساسية', 'دعم إضافي للتشغيل'],
      cta: 'احجز استشارة',
      popular: true,
    },
    {
      name: 'VIP PACKAGE',
      nameAr: 'باقة VIP',
      price: '31,900',
      desc: 'حل متكامل مع دعم كامل وتجربة شاملة',
      features: ['جميع الخدمات', 'أولوية في المتابعة', 'دعم متقدم', 'مساعدة تشغيلية موسعة'],
      cta: 'تحدث معنا',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-28 mesh-pricing relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
            <Star className="w-3 h-3" />
            الباقات
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
            باقات تناسب احتياجاتك
          </h2>
        </RevealSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`relative rounded-3xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col ${
                plan.popular ? 'bg-white shadow-xl' : 'glass-green'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
                    الأكثر طلبًا
                  </div>
                )}

                {plan.popular && <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(3,145,70,0.02), rgba(86,196,119,0.02))' }} />}

                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">{plan.name}</span>
                  <h3 className="font-heading font-bold text-xl mb-1.5" style={{ color: navy }}>{plan.nameAr}</h3>
                  <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-gray-100/80">
                    <span className="font-heading text-4xl font-bold" style={{ color: navy }}>{plan.price}</span>
                    <span className="text-sm text-gray-400">SAR</span>
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
                    className={`block text-center py-3.5 rounded-2xl font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                      plan.popular ? 'text-white' : ''
                    }`}
                    style={plan.popular
                      ? { background: `linear-gradient(135deg, ${green}, ${greenLight})`, color: '#fff' }
                      : { backgroundColor: 'transparent', color: navy, border: `2px solid ${navy}` }
                    }
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─── Why Corpenta Section ─── */
function WhyCorpentaSection() {
  const reasons = [
    { icon: Shield, title: 'خبرة في تأسيس الشركات للأجانب', desc: 'أكثر من 10 سنوات من الخبرة المتخصصة في تأسيس الشركات الأجنبية في السعودية.' },
    { icon: Zap, title: 'تنفيذ مباشر للإجراءات', desc: 'نتعامل مباشرة مع الجهات الحكومية لضمان سرعة ودقة التنفيذ.' },
    { icon: Languages, title: 'دعم متعدد اللغات', desc: 'فريقنا يقدم الدعم باللغتين العربية والإنجليزية.' },
    { icon: FileText, title: 'وضوح في الإجراءات والأسعار', desc: 'تفاصيل واضحة عن كل خطوة وتكاليف شفافة بدون رسوم مخفية.' },
    { icon: Clock, title: 'متابعة احترافية وسريعة', desc: 'متابعة مستمرة وتحديثات دورية على حالة الإجراءات.' },
  ]

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Mesh gradient bg */}
      <div className="absolute inset-0 mesh-hero noise-overlay" />
      <FloatingOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Stats + Image */}
          <RevealSection direction="right">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMG.business} alt="Business Team" className="w-full h-[340px] md:h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03034d]/70 via-transparent to-transparent" />
              </div>

              {/* Glass stats grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { num: 10, suffix: '+', label: 'سنوات خبرة' },
                  { num: 500, suffix: '+', label: 'شركة أسسناها' },
                  { num: 98, suffix: '%', label: 'رضا العملاء' },
                  { num: 50, suffix: '+', label: 'جنسية مختلفة' },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-4 text-center">
                    <div className="font-heading text-2xl font-bold" style={{ color: greenLight }}>
                      <AnimatedCounter target={stat.num} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-300 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 -left-3 md:-left-6 glass-dark rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" style={{ color: greenLight }} />
                  <span className="text-white text-xs font-semibold">شريك موثوق</span>
                </div>
              </motion.div>
            </div>
          </RevealSection>

          {/* Right - Content */}
          <div>
            <RevealSection>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: 'rgba(3,145,70,0.2)', color: greenLight }}>
                <Award className="w-3 h-3" />
                لماذا Corpenta؟
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                لماذا يختارنا العملاء؟
              </h2>
              <p className="text-gray-400 text-base mb-8">خبرة طويلة وتفاني في تقديم أفضل خدمة لتأسيس شركتك</p>
            </RevealSection>

            <StaggerContainer className="space-y-3">
              {reasons.map((reason) => (
                <StaggerItem key={reason.title}>
                  <div className="group flex items-start gap-4 p-4 rounded-2xl glass hover:bg-white/10 transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: 'rgba(3,145,70,0.2)' }}>
                      <reason.icon className="w-5 h-5" style={{ color: greenLight }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-base mb-1 text-white">{reason.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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
    { q: 'هل يمكن للأجانب تأسيس شركة في السعودية؟', a: 'نعم، يمكن للمستثمر الأجنبي تأسيس شركة في السعودية حسب النشاط والمتطلبات النظامية. نظام الاستثمار الأجنبي يتيح ملكية أجنبية كاملة في العديد من القطاعات، مع الحصول على رخصة استثمار من وزارة الاستثمار (MISA).' },
    { q: 'كم تستغرق الإجراءات؟', a: 'تختلف المدة حسب نوع النشاط والمستندات المطلوبة، لكننا نعمل على تسريع العملية قدر الإمكان. عادةً ما تستغرق الإجراءات من أسبوعين إلى 6 أسابيع من بداية تجهيز المستندات حتى إصدار الرخصة والسجل التجاري.' },
    { q: 'هل تقدمون دعم بعد التأسيس؟', a: 'نعم، نقدم دعمًا مستمرًا بعد تأسيس الشركة يشمل تسجيل المنصات الحكومية، الامتثال الضريبي، تجديد الرخص، وأي إجراءات تشغيلية تحتاجها شركتك للعمل بشكل قانوني وسلس في السعودية.' },
    { q: 'ما هي المستندات المطلوبة للتأسيس؟', a: 'تختلف المستندات حسب نوع الشركة والنشاط، لكن بشكل عام نحتاج جواز سفر ساري، صور شخصية، بيانات النشاط التجاري، وأحيانًا شهادات خبرة أو تصديقات من الغرفة التجارية في بلدك.' },
    { q: 'هل يمكنني امتلاك الشركة 100% كأجنبي؟', a: 'نعم، في معظم القطاعات يتيح النظام السعودي ملكية أجنبية 100% من خلال رخصة استثمار من MISA. هناك بعض القطاعات التي تتطلب شريكًا محليًا، لكن الفعاليات التجارية الأكثر شيوعًا تسمح بالملكية الكاملة.' },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 mesh-light relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
            <MessageCircle className="w-3 h-3" />
            أسئلة شائعة
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: navy }}>
            إجابات على أسئلتك
          </h2>
        </RevealSection>

        <StaggerContainer className="space-y-3">
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 overflow-hidden transition-all hover:shadow-md">
                <button
                  className="w-full flex items-center justify-between p-5 text-right transition-colors hover:bg-gray-50/50"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-heading font-semibold text-sm md:text-base" style={{ color: navy }}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 mr-4"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
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
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─── Contact / Final CTA Section ─── */
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-28 mesh-white relative overflow-hidden">
      <FloatingOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left - CTA */}
          <RevealSection direction="right">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: greenBg, color: green }}>
                <Phone className="w-3 h-3" />
                تواصل معنا
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: navy }}>
                جاهز لبدء شركتك في السعودية؟
              </h2>
              <p className="text-gray-500 text-base mb-8 leading-relaxed">
                تواصل معنا الآن واحصل على استشارة أولية مجانية. فريقنا المتخصص جاهز لمساعدتك في كل خطوة.
              </p>

              <div className="space-y-3 mb-8">
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 w-full p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-heading font-semibold text-sm" style={{ color: navy }}>تواصل عبر واتساب</div>
                    <div className="text-xs text-gray-400">رد سريع خلال دقائق</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" />
                </a>

                <a href="tel:+966500000000" className="group flex items-center gap-4 w-full p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${navy}, ${navyLight})` }}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <div className="font-heading font-semibold text-sm" style={{ color: navy }}>اتصل بنا</div>
                    <div className="text-xs text-gray-400" dir="ltr">+966 50 000 0000</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-100">
                {[
                  { icon: Shield, text: 'معتمد من MISA' },
                  { icon: CheckCircle2, text: 'أسعار شفافة' },
                  { icon: Languages, text: 'عربي / إنجليزي' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5">
                    <badge.icon className="w-4 h-4" style={{ color: green }} />
                    <span className="text-xs text-gray-400">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Right - Glass Form */}
          <RevealSection direction="left" delay={0.15}>
            <div className="relative">
              {/* Gradient border glow */}
              <div className="absolute -inset-px rounded-3xl opacity-50" style={{ background: 'linear-gradient(135deg, rgba(3,145,70,0.2), rgba(86,196,119,0.1), rgba(3,3,77,0.1))' }} />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100/50">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: greenBg }}>
                      <CheckCircle2 className="w-8 h-8" style={{ color: green }} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: navy }}>شكرًا لتواصلك!</h3>
                    <p className="text-sm text-gray-500">سنتواصل معك في أقرب وقت ممكن.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>الاسم الكامل</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white/50 transition-all" style={{ '--tw-ring-color': green } as React.CSSProperties} placeholder="أدخل اسمك" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>البريد الإلكتروني</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white/50 transition-all" style={{ '--tw-ring-color': green } as React.CSSProperties} placeholder="email@example.com" dir="ltr" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>رقم الهاتف</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white/50 transition-all" style={{ '--tw-ring-color': green } as React.CSSProperties} placeholder="+966 5X XXX XXXX" dir="ltr" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: navy }}>نوع النشاط</label>
                      <select value={formData.activity} onChange={(e) => setFormData({ ...formData, activity: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white/50 transition-all" style={{ '--tw-ring-color': green } as React.CSSProperties}>
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
                      <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white/50 transition-all resize-none" style={{ '--tw-ring-color': green } as React.CSSProperties} placeholder="أخبرنا عن مشروعك أو استفسارك..." />
                    </div>
                    <button type="submit" className="w-full py-4 rounded-2xl text-white font-semibold text-sm transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
                      أرسل استفسارك
                    </button>
                    <p className="text-[11px] text-gray-400 text-center">بالضغط على إرسال، أنت توافق على سياسة الخصوصية الخاصة بنا.</p>
                  </form>
                )}
              </div>
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
    <footer className="relative overflow-hidden" style={{ backgroundColor: navy }}>
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${green}, transparent)` }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${green}, ${greenLight})` }}>
                <span className="text-white font-heading font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Corpenta</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              شريكك الموثوق لتأسيس الشركات الأجنبية في المملكة العربية السعودية. أكثر من 10 سنوات خبرة في حلول التأسيس الاحترافية.
            </p>
          </div>
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
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: greenLight }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" style={{ color: '#25D366' }} /> واتساب
              </a>
              <a href="tel:+966500000000" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> 966500000000+
              </a>
              <a href="mailto:info@corpenta.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors" dir="ltr">
                info@corpenta.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Corpenta. جميع الحقوق محفوظة.</p>
          <a href="https://corpenta.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition-colors">corpenta.com</a>
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
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl whatsapp-pulse transition-transform hover:scale-110"
      style={{ background: `linear-gradient(135deg, #25D366, #128C7E)` }}
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
