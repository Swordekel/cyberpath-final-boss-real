# 📸 Avatar Images Folder

Folder ini untuk menyimpan foto profile user dummy.

## 🎯 Cara Menggunakan:

### **Opsi 1: Base64 (Untuk Environment Figma Make)**

Karena Figma Make tidak support upload file image secara langsung, gunakan Base64:

1. **Convert foto ke Base64:**
   - Kunjungi: https://www.base64-image.de/
   - Upload foto Anda
   - Copy hasil Base64 string
   
2. **Gunakan di code:**
   ```typescript
   profilePhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
   ```

### **Opsi 2: Import dari URL (RECOMMENDED)**

Tetap gunakan URL eksternal karena lebih praktis:

```typescript
// Unsplash
profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'

// UI Avatars (Auto-generate dari nama)
profilePhoto: 'https://ui-avatars.com/api/?name=John+Doe&background=9333ea&color=fff&size=200'
```

## 📝 Naming Convention:

Jika menggunakan file lokal (di environment lain):
- `user1.jpg` - Andrew Colin
- `user2.jpg` - Jason Tandiari  
- `user3.jpg` - Sarah Kim
- dst...

## 🎨 Ukuran Foto:

- **Profile Photo:** 200x200px (square)
- **Format:** JPG, PNG
- **Max Size:** 500KB per file
