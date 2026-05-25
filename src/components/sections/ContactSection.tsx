'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowLeft, Shield, CheckCircle2, Languages } from 'lucide-react'
import MagicRings from '@/components/MagicRings'
import { navy, blue, blueLight, bluePale, CONTACT } from '@/lib/constants'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/xpqnjrdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'حدث خطأ في إرسال الرسالة')
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
    <section id="contact" className="py-20 md:py-28 bg-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <MagicRings
          color="#3b82f6"
          colorTwo="#60a5fa"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: bluePale, color: blue }}>
              <Phone className="w-4 h-4" />
              تواصل معنا
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: navy }}>
              جاهز لبدء شركتك في السعودية؟
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              تواصل معنا الآن واحصل على استشارة أولية مجانية. فريقنا المتخصص جاهز لمساعدتك في كل خطوة.
            </p>

            <div className="space-y-4 mb-8">
              <a 
                href={CONTACT.whatsapp}
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-4 w-full p-5 rounded-2xl bg-white border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}>
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1">
                  <div className="font-heading font-bold text-base" style={{ color: navy }}>تواصل عبر واتساب</div>
                  <div className="text-sm text-gray-500">رد سريع خلال دقائق</div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" style={{ color: blue }} />
              </a>

              <a 
                href={`tel:${CONTACT.phone}`}
                className="group flex items-center gap-4 w-full p-5 rounded-2xl bg-white border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${navy}, #0a0a6e)` }}>
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1">
                  <div className="font-heading font-bold text-base" style={{ color: navy }}>اتصل بنا</div>
                  <div className="text-sm text-gray-500" dir="ltr">{CONTACT.phoneDisplay}</div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" style={{ color: navy }} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
              {[
                { icon: Shield, text: 'معتمد من MISA', color: blue },
                { icon: CheckCircle2, text: 'أسعار شفافة', color: navy },
                { icon: Languages, text: 'عربي / إنجليزي', color: blue },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <badge.icon className="w-5 h-5" style={{ color: badge.color }} />
                  <span className="text-sm font-medium text-gray-600">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: bluePale }}>
                    <CheckCircle2 className="w-10 h-10" style={{ color: blue }} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: navy }}>شكرًا لتواصلك!</h3>
                  <p className="text-gray-600">سنتواصل معك في أقرب وقت ممكن.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                      <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: navy }}>الاسم الكامل</label>
                    <input 
                      type="text" 
                      required 
                      disabled={loading}
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                      placeholder="أدخل اسمك" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: navy }}>البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required 
                        disabled={loading}
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                        placeholder="email@example.com" 
                        dir="ltr" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: navy }}>رقم الهاتف</label>
                      <input 
                        type="tel" 
                        required 
                        disabled={loading}
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                        placeholder="+966 5X XXX XXXX" 
                        dir="ltr" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: navy }}>نوع النشاط</label>
                    <select 
                      disabled={loading}
                      value={formData.activity} 
                      onChange={(e) => setFormData({ ...formData, activity: e.target.value })} 
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <label className="block text-sm font-bold mb-2" style={{ color: navy }}>رسالتك</label>
                    <textarea 
                      disabled={loading}
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      rows={4} 
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed" 
                      placeholder="أخبرنا عن مشروعك أو استفسارك..." 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-bold text-base transition-all hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                    style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}
                  >
                    {loading ? 'جاري الإرسال...' : 'أرسل استفسارك'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">بالضغط على إرسال، أنت توافق على سياسة الخصوصية الخاصة بنا.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
