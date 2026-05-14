# 🚀 دليل الرفع السريع

## المسار المطلوب
```
corpenta.com/ar/business-setup-saudi
```

---

## الخطوات (5 دقائق فقط!)

### 1️⃣ البناء
```bash
npm run build
```
✅ انتظر حتى يظهر: `✓ Compiled successfully`

---

### 2️⃣ افتح cPanel File Manager
1. اذهب إلى cPanel
2. اضغط على **File Manager**
3. اذهب إلى `public_html`

---

### 3️⃣ إنشاء المجلدات (إذا لم تكن موجودة)

في `public_html`:
- إذا لم يكن هناك مجلد `ar` → أنشئه
- ادخل إلى `ar`
- إذا لم يكن هناك مجلد `business-setup-saudi` → أنشئه
- ادخل إلى `business-setup-saudi`

**المسار النهائي:**
```
public_html/ar/business-setup-saudi/
```

---

### 4️⃣ رفع الملفات

**مهم جداً:** ارفع **محتويات** مجلد `out` فقط!

من مجلد `out` في مشروعك، ارفع:
- ✅ `index.html`
- ✅ `Corpenta-Logo-Dark.png`
- ✅ `whatsapp-icon.svg`
- ✅ مجلد `_next` (كامل)
- ✅ مجلد `design2` (كامل)
- ✅ باقي الملفات

**ثم ارفع:**
- ✅ `.htaccess` (من المشروع الأصلي، ليس من `out`)

---

### 5️⃣ التحقق

افتح المتصفح واذهب إلى:
```
https://corpenta.com/ar/business-setup-saudi/
```

**تحقق من:**
- ✅ اللوجو يظهر في الـ Header
- ✅ أيقونة واتساب تظهر
- ✅ اللوجو يظهر في الـ Footer
- ✅ لا توجد أخطاء في Console (F12)

---

## ❌ أخطاء شائعة

### الصور لا تظهر؟

**السبب:** المسار خطأ

**الحل:**
1. تأكد أن الملفات في: `public_html/ar/business-setup-saudi/`
2. **ليس** في: `public_html/` أو `public_html/out/`

### الصفحة تعطي 404؟

**الحل:**
1. تأكد من رفع `.htaccess`
2. تأكد أن `.htaccess` يحتوي على:
   ```
   RewriteBase /ar/business-setup-saudi/
   ```

---

## 📋 Checklist سريع

- [ ] `npm run build` نجح
- [ ] المجلدات موجودة: `public_html/ar/business-setup-saudi/`
- [ ] رفعت محتويات `out` (ليس المجلد نفسه)
- [ ] رفعت `.htaccess`
- [ ] الموقع يفتح: `corpenta.com/ar/business-setup-saudi/`
- [ ] الصور تظهر
- [ ] لا أخطاء في Console

---

## 🆘 مشكلة؟

1. امسح cache المتصفح: `Ctrl + Shift + R`
2. تحقق من صلاحيات الملفات: 644
3. افتح الصورة مباشرة:
   ```
   corpenta.com/ar/business-setup-saudi/Corpenta-Logo-Dark.png
   ```
4. تحقق من Console (F12) للأخطاء

---

## ✅ كل شيء تمام؟

الموقع الآن live على:
```
https://corpenta.com/ar/business-setup-saudi/
```

🎉 مبروك!
