# 📸 Tutorial Lengkap: Cara Ganti Foto User Dummy

Tutorial step-by-step untuk mengganti foto user dummy di CyberPath.

---

## 🎯 **PENTING: Environment Figma Make**

Figma Make **tidak support upload file image** secara langsung seperti project React biasa.

**Solusinya ada 3:**
1. ✅ **URL Eksternal** (Paling Mudah - RECOMMENDED)
2. ✅ **Base64 Inline** (Untuk foto yang sudah Anda punya)
3. ❌ **Local Assets** (Tidak bisa di Figma Make)

---

## 📌 **Metode 1: URL Eksternal (RECOMMENDED)**

### **Langkah-langkah:**

1. **Buka file:** `/components/LeaderboardPage.tsx`

2. **Cari bagian dummy data** (sekitar line 74-150):
   ```typescript
   const seasonLeaderboard: LeaderboardEntry[] = [
     { 
       rank: 1, 
       name: 'Andrew Colin',
       profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
       // ... data lainnya
     },
   ```

3. **Ganti URL foto:**

   **Pilihan A - Unsplash (Foto Real):**
   - Kunjungi: https://unsplash.com
   - Cari "portrait" atau "professional headshot"
   - Klik foto yang Anda suka
   - Lihat URL foto, contoh: `https://unsplash.com/photos/abc123xyz`
   - Format URL jadi: `https://images.unsplash.com/photo-abc123xyz?w=200&h=200&fit=crop`
   
   **Pilihan B - UI Avatars (Generate dari Nama):**
   ```typescript
   profilePhoto: 'https://ui-avatars.com/api/?name=Andrew+Colin&background=9333ea&color=fff&size=200&bold=true'
   ```
   
   **Pilihan C - Pravatar (Random Avatar):**
   ```typescript
   profilePhoto: 'https://i.pravatar.cc/200?img=12'
   // Ganti angka 12 dengan 1-70 untuk variasi
   ```

4. **Save file** - Foto langsung berubah! ✅

---

## 📌 **Metode 2: Base64 Inline (Foto Sendiri)**

Jika Anda punya foto di komputer dan ingin pakai foto itu:

### **Langkah-langkah:**

1. **Siapkan foto Anda:**
   - Resize dulu ke 200x200px (gunakan tool online atau Photoshop)
   - Format: JPG atau PNG
   - Compress jika lebih dari 100KB

2. **Convert ke Base64:**
   - Kunjungi: https://www.base64-image.de/
   - Atau: https://elmah.io/tools/base64-image-encoder/
   - Upload foto Anda
   - Klik "Convert"
   - Copy hasilnya (akan sangat panjang!)

3. **Paste di code:**
   ```typescript
   const seasonLeaderboard: LeaderboardEntry[] = [
     { 
       rank: 1, 
       name: 'Andrew Colin',
       profilePhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCE...(sangat panjang)...==',
       // ... data lainnya
     },
   ```

4. **Save file** - Done! ✅

**⚠️ Perhatian:**
- Base64 string akan sangat panjang (ribuan karakter)
- Membuat file code jadi besar
- Tapi foto jadi "embedded" di dalam code

---

## 📌 **Metode 3: Local Assets (❌ TIDAK BISA di Figma Make)**

Di environment Figma Make, **Anda tidak bisa import file image** dengan cara ini:

```typescript
// ❌ TIDAK AKAN JALAN di Figma Make
import userPhoto from '../assets/avatars/user1.jpg';
```

**Ini hanya bisa di:**
- Create React App
- Next.js
- Vite
- Project React dengan bundler yang support file loader

---

## 🎨 **Contoh Lengkap: Ganti Foto User 1-3**

### **File:** `/components/LeaderboardPage.tsx`

```typescript
const seasonLeaderboard: LeaderboardEntry[] = [
  // USER 1 - Andrew Colin
  { 
    rank: 1, 
    name: 'Andrew Colin',
    score: 12850,
    quizzesTaken: 87,
    avatar: '🥇',
    streak: 45,
    title: '👑 Legendary Champion',
    
    // GANTI FOTO PROFILE DI SINI 👇
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    
    // GANTI COVER PHOTO DI SINI 👇
    coverPhoto: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop',
    
    email: 'andrew@cyberpath.com',
    location: 'San Francisco, USA',
    joinDate: '2021-03-10',
    bio: 'Cybersecurity enthusiast and competitive quiz taker.',
    achievements: ['100 Day Streak', 'Perfect Score Master', 'Speed Demon']
  },
  
  // USER 2 - Jason Tandiari
  { 
    rank: 2, 
    name: 'Jason Tandiari',
    score: 11920,
    quizzesTaken: 79,
    avatar: '🥈',
    streak: 42,
    title: '⚔️ Elite Guardian',
    
    // GANTI FOTO PROFILE DI SINI 👇
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    
    // GANTI COVER PHOTO DI SINI 👇
    coverPhoto: 'https://images.unsplash.com/photo-1679193559910-24dba57949e1?w=1080&h=400&fit=crop',
    
    email: 'jason@cyberpath.com',
    location: 'Jakarta, Indonesia',
    joinDate: '2021-05-15',
    bio: 'Security researcher and CTF player.',
    achievements: ['Fast Learner', 'Quiz Master', '30 Day Streak']
  },
  
  // USER 3 - Sarah Kim
  { 
    rank: 3, 
    name: 'Sarah Kim',
    score: 10850,
    quizzesTaken: 72,
    avatar: '🥉',
    streak: 38,
    title: '🛡️ Cyber Defender',
    
    // GANTI FOTO PROFILE DI SINI 👇
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    
    // GANTI COVER PHOTO DI SINI 👇
    coverPhoto: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=400&fit=crop',
    
    email: 'sarah@cyberpath.com',
    location: 'Seoul, South Korea',
    joinDate: '2021-06-20',
    bio: 'Penetration tester and security consultant.',
    achievements: ['Perfect Score', 'Quiz Enthusiast', '20 Day Streak']
  },
  
  // ... user lainnya
];
```

---

## 🔍 **Rekomendasi URL Unsplash untuk Berbagai User:**

### **Male Professional:**
```typescript
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
```

### **Female Professional:**
```typescript
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
```

### **Tech/Cyber Cover Photos:**
```typescript
// Code screen
'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=400&fit=crop'

// Technology
'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&h=400&fit=crop'

// Circuit board
'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&h=400&fit=crop'

// Binary code
'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop'

// Network
'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1080&h=400&fit=crop'

// Cybersecurity
'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1080&h=400&fit=crop'
```

---

## 🎯 **Quick Guide:**

| Kebutuhan | Gunakan | Contoh |
|-----------|---------|--------|
| Foto dari internet | URL Unsplash | `https://images.unsplash.com/photo-xxx?w=200&h=200&fit=crop` |
| Avatar dari nama | UI Avatars | `https://ui-avatars.com/api/?name=John+Doe&background=9333ea&color=fff&size=200` |
| Foto sendiri | Base64 | `data:image/jpeg;base64,/9j/4AAQ...` |
| Random avatar | Pravatar | `https://i.pravatar.cc/200?img=12` |

---

## ✅ **Checklist Setelah Ganti Foto:**

- [ ] URL foto valid dan bisa diakses
- [ ] Foto profile berukuran square (200x200px recommended)
- [ ] Cover photo aspect ratio 16:9 (1080x400px recommended)
- [ ] Test di browser - foto muncul dengan benar
- [ ] Foto relevan dengan user dummy (professional look)
- [ ] Semua user dummy punya foto unik (tidak duplicate)

---

## 🆘 **Troubleshooting:**

**❌ Foto tidak muncul / broken image:**
- Cek URL foto valid
- Cek koneksi internet
- Coba ganti ke URL lain
- Jika pakai Base64, pastikan format benar: `data:image/jpeg;base64,...`

**❌ Foto terlalu besar/kecil:**
- Untuk Unsplash, ganti parameter `w=` dan `h=`
- Contoh: `?w=400&h=400` untuk ukuran lebih besar

**❌ Foto tidak square:**
- Tambahkan `&fit=crop` di akhir URL Unsplash
- Contoh: `?w=200&h=200&fit=crop`

---

## 🎓 **Summary:**

1. **Figma Make TIDAK support local file import**
2. **Gunakan URL eksternal** (Unsplash, UI Avatars, Pravatar)
3. **Atau gunakan Base64** jika punya foto sendiri
4. **Edit di** `/components/LeaderboardPage.tsx`
5. **Copy-paste URL** ke field `profilePhoto` dan `coverPhoto`
6. **Save & test!** ✅

---

**📝 Created by:** CyberPath Development Team  
**📅 Last Updated:** December 8, 2025
