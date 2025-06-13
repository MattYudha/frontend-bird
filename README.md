<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Kicau Finder</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --brand-sage: #5B8266;
            --brand-forest: #1E403C;
            --brand-lime-accent: #A3E635;
            --ui-bg: #F8F9FA;
            --ui-surface: #FFFFFF;
            --ui-border: #E5E7EB;
            --text-primary: #1F2937;
            --text-secondary: #6B7281;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --shadow-color-hover: rgba(0, 0, 0, 0.2);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(163, 230, 53, 0.3); }
            50% { box-shadow: 0 0 40px rgba(163, 230, 53, 0.6); }
        }

        body {
            font-family: 'Roboto', sans-serif;
            background-color: var(--ui-bg);
            color: var(--text-primary);
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        .header {
            text-align: center;
            padding: 4rem 1rem;
            background: linear-gradient(135deg, var(--brand-forest), var(--brand-sage));
            color: white;
            border-bottom-left-radius: 2rem;
            border-bottom-right-radius: 2rem;
            animation: fadeIn 1s ease-out;
        }

        .header h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 3.5rem;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .header h1 .icon {
            font-size: 3rem;
            vertical-align: middle;
        }

        .header p {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 1rem auto 2rem;
            opacity: 0.9;
        }

        .badges {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            transition: transform 0.2s;
        }
        .badge:hover {
            transform: translateY(-2px);
        }
        .badge-license { background-color: #007ec6; color: white; }
        .badge-version { background-color: #6c757d; color: white; }
        .badge-tech { background-color: var(--brand-sage); color: white; }

        .section {
            padding: 3rem 0;
            animation: fadeIn 1s ease-out forwards;
            opacity: 0; /* Mulai transparan */
        }
        
        .section-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 2.5rem;
            color: var(--brand-forest);
            position: relative;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 80px;
            height: 4px;
            background-color: var(--brand-lime-accent);
            margin: 0.5rem auto 0;
            border-radius: 2px;
        }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .card {
            background: var(--ui-surface);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            transition: transform 0.3s, box-shadow 0.3s;
            text-align: center;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px var(--shadow-color-hover);
        }

        .card .icon {
            font-size: 2.5rem;
            color: var(--brand-sage);
            margin-bottom: 1rem;
        }

        .card h3 {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }

        .preview-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .preview-grid img {
            width: 100%;
            border-radius: 1rem;
            box-shadow: 0 10px 20px var(--shadow-color);
            transition: transform 0.3s ease-in-out;
        }
        
        .preview-grid img:hover {
            transform: scale(1.03);
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1.5rem;
            text-align: center;
        }

        .tech-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transition: transform 0.2s;
        }

        .tech-item:hover {
            transform: scale(1.1);
        }

        .tech-item img {
            width: 48px;
            height: 48px;
        }

        .code-block {
            background-color: var(--text-primary);
            color: #f8f8f2;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            margin: 1rem 0;
        }
        
        .structure {
            background: var(--ui-surface);
            padding: 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--ui-border);
            font-family: 'Courier New', Courier, monospace;
        }
        
        .license-box {
            background: var(--ui-surface);
            border: 1px solid var(--ui-border);
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
        }
        
        .license-box h3 {
            margin-top: 0;
            font-family: 'Montserrat', sans-serif;
        }
        
        .license-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 2.5rem; }
            .preview-grid { grid-template-columns: 1fr; }
            .section-title { font-size: 2rem; }
        }
        
        /* Animasi Observer */
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
    </style>
</head>
<body>

    <header class="header">
        <h1><i class="fas fa-feather-alt icon"></i> Kicau Finder</h1>
        <p>Mengidentifikasi Dunia Melalui Suara Kicauan Burung</p>
        <div class="badges">
            <span class="badge badge-license">Lisensi MIT</span>
            <span class="badge badge-version">Versi 0.0.0</span>
            <span class="badge badge-tech">React & Vite</span>
        </div>
    </header>

    <div class="container">
        <section id="features" class="section fade-in-section">
            <h2 class="section-title">Fitur Utama</h2>
            <div class="card-grid">
                <div class="card">
                    <i class="fas fa-microphone-alt icon"></i>
                    <h3>Identifikasi AI</h3>
                    <p>Kenali spesies burung dari rekaman suara atau file audio menggunakan teknologi AI canggih.</p>
                </div>
                <div class="card">
                    <i class="fas fa-book-open icon"></i>
                    <h3>Birdpedia</h3>
                    <p>Ensiklopedia lengkap dengan informasi detail, gambar, dan fakta menarik tentang ratusan spesies burung.</p>
                </div>
                <div class="card">
                    <i class="fas fa-history icon"></i>
                    <h3>Riwayat Pribadi</h3>
                    <p>Simpan semua hasil identifikasi Anda dalam riwayat pribadi untuk melacak penemuan Anda.</p>
                </div>
                <div class="card">
                    <i class="fas fa-mobile-alt icon"></i>
                    <h3>Desain Responsif</h3>
                    <p>Nikmati pengalaman yang mulus dan konsisten di semua perangkat, baik desktop maupun mobile.</p>
                </div>
            </div>
        </section>

        <section id="preview" class="section fade-in-section">
            <h2 class="section-title">Pratinjau Aplikasi</h2>
            <div class="preview-grid">
                <img src="https://i.imgur.com/r6E82u6.png" alt="Halaman Utama Kicau Finder">
                <img src="https://i.imgur.com/0IeHw8E.png" alt="Halaman Birdpedia">
                <img src="https://i.imgur.com/vHqB3pG.png" alt="Halaman Hasil Identifikasi">
                <img src="https://i.imgur.com/w2YcQdZ.png" alt="Halaman Detail Burung">
            </div>
        </section>

        <section id="tech-stack" class="section fade-in-section">
            <h2 class="section-title">Teknologi yang Digunakan</h2>
            <div class="tech-grid">
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React">React</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/vite.png" alt="Vite">Vite</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/tailwind_css.png" alt="Tailwind CSS">Tailwind CSS</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/zustand.png" alt="Zustand" style="border-radius: 50%;">Zustand</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/react-router.png" alt="React Router">React Router</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/framer.png" alt="Framer Motion">Framer Motion</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/react-query.png" alt="React Query">React Query</div>
                <div class="tech-item"><img src="https://img.icons8.com/color/48/000000/axios.png" alt="Axios">Axios</div>
            </div>
        </section>

        <section id="getting-started" class="section fade-in-section">
            <h2 class="section-title">Panduan Memulai</h2>
            <h3>Prasyarat</h3>
            <p>Pastikan Anda telah menginstal Node.js (versi 18.x atau lebih tinggi) dan npm/yarn.</p>
            <h3>Instalasi</h3>
            <ol>
                <li>
                    <strong>Clone repositori:</strong>
                    <div class="code-block">git clone https://github.com/TianurR/dbs-capstone.git</div>
                </li>
                <li>
                    <strong>Masuk ke direktori proyek:</strong>
                    <div class="code-block">cd dbs-capstone/frontend-fix</div>
                </li>
                <li>
                    <strong>Instal semua dependensi:</strong>
                    <div class="code-block">npm install</div>
                </li>
            </ol>
        </section>

        <section id="scripts" class="section fade-in-section">
            <h2 class="section-title">Skrip yang Tersedia</h2>
            <ul>
                <li><strong><code>npm run dev</code></strong>: Menjalankan aplikasi dalam mode pengembangan.</li>
                <li><strong><code>npm run build</code></strong>: Mem-build aplikasi untuk lingkungan produksi.</li>
                <li><strong><code>npm run lint</code></strong>: Menganalisis kode untuk menemukan potensi error dan masalah gaya penulisan.</li>
                <li><strong><code>npm run preview</code></strong>: Menjalankan server lokal untuk melihat hasil build produksi.</li>
            </ul>
        </section>

        <section id="structure" class="section fade-in-section">
            <h2 class="section-title">Struktur Proyek</h2>
            <div class="structure">
                <pre>
/src
├── assets/
├── components/
│   ├── birdpedia/
│   ├── common/
│   └── layout/
├── config/
├── data/
├── hooks/
├── pages/
├── services/
├── store/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
                </pre>
            </div>
        </section>

        <section id="license" class="section fade-in-section">
            <h2 class="section-title">Lisensi</h2>
            <div class="license-box">
                <svg class="license-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--brand-sage)">
                    <path d="M10,21.236,6.764,14.764,1.236,13,4.472,6.528,10,2,15.528,6.528,18.764,13,13.236,14.764Z" stroke="var(--brand-forest)" stroke-width="1.5"/>
                    <path d="M10,12a2,2,0,1,1,2-2A2,2,0,0,1,10,12Zm0-2.5A.5.5,0,1,0,10.5,9,.5.5,0,0,0,10,9.5Z" stroke="var(--brand-forest)" stroke-width="1"/>
                </svg>
                <h3>MIT License</h3>
                <p>Proyek ini dilisensikan di bawah Lisensi MIT. Anda bebas untuk menggunakan, memodifikasi, dan mendistribusikan kode ini.</p>
                <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">Baca detail lisensi</a>
            </div>
        </section>

    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('.fade-in-section');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            sections.forEach(section => {
                observer.observe(section);
            });
        });
    </script>

</body>
</html>
