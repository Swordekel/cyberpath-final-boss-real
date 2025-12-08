# 📁 Struktur Folder CyberPath - Complete Guide

Dokumentasi lengkap tentang struktur folder project CyberPath.

---

## 🌳 **Tree Structure - Keseluruhan Project:**

```
CyberPath/
│
├── 📁 assets/                          # ✅ FOLDER INI YANG BARU DIBUAT!
│   ├── 📁 avatars/                     # Foto profile user dummy
│   │   ├── README.md                   # Panduan avatars
│   │   └── (letakkan foto di sini)    # user1.jpg, user2.jpg, dll
│   │
│   ├── 📁 covers/                      # Cover photos user dummy
│   │   ├── README.md                   # Panduan covers
│   │   └── (letakkan foto di sini)    # cover1.jpg, cover2.jpg, dll
│   │
│   ├── CONTOH_BASE64.md                # Contoh Base64 usage
│   └── STRUKTUR_FOLDER.md              # File ini
│
├── 📁 components/                      # React Components
│   ├── EditProfilePage.tsx             # Halaman edit profile (dengan crop!)
│   ├── Footer.tsx                      # Footer component
│   ├── HomePage.tsx                    # Homepage
│   ├── LeaderboardPage.tsx             # 🎯 EDIT FILE INI untuk ganti foto!
│   ├── LearnPage.tsx                   # Halaman pembelajaran
│   ├── LegalPage.tsx                   # Privacy & Terms
│   ├── LessonContentPage.tsx           # Konten modul
│   ├── LoginPage.tsx                   # Login page
│   ├── MatrixBackground.tsx            # Matrix effect background
│   ├── Navbar.tsx                      # Navigation bar
│   ├── ProfilePage.tsx                 # Halaman profile
│   ├── QuizPage.tsx                    # Quiz interaktif
│   ├── RegisterPage.tsx                # Register page
│   │
│   ├── 📁 figma/                       # Figma components
│   │   └── ImageWithFallback.tsx       # Image component dengan fallback
│   │
│   └── 📁 ui/                          # UI Components (shadcn)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       └── ... (banyak UI components)
│
├── 📁 hooks/                           # Custom React Hooks
│   └── useFavicon.ts                   # Hook untuk dynamic favicon
│
├── 📁 styles/                          # Styling files
│   └── globals.css                     # Global styles & Tailwind
│
├── 📁 guidelines/                      # Documentation
│   └── Guidelines.md                   # Project guidelines
│
├── 📄 App.tsx                          # ⚡ MAIN APP COMPONENT
├── 📄 Attributions.md                  # Credits
├── 📄 CARA_GANTI_FOTO_PROFIL.md        # Tutorial ganti foto profile
└── 📄 CARA_GANTI_FOTO_USER_DUMMY.md    # 🎯 Tutorial ganti foto dummy (BACA INI!)
```

---

## 🎯 **Folder yang Penting untuk Foto Dummy:**

### **1. `/assets/avatars/` - Profile Photos**

```
assets/avatars/
├── README.md          # Panduan lengkap
├── user1.jpg          # Andrew Colin (Rank 1) 👤
├── user2.jpg          # Jason Tandiari (Rank 2) 👤
├── user3.jpg          # Sarah Kim (Rank 3) 👤
├── user4.jpg          # Michael Chen (Rank 4) 👤
└── ...                # User dummy lainnya
```

**Spesifikasi:**
- Size: 200x200px (square)
- Format: JPG, PNG
- Max size: 500KB per file
- Naming: `userX.jpg` (X = nomor urut)

---

### **2. `/assets/covers/` - Cover Photos**

```
assets/covers/
├── README.md          # Panduan lengkap
├── cover1.jpg         # Cover untuk Andrew Colin 🖼️
├── cover2.jpg         # Cover untuk Jason Tandiari 🖼️
├── cover3.jpg         # Cover untuk Sarah Kim 🖼️
└── ...                # Cover untuk user lainnya
```

**Spesifikasi:**
- Size: 1920x1080px atau 1080x400px
- Aspect ratio: 16:9
- Format: JPG, PNG
- Max size: 2MB per file
- Naming: `coverX.jpg` (X = nomor urut sesuai user)

---

## 📝 **File yang Perlu Diedit untuk Ganti Foto:**

### **🎯 Main File: `/components/LeaderboardPage.tsx`**

Lokasi code yang harus diedit:

```typescript
// Line ~74-150 di LeaderboardPage.tsx
const seasonLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    
    // 👇 GANTI URL INI!
    profilePhoto: 'https://images.unsplash.com/photo-xxx?w=200&h=200&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-yyy?w=1080&h=400&fit=crop',
    
    // ... data lainnya
  },
  // ... user lainnya
];
```

---

## ⚠️ **PENTING: Environment Figma Make**

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  PERHATIAN: Figma Make Environment                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ❌ TIDAK BISA:                                         │
│  • Import local file image seperti:                     │
│    import photo from '../assets/avatars/user1.jpg'      │
│                                                          │
│  • Upload file image ke server                          │
│                                                          │
│  ✅ BISA:                                               │
│  • URL eksternal (Unsplash, Imgur, CDN, dll)            │
│  • Base64 inline string                                 │
│  • SVG inline                                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 **Workflow: Cara Ganti Foto (3 Metode)**

### **📌 METODE 1: URL Eksternal (RECOMMENDED)**

```
┌─────────────────┐
│ 1. Cari foto    │──► Unsplash.com / UI-Avatars.com
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Copy URL     │──► https://images.unsplash.com/photo-xxx
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Paste di     │──► /components/LeaderboardPage.tsx
│    code         │    line ~74-150
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Save & Test! │──► Foto langsung muncul ✅
└─────────────────┘
```

---

### **📌 METODE 2: Base64 (Foto Sendiri)**

```
┌─────────────────┐
│ 1. Siapkan foto │──► Resize ke 200x200px
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Convert to   │──► https://www.base64-image.de/
│    Base64       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Copy string  │──► data:image/jpeg;base64,/9j/4AAQ...
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Paste di     │──► /components/LeaderboardPage.tsx
│    code         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. Save & Test! │──► Foto embedded ✅
└─────────────────┘
```

---

### **📌 METODE 3: Local Assets (❌ TIDAK BISA di Figma Make)**

```
┌─────────────────────────────────────────────────┐
│  ❌ SKIP THIS - TIDAK BISA DI FIGMA MAKE        │
│                                                  │
│  Method ini hanya jalan di:                     │
│  • Create React App                             │
│  • Next.js                                      │
│  • Vite                                         │
│  • Project dengan Webpack/Bundler               │
└─────────────────────────────────────────────────┘
```

---

## 📍 **Quick Reference: Lokasi File Penting**

| File | Lokasi | Fungsi | Edit? |
|------|--------|--------|-------|
| LeaderboardPage.tsx | `/components/` | Dummy data user | ✅ EDIT INI |
| ProfilePage.tsx | `/components/` | Tampilan profile | ❌ |
| EditProfilePage.tsx | `/components/` | Edit profile + crop | ❌ |
| App.tsx | `/` | Main app | ❌ |
| README (Avatars) | `/assets/avatars/` | Panduan | 📖 BACA |
| README (Covers) | `/assets/covers/` | Panduan | 📖 BACA |
| Tutorial Lengkap | `/CARA_GANTI_FOTO_USER_DUMMY.md` | Step-by-step guide | 📖 BACA |

---

## 🎯 **Action Steps - Mulai Sekarang:**

### **Checklist untuk Ganti Foto User Dummy:**

```
📋 CHECKLIST:

[ ] 1. Baca file: /CARA_GANTI_FOTO_USER_DUMMY.md
       Lokasi: Di root project
       Isi: Tutorial lengkap step-by-step

[ ] 2. Pilih metode:
       ☑️ Metode 1: URL Eksternal (tercepat)
       ☐ Metode 2: Base64 (untuk foto sendiri)

[ ] 3. Buka file: /components/LeaderboardPage.tsx
       Cari: Line ~74-150
       Edit: profilePhoto & coverPhoto

[ ] 4. Ganti URL foto:
       ✓ User 1 (Andrew Colin)
       ✓ User 2 (Jason Tandiari)
       ✓ User 3 (Sarah Kim)
       ✓ User 4-10 (optional)

[ ] 5. Save file & test di browser

[ ] 6. Verify:
       ✓ Foto muncul di Leaderboard
       ✓ Foto muncul di Profile modal
       ✓ Tidak ada broken image
```

---

## 💡 **Pro Tips:**

### **1. Konsisten dengan Tema:**
```typescript
// Pilih foto yang cocok dengan persona
Andrew Colin   → Professional developer (male, 30-40s)
Jason Tandiari → Security researcher (female, 25-35s)
Sarah Kim      → Pen tester (female, 25-30s)
```

### **2. Quality Check:**
```
✅ DO:
• Gunakan foto professional/headshot
• Resolution minimal 200x200px
• Aspect ratio square untuk profile
• Tema cybersecurity/tech jika memungkinkan

❌ DON'T:
• Foto blur/pixelated
• Foto dengan watermark besar
• Foto tidak sesuai (cartoon, landscape, dll)
• File size terlalu besar (>2MB)
```

### **3. Naming Convention:**
```
Assets:
  user1.jpg   → Rank 1 (Andrew Colin)
  user2.jpg   → Rank 2 (Jason Tandiari)
  user3.jpg   → Rank 3 (Sarah Kim)
  
Cover:
  cover1.jpg  → Match dengan user1
  cover2.jpg  → Match dengan user2
  cover3.jpg  → Match dengan user3
```

---

## 🔗 **Resources:**

### **Foto Gratis:**
- 🌐 Unsplash: https://unsplash.com/s/photos/professional-portrait
- 🌐 UI Avatars: https://ui-avatars.com/
- 🌐 Pravatar: https://pravatar.cc/

### **Tools:**
- 🔧 Resize: https://www.iloveimg.com/resize-image
- 🔧 Compress: https://tinyjpg.com/
- 🔧 Base64: https://www.base64-image.de/

### **Cover Photos (Tech Theme):**
- 💻 Code: https://unsplash.com/s/photos/code
- 🔐 Cybersecurity: https://unsplash.com/s/photos/cybersecurity
- 🌐 Technology: https://unsplash.com/s/photos/technology

---

## ✅ **Summary:**

1. **Folder `/assets/` sudah dibuat** ✅
2. **Ada 2 subfolder:** `avatars/` dan `covers/` ✅
3. **Tutorial lengkap tersedia** di `/CARA_GANTI_FOTO_USER_DUMMY.md` ✅
4. **Edit file:** `/components/LeaderboardPage.tsx` line ~74-150 ✅
5. **Gunakan URL eksternal** (recommended) atau Base64 ✅

---

**🎉 Selamat! Struktur folder sudah siap!**

**Next step:** Baca `/CARA_GANTI_FOTO_USER_DUMMY.md` untuk tutorial lengkap step-by-step! 📖

---

**📝 Created by:** CyberPath Development Team  
**📅 Last Updated:** December 8, 2025  
**📍 Version:** 1.0
