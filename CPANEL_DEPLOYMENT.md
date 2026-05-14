# دليل رفع الموقع على cPanel

## المسار المطلوب: `corpenta.com/ar/business-setup-saudi`

## خطوات الرفع:

### 1. بناء المشروع (Build)
قم بتشغيل الأمر التالي في terminal:
```bash
npm run build
```

هذا سينشئ مجلد `out` يحتوي على الملفات الثابتة (static files).

### 2. محتويات مجلد `out`
بعد البناء، ستجد المجلد `out` يحتوي على:
- `index.html` - الصفحة الرئيسية
- `_next/` - ملفات JavaScript و CSS
- `Corpenta-Logo-Dark.png` - اللوجو
- `whatsapp-icon.svg` - أيقونة واتساب
- ملفات أخرى

### 3. رفع الملفات على cPanel

#### المسار الصحيح:
```
public_html/
└── ar/
    └── business-setup-saudi/
        ├── index.html
        ├── .htaccess
        ├── Corpenta-Logo-Dark.png
        ├── whatsapp-icon.svg
        ├── _next/
        └── ...
```

#### خطوات الرفع:

1. افتح cPanel → **File Manager**
2. انتقل إلى `public_html`
3. تأكد من وجود مجلد `ar` (إذا لم يكن موجوداً، أنشئه)
4. ادخل إلى مجلد `ar`
5. تأكد من وجود مجلد `business-setup-saudi` (إذا لم يكن موجوداً، أنشئه)
6. ادخل إلى مجلد `business-setup-saudi`
7. احذف أي ملفات قديمة (اعمل backup أولاً!)
8. ارفع **كل محتويات** مجلد `out` (ليس المجلد نفسه، بل محتوياته)
9. ارفع ملف `.htaccess` من المشروع الأصلي

### 4. التحقق من الصور

بعد الرفع، تأكد من وجود الملفات التالية في `public_html/ar/business-setup-saudi/`:
```
public_html/ar/business-setup-saudi/
├── index.html
├── .htaccess
├── Corpenta-Logo-Dark.png
├── whatsapp-icon.svg
├── _next/
│   ├── static/
│   └── ...
└── ...
```

### 5. اختبار الموقع

1. افتح: `https://corpenta.com/ar/business-setup-saudi/`
2. تحقق من ظهور الصور
3. افتح Developer Tools (F12) وتحقق من Console للأخطاء
4. تحقق من Network tab لرؤية إذا كانت الصور تُحمّل بنجاح

## حل المشاكل الشائعة:

### الصور لا تظهر:
1. **تحقق من المسارات**: الصور يجب أن تكون في `public_html/ar/business-setup-saudi/`
2. **تحقق من الأسماء**: تأكد أن أسماء الملفات صحيحة (case-sensitive)
3. **تحقق من الصلاحيات**: الملفات يجب أن تكون 644 والمجلدات 755
4. **تحقق من basePath**: تأكد أن `next.config.ts` يحتوي على `basePath: '/ar/business-setup-saudi'`

### الصفحات الداخلية تعطي 404:
1. تأكد من رفع ملف `.htaccess` في `public_html/ar/business-setup-saudi/`
2. تأكد من تفعيل `mod_rewrite` في cPanel
3. تأكد من أن `.htaccess` يحتوي على `RewriteBase /ar/business-setup-saudi/`

### الموقع بطيء:
1. تأكد من تفعيل GZIP compression في `.htaccess`
2. استخدم CDN إذا أمكن
3. قلل حجم الصور

## ملاحظات مهمة:

1. **المسار الكامل**: `public_html/ar/business-setup-saudi/`
2. **لا ترفع مجلد `out` نفسه** - ارفع محتوياته فقط
3. **احذف `index.html` القديم** قبل رفع الجديد
4. **اعمل backup** قبل أي تعديل
5. **امسح الـ cache** في المتصفح بعد الرفع (Ctrl+Shift+R)

## الدعم:

إذا واجهت أي مشكلة:
1. تحقق من error logs في cPanel
2. افتح Developer Console في المتصفح
3. تأكد من صلاحيات الملفات
4. تأكد من تفعيل mod_rewrite
5. تأكد من أن المسار صحيح: `/ar/business-setup-saudi/`
