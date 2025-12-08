# 🏆 Leaderboard System - CyberPath

Dokumentasi lengkap tentang sistem leaderboard yang ter integrasi dengan quiz dan user login.

---

## ✅ **JAWABAN PERTANYAAN ANDA:**

### **Q: Apakah fitur leaderboard sudah benar?**
**A: SEKARANG SUDAH! ✅**

Sebelumnya leaderboard hanya menampilkan data STATIC (dummy). **Sekarang sudah DYNAMIC** dan terintegrasi dengan:
- ✅ User yang login
- ✅ Quiz completion
- ✅ Points system
- ✅ Real-time ranking

### **Q: Jika saya login dan menyelesaikan quiz sampai masuk top leaderboard, apakah akun saya akan muncul?**
**A: YA, AKAN MUNCUL! ✅**

Sekarang sistem otomatis:
1. Mengambil data user yang login (nama, points, quizzes completed)
2. Menambahkan ke leaderboard
3. Sort berdasarkan points (highest first)
4. Update ranking secara real-time
5. Highlight akun Anda dengan badge **"YOU"**

---

## 🎯 **Cara Kerja Sistem Leaderboard:**

### **Flow Lengkap:**

```
┌─────────────────────┐
│ 1. User Login       │
│    - Nama disimpan  │
│    - Points = 0     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 2. User Quiz        │
│    - Jawab soal     │
│    - Dapat score    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 3. Quiz Complete    │
│    - Hitung points  │
│    - Update profile │
│    totalPoints += X │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 4. Auto Update      │
│    Leaderboard      │
│    - Add user       │
│    - Sort by points │
│    - Update rank    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 5. User Muncul!     │
│    ✅ Di ranking     │
│    ✅ Badge "YOU"    │
│    ✅ Highlighted    │
└─────────────────────┘
```

---

## 📊 **System Architecture:**

### **1. Data Flow:**

```typescript
App.tsx
  ├── handleQuizComplete()       // Triggered when quiz selesai
  │   ├── Calculate points
  │   ├── Update userProfile.totalPoints
  │   └── Update userProfile.quizzesCompleted
  │
  └── Pass currentUser data to LeaderboardPage
      ├── name
      ├── totalPoints
      ├── quizzesCompleted
      ├── profilePhoto
      ├── coverPhoto
      ├── email
      ├── location
      └── bio

LeaderboardPage.tsx
  ├── getCurrentLeaderboard()    // Merge user dengan dummy data
  │   ├── Get base leaderboard (dummy data)
  │   ├── Check if currentUser exists
  │   ├── Add currentUser OR mark as isCurrentUser
  │   ├── Sort by score (descending)
  │   └── Recalculate ranks
  │
  └── Render leaderboard with highlight for currentUser
```

---

## 💻 **Technical Implementation:**

### **File 1: `/App.tsx`**

#### **A. Quiz Completion Handler:**

```typescript
const handleQuizComplete = (quizId: number, score: number, totalQuestions: number, maxPoints: number) => {
  // Hitung points berdasarkan score
  const pointsEarned = Math.floor((score / totalQuestions) * maxPoints);
  
  // Save completed quiz
  const completedQuiz: CompletedQuiz = {
    quizId,
    completedAt: new Date().toISOString(),
    score,
    pointsEarned,
  };

  setCompletedQuizzes(prev => [...prev, completedQuiz]);
  
  // Update user profile - INI YANG PENTING!
  setUserProfile(prev => ({
    ...prev,
    totalPoints: prev.totalPoints + pointsEarned,   // ✅ Tambah points
    quizzesCompleted: prev.quizzesCompleted + 1,    // ✅ Increment counter
  }));
};
```

**✅ Yang Terjadi:**
- Setiap quiz selesai → `handleQuizComplete` dipanggil
- Points dihitung berdasarkan score
- `userProfile.totalPoints` ditambah
- `userProfile.quizzesCompleted` increment +1

---

#### **B. Pass Data ke Leaderboard:**

```typescript
<LeaderboardPage 
  isLoggedIn={isLoggedIn}
  currentUser={isLoggedIn ? {
    name: userName,
    totalPoints: userProfile.totalPoints,        // ✅ Points dari quiz
    quizzesCompleted: userProfile.quizzesCompleted,  // ✅ Jumlah quiz
    profilePhoto: userProfile.photoUrl,
    coverPhoto: userProfile.coverPhotoUrl,
    email: userProfile.email,
    location: userProfile.location,
    joinDate: userProfile.joinDate,
    bio: userProfile.bio,
  } : undefined}
/>
```

**✅ Yang Terjadi:**
- Jika user login → pass data ke LeaderboardPage
- Jika belum login → undefined (hanya tampil dummy data)

---

### **File 2: `/components/LeaderboardPage.tsx`**

#### **A. Merge User dengan Dummy Data:**

```typescript
const getCurrentLeaderboard = () => {
  let baseLeaderboard;
  
  // 1. Get dummy data berdasarkan period (daily/weekly/season)
  switch (selectedPeriod) {
    case 'daily':
      baseLeaderboard = [...dailyLeaderboard];
      break;
    case 'weekly':
      baseLeaderboard = [...weeklyLeaderboard];
      break;
    case 'season':
      baseLeaderboard = [...seasonLeaderboard];
      break;
  }

  // 2. Jika user login dan punya points > 0
  if (isLoggedIn && currentUser && currentUser.totalPoints > 0) {
    // Check apakah user sudah ada di dummy data (berdasarkan nama)
    const userExists = baseLeaderboard.some(entry => entry.name === currentUser.name);
    
    if (!userExists) {
      // 3. User BELUM ADA → Tambahkan ke leaderboard
      const userEntry: LeaderboardEntry = {
        rank: 0,  // Will be recalculated
        name: currentUser.name,
        score: currentUser.totalPoints,           // ✅ Points dari quiz
        quizzesTaken: currentUser.quizzesCompleted,  // ✅ Jumlah quiz
        avatar: '👨‍💻',
        streak: 1,
        profilePhoto: currentUser.profilePhoto,
        coverPhoto: currentUser.coverPhoto,
        email: currentUser.email,
        location: currentUser.location,
        joinDate: currentUser.joinDate,
        bio: currentUser.bio,
        isCurrentUser: true,  // ✅ Flag untuk highlight
      };
      
      baseLeaderboard.push(userEntry);
    } else {
      // 4. User SUDAH ADA di dummy → Mark as current user
      baseLeaderboard = baseLeaderboard.map(entry => 
        entry.name === currentUser.name 
          ? { ...entry, isCurrentUser: true }  // ✅ Highlight
          : entry
      );
    }
    
    // 5. Sort ulang berdasarkan score (tertinggi dulu)
    baseLeaderboard.sort((a, b) => b.score - a.score);
    
    // 6. Update rank setelah sort
    baseLeaderboard = baseLeaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1  // ✅ Rank 1, 2, 3, dst
    }));
  }

  return baseLeaderboard;
};
```

**✅ Yang Terjadi:**
1. Ambil dummy data leaderboard
2. Jika user login & punya points:
   - Tambahkan user ke leaderboard (atau mark jika sudah ada)
   - Sort berdasarkan points (highest first)
   - Recalculate ranks
3. Return leaderboard yang sudah di-merge

---

#### **B. Highlight Current User:**

```typescript
<motion.div
  className={`p-4 border-l-4 ${
    entry.isCurrentUser 
      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 border-purple-400 ring-2 ring-purple-400/50'  // ✅ Highlighted!
      : getRankBg(entry.rank)  // Normal background
  } hover:bg-slate-700/30 transition-all cursor-pointer relative`}
>
  {/* "YOU" Badge */}
  {entry.isCurrentUser && (
    <motion.div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs shadow-lg border-2 border-yellow-400 z-10">
      <span className="font-bold">YOU</span>  {/* ✅ Badge "YOU" */}
    </motion.div>
  )}
  
  {/* Nama, score, dll */}
</motion.div>
```

**✅ Yang Terjadi:**
- User yang login dapat background highlight (purple/pink glow)
- Badge **"YOU"** muncul di pojok kanan atas
- Border dan ring effect untuk membedakan dari user lain

---

## 🎮 **Contoh Skenario:**

### **Skenario 1: User Baru Login**

```
1. Login sebagai "John Doe"
   └─ totalPoints: 0
   └─ quizzesCompleted: 0

2. Buka Leaderboard
   └─ John Doe TIDAK muncul (points = 0)
   └─ Hanya tampil dummy data

3. Selesaikan 1 quiz (score 8/10)
   └─ Points earned: 40 (dari maxPoints 50)
   └─ totalPoints: 0 + 40 = 40
   └─ quizzesCompleted: 0 + 1 = 1

4. Buka Leaderboard lagi
   └─ ✅ John Doe MUNCUL!
   └─ ✅ Rank ditentukan berdasarkan 40 points
   └─ ✅ Badge "YOU" muncul
```

---

### **Skenario 2: User Climb Leaderboard**

```
Initial State:
  Rank 1: Andrew Colin    - 12,850 pts
  Rank 2: Jason Tandiari  - 11,920 pts
  Rank 3: David Kumala    - 10,950 pts
  ...
  Rank 10: Jennifer Lee   - 6,180 pts
  
  Your Points: 5,000 pts
  Your Rank: #11 (below top 10)

After completing 10 quizzes with perfect scores:
  Your Points: 5,000 + (10 × 500) = 10,000 pts
  
Leaderboard updates:
  Rank 1: Andrew Colin    - 12,850 pts
  Rank 2: Jason Tandiari  - 11,920 pts
  Rank 3: David Kumala    - 10,950 pts
  Rank 4: YOU (John Doe)  - 10,000 pts  ← ✅ MASUK TOP 5!
  Rank 5: Yehezkiel F.    - 9,875 pts
  ...

✅ Badge "YOU" muncul
✅ Background highlighted
✅ Rank otomatis update
```

---

### **Skenario 3: Beat Top Player**

```
Initial State:
  Rank 1: Andrew Colin - 12,850 pts
  Your Points: 12,500 pts
  Your Rank: #2

After completing quiz with perfect score:
  Your Points: 12,500 + 500 = 13,000 pts
  
Leaderboard updates:
  Rank 1: YOU (John Doe)  - 13,000 pts  ← ✅ JADI #1!
  Rank 2: Andrew Colin    - 12,850 pts
  ...

✅ Anda sekarang di posisi #1!
✅ Badge "YOU" muncul
✅ Background highlighted
```

---

## 🎨 **Visual Indicators:**

### **A. Normal User (Dummy Data):**
```
┌────────────────────────────────────────────┐
│  #4  👨‍💻  Michael Chen       7,500 pts  │
│       68 quizzes • 35 day streak           │
└────────────────────────────────────────────┘
```

### **B. Current User (You):**
```
┌────────────────────────────────────────────┐
│  #4  👨‍💻  John Doe           7,500 pts  │ ← Background purple/pink glow
│       68 quizzes • 35 day streak           │
│                          ┌─────┐           │
│                          │ YOU │ ← Badge   │
│                          └─────┘           │
└────────────────────────────────────────────┘
  ↑ Border purple + ring effect
```

---

## 🔧 **Maintenance & Updates:**

### **Adding New Features:**

#### **1. Add Streak Tracking:**
```typescript
// App.tsx
const handleQuizComplete = () => {
  // ... existing code ...
  
  setUserProfile(prev => ({
    ...prev,
    learningStreak: prev.learningStreak + 1,  // Track streak
  }));
};

// LeaderboardPage.tsx
const userEntry: LeaderboardEntry = {
  // ... existing fields ...
  streak: currentUser.learningStreak || 1,
};
```

#### **2. Add Daily/Weekly Leaderboards:**

Saat ini user hanya muncul di Season leaderboard. Untuk menambahkan ke Daily/Weekly:

```typescript
// Perlu tracking terpisah untuk daily/weekly points
// Bisa gunakan timestamp untuk filter quiz completion
const dailyPoints = completedQuizzes
  .filter(quiz => isToday(quiz.completedAt))
  .reduce((sum, quiz) => sum + quiz.pointsEarned, 0);

const weeklyPoints = completedQuizzes
  .filter(quiz => isThisWeek(quiz.completedAt))
  .reduce((sum, quiz) => sum + quiz.pointsEarned, 0);
```

---

## ✅ **Summary:**

### **✅ SUDAH TERINTEGRASI:**
- [x] User login ter-track
- [x] Quiz completion ter-track
- [x] Points ter-calculate otomatis
- [x] Leaderboard auto-update setelah quiz
- [x] Ranking berdasarkan totalPoints
- [x] User yang login di-highlight dengan badge "YOU"
- [x] Background glow untuk current user
- [x] Real-time rank calculation

### **🎯 CARA KERJA:**
1. Login → User data tersimpan
2. Complete quiz → Points bertambah
3. Buka leaderboard → User otomatis muncul
4. Ranking based on totalPoints (highest first)
5. Badge "YOU" + highlight background

### **🚀 NEXT LEVEL FEATURES (Optional):**
- [ ] Save to database (Supabase)
- [ ] Persistent leaderboard across sessions
- [ ] Daily/Weekly leaderboard tracking
- [ ] Achievements system
- [ ] Title rewards for top 3
- [ ] Leaderboard history/seasons

---

**📝 Created by:** CyberPath Development Team  
**📅 Last Updated:** December 8, 2025  
**🎯 Version:** 2.0 - Dynamic Leaderboard System

---

**🎉 Sekarang sistem leaderboard Anda sudah LENGKAP dan TERINTEGRASI!** ✅
