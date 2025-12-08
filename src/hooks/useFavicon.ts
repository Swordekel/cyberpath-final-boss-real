import { useEffect } from 'react';

export function useFavicon(iconUrl: string) {
  useEffect(() => {
    // Cari atau buat link element untuk favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    // Set favicon URL
    link.href = iconUrl;
  }, [iconUrl]);
}

// Fungsi untuk membuat favicon dari emoji
export function createEmojiFavicon(emoji: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 32, 32);
  }
  
  return canvas.toDataURL();
}
