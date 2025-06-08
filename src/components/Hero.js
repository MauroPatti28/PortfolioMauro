import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    'Desarrollador Backend',
    'Especialista en Node.js',
    'Experto en MongoDB',
    'Arquitecto de APIs'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con más azul */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-gray-900"></div>

      {/* Formas animadas con tonos azules */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">M</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Mauro</span>
          <span className="wave inline-block ml-4">👋</span>
        </h1>

        <div className="h-8 mb-8">
          <p className="text-xl md:text-2xl text-blue-200 font-medium">
            {texts[currentText]}
          </p>
        </div>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Apasionado por crear soluciones backend robustas y escalables. 
          Especializado en tecnologías modernas como Node.js y MongoDB.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-full hover:from-blue-800 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Proyectos
          </button>
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-blue-300 text-blue-200 font-semibold rounded-full hover:bg-blue-100 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
          >
            Contactar
          </button>
        </div>

        {/* Botón funcional con el ChevronDown */}
        <button 
          onClick={scrollToProjects} 
          aria-label="Bajar a proyectos"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <ChevronDown className="text-blue-200 w-8 h-8" />
        </button>
      </div>
    </section>
  );
}

export default Hero;
