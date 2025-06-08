
import { Github, Mail } from 'lucide-react';



function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">
              Mauro<span className="text-blue-500">.</span>
            </h3>
            <p className="text-gray-400 mt-1">Desarrollador Backend</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/mauro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a 
              href="mailto:mauro@example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mauro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer