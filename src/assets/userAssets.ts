/**
 * User Assets - Profile & Cover Photos
 * 
 * File ini untuk organize semua asset IDs foto user dummy.
 * Setelah upload foto via Figma Make, paste Asset ID di sini.
 * 
 * CARA MENGGUNAKAN:
 * 1. Upload foto via Figma Make interface
 * 2. Copy Asset ID (contoh: figma:asset/abc123.png)
 * 3. Paste di object di bawah
 * 4. Import di LeaderboardPage.tsx
 */

// ============================================
// PROFILE PHOTOS (Avatar - 200x200px)
// ============================================

// Import foto profile yang sudah di-upload
// TODO: Ganti dengan Asset ID hasil upload Anda
import user1Avatar from 'figma:asset/YOUR_ASSET_ID_1.png'; // Andrew Colin
import user2Avatar from 'figma:asset/YOUR_ASSET_ID_2.png'; // Jason Tandiari  
import user3Avatar from 'figma:asset/YOUR_ASSET_ID_3.png'; // Sarah Kim
import user4Avatar from 'figma:asset/YOUR_ASSET_ID_4.png'; // Michael Chen
import user5Avatar from 'figma:asset/YOUR_ASSET_ID_5.png'; // David Lee

// ============================================
// COVER PHOTOS (Banner - 1080x400px / 16:9)
// ============================================

// Import foto cover yang sudah di-upload
// TODO: Ganti dengan Asset ID hasil upload Anda
import cover1Photo from 'figma:asset/YOUR_COVER_ID_1.png'; // Andrew Colin cover
import cover2Photo from 'figma:asset/YOUR_COVER_ID_2.png'; // Jason Tandiari cover
import cover3Photo from 'figma:asset/YOUR_COVER_ID_3.png'; // Sarah Kim cover
import cover4Photo from 'figma:asset/YOUR_COVER_ID_4.png'; // Michael Chen cover
import cover5Photo from 'figma:asset/YOUR_COVER_ID_5.png'; // David Lee cover

// ============================================
// EXPORT ORGANIZED ASSETS
// ============================================

export const profilePhotos = {
  andrew: user1Avatar,
  jason: user2Avatar,
  sarah: user3Avatar,
  michael: user4Avatar,
  david: user5Avatar,
};

export const coverPhotos = {
  andrew: cover1Photo,
  jason: cover2Photo,
  sarah: cover3Photo,
  michael: cover4Photo,
  david: cover5Photo,
};

// ============================================
// HELPER: Get all user photos at once
// ============================================

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
  michael: {
    profile: user4Avatar,
    cover: cover4Photo,
  },
  david: {
    profile: user5Avatar,
    cover: cover5Photo,
  },
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  profilePhotos,
  coverPhotos,
  userPhotos,
};
