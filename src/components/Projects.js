
import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';


function Projects() {
  const [projects] = useState([
    {
      id: 1,
      title: "aplicacion web para un Bar",
      description: "API REST completa para una plataforma de comercio electrónico con autenticación JWT, pagos y gestión de inventario.",
      tech: ["Node.js", "Express", "MongoDB", "Multer","Jwt","bcrypt"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      github: "https://github.com/MauroPatti28/tpfinal.git",
      demo: "https://ecommerce-api-demo.herokuapp.com"
    },
    {
      id: 2,
      title: "aplicacion web Ecomerce",
      description: "Aplicación de chat con WebSockets, salas privadas y notificaciones push usando Socket.io.",
      tech: ["Node.js", "Jwt", "MongoDB","Webhook","Stripe","Express","multer","bcrypt"],
  image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=500&h=300&fit=crop", // nueva imagen e-commerce
      github: "https://github.com/mauro/realtime-chat",
      demo: "https://chat-app-demo.netlify.app"
    },
    {
      id: 3,
      title: "aplicacion Web Para gimnasio",
      description: "Panel de control para visualización de datos con gráficos interactivos y reportes personalizables.",
      tech: ["Node.js", "Express", "MongoDB", "Chart.js"],
  image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=300&fit=crop", // imagen de gimnasio
      github: "https://github.com/mauro/analytics-dashboard",
      demo: "https://analytics-dashboard-demo.vercel.app"
    },
    {
      id: 4,
      title: "Chat con ia",
      description: "Panel de control para visualización de datos con gráficos interactivos y reportes personalizables.",
      tech: ["Node.js", "webSocket.io", "grok", "Chart.js"],
  image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=300&fit=crop", // imagen de gimnasio
      github: "https://github.com/MauroPatti28/chat.git",
      demo: "https://chat-delta-roan.vercel.app/"
    }
  ]);

  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mis Proyectos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades y experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    <Github size={16} />
                    Código
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects