'use client'

import './design3.css'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Building2, Rocket, Check, FileText, Handshake,
  Users, Globe, Briefcase, Phone, ArrowLeft,
  Target, CheckCircle2, ChevronDown, X, Zap, Star,
} from 'lucide-react'
import { useState } from 'react'
import MagicRings from '@/components/MagicRings'
import { navy, CONTACT } from '@/lib/constants'
import { ASSETS } from '@/lib/paths'

const gold = '#a5bdf0'

// ── FAQ — استشارات دخول السوق (بعيد عن اللغة الحوكمية/القانونية) ──
const faqs = [
  { q: 'ما هي خدمات Corpenta بالضبط؟', a: 'نقدم استشارات متخصصة لمساعدة الشركات والمستثمرين الأجانب على فهم بيئة الأعمال في السعودية والتخطيط لدخول السوق بشكل احترافي ومنظم.' },
  { q: 'هل تناسبون الشركات الكبيرة والصغيرة على حد سواء؟', a: 'نعم، نقدم حلولًا مرنة تناسب رواد الأعمال والشركات الناشئة والمؤسسات الكبيرة الراغبة في التوسع إلى السوق السعودي.' },
  { q: 'كم تستغرق مرحلة الدخول للسوق السعودي؟', a: 'يعتمد ذلك على طبيعة النشاط والاستعداد المسبق. في الغالب تتراوح المراحل الأولى بين 3 إلى 8 أسابيع وفقًا لطبيعة النشاط التجاري.' },
  { q: 'هل يمكن البدء من خارج السعودية؟', a: 'نعم، يمكن الاستفادة من خدمات الاستشارة والتخطيط عن بُعد، ثم التنسيق للمراحل التي تستلزم الحضور المحلي.' },
  { q: 'ما القطاعات التي تدعمونها؟', a: 'ندعم قطاعات متنوعة تشمل التقنية والاستشارات والتجارة والخدمات المهنية والتسويق والمقاولات وغيرها من الأنشطة.' },
  { q: 'هل تقدمون دعمًا بعد دخول السوق؟', a: 'نعم، في باقاتنا المتقدمة نوفر متابعة تشغيلية لمساعدتك على استقرار نشاطك التجاري خلال الأشهر الأولى من الإطلاق.' },
  { q: 'هل تساعدون في التواصل مع الجهات المعنية؟', a: 'نعم، نقدم دعمًا تنسيقيًا للتواصل مع الجهات ذات الصلة بحسب طبيعة النشاط واحتياجات كل عميل.' },
  { q: 'كيف أبدأ العمل مع Corpenta؟', a: 'ابدأ بحجز استشارة أولية مجانية عبر الواتساب أو نموذج التواصل، وسيتواصل معك فريقنا لفهم احتياجاتك وتحديد الخطوات المناسبة.' },
]

// ── Comparison rows — مقارنة خدمات استشارية ──
const comparisonRows = [
  { label: 'استشارة دخول السوق', f: true, o: true, v: true },
  { label: 'تقييم الفرص التجارية', f: true, o: true, v: true },
  { label: 'خطة عمل مخصصة', f: 'أساسية', o: true, v: 'موسعة' },
  { label: 'تنسيق مراحل التأسيس', f: true, o: true, v: true },
  { label: 'متابعة الإجراءات الرسمية', f: 'أساسية', o: true, v: true },
  { label: 'دعم تفعيل المنصات التشغيلية', f: false, o: true, v: true },
  { label: 'تنسيق الحسابات التجارية', f: false, o: true, v: true },
  { label: 'دعم استقطاب الكفاءات', f: false, o: true, v: true },
  { label: 'مدير ملف مخصص', f: true, o: true, v: true },
  { label: 'تقارير دورية لمتابعة التقدم', f: false, o: true, v: true },
  { label: 'أولوية المتابعة', f: false, o: false, v: true },
  { label: 'دعم التشغيل الموسع', f: false, o: false, v: true },
  { label: 'دعم ما بعد الإطلاق', f: false, o: false, v: '6 أشهر' },
  { label: 'استشارة شراكات استراتيجية', f: false, o: false, v: true },
]

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="w-4 h-4 mx-auto" style={{ color: navy }} />
  if (val === false) return <X className="w-3 h-3 mx-auto text-gray-300" />
  return <span className="text-xs font-semibold" style={{ color: "#03034d" }}>{val}</span>
}

export default function Design3Page() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/xpqnjrdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.errors?.[0]?.message || 'حدث خطأ في إرسال الرسالة')
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
    <div className="design3-page min-h-screen bg-white">

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between" style={{ height: 72 }}>
          <a href="https://corpenta.com/" target="_blank" rel="noopener noreferrer">
            <img src={ASSETS.logo} alt="Corpenta" className="h-9 w-auto cursor-pointer" />
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {[
              ['الخدمات', '#services'],
              ['الباقات', '#pricing'],
              ['من نحن', CONTACT.aboutUs],
              ['الأسئلة', '#faq'],
              ['تواصل', '#contact']
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm transition-colors"
                style={{ color: '#6b7280', fontWeight: 600 }}
              >
                {label}
              </a>
            ))}
          </nav>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: navy }}>
            احجز استشارة
          </a>
        </div>
      </header>

      {/* ── HERO — Asymmetric Split ── */}
      <section className="flex flex-col lg:flex-row" style={{ paddingTop: 72, minHeight: '100vh' }}>
        {/* Navy left panel */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-[42%] flex flex-col justify-between p-10 lg:p-14 relative overflow-hidden"
          style={{ backgroundColor: navy, minHeight: 'calc(100vh - 72px)' }}
        >
          {/* Decorative large text */}
          <div
            className="absolute -bottom-8 -left-4 leading-none select-none pointer-events-none"
            style={{ fontSize: 180, fontWeight: 700, color: 'rgba(255,255,255,0.04)', fontFamily: 'Poppins, sans-serif' }}
          >
            CR
          </div>

          <div>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: gold, border: `1px solid rgba(212,175,55,0.3)` }}
            >
              للشركات والمستثمرين الأجانب
            </span>
            <h1 className="text-white leading-snug mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600 }}>
              استشارات دخول السوق السعودي{' '}
              <span className="italic" style={{ color: gold }}>بطريقة احترافية</span>
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
              نساعد الشركات والمستثمرين الأجانب على فهم بيئة الأعمال في السعودية والتخطيط لدخول السوق بخطوات واضحة ومنظمة.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ backgroundColor: gold, color: navy }}>
                احجز استشارة خاصة
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-xl text-sm font-bold" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
                تواصل عبر واتساب
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {[['3–8', 'أسابيع للتأسيس'], ['100%', 'دعم مخصص'], ['+5', 'قطاعات ندعمها']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-bold" style={{ color: gold }}>{val}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-[58%] flex flex-col justify-center p-10 lg:p-16 bg-white"
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: gold }}>المشهد الحقيقي</p>
          <h2 className="text-3xl lg:text-4xl mb-10" style={{ color: '#0a0a1a', fontWeight: 700 }}>
            السوق السعودي مليء بالفرص… لكن{' '}
            <span style={{ color: navy }}>الدخول الصحيح هو الأهم</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(10,10,110,0.04)', border: `1px solid rgba(10,10,110,0.1)` }}>
              <p className="text-sm font-bold mb-4" style={{ color: navy }}>ما يمتلكه المستثمر الأجنبي</p>
              {['خبرة دولية قوية', 'علاقات مهنية واسعة', 'رأس مال وموارد', 'رغبة حقيقية في التوسع'].map(t => (
                <div key={t} className="flex items-center gap-2.5 mb-2.5 text-sm" style={{ color: '#4b5563' }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: navy }} />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(55, 212, 181, 0.05)', border: `1px solid rgba(212,175,55,0.2)` }}>
              <p className="text-sm font-bold mb-4" style={{ color: '#92740e' }}>التحديات التي يواجهها</p>
              {['فهم بيئة الأعمال المحلية', 'التخطيط لمراحل الدخول', 'التنسيق مع الجهات المعنية', 'إعداد الهيكل التشغيلي', 'البدء بثقة وسرعة'].map(t => (
                <div key={t} className="flex items-center gap-2.5 mb-2.5 text-sm" style={{ color: '#4b5563' }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: gold }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-base" style={{ color: '#6b7280' }}>
            نحن لا نقدم مجرد{' '}
            <strong style={{ color: '#0a0a1a', fontWeight: 700 }}>"معلومات عامة"</strong>
            {' '}— بل نرافقك خطوة بخطوة من التخطيط وحتى التشغيل الفعلي.
          </p>
        </motion.div>
      </section>

      {/* ── 01 — WHY SAUDI ── */}
      <section id="why-saudi" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-start gap-6 lg:gap-10 mb-14">
          <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>01</span>
          <div className="pt-2 lg:pt-4">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>لماذا السعودية؟</p>
            <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
              أكبر اقتصاد في المنطقة <span className="italic" style={{ color: navy }}>بفرص حقيقية</span>
            </h2>
          </div>
        </div>

        {/* Feature strips */}
        <div className="space-y-3">
          {[
            { icon: Building2, title: 'سوق ضخم ومتنامٍ', desc: 'السعودية من أكبر الأسواق الإقليمية مع طلب متزايد على الخدمات المتخصصة' },
            { icon: Zap, title: 'رؤية 2030', desc: 'تطوير مستمر في بيئة الأعمال والتحول الرقمي وفرص الاستثمار' },
            { icon: Target, title: 'توقيت مثالي للدخول', desc: 'مرحلة الانفتاح الاقتصادي توفر فرصًا غير مسبوقة للشركات الأجنبية' },
            { icon: Globe, title: 'بوابة للمنطقة', desc: 'الحضور في السعودية يفتح الباب أمام الأسواق الخليجية والإقليمية' },
            { icon: Shield, title: 'بيئة أعمال احترافية', desc: 'إصلاحات مستمرة تعزز سهولة ممارسة الأعمال وثقة المستثمر الأجنبي' },
            { icon: Briefcase, title: 'قطاعات متنوعة', desc: 'التسويق والتشغيل والخدمات اللوجستية والاستشارات والتقنية والتجارة' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group flex items-center gap-5 p-5 rounded-2xl border transition-all hover:shadow-sm"
              style={{ borderColor: 'rgba(0,0,0,0.07)', backgroundColor: i % 2 === 0 ? 'white' : 'rgba(10,10,110,0.015)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(10,10,110,0.08)' }}>
                <item.icon className="w-5 h-5" style={{ color: navy }} />
              </div>
              <div className="flex-1 flex items-center gap-3">
                <span className="font-bold text-sm" style={{ color: '#0a0a1a' }}>{item.title}</span>
                <span className="text-sm hidden sm:inline" style={{ color: 'rgba(0,0,0,0.2)' }}>—</span>
                <span className="text-sm hidden sm:inline" style={{ color: '#6b7280' }}>{item.desc}</span>
              </div>
              <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: gold }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── NAVY STRIP ── */}
      <div className="py-12 px-6" style={{ backgroundColor: navy }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-2xl font-bold text-white">هل أنت مستعد لدخول السوق السعودي؟</p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all" style={{ backgroundColor: gold, color: navy }}>احجز استشارة مجانية</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-sm font-bold transition-all" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>واتساب</a>
          </div>
        </div>
      </div>

      {/* ── 02 — SERVICES BENTO ── */}
      <section id="services" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-start gap-6 lg:gap-10 mb-14">
          <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>02</span>
          <div className="pt-2 lg:pt-4">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>خدماتنا</p>
            <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
              دعم <span className="italic" style={{ color: navy }}>متكامل</span> من التخطيط حتى التشغيل
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Wide navy card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
            className="col-span-2 rounded-2xl p-8 flex items-center gap-6"
            style={{ backgroundColor: navy, minHeight: 140 }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
              <Target className="w-7 h-7" style={{ color: gold }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">استشارات دخول السوق</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>تقييم شامل لفرص دخول السوق السعودي وتحديد المسار الأمثل لنشاطك التجاري</p>
            </div>
          </motion.div>

          {[
            { icon: FileText, title: 'خطة عمل مخصصة', desc: 'تصميم خطة دخول واضحة حسب طبيعة نشاطك' },
            { icon: Building2, title: 'تنسيق مراحل التأسيس', desc: 'متابعة وتنظيم خطوات البداية الفعلية' },
            { icon: Handshake, title: 'دعم الشراكات', desc: 'ربط بشركاء محليين وجهات داعمة' },
            { icon: Users, title: 'دعم استقطاب الكفاءات', desc: 'إرشاد لبناء الفريق التشغيلي المناسب' },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.03 * (i + 1) }}
              className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: '#fafafa' }}>
              <s.icon className="w-7 h-7 mb-3" style={{ color: navy }} />
              <h3 className="font-bold mb-1 text-sm" style={{ color: '#0a0a1a' }}>{s.title}</h3>
              <p className="text-xs" style={{ color: '#9ca3af' }}>{s.desc}</p>
            </motion.div>
          ))}

          {/* Gold accent card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6" style={{ backgroundColor: gold }}>
            <Globe className="w-7 h-7 mb-3" style={{ color: navy }} />
            <h3 className="font-bold mb-1 text-sm" style={{ color: navy }}>دعم المنصات التشغيلية</h3>
            <p className="text-xs" style={{ color: 'rgba(10,10,110,0.65)' }}>إرشاد لتفعيل البنية التشغيلية الرقمية</p>
          </motion.div>

          {/* Wide bottom card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="col-span-2 rounded-2xl p-8 border" style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: '#fafafa' }}>
            <div className="flex items-center gap-4 mb-3">
              <Rocket className="w-8 h-8" style={{ color: navy }} />
              <h3 className="text-lg font-bold" style={{ color: '#0a0a1a' }}>دعم ما بعد الإطلاق</h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#92740e' }}>VIP فقط</span>
            </div>
            <p className="text-sm" style={{ color: '#6b7280' }}>متابعة تشغيلية مستمرة لمساعدتك على استقرار نشاطك التجاري — لمدة 6 أشهر كاملة بعد الإطلاق</p>
          </motion.div>

          {[
            { icon: Briefcase, title: 'دعم الحسابات التجارية', desc: 'إرشاد لمتطلبات الحسابات البنكية للأعمال' },
            { icon: Star, title: 'تقارير دورية', desc: 'متابعة شاملة لمراحل التقدم' },
            { icon: Shield, title: 'تنسيق مع الجهات المعنية', desc: 'تسهيل التواصل مع الأطراف ذات الصلة' },
            { icon: Zap, title: 'جاهزية تشغيلية كاملة', desc: 'ضمان استعداد كامل قبل بدء النشاط' },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.03 * (i + 5) }}
              className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: '#fafafa' }}>
              <s.icon className="w-7 h-7 mb-3" style={{ color: navy }} />
              <h3 className="font-bold mb-1 text-sm" style={{ color: '#0a0a1a' }}>{s.title}</h3>
              <p className="text-xs" style={{ color: '#9ca3af' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 03 — STEPS — Horizontal Timeline ── */}
      <section id="steps" className="py-24 px-6 lg:px-16" style={{ backgroundColor: '#f8f8fc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-6 lg:gap-10 mb-16">
            <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>03</span>
            <div className="pt-2 lg:pt-4">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>كيف تبدأ؟</p>
              <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
                من الفكرة إلى <span className="italic" style={{ color: navy }}>التشغيل</span>
              </h2>
            </div>
          </div>

          {/* Horizontal steps */}
          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-10 right-8 left-8 h-px" style={{ backgroundColor: 'rgba(10,10,110,0.12)' }} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {[
                { icon: FileText, num: '01', title: 'مراجعة النشاط', desc: 'فهم طبيعة النشاط وتحديد المسار المناسب' },
                { icon: Target, num: '02', title: 'تقييم المتطلبات', desc: 'مراجعة احتياجات التوسع والتشغيل' },
                { icon: Shield, num: '03', title: 'خطة دخول مخصصة', desc: 'تنظيم خطوات دخول السوق بطريقة واضحة' },
                { icon: Building2, num: '04', title: 'تنسيق مراحل البداية', desc: 'متابعة خطوات التأسيس والتجهيز' },
                { icon: Rocket, num: '05', title: 'دعم الإطلاق والتشغيل', desc: 'مساندة الأعمال خلال مرحلة التشغيل الأولى' },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 relative z-10" style={{ backgroundColor: navy }}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#92740e' }}>{step.num}</span>
                  <h3 className="font-bold mb-2 text-sm" style={{ color: '#0a0a1a' }}>{step.title}</h3>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 — PRICING — Vertical cards ── */}
      <section id="pricing" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-start gap-6 lg:gap-10 mb-16">
          <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>04</span>
          <div className="pt-2 lg:pt-4">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>الباقات</p>
            <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
              باقات تناسب <span className="italic" style={{ color: navy }}>احتياجاتك</span>
            </h2>
          </div>
        </div>

        {/* Vertical pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              name: 'Foundation', nameEn: 'FOUNDATION', price: '26,500', duration: '3–6 أسابيع',
              desc: 'للشركات التي تبدأ استكشاف السوق السعودي وتريد أساسًا متينًا',
              features: ['استشارة دخول السوق', 'خطة عمل أساسية مخصصة', 'تنسيق مراحل التأسيس', 'إرشاد لمتطلبات التشغيل', 'تواصل مع الجهات المعنية', 'مدير ملف مخصص', 'إعداد أولي للبنية التشغيلية'],
              accent: false
            },
            {
              name: 'Operational', nameEn: 'OPERATIONAL', price: '37,500', duration: '4–8 أسابيع',
              desc: 'دعم متكامل لدخول السوق مع جاهزية تشغيلية كاملة',
              features: ['كل ما في Foundation', 'دعم تفعيل المنصات التشغيلية', 'تنسيق الحسابات التجارية', 'دعم استقطاب الكفاءات', 'تقارير دورية لمتابعة التقدم'],
              accent: true
            },
            {
              name: 'VIP', nameEn: 'VIP', price: '53,900', duration: '4–10 أسابيع',
              desc: 'حل شامل مع دعم موسع ومتابعة ما بعد الإطلاق',
              features: ['كل ما في Operational', 'أولوية المتابعة والتنسيق', 'دعم التشغيل الموسع', 'استشارة شراكات استراتيجية', '6 أشهر دعم ما بعد الإطلاق'],
              accent: false
            },
          ].map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-8 flex flex-col relative"
              style={{ border: `${plan.accent ? 2 : 1}px solid ${plan.accent ? navy : 'rgba(0,0,0,0.08)'}`, backgroundColor: plan.accent ? 'rgba(10,10,110,0.02)' : 'white' }}
            >
              {plan.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: navy }}>
                  الأكثر طلبًا
                </div>
              )}

              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest block mb-2" style={{ color: '#9ca3af' }}>{plan.nameEn}</span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0a0a1a' }}>{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{plan.desc}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-4xl font-bold" style={{ color: plan.accent ? navy : '#0a0a1a' }}>{plan.price}</span>
                  <span className="text-base" style={{ color: '#9ca3af' }}>SAR</span>
                </div>
                <p className="text-xs font-bold" style={{ color: gold }}>{plan.duration}</p>
              </div>

              <div className="border-t pt-6 mb-6 flex-1" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="space-y-3">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#4b5563' }}>
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: navy }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="block px-6 py-3.5 rounded-xl text-sm font-bold text-center transition-all hover:opacity-90"
                style={plan.accent ? { backgroundColor: navy, color: 'white' } : { border: '2px solid rgba(0,0,0,0.12)', color: '#0a0a1a' }}
              >
                ابدأ الآن
              </a>
            </motion.div>
          ))}
        </div>

        {/* Always visible comparison table */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: navy }}>مقارنة تفصيلية للباقات</h3>
          <div className="rounded-2xl border overflow-hidden overflow-x-auto" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <table className="comparison-table w-full">
              <thead>
                <tr style={{ backgroundColor: navy }}>
                  <th className="text-right text-xs text-white p-4">الخدمة</th>
                  <th className="text-xs text-white p-4 text-center">Foundation</th>
                  <th className="text-xs text-white p-4 text-center">Operational</th>
                  <th className="text-xs text-white p-4 text-center">VIP</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>
                    <td className="text-xs p-3 text-right" style={{ color: '#374151' }}>{row.label}</td>
                    <td className="p-3"><CellValue val={row.f} /></td>
                    <td className="p-3"><CellValue val={row.o} /></td>
                    <td className="p-3"><CellValue val={row.v} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 05 — FAQ ── */}
      <section id="faq" className="py-24 px-6 lg:px-16" style={{ backgroundColor: '#f8f8fc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-6 lg:gap-10 mb-14">
            <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>05</span>
            <div className="pt-2 lg:pt-4">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>أسئلة شائعة</p>
              <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
                إجابات على <span className="italic" style={{ color: navy }}>أسئلتك</span>
              </h2>
            </div>
          </div>

          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 gap-4 text-right"
                >
                  <span className="text-base font-bold" style={{ color: '#0a0a1a' }}>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                    <ChevronDown className="w-5 h-5" style={{ color: navy }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <p className="pb-5 text-sm leading-relaxed" style={{ color: '#6b7280' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 — CONTACT ── */}
      <section id="contact" className="py-24 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <MagicRings color={navy} colorTwo={navy} ringCount={5} speed={0.5} attenuation={10} lineThickness={1.5} baseRadius={0.5} radiusStep={0.15} scaleRate={0.1} opacity={0.8} blur={0} noiseAmount={0.03} rotation={0} ringGap={2} fadeIn={0.8} fadeOut={0.5} followMouse={false} mouseInfluence={0} hoverScale={1} parallax={0} clickBurst={false} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-start gap-6 lg:gap-10 mb-14">
            <span className="leading-none font-bold select-none shrink-0" style={{ fontSize: 'clamp(60px, 10vw, 88px)', color: 'rgba(10,10,110,0.07)', fontFamily: 'Poppins' }}>06</span>
            <div className="pt-2 lg:pt-4">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: gold }}>تواصل معنا</p>
              <h2 className="text-3xl lg:text-5xl" style={{ color: '#0a0a1a', fontWeight: 700 }}>
                جاهز لدخول <span className="italic" style={{ color: navy }}>السوق السعودي؟</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="space-y-4 mb-10">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 p-6 rounded-2xl border transition-all" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: navy }}>
                    <img src={ASSETS.whatsappIcon} alt="WhatsApp" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold" style={{ color: '#0a0a1a' }}>تواصل عبر واتساب</div>
                    <div className="text-sm" style={{ color: '#9ca3af' }}>رد سريع خلال دقائق</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: navy }} />
                </a>
                <a href={`tel:${CONTACT.phone}`} className="group flex items-center gap-5 p-6 rounded-2xl border transition-all" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#f3f4f6' }}>
                    <Phone className="w-7 h-7" style={{ color: navy }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold" style={{ color: '#0a0a1a' }}>اتصل بنا</div>
                    <div className="text-sm" dir="ltr" style={{ color: '#9ca3af' }}>{CONTACT.phoneDisplay}</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: navy }} />
                </a>
              </div>
              <div className="flex flex-wrap gap-6">
                {[{ icon: Shield, text: 'استشارة احترافية موثوقة' }, { icon: CheckCircle2, text: 'أسعار شفافة' }, { icon: Globe, text: 'عربي / English' }].map(b => (
                  <div key={b.text} className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                    <b.icon className="w-4 h-4" style={{ color: navy }} />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-8" style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: 'white' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(10,10,110,0.08)' }}>
                    <CheckCircle2 className="w-10 h-10" style={{ color: navy }} />
                  </div>
                  <h3 className="font-bold text-2xl mb-2" style={{ color: '#0a0a1a' }}>شكرًا لتواصلك!</h3>
                  <p style={{ color: '#6b7280' }}>سنتواصل معك في أقرب وقت ممكن.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-4 rounded-xl text-sm text-red-500 text-center" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#0a0a1a' }}>الاسم الكامل</label>
                    <input type="text" required disabled={loading} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all disabled:opacity-50" style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0a0a1a', backgroundColor: 'white' }} placeholder="أدخل اسمك" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#0a0a1a' }}>البريد الإلكتروني</label>
                      <input type="email" required disabled={loading} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none disabled:opacity-50" style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0a0a1a', backgroundColor: 'white' }} placeholder="email@example.com" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#0a0a1a' }}>رقم الهاتف</label>
                      <input type="tel" required disabled={loading} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none disabled:opacity-50" style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0a0a1a', backgroundColor: 'white' }} placeholder="+966 5X XXX XXXX" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#0a0a1a' }}>نوع النشاط</label>
                    <select disabled={loading} value={formData.activity} onChange={e => setFormData({ ...formData, activity: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none disabled:opacity-50" style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0a0a1a', backgroundColor: 'white' }}>
                      <option value="">اختر نوع النشاط</option>
                      {['استشارات', 'تجارة', 'تقنية المعلومات', 'خدمات مهنية', 'تسويق', 'مقاولات', 'صناعة', 'أخرى'].map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#0a0a1a' }}>رسالتك</label>
                    <textarea disabled={loading} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none resize-none disabled:opacity-50" style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0a0a1a', backgroundColor: 'white' }} placeholder="أخبرنا عن نشاطك أو خطتك للتوسع في السوق السعودي..." />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: navy }}>
                    {loading ? 'جاري الإرسال...' : 'أرسل استفسارك'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={ASSETS.logo} alt="Corpenta" className="h-8 w-auto" />
          <p className="text-sm" style={{ color: '#9ca3af' }}>© 2026 Corpenta. جميع الحقوق محفوظة.</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <img src={ASSETS.whatsappIcon} alt="WhatsApp" className="w-5 h-5" style={{ filter: 'brightness(0) invert(0.4)' }} />
          </a>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 whatsapp-float" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }} aria-label="تواصل عبر واتساب">
        <img src={ASSETS.whatsappIcon} alt="WhatsApp" className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
      </a>
    </div>
  )
}