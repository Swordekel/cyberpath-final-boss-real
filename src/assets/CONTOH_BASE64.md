# 📷 Contoh Penggunaan Base64 untuk Foto User Dummy

File ini berisi contoh Base64 string untuk foto dummy (placeholder).

## 🎯 Cara Menggunakan:

Copy Base64 string di bawah dan paste ke `profilePhoto` atau `coverPhoto`:

```typescript
profilePhoto: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIi...'
```

---

## 🖼️ **Contoh 1: Simple Avatar Placeholder (Purple Theme)**

```typescript
// SVG Avatar - Purple gradient
const avatar1Base64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5MzMzZWE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VjNDg5OTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5Go4oCN8J+SuzwvdGV4dD4KPC9zdmc+';

// Penggunaan:
profilePhoto: avatar1Base64
```

---

## 🖼️ **Contoh 2: Simple Cover Placeholder (Purple Theme)**

```typescript
// SVG Cover - Purple to Pink gradient
const cover1Base64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNvdmVyR3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojN2M0ZGZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlYzRhOTk7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjY292ZXJHcmFkKSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgb3BhY2l0eT0iMC4zIj5DeWJlclBhdGg8L3RleHQ+Cjwvc3ZnPg==';

// Penggunaan:
coverPhoto: cover1Base64
```

---

## 💡 **Cara Convert Foto Anda Sendiri ke Base64:**

### **Step 1: Resize Foto Dulu**
- Profile Photo: 200x200px (square)
- Cover Photo: 1080x400px (16:9 ratio)

**Tools untuk resize:**
- Online: https://www.iloveimg.com/resize-image
- Online: https://imageresizer.com/
- Desktop: Photoshop, GIMP, Paint.NET

### **Step 2: Compress Foto**
- Target size: < 100KB untuk profile, < 500KB untuk cover
- Tools: https://tinyjpg.com/

### **Step 3: Convert ke Base64**
Kunjungi salah satu:
1. https://www.base64-image.de/
2. https://elmah.io/tools/base64-image-encoder/
3. https://base64.guru/converter/encode/image

**Langkah:**
1. Upload foto yang sudah di-resize & compress
2. Klik "Encode" atau "Convert"
3. Copy hasilnya (akan sangat panjang!)
4. Paste ke code

---

## ⚠️ **Perhatian Penting:**

### **Kelebihan Base64:**
- ✅ Foto embed di dalam code
- ✅ Tidak perlu hosting eksternal
- ✅ Tidak perlu koneksi internet untuk load foto
- ✅ Foto tidak akan "hilang" atau link broken

### **Kekurangan Base64:**
- ❌ String sangat panjang (ribuan karakter)
- ❌ Membuat file code jadi besar
- ❌ Sulit dibaca dan di-maintain
- ❌ Tidak SEO friendly
- ❌ Tidak bisa di-cache oleh browser dengan efisien

### **Recommendation:**
Untuk production, lebih baik pakai URL eksternal (Unsplash, CDN, dll) karena:
- Lebih clean & maintainable
- File size lebih kecil
- Better performance
- Bisa di-cache dengan baik

---

## 🎨 **Contoh Full Implementation:**

### **File:** `/components/LeaderboardPage.tsx`

```typescript
// Definisikan Base64 strings di luar component
const userAvatars = {
  user1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIi...',
  user2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIi...',
  user3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIi...',
};

const userCovers = {
  cover1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MC...',
  cover2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MC...',
  cover3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MC...',
};

// Gunakan di dummy data
const seasonLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    profilePhoto: userAvatars.user1,
    coverPhoto: userCovers.cover1,
    // ... data lainnya
  },
];
```

---

## 🔗 **Link Berguna:**

- **Base64 Encoder:** https://www.base64-image.de/
- **Image Resizer:** https://www.iloveimg.com/resize-image
- **Image Compressor:** https://tinyjpg.com/
- **SVG to Base64:** https://base64.guru/converter/encode/image/svg
- **Test Base64 Image:** https://codebeautify.org/base64-to-image-converter

---

**📝 Note:** Base64 sudah disupport oleh semua browser modern dan aman digunakan. Namun untuk production website, lebih disarankan menggunakan CDN atau image hosting service.
