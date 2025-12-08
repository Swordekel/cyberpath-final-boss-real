# 🖼️ Cover Photos Folder

Folder ini untuk menyimpan cover photo user dummy.

## 🎯 Cara Menggunakan:

### **Opsi 1: Base64 (Untuk Environment Figma Make)**

Convert cover photo ke Base64:

1. Resize foto dulu ke 1080x400px (16:9 ratio)
2. Kunjungi: https://www.base64-image.de/
3. Upload foto yang sudah di-resize
4. Copy Base64 string
5. Gunakan di code:
   ```typescript
   coverPhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
   ```

### **Opsi 2: Import dari URL (RECOMMENDED)**

```typescript
// Unsplash dengan resize otomatis
coverPhoto: 'https://images.unsplash.com/photo-1626908013943-df94de54984c?w=1080&h=400&fit=crop'

// Technology/Cyber themed covers
'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&h=400&fit=crop'  // Code
'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&h=400&fit=crop' // Tech
'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&h=400&fit=crop' // Circuit
```

## 📝 Naming Convention:

- `cover1.jpg` - Andrew Colin (Tech/Code theme)
- `cover2.jpg` - Jason Tandiari (Cyber theme)
- `cover3.jpg` - Sarah Kim (Network theme)

## 🎨 Ukuran Foto:

- **Aspect Ratio:** 16:9
- **Recommended:** 1920x1080px atau 1080x400px
- **Format:** JPG, PNG
- **Max Size:** 2MB per file
