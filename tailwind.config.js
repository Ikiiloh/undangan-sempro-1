/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. GABUNGKAN SEMUA KEYFRAMES DI SINI
      keyframes: {
        // Ini dari blok pertama Anda
        wave: {
          '0%, 40%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-10px)' },
        },
        spinSlow: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Ini dari blok kedua Anda
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        }
      },

      // 2. GABUNGKAN SEMUA ANIMATION DI SINI
      animation: {
        'wave': 'wave 2s ease-in-out infinite',         // Menggunakan versi 2
        'spinSlow': 'spinSlow 15s linear infinite',    // Menggunakan versi 2
        'float': 'float 3s ease-in-out infinite',      // Menggunakan versi 2
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Menggunakan versi 2
      },

      // 3. Konfigurasi Anda yang lain (sudah benar)
      colors: {
        'brand-dark': '#4A3347',       // Ungu tua untuk teks
        'brand-accent': '#E8A4C9',     // Pink muda
        'brand-light': '#7B6B8D',      // Ungu keabu-abuan
        'brand-grid': '#D4B5D8',       // Lavender
        'brand-pink': '#F0A6CA',       // Pink utama
        'brand-purple': '#B8A9C9',     // Ungu pastel
        'brand-lavender': '#C9B8DC',   // Lavender terang
        'brand-white': '#FFFBFE',       // Off-white dengan hint pink
      },
      fontFamily: {
        title: ['Dancing Script', 'cursive'],  // Font script elegan
        name: ['Playfair Display', 'serif'],   // Font serif elegan
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}