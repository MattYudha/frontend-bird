🐦 Kicau Finder: Identifikasi Suara Burung dengan AI



Kicau Finder adalah aplikasi web modern dan responsif yang dirancang untuk mengidentifikasi spesies burung dari suara kicauannya. Dibangun dengan teknologi web terdepan, aplikasi ini menyediakan platform yang mulus dan interaktif bagi para penggemar burung, peneliti, dan siapa saja yang ingin tahu tentang simfoni alam di sekitar mereka.

Daftar Isi
Fitur Utama
Pratinjau Aplikasi
Teknologi yang Digunakan
Panduan Memulai
Skrip yang Tersedia
Struktur Proyek
Lisensi
Fitur Utama
Identifikasi Suara Burung: Unggah file audio, rekam suara secara langsung, atau gunakan URL untuk mendapatkan prediksi spesies berbasis AI dengan cepat dan akurat.
Birdpedia Ensiklopedia Burung: Jelajahi koleksi data lengkap mengenai berbagai spesies burung, termasuk deskripsi, habitat, perilaku, dan fakta menarik lainnya.
Riwayat Identifikasi: Simpan dan lihat kembali semua riwayat identifikasi Anda sebelumnya untuk melacak penemuan Anda.
Antarmuka Pengguna Modern: Desain yang bersih, modern, dan intuitif dengan animasi yang halus menggunakan Framer Motion dan Tailwind CSS.
Desain Responsif: Pengalaman pengguna yang optimal di berbagai perangkat, dari desktop hingga ponsel.
Progressive Web App (PWA): Aplikasi dapat diinstal di perangkat Anda dan menawarkan kemampuan caching untuk penggunaan yang lebih cepat.
Pratinjau Aplikasi
&lt;table>
&lt;tr>
&lt;td align="center">&lt;strong>Halaman Utama & Identifikasi&lt;/strong>&lt;/td>
&lt;td align="center">&lt;strong>Birdpedia&lt;/strong>&lt;/td>
&lt;/tr>
&lt;tr>
&lt;td>&lt;img src="https://i.imgur.com/r6E82u6.png" alt="Halaman Utama Kicau Finder" width="100%">&lt;/td>
&lt;td>&lt;img src="https://i.imgur.com/0IeHw8E.png" alt="Birdpedia Kicau Finder" width="100%">&lt;/td>
&lt;/tr>
&lt;tr>
&lt;td align="center">&lt;strong>Halaman Hasil&lt;/strong>&lt;/td>
&lt;td align="center">&lt;strong>Detail Burung&lt;/strong>&lt;/td>
&lt;/tr>
&lt;tr>
&lt;td>&lt;img src="https://i.imgur.com/vHqB3pG.png" alt="Halaman Hasil Kicau Finder" width="100%">&lt;/td>
&lt;td>&lt;img src="https://i.imgur.com/w2YcQdZ.png" alt="Detail Burung Kicau Finder" width="100%">&lt;/td>
&lt;/tr>
&lt;/table>

Teknologi yang Digunakan
Berikut adalah daftar teknologi dan library utama yang digunakan dalam proyek ini:

Framework: React & Vite
Styling: Tailwind CSS
Routing: React Router DOM
Manajemen State: Zustand
Animasi: Framer Motion
Fetching Data & Caching: React Query
HTTP Client: Axios
PWA: Vite PWA Plugin
Linting: ESLint
Grafik: Chart.js
Panduan Memulai
Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah di bawah ini.

Prasyarat
Pastikan Anda telah menginstal perangkat lunak berikut:

Node.js (v18.x atau lebih tinggi direkomendasikan)
npm atau yarn
Instalasi
Clone repositori:

Bash

git clone https://github.com/TianurR/dbs-capstone.git
Masuk ke direktori proyek:

Bash

cd dbs-capstone/frontend-fix
Instal semua dependensi:

Bash

npm install
atau jika menggunakan yarn:

Bash

yarn install
Skrip yang Tersedia
Dalam direktori proyek, Anda dapat menjalankan beberapa skrip yang telah ditentukan:

npm run dev: Menjalankan aplikasi dalam mode pengembangan. Buka http://localhost:5173 untuk melihatnya di browser.
npm run build: Mem-build aplikasi untuk produksi ke dalam folder dist.
npm run lint: Menganalisis kode untuk menemukan potensi error.
npm run preview: Menjalankan server lokal untuk melihat hasil build produksi.
Struktur Proyek
Struktur file dan folder utama dalam direktori src diatur sebagai berikut untuk menjaga keterbacaan dan skalabilitas:

/src
├── assets/             # Gambar statis
├── components/         # Komponen UI yang dapat digunakan kembali
│   ├── birdpedia/      # Komponen khusus untuk Birdpedia
│   ├── common/         # Komponen umum (Button, Spinner)
│   └── layout/         # Komponen tata letak (Navbar, Footer)
├── config/             # Konfigurasi aplikasi (Axios)
├── data/               # Data statis atau mock
├── hooks/              # Custom Hooks (useAuth, dll.)
├── pages/              # Komponen halaman utama untuk setiap rute
├── services/           # Logika bisnis dan interaksi API
├── store/              # State management (Zustand)
├── utils/              # Fungsi utilitas dan konstanta
├── App.jsx             # Komponen root dan definisi rute
├── index.css           # CSS global & Tailwind
└── main.jsx            # Titik masuk utama aplikasi React
Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT.

&lt;a href="https://opensource.org/licenses/MIT">
&lt;img src="[tautan mencurigakan telah dihapus]" alt="License: MIT">
&lt;/a>

&lt;p align="right">(&lt;a href="https://www.google.com/search?q=%23readme-top">kembali ke atas&lt;/a>)&lt;/p>
