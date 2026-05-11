import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateContactEmailTemplate } from '@/lib/email-template'
import { validateContactForm, sanitizeInput } from '@/lib/validation'
import { EMAIL_CONFIG } from '@/config/email'
import type { ContactFormData, ContactFormResponse } from '@/types/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, phone, activity, message } = body

    console.log('📧 Received contact form submission:', { name, email, phone })

    // Validate form data
    const validation = validateContactForm(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error || 'بيانات غير صحيحة' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      activity: activity ? sanitizeInput(activity) : undefined,
      message: message ? sanitizeInput(message) : undefined,
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.error('❌ RESEND_API_KEY is not configured!')
      return NextResponse.json(
        { 
          success: false,
          error: 'خدمة البريد الإلكتروني غير مفعلة. الرجاء إضافة RESEND_API_KEY في ملف .env.local',
          hint: 'راجع ملف EMAIL_SETUP_AR.md للتعليمات'
        },
        { status: 500 }
      )
    }

    // Generate email HTML
    const emailHtml = generateContactEmailTemplate(sanitizedData)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
      to: EMAIL_CONFIG.to,
      replyTo: sanitizedData.email,
      subject: `استفسار جديد من ${sanitizedData.name}`,
      html: emailHtml,
    })

    if (error) {
      console.error('❌ Resend error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.',
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      )
    }

    console.log('✅ Email sent successfully:', data?.id)

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Server error:', error)
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في الخادم. الرجاء المحاولة مرة أخرى لاحقًا.' },
      { status: 500 }
    )
  }
}
