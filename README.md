🐦 Kicau Finder: Identifikasi Suara Burung dengan AI



Kicau Finder adalah aplikasi web modern dan responsif yang dirancang untuk mengidentifikasi spesies burung dari suara kicauannya. Dibangun dengan teknologi web terdepan, aplikasi ini menyediakan platform yang mulus dan interaktif bagi para penggemar burung, peneliti, dan siapa saja yang ingin tahu tentang simfoni alam di sekitar mereka.

Daftar Isi
Fitur Utama
Pratinjau Aplikasi
Teknologi yang Digunakan
Panduan Memulai
Prasyarat
Instalasi
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
&lt;td>&lt;img src="[tautan mencurigakan telah dihapus]" alt="Halaman Utama Kicau Finder">&lt;/td>
&lt;td>&lt;img src="[tautan mencurigakan telah dihapus]" alt="Birdpedia Kicau Finder">&lt;/td>
&lt;/tr>
&lt;tr>
&lt;td align="center">&lt;strong>Halaman Hasil&lt;/strong>&lt;/td>
&lt;td align="center">&lt;strong>Detail Burung&lt;/strong>&lt;/td>
&lt;/tr>
&lt;tr>
&lt;td>&lt;img src="[tautan mencurigakan telah dihapus]" alt="Halaman Hasil Kicau Finder">&lt;/td>
&lt;td>&lt;img src="[tautan mencurigakan telah dihapus]" alt="Detail Burung Kicau Finder">&lt;/td>
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

npm run dev: Menjalankan aplikasi dalam mode pengembangan. Buka http://localhost:5173 (atau port lain yang tersedia) untuk melihatnya di browser. Halaman akan dimuat ulang secara otomatis saat Anda membuat perubahan.

npm run build: Mem-build aplikasi untuk produksi ke dalam folder dist. Ini akan menggabungkan React dengan benar dalam mode produksi dan mengoptimalkan build untuk performa terbaik.

npm run lint: Menjalankan ESLint untuk memeriksa dan memperbaiki masalah gaya penulisan kode di dalam proyek.

npm run preview: Menjalankan server lokal untuk meninjau hasil build produksi dari folder dist.

Struktur Proyek
Struktur file dan folder utama dalam direktori src diatur sebagai berikut untuk menjaga keterbacaan dan skalabilitas:

/src
├── assets/             # Gambar statis dan aset lainnya
├── components/         # Komponen UI yang dapat digunakan kembali
│   ├── birdpedia/      # Komponen khusus untuk halaman Birdpedia
│   ├── common/         # Komponen umum seperti Button, Spinner, dsb.
│   └── layout/         # Komponen tata letak (Navbar, Footer)
├── config/             # Konfigurasi aplikasi (misal: Axios)
├── data/               # Data statis atau mock data
├── hooks/              # Custom Hooks (misal: useAuth, useAudioRecorder)
├── pages/              # Komponen halaman utama untuk setiap rute
├── services/           # Logika bisnis dan interaksi API
├── store/              # Konfigurasi state management (Zustand)
├── utils/              # Fungsi utilitas dan konstanta
├── App.jsx             # Komponen root aplikasi dan definisi rute
├── index.css           # File CSS global dan utilitas Tailwind
└── main.jsx            # Titik masuk utama aplikasi React
Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file LICENSE untuk informasi lebih lanjut.

MIT License

Copyright (c) 2024 Kicau Finder Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
