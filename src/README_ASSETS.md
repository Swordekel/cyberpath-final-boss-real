# 📁 README: Assets & Foto User Dummy - CyberPath

Dokumentasi lengkap tentang cara mengelola assets dan foto user dummy di CyberPath.

---

## 🎯 **TL;DR - Jawaban Cepat**

**Q: Di mana folder assets dibuat?**  
**A: Di root project → `/assets/`** ✅

**Q: Apakah perlu folder assets?**  
**A: TIDAK wajib! Ada 3 cara:**
- ✅ **URL Eksternal** (tercepat, tanpa upload)
- ✅ **Local Assets** (`figma:asset` - perlu upload via interface)
- ✅ **Base64** (embed langsung di code)

**Q: Bagaimana cara ganti foto user dummy?**  
**A: Edit file `/components/LeaderboardPage.tsx` dan pilih salah satu cara:**
1. **URL Unsplash** - Copy paste URL
2. **Upload foto** - Import dengan `figma:asset/[ID]`
3. **Base64** - Convert & paste string

**📖 Tutorial lengkap:** Baca `/CARA_PAKAI_LOCAL_ASSETS.md` untuk cara upload foto lokal!

---

## 📂 **Struktur Folder yang Sudah Dibuat:**

```
/
├── assets/                                    # ✅ FOLDER BARU
│   ├── avatars/                               # Profile photos
│   │   └── README.md
│   ├── covers/                                # Cover photos
│   │   └── README.md
│   ├── CONTOH_BASE64.md                       # Contoh Base64
│   └── STRUKTUR_FOLDER.md                     # Diagram lengkap
│
├── components/
│   └── LeaderboardPage.tsx                    # 🎯 EDIT FILE INI!
│
├── CARA_GANTI_FOTO_PROFIL.md                  # Tutorial lama (figma:asset)
├── CARA_GANTI_FOTO_USER_DUMMY.md              # 📖 Tutorial lengkap (URL/Base64)
└── README_ASSETS.md                           # 📍 FILE INI
```

---

## 📚 **Dokumentasi yang Tersedia:**

### **1. 📖 Tutorial Utama (BACA INI DULU!):**
**File:** `/CARA_GANTI_FOTO_USER_DUMMY.md`

**Isi:**
- ✅ 3 metode ganti foto (URL, Base64, Local)
- ✅ Step-by-step tutorial lengkap
- ✅ Contoh code lengkap
- ✅ Rekomendasi URL foto Unsplash
- ✅ Troubleshooting & tips

**👉 BACA FILE INI UNTUK TUTORIAL LENGKAP!**

---

### **2. 📁 Struktur Folder:**
**File:** `/assets/STRUKTUR_FOLDER.md`

**Isi:**
- Tree diagram project
- Lokasi setiap file penting
- Workflow 3 metode
- Checklist & action steps

---

### **3. 💾 Contoh Base64:**
**File:** `/assets/CONTOH_BASE64.md`

**Isi:**
- Contoh Base64 placeholder
- Cara convert foto ke Base64
- Kelebihan & kekurangan Base64
- Tools & resources

---

### **4. 📸 Tutorial Foto Profil (Metode Lama):**
**File:** `/CARA_GANTI_FOTO_PROFIL.md`

**Isi:**
- Cara pakai `figma:asset` (khusus Figma imports)
- Cara update 3 leaderboards (daily, weekly, season)
- Cover photo feature

**⚠️ Note:** File ini untuk metode `figma:asset` yang hanya jalan jika ada Figma imports. Untuk foto manual, pakai `/CARA_GANTI_FOTO_USER_DUMMY.md` sebagai gantinya.

---

## 🎯 **Quick Start: Ganti Foto User Dummy dalam 3 Menit**

### **Langkah Cepat:**

1. **Buka file:**
   ```
   /components/LeaderboardPage.tsx
   ```

2. **Scroll ke line ~74-150** (bagian `seasonLeaderboard`)

3. **Ganti URL foto:**
   ```typescript
   { 
     rank: 1, 
     name: 'Andrew Colin',
     
     // Ganti URL di sini 👇
     profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
     coverPhoto: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop',
   }
   ```

4. **Save & Refresh browser** - Done! ✅

---

## 🌐 **Rekomendasi: Gunakan URL Eksternal**

### **✅ Kenapa URL Eksternal?**

1. **Tidak perlu folder assets**
2. **Tidak perlu upload file**
3. **File code tetap clean & kecil**
4. **Banyak pilihan foto gratis**
5. **Langsung bisa digunakan**

### **🔗 Source Foto Gratis:**

#### **1. Unsplash (RECOMMENDED)**
```typescript
// Profile photo (200x200px)
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'

// Cover photo (1080x400px)
'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop'
```

**Cara cari foto:**
1. Kunjungi: https://unsplash.com
2. Search: "professional portrait" atau "headshot"
3. Klik foto → Copy URL dari address bar
4. Format jadi: `https://images.unsplash.com/photo-[ID]?w=200&h=200&fit=crop`

---

#### **2. UI Avatars (Auto-Generate)**
```typescript
// Generate dari nama dengan warna purple theme
'https://ui-avatars.com/api/?name=Andrew+Colin&background=9333ea&color=fff&size=200&bold=true'
```

**Parameters:**
- `name=` → Nama user (ganti spasi dengan +)
- `background=` → Warna background (9333ea = purple, ec4899 = pink)
- `color=` → Warna text (fff = white)
- `size=` → Ukuran (200 untuk profile)
- `bold=` → Text bold (true/false)

**Kunjungi:** https://ui-avatars.com/

---

#### **3. Pravatar (Random Avatars)**
```typescript
// Random avatar dengan ID tertentu (1-70)
'https://i.pravatar.cc/200?img=12'
```

**Kunjungi:** https://pravatar.cc/

---

## 💾 **Alternatif: Gunakan Base64 (Foto Sendiri)**

Jika Anda punya foto di komputer dan ingin embed langsung:

### **Langkah-langkah:**

1. **Resize foto:** 200x200px (profile) atau 1080x400px (cover)
2. **Convert ke Base64:** https://www.base64-image.de/
3. **Copy string:** `data:image/jpeg;base64,/9j/4AAQ...`
4. **Paste ke code:** `profilePhoto: 'data:image/jpeg;base64,...'`

**⚠️ Catatan:**
- Base64 string sangat panjang (ribuan karakter)
- Membuat file code jadi besar
- Tidak recommended untuk production

**📖 Detail lengkap:** Baca `/assets/CONTOH_BASE64.md`

---

## ❌ **TIDAK BISA: Local File Import**

### **Metode ini TIDAK JALAN di Figma Make:**

```typescript
// ❌ TIDAK AKAN JALAN
import photo from '../assets/avatars/user1.jpg';
import photo from './assets/avatars/user1.jpg';
import photo from '/assets/avatars/user1.jpg';
```

**Kenapa?**
- Figma Make tidak support file loader untuk images
- Tidak ada bundler (Webpack/Vite) yang handle import images
- Folder `/assets/` hanya untuk dokumentasi & reference

**✅ Solusinya:**
- Gunakan URL eksternal (Unsplash, etc)
- Atau gunakan Base64 inline

---

## 📍 **Lokasi Code yang Perlu Diedit**

### **File:** `/components/LeaderboardPage.tsx`

```typescript
// Line ~74-150 (Season Leaderboard)
const seasonLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: 'Andrew Colin',
    profilePhoto: 'GANTI_URL_DI_SINI',
    coverPhoto: 'GANTI_URL_DI_SINI',
  },
  { 
    rank: 2, 
    name: 'Jason Tandiari',
    profilePhoto: 'GANTI_URL_DI_SINI',
    coverPhoto: 'GANTI_URL_DI_SINI',
  },
  // ... dst
];

// Line ~160-200 (Weekly Leaderboard)
const weeklyLeaderboard: LeaderboardEntry[] = [
  // ... sama seperti di atas
];

// Line ~210-250 (Daily Leaderboard)
const dailyLeaderboard: LeaderboardEntry[] = [
  // ... sama seperti di atas
];
```

**⚠️ PENTING:** Ganti di **3 leaderboard** (Season, Weekly, Daily) agar konsisten!

---

## 🎨 **Contoh Lengkap: User dengan Foto Unsplash**

```typescript
const seasonLeaderboard: LeaderboardEntry[] = [
  // USER 1 - Male, Professional Developer
  { 
    rank: 1, 
    name: 'Andrew Colin',
    score: 12850,
    quizzesTaken: 87,
    avatar: '🥇',
    streak: 45,
    title: '👑 Legendary Champion',
    
    // Profile Photo - Male professional headshot
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    
    // Cover Photo - Code/Technology theme
    coverPhoto: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop',
    
    email: 'andrew@cyberpath.com',
    location: 'San Francisco, USA',
    joinDate: '2021-03-10',
    bio: 'Cybersecurity enthusiast and competitive quiz taker.',
    achievements: ['100 Day Streak', 'Perfect Score Master', 'Speed Demon']
  },
  
  // USER 2 - Female, Security Researcher
  { 
    rank: 2, 
    name: 'Sarah Johnson',
    score: 11920,
    quizzesTaken: 79,
    avatar: '🥈',
    streak: 42,
    title: '⚔️ Elite Guardian',
    
    // Profile Photo - Female professional headshot
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    
    // Cover Photo - Cybersecurity theme
    coverPhoto: 'https://images.unsplash.com/photo-1679193559910-24dba57949e1?w=1080&h=400&fit=crop',
    
    email: 'sarah@cyberpath.com',
    location: 'New York, USA',
    joinDate: '2021-05-15',
    bio: 'Security researcher and CTF player.',
    achievements: ['Fast Learner', 'Quiz Master', '30 Day Streak']
  },
  
  // USER 3 - UI Avatars (Auto-generated)
  { 
    rank: 3, 
    name: 'Michael Chen',
    score: 10850,
    quizzesTaken: 72,
    avatar: '🥉',
    streak: 38,
    title: '🛡️ Cyber Defender',
    
    // Auto-generated avatar dengan warna purple
    profilePhoto: 'https://ui-avatars.com/api/?name=Michael+Chen&background=9333ea&color=fff&size=200&bold=true',
    
    // Cover Photo - Technology theme
    coverPhoto: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=400&fit=crop',
    
    email: 'michael@cyberpath.com',
    location: 'Singapore',
    joinDate: '2021-06-20',
    bio: 'Penetration tester and security consultant.',
    achievements: ['Perfect Score', 'Quiz Enthusiast', '20 Day Streak']
  },
];
```

---

## 🔍 **Gallery: URL Foto Siap Pakai**

### **👤 Profile Photos (Male):**
```typescript
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
```

### **👤 Profile Photos (Female):**
```typescript
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
```

### **🖼️ Cover Photos (Tech Theme):**
```typescript
// Binary/Matrix code
'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop'

// Code editor screen
'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=400&fit=crop'

// Technology/Circuits
'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&h=400&fit=crop'

// Cybersecurity abstract
'https://images.unsplash.com/photo-1679193559910-24dba57949e1?w=1080&h=400&fit=crop'

// Network/Data
'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1080&h=400&fit=crop'

// Purple gradient
'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&h=400&fit=crop'
```

---

## ✅ **Checklist: Setelah Ganti Foto**

Setelah edit file, pastikan:

- [ ] URL foto valid dan bisa diakses
- [ ] Foto profile aspect ratio square (1:1)
- [ ] Cover photo aspect ratio landscape (16:9)
- [ ] Sudah ganti di 3 leaderboard (Season, Weekly, Daily)
- [ ] Save file
- [ ] Refresh browser
- [ ] Foto muncul dengan benar di Leaderboard
- [ ] Foto muncul di Profile Modal saat diklik
- [ ] Tidak ada broken image icon

---

## 🆘 **Troubleshooting**

### **❌ Foto tidak muncul (broken image):**

**Penyebab & Solusi:**

1. **URL tidak valid**
   - Cek URL bisa dibuka di browser
   - Copy-paste ulang URL
   
2. **Typo di URL**
   - Periksa ejaan URL
   - Pastikan ada quotes: `'...'`

3. **CORS issue (rare)**
   - Ganti ke URL lain
   - Gunakan Unsplash (CORS-friendly)

4. **Koneksi internet**
   - Check internet connection
   - Reload page

---

### **❌ Foto terlalu kecil/besar:**

**Solusi untuk Unsplash:**
```typescript
// Ganti parameter w= dan h=
'https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop'  // Lebih besar
'https://images.unsplash.com/photo-xxx?w=100&h=100&fit=crop'  // Lebih kecil
```

---

### **❌ Foto tidak square (profile photo):**

**Solusi:**
```typescript
// Tambahkan &fit=crop di akhir URL
'https://images.unsplash.com/photo-xxx?w=200&h=200&fit=crop'
                                                    ^^^^^^^^
```

---

## 🎓 **Summary & Action Plan**

### **Kesimpulan:**

1. ✅ **Folder `/assets/` sudah dibuat** (untuk dokumentasi & reference)
2. ✅ **Tutorial lengkap tersedia** di `/CARA_GANTI_FOTO_USER_DUMMY.md`
3. ✅ **Edit file** `/components/LeaderboardPage.tsx` untuk ganti foto
4. ✅ **Gunakan URL eksternal** (Unsplash, UI Avatars, Pravatar)
5. ✅ **Atau gunakan Base64** jika punya foto sendiri
6. ❌ **TIDAK bisa import local file** di Figma Make

### **Next Steps:**

1. **📖 Baca tutorial:** `/CARA_GANTI_FOTO_USER_DUMMY.md`
2. **🔧 Edit file:** `/components/LeaderboardPage.tsx`
3. **🔗 Copy URL foto** dari Unsplash atau UI Avatars
4. **💾 Save & test** di browser
5. **✅ Verify** foto muncul dengan benar

---

## 📞 **Need Help?**

Jika masih ada pertanyaan, silakan lihat:

- **Tutorial lengkap:** `/CARA_GANTI_FOTO_USER_DUMMY.md` (step-by-step!)
- **Struktur folder:** `/assets/STRUKTUR_FOLDER.md` (diagram visual)
- **Contoh Base64:** `/assets/CONTOH_BASE64.md` (untuk foto sendiri)
- **Tutorial lama:** `/CARA_GANTI_FOTO_PROFIL.md` (metode figma:asset)

---

**🎉 Semua dokumentasi sudah lengkap! Silakan mulai edit foto user dummy Anda!**

---

**📝 Created by:** CyberPath Development Team  
**📅 Last Updated:** December 8, 2025  
**🌟 Version:** 2.0 - Complete Documentation