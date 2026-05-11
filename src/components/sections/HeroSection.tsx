'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft, Check, Shield, Building2, Rocket } from 'lucide-react'
import TrueFocus from '@/components/TrueFocus'
import CardSwap, { Card } from '@/components/CardSwap'
import { navy, blue, blueLight, IMG, CONTACT } from '@/lib/constants'

export default function HeroSection() {
  const [cardSize, setCardSize] = useState({ width: 340, height: 380 })

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop
        setCardSize({ width: 600, height: 450 })
      } else if (window.innerWidth >= 640) {
        // Tablet
        setCardSize({ width: 450, height: 400 })
      } else {
        // Mobile
        setCardSize({ width: 340, height: 380 })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${navy} 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-24 w-full">
        <div className="flex flex-col lg:flex-row lg:relative gap-24 lg:gap-0 items-center min-h-[500px] lg:min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right w-full lg:w-1/2 lg:pr-8 order-1 lg:order-1"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6" style={{ color: navy }}>
              أسس شركتك في السعودية{' '}
              <span className="block mt-2">
                <TrueFocus 
                  sentence="بثقة ووضوح"
                  separator=" "
                  manualMode={false}
                  blurAmount={3}
                  borderColor={blue}
                  glowColor={`rgba(37, 99, 235, 0.6)`}
                  animationDuration={0.6}
                  pauseBetweenAnimations={1.5}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
              نساعد المستثمرين ورواد الأعمال الأجانب على تأسيس شركاتهم في السعودية بشكل قانوني واحترافي، مع دعم كامل من بداية الإجراءات وحتى تشغيل الشركة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
              {[
                'تأسيس شركة للأجانب',
                'دعم كامل للإجراءات',
                'تسجيل المنصات الحكومية',
                'دعم عربي وإنجليزي',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: blue }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-xl text-white transition-all hover:shadow-xl hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${blue}, ${blueLight})` }}
              >
                احجز استشارة مجانية
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-xl transition-all hover:shadow-lg hover:scale-105 active:scale-95 border-2"
                style={{ borderColor: navy, color: navy }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full lg:w-1/2 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 flex items-center justify-center order-1 lg:order-2 pl-12 lg:pr-12"
          >
            <div 
              className="w-full max-w-[340px] sm:max-w-[450px] lg:max-w-none h-[380px] sm:h-[400px] lg:h-full relative flex items-center justify-center" 
              style={{ transform: 'scaleX(-1)' }}
            >
              <CardSwap
                width={cardSize.width}
                height={cardSize.height}
                cardDistance={cardSize.width >= 600 ? 70 : cardSize.width >= 450 ? 55 : 40}
                verticalDistance={cardSize.width >= 600 ? 80 : cardSize.width >= 450 ? 65 : 50}
                delay={4000}
                pauseOnHover={true}
                easing="elastic"
                skewAmount={cardSize.width >= 600 ? 4 : 3}
              >
                <Card>
                  <div className="w-full h-full relative overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
                    <img 
                      src={IMG.riyadh} 
                      alt="Investment License" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 w-full h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-heading font-bold text-sm sm:text-base lg:text-lg">رخصة استثمار</div>
                          <div className="text-white/80 text-xs sm:text-sm">معتمد من MISA</div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">ملكية أجنبية 100%</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">إجراءات سريعة</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">دعم كامل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="w-full h-full relative overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
                    <img 
                      src={IMG.business} 
                      alt="Company Formation" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 w-full h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-heading font-bold text-sm sm:text-base lg:text-lg">تأسيس الشركة</div>
                          <div className="text-white/80 text-xs sm:text-sm">سجل تجاري</div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">توثيق العقود</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">تسجيل حكومي</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">متابعة احترافية</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="w-full h-full relative overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
                    <img 
                      src={IMG.office} 
                      alt="Operations Launch" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 w-full h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Rocket className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-heading font-bold text-sm sm:text-base lg:text-lg">بدء التشغيل</div>
                          <div className="text-white/80 text-xs sm:text-sm">منصات حكومية</div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">تفعيل ZATCA</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">تسجيل GOSI</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                          <span className="text-xs sm:text-sm">تفعيل Qiwa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
