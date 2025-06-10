import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';


// Componente Contact con EmailJS funcional
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor completa todos los campos'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      await emailjs.send(
        'service_phbs8n8',
        'template_0inozq9',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'mauropatti59@gmail.com'
        },
        'XZqftBY_dgjMUZt7b'
      );
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: '¡Mensaje enviado exitosamente! Te responderé pronto.'
      });
      
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Error al enviar el mensaje. Por favor intenta de nuevo.'
      });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">¿Trabajamos Juntos?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estoy disponible para nuevos proyectos y oportunidades. ¡Hablemos!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información de Contacto */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <a href="mailto:mauro@example.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                      mauro@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Teléfono</p>
                    <p className="text-white">+54 9 381 590-4990</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Ubicación</p>
                    <p className="text-white">Tucumán, Argentina</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Envíame un Mensaje</h3>
              
              {/* Mensaje de Estado */}
              {(status.success || status.error) && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  status.success 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {status.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <p>{status.message}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Tu nombre *" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                    disabled={status.loading}
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Tu email *" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                    disabled={status.loading}
                  />
                </div>
                
                <div>
                  <textarea 
                    name="message"
                    rows="4" 
                    placeholder="Tu mensaje *" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 resize-none"
                    disabled={status.loading}
                  />
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={status.loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                * Campos obligatorios
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
