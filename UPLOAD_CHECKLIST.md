# ✅ Checklist للرفع على cPanel

## المسار: `corpenta.com/ar/business-setup-saudi`

## قبل البناء:
- [ ] تأكد من أن جميع التعديلات محفوظة
- [ ] تأكد من وجود الصور في مجلد `public`:
  - [ ] `Corpenta-Logo-Dark.png`
  - [ ] `whatsapp-icon.svg`
- [ ] تأكد من إعدادات `.env.local` (إذا كانت مطلوبة)
- [ ] تأكد من `next.config.ts` يحتوي على:
  - [ ] `basePath: '/ar/business-setup-saudi'`
  - [ ] `assetPrefix: '/ar/business-setup-saudi'`

## البناء:
- [ ] شغّل: `npm run build` أو `npm run build:cpanel`
- [ ] انتظر حتى ينتهي البناء بنجاح
- [ ] تحقق من وجود مجلد `out`

## التحقق من مجلد `out`:
- [ ] افتح مجلد `out`
- [ ] تأكد من وجود `index.html`
- [ ] تأكد من وجود `Corpenta-Logo-Dark.png`
- [ ] تأكد من وجود `whatsapp-icon.svg`
- [ ] تأكد من وجود مجلد `_next`

## إنشاء المجلدات في cPanel:
- [ ] افتح cPanel File Manager
- [ ] اذهب إلى `public_html`
- [ ] تأكد من وجود مجلد `ar` (أو أنشئه)
- [ ] ادخل إلى مجلد `ar`
- [ ] تأكد من وجود مجلد `business-setup-saudi` (أو أنشئه)
- [ ] ادخل إلى مجلد `business-setup-saudi`

## الرفع على cPanel:
- [ ] أنت الآن في: `public_html/ar/business-setup-saudi/`
- [ ] اعمل backup للملفات القديمة (إذا وجدت)
- [ ] احذف الملفات القديمة
- [ ] ارفع **محتويات** مجلد `out` (ليس المجلد نفسه!)
- [ ] ارفع ملف `.htaccess` من المشروع الأصلي
- [ ] تحقق من صلاحيات الملفات (644 للملفات، 755 للمجلدات)

## التحقق من الهيكل النهائي:
```
public_html/
└── ar/
    └── business-setup-saudi/
        ├── index.html ✓
        ├── .htaccess ✓
        ├── Corpenta-Logo-Dark.png ✓
        ├── whatsapp-icon.svg ✓
        ├── _next/ ✓
        └── ...
```

## الاختبار:
- [ ] افتح: `https://corpenta.com/ar/business-setup-saudi/`
- [ ] تحقق من ظهور اللوجو في الـ Header
- [ ] تحقق من ظهور أيقونة واتساب
- [ ] تحقق من ظهور اللوجو في الـ Footer
- [ ] افتح Developer Tools (F12)
- [ ] تحقق من Console - يجب ألا يكون هناك أخطاء
- [ ] تحقق من Network tab - تأكد أن الصور تُحمّل (200 OK)
- [ ] جرب الموقع على موبايل
- [ ] جرب الموقع على متصفحات مختلفة

## إذا الصور لا تظهر:
1. [ ] تحقق من المسار في cPanel - يجب أن يكون: `public_html/ar/business-setup-saudi/`
2. [ ] تحقق من أسماء الملفات - يجب أن تكون مطابقة تماماً
3. [ ] تحقق من الصلاحيات - 644 للصور
4. [ ] امسح cache المتصفح (Ctrl+Shift+R)
5. [ ] افتح الصورة مباشرة: `corpenta.com/ar/business-setup-saudi/Corpenta-Logo-Dark.png`
6. [ ] تحقق من `.htaccess` - يجب أن يحتوي على `RewriteBase /ar/business-setup-saudi/`

## بعد الرفع بنجاح:
- [ ] اختبر جميع الروابط
- [ ] اختبر نموذج التواصل
- [ ] اختبر زر واتساب
- [ ] شارك الموقع مع فريقك للاختبار

---

## أوامر سريعة:

### بناء المشروع:
```bash
npm run build:cpanel
```

### التحقق من محتويات out:
```bash
dir out
```

### فتح مجلد out:
```bash
explorer out
```

---

**ملاحظة مهمة:** 

المسار الكامل: `public_html/ar/business-setup-saudi/`

✅ صحيح: 
- `public_html/ar/business-setup-saudi/index.html`
- `public_html/ar/business-setup-saudi/Corpenta-Logo-Dark.png`

❌ خطأ: 
- `public_html/index.html`
- `public_html/out/index.html`
- `public_html/ar/business-setup-saudi/out/index.html`
