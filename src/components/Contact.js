import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  // ✅ TUS CONFIGURACIONES (no cambiar)
  const SERVICE_ID = 'service_phbs8n8';
  const TEMPLATE_ID = 'template_0inozq9';
  const PUBLIC_KEY = 'XZqftBY_dgjMUZt7b';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [lastSubmit, setLastSubmit] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor espera 30 segundos antes de enviar otro mensaje'
      });
      return;
    }

    // Validaciones
    if (!formData.user_name.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor ingresa tu nombre'
      });
      return;
    }

    if (!formData.user_email.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor ingresa tu email'
      });
      return;
    }

    if (!validateEmail(formData.user_email)) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor ingresa un email válido'
      });
      return;
    }

    if (!formData.message.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor escribe tu mensaje'
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'El mensaje debe tener al menos 10 caracteres'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      // ✅ AGREGAR TIMESTAMP automáticamente
      const formElement = form.current;
      const timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = 'current_time';
      timeInput.value = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Tucuman',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      formElement.appendChild(timeInput);

      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formElement,
        {
          publicKey: PUBLIC_KEY,
        }
      );

      console.log('✅ Email enviado exitosamente:', result.text);
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: '¡Mensaje enviado exitosamente! Te responderé dentro de 24 horas.'
      });
      
      // Limpiar formulario
      setFormData({ 
        user_name: '', 
        user_email: '', 
        message: '' 
      });
      
      setLastSubmit(now);
      
      // Remover el input temporal
      formElement.removeChild(timeInput);
      
    } catch (error) {
      console.error('❌ Error al enviar email:', error);
      
      let errorMessage = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
      
      if (error.text) {
        if (error.text.includes('Invalid')) {
          errorMessage = 'Configuración de EmailJS inválida. Contacta al administrador.';
        } else if (error.text.includes('Limit')) {
          errorMessage = 'Se ha alcanzado el límite de envíos. Intenta más tarde.';
        }
      }
      
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage
      });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">¿Trabajamos Juntos?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estoy disponible para nuevos proyectos y oportunidades. ¡Hablemos!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-6"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Información de Contacto */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Email</p>
                    <a 
                      href="mailto:pattimauro48@gmail.com" 
                      className="text-white hover:text-blue-400 transition-colors duration-300 text-lg"
                    >
                      pattimauro48@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Teléfono</p>
                    <a 
                      href="tel:+5493815904990" 
                      className="text-white hover:text-green-400 transition-colors duration-300 text-lg"
                    >
                      +54 9 381 590-4990
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Ubicación</p>
                    <p className="text-white text-lg">Tucumán, Argentina</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                <h4 className="text-white font-semibold mb-2">💡 Tiempo de respuesta</h4>
                <p className="text-gray-300 text-sm">
                  Respondo todos los mensajes dentro de 24 horas durante días hábiles.
                </p>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                Envíame un Mensaje
              </h3>
              
              {/* Mensaje de Estado */}
              {(status.success || status.error) && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
                  status.success 
                    ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border-red-500/30 text-red-300'
                }`}>
                  {status.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <p className="text-sm">{status.message}</p>
                </div>
              )}

              {/* ✅ FORMULARIO CON NOMBRES CORRECTOS */}
              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    name="user_name"
                    placeholder="Tu nombre completo *" 
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    disabled={status.loading}
                    required
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    name="user_email"
                    placeholder="tu@email.com *" 
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    disabled={status.loading}
                    required
                  />
                </div>
                
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <textarea 
                    name="message"
                    rows="5" 
                    placeholder="Cuéntame sobre tu proyecto o consulta... *" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                    disabled={status.loading}
                    required
                    minLength="10"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {formData.message.length}/500
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={status.loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-4 flex items-center justify-between text-xs">
                <p className="text-gray-400">
                  * Campos obligatorios
                </p>
                <p className="text-gray-500">
                  Powered by EmailJS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección adicional */}
        
      </div>
    </section>
  );
}

export default Contact;
