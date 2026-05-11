/**
 * Email Template Generator
 * Generates HTML email templates for contact form submissions
 */

import { EMAIL_CONFIG } from '@/config/email'

interface EmailTemplateProps {
  name: string
  email: string
  phone: string
  activity?: string
  message?: string
}

export function generateContactEmailTemplate({
  name,
  email,
  phone,
  activity,
  message,
}: EmailTemplateProps): string {
  const currentYear = new Date().getFullYear()
  const { logoUrl, websiteUrl } = EMAIL_CONFIG
  
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--[if mso]>
      <style type="text/css">
        body, table, td {font-family: Arial, sans-serif !important;}
      </style>
      <![endif]-->
      <style>
        * {
          font-family: 'Segoe UI', Tahoma, 'Arial', sans-serif !important;
        }
        
        body {
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; direction: rtl;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 40px 20px;" dir="rtl">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);" dir="rtl">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(to bottom, #0a0a0a 0%, #10141a 25%, #15182d 50%, #231f4a 75%, #483c8b 100%); padding: 50px 40px; text-align: center;">
                  
                  <!-- Logo -->
                  <div style="margin-bottom: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="background-color: #ffffff; padding: 12px 24px; border-radius: 8px;">
                          <img src="${logoUrl}" alt="Corpenta" style="height: 40px; width: auto; display: block;" />
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Title -->
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: center;">
                    استفسار جديد من الموقع
                  </h1>
                  <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: center;">
                    عميل محتمل يرغب في التواصل معك
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;" dir="rtl">
                  
                  <!-- Customer Info -->
                  <h2 style="color: #03034d; margin: 0 0 20px 0; font-size: 22px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: right;">
                    معلومات العميل
                  </h2>
                  
                  <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%); border-radius: 12px; margin-bottom: 30px; border-right: 5px solid #2563eb;" dir="rtl">
                    <tr>
                      <td dir="rtl">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl">
                          <tr>
                            <td style="padding: 8px 0; direction: rtl; text-align: right;">
                              <span style="color: #03034d; font-weight: 700; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">الاسم:</span>
                              <span style="color: #1f2937; font-size: 15px; margin-right: 10px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; direction: rtl; text-align: right;">
                              <span style="color: #03034d; font-weight: 700; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">البريد الإلكتروني:</span>
                              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; margin-right: 10px; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; direction: rtl; text-align: right;">
                              <span style="color: #03034d; font-weight: 700; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">رقم الهاتف:</span>
                              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none; margin-right: 10px; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">${phone}</a>
                            </td>
                          </tr>
                          ${activity ? `
                          <tr>
                            <td style="padding: 8px 0; direction: rtl; text-align: right;">
                              <span style="color: #03034d; font-weight: 700; font-size: 15px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">نوع النشاط:</span>
                              <span style="color: #1f2937; font-size: 15px; margin-right: 10px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">${activity}</span>
                            </td>
                          </tr>
                          ` : ''}
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${message ? `
                  <!-- Message -->
                  <h3 style="color: #03034d; margin: 30px 0 15px 0; font-size: 20px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: right;">
                    الرسالة:
                  </h3>
                  <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; margin-bottom: 30px;" dir="rtl">
                    <tr>
                      <td style="direction: rtl; text-align: right;">
                        <p style="color: #374151; line-height: 1.8; margin: 0; font-size: 15px; white-space: pre-wrap; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">${message}</p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Action Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #3b82f6); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 16px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                          تواصل عبر واتساب
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(to bottom, #0a0a0a 0%, #10141a 25%, #15182d 50%, #231f4a 75%, #483c8b 100%); padding: 30px 40px; text-align: center;">
                  
                  <p style="color: rgba(255,255,255,0.7); margin: 0 0 10px 0; font-size: 14px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl;">
                    &copy; ${currentYear} Corpenta. جميع الحقوق محفوظة.
                  </p>
                  <p style="margin: 0;">
                    <a href="${websiteUrl}" style="color: #3b82f6; text-decoration: none; font-size: 14px; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">corpenta.com</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
