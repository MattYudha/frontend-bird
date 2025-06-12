import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import birdVM from '../assets/pexelsBird2.jpg';
import backgroundImage from '../assets/pexelsBird.jpg';
import peopleImage from '../assets/pexelscontoh.jpg';

const teamMembers = [
  { name: "Orchitiadi", role: "Machine Learning", img: peopleImage, large: true }, 
  { name: "Stefany", role: "Front-End Developer", img: peopleImage },
  { name: "Rahmat", role: "Front-End Developer", img: peopleImage, large: true },
  { name: "Aria", role: "Machine Learning", img: peopleImage },
  { name: "Defnanaya", role: "Back-End Developer", img: peopleImage},
  { name: "Dimas", role: "Machine Learning", img: peopleImage }
];

const TeamMemberCard = ({ name, role, img, large }) => (
  <div className={`flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${large ? "row-span-2" : ""}`}>
    <img src={img} alt={name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-green-100" />
    <h3 className="text-lg font-montserrat font-semibold text-green-700 mb-1">{name}</h3>
    <p className="text-sm font-montserrat text-green-600 mb-3">{role}</p>
    <div className="flex space-x-2">
      <a href="#" className="text-green-500 hover:text-green-700 transition-colors">
        <FiGithub className="w-4 h-4" />
      </a>
      <a href="#" className="text-green-500 hover:text-green-700 transition-colors">
        <FiLinkedin className="w-4 h-4" />
      </a>
      <a href="#" className="text-green-500 hover:text-green-700 transition-colors">
        <FiMail className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-64 md:h-96 flex items-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white font-montserrat text-4xl md:text-6xl font-bold">
            Tentang Kicau Finder
          </h1>
          <p className="text-green-100 text-xl mt-4 max-w-2xl">
            Menghubungkan Anda dengan dunia burung melalui teknologi AI yang canggih
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Team Introduction */}
          <section className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-6 leading-tight text-green-600">
              Meet the team<br />behind the chirps!
            </h2>
            <p className="text-gray-700 font-montserrat max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
              Tim kami terdiri dari individu-individu yang bersemangat dalam pengembangan teknologi.
              Bersama-sama, kami membangun Kicau Finder untuk membantu siapa saja mengenali burung melalui suara kicauannya.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300"
            >
              <FiMail className="w-5 h-5 mr-2" />
              Hubungi Tim Kami
            </Link>
          </section>

          {/* Team Members Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} {...member} />
              ))}
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-12">
              {/* Vision */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4 text-green-600 flex items-center">
                  <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    👁️
                  </span>
                  Visi
                </h2>
                <p className="text-gray-700 font-montserrat text-lg leading-relaxed">
                  Menjadi platform terdepan untuk edukasi dan identifikasi burung, menghubungkan orang-orang 
                  dari seluruh dunia dengan kekayaan suara alam melalui teknologi yang cerdas, akurat, dan mudah diakses.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-green-600 flex items-center">
                  <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    🎯
                  </span>
                  Misi
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      1
                    </span>
                    <p className="text-gray-700 font-montserrat text-lg leading-relaxed">
                      Menyajikan teknologi berbasis Machine Learning untuk mengidentifikasi suara burung secara akurat, 
                      menjembatani pembelajaran dan sains.
                    </p> 
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      2
                    </span>
                    <p className="text-gray-700 font-montserrat text-lg leading-relaxed">
                      Mendorong kecintaan terhadap alam dan konservasi burung melalui pemahaman yang lebih baik 
                      tentang suara dan spesies mereka.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      3
                    </span>
                    <p className="text-gray-700 font-montserrat text-lg leading-relaxed">
                      Membangun komunitas pecinta burung yang dapat berbagi pengetahuan dan pengalaman 
                      dalam mengamati kehidupan burung.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <img 
                  src={birdVM} 
                  alt="Bird Vision" 
                  className="rounded-2xl shadow-lg w-full h-auto transform hover:scale-105 transition-transform duration-300" 
                />
                <div className="mt-6 bg-green-50 rounded-xl p-6">
                  <h3 className="font-bold text-green-700 mb-2">Teknologi AI Terdepan</h3>
                  <p className="text-green-600 text-sm">
                    Menggunakan deep learning dan neural networks untuk analisis spektrogram audio 
                    dengan akurasi tinggi dalam identifikasi spesies burung.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Contact */}
      <footer className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-montserrat font-semibold mb-4">Hubungi Kami</h2>
          <p className="font-montserrat text-green-100 mb-6 max-w-2xl mx-auto">
            Kami senang mendengar dari Anda. Untuk pertanyaan, masukan, atau dukungan,
            silakan hubungi kami melalui email.
          </p>
          <a 
            href="mailto:support@kicaufinder.com" 
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FiMail className="w-5 h-5 mr-2" />
            support@kicaufinder.com
          </a>
        </div>
      </footer>
    </div>    
  );
};

export default AboutPage;