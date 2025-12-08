# 📁 Tutorial: Cara Pakai Local Assets (Foto Lokal) di Figma Make

Tutorial lengkap menggunakan foto lokal tanpa URL eksternal di Figma Make.

---

## 🎯 **2 Metode Pakai Local Assets:**

### **✅ Metode A: Upload & Import Langsung**
Paling simple untuk 1-5 foto.

### **✅ Metode B: Organize dengan Helper File**
Lebih rapi untuk banyak foto (6+ foto).

---

## 📸 **METODE A: Upload & Import Langsung**

### **Step 1: Upload Foto**

1. **Siapkan foto di komputer:**
   ```
   Desktop/
   ├── user1.jpg (200x200px - Andrew)
   ├── user2.jpg (200x200px - Jason)
   ├── cover1.jpg (1080x400px - Andrew cover)
   └── cover2.jpg (1080x400px - Jason cover)
   ```

2. **Upload via Figma Make:**
   - Biasanya ada button **"Upload Asset"** atau **"Add Image"**
   - Atau **drag & drop** foto ke interface
   - Figma Make akan process dan berikan Asset ID

3. **Copy Asset ID:**
   Setelah upload, Anda akan dapat ID seperti:
   ```
   figma:asset/e0ee602c0da00ad01bcea7e0c80d341226450e29.png
   figma:asset/abc123def456ghi789.png
   figma:asset/xyz987uvw654.png
   ```

---

### **Step 2: Import di LeaderboardPage.tsx**

**Buka file:** `/components/LeaderboardPage.tsx`

**Tambahkan import di bagian atas (line ~1-5):**

```typescript
import { Trophy, Medal, Award, Crown, ... } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// 👇 TAMBAHKAN IMPORT FOTO DI SINI
import andrewPhoto from 'figma:asset/e0ee602c0da00ad01bcea7e0c80d341226450e29.png';
import jasonPhoto from 'figma:asset/abc123def456ghi789.png';
import sarahPhoto from 'figma:asset/xyz987uvw654.png';

import andrewCover from 'figma:asset/cover-andrew-id.png';
import jasonCover from 'figma:asset/cover-jason-id.png';
import sarahCover from 'figma:asset/cover-sarah-id.png';
```

**⚠️ PENTING:** 
- **JANGAN** tambahkan `./` atau `../` di depan
- Format harus: `figma:asset/[ID].png`
- Ganti `[ID]` dengan Asset ID hasil upload Anda

---

### **Step 3: Gunakan di Dummy Data**

**Scroll ke bagian `seasonLeaderboard` (line ~74-150):**

```typescript
const seasonLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    score: 12850,
    quizzesTaken: 87,
    avatar: '🥇',
    streak: 45,
    title: '👑 Legendary Champion',
    
    // 👇 GUNAKAN VARIABEL IMPORT (BUKAN URL!)
    profilePhoto: andrewPhoto,
    coverPhoto: andrewCover,
    
    email: 'andrew@cyberpath.com',
    location: 'San Francisco, USA',
    joinDate: '2021-03-10',
    bio: 'Cybersecurity enthusiast',
    achievements: ['100 Day Streak', 'Perfect Score Master']
  },
  { 
    rank: 2, 
    name: 'Jason Tandiari',
    score: 11920,
    quizzesTaken: 79,
    avatar: '🥈',
    streak: 42,
    title: '⚔️ Elite Guardian',
    
    // 👇 GUNAKAN VARIABEL IMPORT
    profilePhoto: jasonPhoto,
    coverPhoto: jasonCover,
    
    email: 'jason@cyberpath.com',
    location: 'Jakarta, Indonesia',
    joinDate: '2021-05-15',
    bio: 'Security researcher',
    achievements: ['Fast Learner', 'Quiz Master']
  },
  { 
    rank: 3, 
    name: 'Sarah Kim',
    score: 10850,
    quizzesTaken: 72,
    avatar: '🥉',
    streak: 38,
    title: '🛡️ Cyber Defender',
    
    // 👇 GUNAKAN VARIABEL IMPORT
    profilePhoto: sarahPhoto,
    coverPhoto: sarahCover,
    
    email: 'sarah@cyberpath.com',
    location: 'Seoul, South Korea',
    joinDate: '2021-06-20',
    bio: 'Penetration tester',
    achievements: ['Perfect Score', 'Quiz Enthusiast']
  },
];
```

---

### **Step 4: Ulangi untuk Weekly & Daily**

Jangan lupa update juga di `weeklyLeaderboard` dan `dailyLeaderboard` agar konsisten!

```typescript
const weeklyLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    profilePhoto: andrewPhoto,  // 👈 Pakai variabel yang sama
    coverPhoto: andrewCover,
    // ... data lainnya
  },
];

const dailyLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Jason Tandiari',
    profilePhoto: jasonPhoto,  // 👈 Pakai variabel yang sama
    coverPhoto: jasonCover,
    // ... data lainnya
  },
];
```

---

### **Step 5: Save & Test**

1. **Save file** (Ctrl+S / Cmd+S)
2. **Refresh browser** (F5 / Cmd+R)
3. **Verify foto muncul** di Leaderboard ✅

---

## 🗂️ **METODE B: Organize dengan Helper File**

Lebih rapi jika punya banyak foto (6+ foto).

### **Step 1: Upload Semua Foto**

Upload semua foto profile & cover via Figma Make interface, lalu copy semua Asset IDs.

---

### **Step 2: Update File Helper**

**Buka file:** `/assets/userAssets.ts`

**Paste Asset IDs yang sudah di-copy:**

```typescript
// Ganti YOUR_ASSET_ID dengan ID hasil upload
import user1Avatar from 'figma:asset/abc123.png'; // ✅ Ganti ini
import user2Avatar from 'figma:asset/def456.png'; // ✅ Ganti ini
import user3Avatar from 'figma:asset/ghi789.png'; // ✅ Ganti ini

import cover1Photo from 'figma:asset/cover-abc.png'; // ✅ Ganti ini
import cover2Photo from 'figma:asset/cover-def.png'; // ✅ Ganti ini
import cover3Photo from 'figma:asset/cover-ghi.png'; // ✅ Ganti ini

export const userPhotos = {
  andrew: {
    profile: user1Avatar,
    cover: cover1Photo,
  },
  jason: {
    profile: user2Avatar,
    cover: cover2Photo,
  },
  sarah: {
    profile: user3Avatar,
    cover: cover3Photo,
  },
};
```

---

### **Step 3: Import Helper di LeaderboardPage**

**Buka:** `/components/LeaderboardPage.tsx`

**Tambahkan import:**

```typescript
import { Trophy, Medal, ... } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// 👇 IMPORT HELPER FILE
import { userPhotos } from '../assets/userAssets';
```

---

### **Step 4: Gunakan di Dummy Data**

```typescript
const seasonLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    
    // 👇 GUNAKAN DARI HELPER
    profilePhoto: userPhotos.andrew.profile,
    coverPhoto: userPhotos.andrew.cover,
    
    // ... data lainnya
  },
  { 
    rank: 2, 
    name: 'Jason Tandiari',
    
    // 👇 GUNAKAN DARI HELPER
    profilePhoto: userPhotos.jason.profile,
    coverPhoto: userPhotos.jason.cover,
    
    // ... data lainnya
  },
];
```

**✅ Keuntungan:**
- Semua Asset IDs terorganize di 1 file
- Mudah maintain jika ada perubahan
- Code di LeaderboardPage lebih clean
- Bisa reuse di file lain

---

## ⚠️ **PENTING: Cara Upload Foto di Figma Make**

### **Opsi 1: Via Interface (jika ada button)**

Cari button seperti:
- "Upload Asset"
- "Add Image"  
- "Import File"
- Icon upload (⬆️📁)

### **Opsi 2: Drag & Drop**

Drag foto dari komputer langsung ke Figma Make interface.

### **Opsi 3: Lewat Code (Manual Create)**

Jika tidak ada interface upload, Anda bisa create file dengan write_tool, tapi harus Base64:

```typescript
// Tidak praktis, lebih baik pakai URL Unsplash
```

---

## 🆚 **COMPARISON: Local Assets vs URL Eksternal**

```
┌────────────────────┬───────────────────┬───────────────────┐
│ Feature            │ Local Assets      │ URL Eksternal     │
├────────────────────┼───────────────────┼───────────────────┤
│ Setup Time         │ ⏱️ 10-20 min      │ ⚡ 2-5 min        │
│ Maintenance        │ ⭐⭐⭐⭐          │ ⭐⭐⭐            │
│ Custom Photos      │ ✅ YA             │ ❌ TIDAK          │
│ Internet Required  │ ❌ TIDAK          │ ✅ YA             │
│ File Management    │ ⭐⭐⭐            │ ⭐⭐⭐⭐⭐        │
│ Copy Asset IDs     │ ⚠️ Manual         │ ✅ Direct URL     │
│ Flexibility        │ ⭐⭐⭐⭐⭐        │ ⭐⭐⭐            │
├────────────────────┼───────────────────┼───────────────────┤
│ Recommended For    │ Custom photos     │ Quick setup       │
│                    │ Production app    │ Prototyping       │
└────────────────────┴───────────────────┴───────────────────┘
```

---

## 🎯 **Pilih Metode yang Tepat:**

### **Gunakan Local Assets Jika:**
- ✅ Anda punya foto sendiri yang ingin dipakai
- ✅ Foto harus spesifik (tim, teman, dll)
- ✅ Tidak mau tergantung internet/server eksternal
- ✅ Project akan production (bukan prototype)
- ✅ Mau lebih professional & custom

### **Gunakan URL Eksternal Jika:**
- ✅ Hanya untuk dummy/placeholder
- ✅ Mau setup cepat (< 5 menit)
- ✅ Tidak perlu foto spesifik
- ✅ Project masih prototype/development
- ✅ Tidak mau ribet upload file

---

## 📋 **CHECKLIST: Upload Local Assets**

```
Persiapan:
□ Resize foto profile ke 200x200px (square)
□ Resize foto cover ke 1080x400px (16:9)
□ Compress foto (optional, jika > 500KB)
□ Rename foto dengan nama jelas (user1.jpg, user2.jpg, dll)

Upload:
□ Upload foto via Figma Make interface
□ Copy Asset ID untuk setiap foto
□ Paste Asset ID ke userAssets.ts (Metode B)
□ Atau langsung import di LeaderboardPage.tsx (Metode A)

Implementation:
□ Import foto di file yang dibutuhkan
□ Gunakan variabel import (bukan string URL)
□ Update 3 leaderboards (season, weekly, daily)

Testing:
□ Save file
□ Refresh browser
□ Verify foto muncul dengan benar
□ Check tidak ada broken image
□ Test di profile modal
```

---

## 🔍 **TROUBLESHOOTING**

### **❌ Error: Cannot find module 'figma:asset/...'**

**Penyebab:** Asset ID salah atau foto belum di-upload.

**Solusi:**
1. Pastikan foto sudah di-upload via Figma Make
2. Copy ulang Asset ID dengan benar
3. Paste dengan format: `figma:asset/[ID].png`
4. **JANGAN** tambahkan `./` atau `../`

---

### **❌ Foto tidak muncul (blank/broken image)**

**Penyebab:** Asset tidak ditemukan atau import salah.

**Solusi:**
1. Check console browser untuk error
2. Verify Asset ID benar
3. Pastikan format import benar
4. Re-upload foto jika perlu

---

### **❌ Tidak tahu cara upload foto di Figma Make**

**Solusi:**
Jika tidak ada interface upload:
1. **Alternatif:** Pakai URL Unsplash (lebih mudah)
2. **Atau:** Convert foto ke Base64 (lihat `/assets/CONTOH_BASE64.md`)
3. **Atau:** Tanyakan cara upload ke Figma Make support

---

## 💡 **REKOMENDASI SAYA:**

### **Untuk Belajar & Prototype:**
👉 **Pakai URL Unsplash** - Paling mudah & cepat!

### **Untuk Production & Custom:**
👉 **Pakai Local Assets** - Lebih professional & flexible!

### **Untuk Foto Sendiri (tanpa upload):**
👉 **Pakai Base64** - Embed langsung di code!

---

## 📚 **CONTOH LENGKAP: 10 User dengan Local Assets**

### **File:** `/assets/userAssets.ts`

```typescript
// Upload 10 foto profile + 10 foto cover, lalu paste Asset IDs

import user1Avatar from 'figma:asset/a1b2c3.png';
import user2Avatar from 'figma:asset/d4e5f6.png';
import user3Avatar from 'figma:asset/g7h8i9.png';
import user4Avatar from 'figma:asset/j1k2l3.png';
import user5Avatar from 'figma:asset/m4n5o6.png';
import user6Avatar from 'figma:asset/p7q8r9.png';
import user7Avatar from 'figma:asset/s1t2u3.png';
import user8Avatar from 'figma:asset/v4w5x6.png';
import user9Avatar from 'figma:asset/y7z8a9.png';
import user10Avatar from 'figma:asset/b1c2d3.png';

import cover1 from 'figma:asset/cover-1.png';
import cover2 from 'figma:asset/cover-2.png';
import cover3 from 'figma:asset/cover-3.png';
// ... dst untuk cover 4-10

export const userPhotos = {
  user1: { profile: user1Avatar, cover: cover1 },
  user2: { profile: user2Avatar, cover: cover2 },
  user3: { profile: user3Avatar, cover: cover3 },
  user4: { profile: user4Avatar, cover: cover4 },
  user5: { profile: user5Avatar, cover: cover5 },
  user6: { profile: user6Avatar, cover: cover6 },
  user7: { profile: user7Avatar, cover: cover7 },
  user8: { profile: user8Avatar, cover: cover8 },
  user9: { profile: user9Avatar, cover: cover9 },
  user10: { profile: user10Avatar, cover: cover10 },
};
```

### **File:** `/components/LeaderboardPage.tsx`

```typescript
import { userPhotos } from '../assets/userAssets';

const seasonLeaderboard = [
  { rank: 1, profilePhoto: userPhotos.user1.profile, coverPhoto: userPhotos.user1.cover },
  { rank: 2, profilePhoto: userPhotos.user2.profile, coverPhoto: userPhotos.user2.cover },
  { rank: 3, profilePhoto: userPhotos.user3.profile, coverPhoto: userPhotos.user3.cover },
  { rank: 4, profilePhoto: userPhotos.user4.profile, coverPhoto: userPhotos.user4.cover },
  { rank: 5, profilePhoto: userPhotos.user5.profile, coverPhoto: userPhotos.user5.cover },
  // ... dst
];
```

**✅ Clean, organized, maintainable!**

---

## 🎓 **SUMMARY**

```
┌──────────────────────────────────────────────────────────┐
│                                                           │
│  ✅ YA, BISA pakai foto lokal di folder assets!          │
│                                                           │
│  📋 CARA:                                                 │
│  1. Upload foto via Figma Make interface                 │
│  2. Copy Asset ID (figma:asset/[ID].png)                 │
│  3. Import di code dengan figma:asset scheme             │
│  4. Gunakan variabel import di dummy data                │
│                                                           │
│  ⚠️ PERBEDAAN dengan React biasa:                        │
│  • Tidak bisa: import photo from './assets/user.jpg'     │
│  • Harus: import photo from 'figma:asset/[ID].png'       │
│  • Asset ID didapat dari upload, bukan manual create     │
│                                                           │
│  💡 REKOMENDASI:                                          │
│  • Quick setup: URL Unsplash                             │
│  • Production: Local Assets (figma:asset)                │
│  • Foto sendiri tanpa upload: Base64                     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

**🎉 Selamat! Sekarang Anda tahu cara pakai local assets di Figma Make!**

**Next:** Upload foto Anda dan mulai gunakan! 🚀

---

**📝 Created by:** CyberPath Development Team  
**📅 Last Updated:** December 8, 2025  
**🎯 Version:** 1.0 - Local Assets Guide
