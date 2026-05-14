# 🎯 تعليمات الرفع النهائية - جاهز 100%!

## ✅ تم الحل!

المشكلة كانت إن الصور مش بتاخد الـ basePath تلقائياً. تم الحل بإضافة helper function.

---

## 📍 المسار المطلوب
```
corpenta.com/ar/business-setup-saudi
```

---

## 🚀 خطوات الرفع (3 دقائق)

### 1. افتح cPanel File Manager

### 2. اذهب إلى المسار:
```
public_html/ar/business-setup-saudi/
```

**ملاحظة:** إذا المجلدات مش موجودة:
- أنشئ مجلد `ar` في `public_html`
- أنشئ مجلد `business-setup-saudi` داخل `ar`

### 3. ارفع الملفات

من مجلد `out` (اللي فتحته لك)، ارفع **كل المحتويات**:

✅ **الملفات المهمة:**
- `index.html`
- `Corpenta-Logo-Dark.png` ← **الصورة موجودة!**
- `whatsapp-icon.svg` ← **الأيقونة موجودة!**
- مجلد `_next` (كامل)
- مجلد `design2` (كامل)
- مجلد `404`
- باقي الملفات

✅ **ملف `.htaccess`:**
- ارفع `.htaccess` من المشروع الأصلي (ليس من `out`)

---

## 🎯 الهيكل النهائي

يجب أن يكون الهيكل كالتالي:

```
public_html/
└── ar/
    └── business-setup-saudi/
        ├── index.html
        ├── .htaccess
        ├── Corpenta-Logo-Dark.png
        ├── whatsapp-icon.svg
        ├── _next/
        │   └── static/
        ├── design2/
        └── 404/
```

---

## ✅ اختبار الموقع

1. افتح: `https://corpenta.com/ar/business-setup-saudi/`

2. تحقق من:
   - ✅ اللوجو يظهر في الـ Header
   - ✅ أيقونة واتساب تظهر في الـ Contact
   - ✅ اللوجو يظهر في الـ Footer
   - ✅ زر واتساب الطائر يظهر أسفل اليسار

3. افتح Developer Tools (F12):
   - Console: يجب ألا يكون هناك أخطاء
   - Network: الصور يجب أن تُحمّل (200 OK)

---

## 🔧 إذا الصور لم تظهر

### تحقق من المسارات:

1. **افتح Developer Tools (F12) → Network**
2. **شوف الصور بتطلب من فين:**
   - ✅ صح: `/ar/business-setup-saudi/Corpenta-Logo-Dark.png`
   - ❌ غلط: `/Corpenta-Logo-Dark.png`

3. **إذا المسار صح لكن الصورة مش موجودة:**
   - تأكد إن الصور في: `public_html/ar/business-setup-saudi/`
   - **ليس** في: `public_html/` أو `public_html/out/`

4. **افتح الصورة مباشرة:**
   ```
   https://corpenta.com/ar/business-setup-saudi/Corpenta-Logo-Dark.png
   ```
   - إذا فتحت → الصورة موجودة، المشكلة في الكود
   - إذا ما فتحتش → الصورة مش موجودة في المكان الصح

---

## 📝 Checklist سريع

- [ ] بنيت المشروع: `npm run build`
- [ ] فتحت مجلد `out`
- [ ] رفعت **محتويات** `out` (ليس المجلد نفسه)
- [ ] رفعت `.htaccess` من المشروع الأصلي
- [ ] الملفات في: `public_html/ar/business-setup-saudi/`
- [ ] الموقع يفتح: `corpenta.com/ar/business-setup-saudi/`
- [ ] الصور تظهر
- [ ] لا أخطاء في Console

---

## 🎉 كل شيء تمام؟

الموقع الآن live على:
```
https://corpenta.com/ar/business-setup-saudi/
```

**مبروك! 🎊**

---

## 💡 ملاحظات مهمة

1. **المسارات الآن صحيحة 100%** - الصور بتستخدم `/ar/business-setup-saudi/` تلقائياً
2. **لا تنسى `.htaccess`** - مهم للـ routing
3. **امسح الـ cache** بعد الرفع: `Ctrl + Shift + R`
4. **الصلاحيات:** 644 للملفات، 755 للمجلدات

---

## 🆘 محتاج مساعدة؟

1. تحقق من Console (F12) للأخطاء
2. تحقق من Network tab لمسارات الصور
3. تأكد من المسار: `public_html/ar/business-setup-saudi/`
4. جرب فتح الصورة مباشرة في المتصفح
