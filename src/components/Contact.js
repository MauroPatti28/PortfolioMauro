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

  // Variables de entorno
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    // Limitar mensaje a 500 caracteres
    if (e.target.name === 'message' && e.target.value.length > 500) return;

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

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Configuración de EmailJS incompleta. Contacta al administrador.'
      });
      return;
    }
    
    // Rate limiting 30 segundos
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
      // Agregar input oculto con timestamp
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
        PUBLIC_KEY
      );

      console.log('✅ Email enviado exitosamente:', result.text);
      
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: '¡Mensaje enviado exitosamente! Te responderé dentro de 24 horas.'
      });
      
      setFormData({ user_name: '', user_email: '', message: '' });
      setLastSubmit(now);
      
      // Eliminar input temporal
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
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-6 text-white">
              <div className="flex flex-col">
                <label htmlFor="user_name" className="mb-2 font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" /> Nombre
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  className="rounded-md bg-gray-800 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="user_email" className="mb-2 font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                  className="rounded-md bg-gray-800 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-2 font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  maxLength={500}
                  required
                  className="resize-none rounded-md bg-gray-800 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <small className="text-gray-400 text-right">{formData.message.length} / 500</small>
              </div>

              {status.error && (
                <div className="text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p>{status.message}</p>
                </div>
              )}

              {status.success && (
                <div className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <p>{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-md hover:brightness-110 transition"
              >
                {status.loading ? 'Enviando...' : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
