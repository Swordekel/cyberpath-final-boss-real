# 📸 Cara Mengganti Foto Profil User di Leaderboard

## 📍 Lokasi File
File: `/components/LeaderboardPage.tsx`

---

## 🎯 Langkah-Langkah Mengganti Foto Profil & Cover Photo

### **1. Import Foto di Bagian Atas File**

Cari bagian import di baris 1-4, tambahkan import foto baru:

```typescript
import yehezkielPhoto from 'figma:asset/e0ee602c0da00ad01bcea7e0c80d341226450e29.png';
// Tambahkan foto baru di sini:
import andrewPhoto from 'figma:asset/GANTI_DENGAN_ASSET_ID_ANDA.png';
import jasonPhoto from 'figma:asset/GANTI_DENGAN_ASSET_ID_ANDA.png';
import coverPhotoAndrew from 'figma:asset/GANTI_DENGAN_ASSET_ID_COVER.png';
```

⚠️ **PENTING**: Gunakan format `figma:asset/[asset-id].png` - JANGAN tambahkan `./` atau path lainnya!

---

### **2. Ganti Foto di Season Leaderboard**

Cari `const seasonLeaderboard` (sekitar baris 70-79), lalu ganti `profilePhoto`:

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
    profilePhoto: andrewPhoto  // ← Ganti di sini (gunakan variabel import)
  },
  { 
    rank: 4, 
    name: 'Yehezkiel Ferdinand', 
    profilePhoto: yehezkielPhoto,  // ← Contoh foto custom yang sudah diimport
    email: 'yehezkiel@example.com', 
    location: 'Jakarta, Indonesia', 
    // ... dst
  },
  // ... user lainnya
];
```

---

### **3. Ganti Foto di Weekly Leaderboard**

Cari `const weeklyLeaderboard` (sekitar baris 88-97):

```typescript
const weeklyLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 4, 
    name: 'Yehezkiel Ferdinand', 
    profilePhoto: yehezkielPhoto,  // ← Ganti foto di sini juga
    // ... dst
  },
];
```

---

### **4. Ganti Foto di Daily Leaderboard**

Cari `const dailyLeaderboard` (sekitar baris 99-108):

```typescript
const dailyLeaderboard: LeaderboardEntry[] = [
  { 
    rank: 4, 
    name: 'Yehezkiel Ferdinand', 
    profilePhoto: yehezkielPhoto,  // ← Ganti foto di sini juga
    // ... dst
  },
];
```

---

## 📝 Template Lengkap untuk User Baru

Jika ingin menambahkan user dengan foto custom:

```typescript
// 1. Import foto di atas
import userPhoto from 'figma:asset/ASSET_ID.png';

// 2. Tambahkan di data leaderboard
{ 
  rank: 5, 
  name: 'Nama User', 
  score: 9250, 
  quizzesTaken: 64, 
  avatar: '👨‍💻',  // Emoji fallback jika foto tidak load
  streak: 32, 
  profilePhoto: userPhoto,  // Foto yang sudah diimport
  // Optional: data profil tambahan
  email: 'user@example.com',
  location: 'Jakarta, Indonesia',
  joinDate: '2023-01-15',
  bio: 'Deskripsi singkat tentang user',
  achievements: ['Achievement 1', 'Achievement 2']
}
```

---

## 🔍 Cara Menemukan Asset ID

Ketika Anda upload foto, sistem akan memberikan kode seperti:
```
figma:asset/e0ee602c0da00ad01bcea7e0c80d341226450e29.png
```

Salin seluruh kode tersebut (termasuk `figma:asset/` di depannya).

---

## ✅ Checklist Update Foto

Untuk update foto user tertentu, pastikan ganti di **3 tempat**:

- [ ] Season Leaderboard (`seasonLeaderboard`)
- [ ] Weekly Leaderboard (`weeklyLeaderboard`)  
- [ ] Daily Leaderboard (`dailyLeaderboard`)

**Jika tidak diganti di 3 tempat, foto akan berbeda di setiap tab!**

---

## 💡 Tips

1. **Konsistensi**: Gunakan variabel yang sama (e.g., `yehezkielPhoto`) di ketiga leaderboard
2. **Fallback**: Tetap isi field `avatar` dengan emoji untuk fallback
3. **Size**: Foto akan otomatis di-crop jadi lingkaran, pastikan wajah di tengah
4. **Format**: Gunakan PNG atau JPG, ukuran optimal 200x200px

---

## 🎨 Contoh Kasus: Ganti Semua Foto Top 5

```typescript
// 1. Import semua foto
import andrewPhoto from 'figma:asset/foto-andrew-id.png';
import jasonPhoto from 'figma:asset/foto-jason-id.png';
import davidPhoto from 'figma:asset/foto-david-id.png';
import yehezkielPhoto from 'figma:asset/e0ee602c0da00ad01bcea7e0c80d341226450e29.png';
import swordPhoto from 'figma:asset/foto-sword-id.png';

// 2. Update di 3 leaderboard
const seasonLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Andrew Colin', profilePhoto: andrewPhoto, ... },
  { rank: 2, name: 'Jason Tandiari', profilePhoto: jasonPhoto, ... },
  { rank: 3, name: 'David Kumala', profilePhoto: davidPhoto, ... },
  { rank: 4, name: 'Yehezkiel Ferdinand', profilePhoto: yehezkielPhoto, ... },
  { rank: 5, name: 'Sword Ekel', profilePhoto: swordPhoto, ... },
];

// Ulangi untuk weeklyLeaderboard dan dailyLeaderboard
```

---

## ❓ FAQ

**Q: Foto tidak muncul, kenapa?**  
A: Pastikan:
- Asset ID benar
- Gunakan format `figma:asset/...` tanpa `./` atau path
- Sudah import di bagian atas file

**Q: Harus ganti di berapa tempat?**  
A: **3 tempat** - Season, Weekly, dan Daily leaderboard

**Q: Bisa pakai URL Unsplash?**  
A: Ya! Bisa pakai URL langsung seperti:
```typescript
profilePhoto: 'https://images.unsplash.com/photo-xxx?w=200&h=200&fit=crop'
```

**Q: Bagaimana jika user tidak punya foto?**  
A: Hapus atau komentari field `profilePhoto`, sistem akan pakai emoji dari field `avatar`

---

✨ **Selesai! Foto profil akan muncul di leaderboard dengan border sesuai ranking.**

---

## 🎨 **FITUR BARU: Cover Photo Custom!**

### 🌟 **Apa itu Cover Photo?**
Cover photo adalah banner di bagian atas profile modal user (muncul saat user di-klik). Defaultnya adalah gradient purple-pink animasi, tapi bisa diganti dengan foto custom yang keren!

### 📸 **Cara Menambahkan Cover Photo:**

**1. Tambahkan field `coverPhoto` di data user:**

```typescript
{ 
  rank: 1, 
  name: 'Andrew Colin', 
  profilePhoto: andrewPhoto,  // Foto profil (lingkaran)
  coverPhoto: coverPhotoAndrew,  // ← COVER PHOTO BANNER!
  // ... data lainnya
}
```

**2. Bisa pakai URL langsung atau import:**

```typescript
// Opsi 1: Import dari figma asset
import coverPhoto from 'figma:asset/COVER_ASSET_ID.png';
coverPhoto: coverPhoto

// Opsi 2: URL Unsplash/external
coverPhoto: 'https://images.unsplash.com/photo-xxx?w=1080&q=80'
```

**3. Rekomendasi ukuran:**
- **Lebar**: 1080px - 1920px
- **Tinggi**: 300px - 600px  
- **Aspect Ratio**: 16:9 atau 21:9 (landscape)
- **Format**: JPG atau PNG

---

## 🎨 **Contoh Lengkap dengan Profile + Cover Photo:**

```typescript
{ 
  rank: 1, 
  name: 'Andrew Colin', 
  score: 12850, 
  quizzesTaken: 87, 
  avatar: '🥇', 
  streak: 45, 
  title: '👑 Legendary Champion', 
  
  // FOTO PROFIL (lingkaran)
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  
  // COVER PHOTO (banner)
  coverPhoto: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&q=80',
  
  // Data profil lengkap
  email: 'andrew@cyberpath.com',
  location: 'San Francisco, USA',
  joinDate: '2021-03-10',
  bio: 'Cybersecurity enthusiast and competitive quiz taker!',
  achievements: ['100 Day Streak', 'Perfect Score Master', 'Speed Demon']
}
```

---

## 🎨 **Ide Cover Photo yang Keren:**

### **Untuk Cybersecurity Theme:**
- Binary code background
- Digital circuit patterns
- Matrix-style code rain
- Neon cyberpunk aesthetics
- Network topology visualization

### **Sumber Foto Cover Gratis:**
- **Unsplash**: https://unsplash.com/
  - Search: "cybersecurity", "technology abstract", "neon gradient"
- **Pexels**: https://www.pexels.com/
- **Upload sendiri** via Figma Make dengan `figma:asset/...`

---

## 🎯 **Template User dengan Semua Fitur:**

```typescript
// Import foto
import userProfilePhoto from 'figma:asset/profile-id.png';
import userCoverPhoto from 'figma:asset/cover-id.png';

// Data user lengkap
{ 
  rank: 4, 
  name: 'Your Name', 
  score: 9875, 
  quizzesTaken: 68, 
  avatar: '👨‍💻',
  streak: 35, 
  
  // FOTO PROFIL
  profilePhoto: userProfilePhoto,
  
  // COVER PHOTO (OPSIONAL)
  coverPhoto: userCoverPhoto,
  
  // PROFIL DETAIL
  email: 'your@email.com',
  location: 'Your City, Country',
  joinDate: '2022-01-15',
  bio: 'Your bio here - deskripsi singkat tentang diri Anda',
  
  // ACHIEVEMENTS (OPSIONAL)
  achievements: [
    'Your Achievement 1', 
    'Your Achievement 2',
    'Your Achievement 3'
  ]
}
```

---

## 💡 **Tips Cover Photo:**

1. **Contrast**: Pilih foto dengan kontras baik agar nama user tetap terbaca
2. **Dark Overlay**: Sistem otomatis menambah overlay gelap 30% untuk readability
3. **Fallback**: Jika tidak ada `coverPhoto`, sistem pakai gradient purple-pink default
4. **Resolution**: Gunakan foto HD minimal 1080px width untuk hasil terbaik
5. **Theme**: Sesuaikan dengan personality user (techy, artistic, minimalist, dll)

---