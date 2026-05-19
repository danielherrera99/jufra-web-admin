/* src/components/FloatingChat.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './FloatingChat.css';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: '¡Paz y bien! Soy el Asistente Seráfico de JUFRA Pomalca. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!apiKey) throw new Error("API Key no configurada.");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const systemInstruction = `Eres el "Asistente Seráfico", un chatbot amigable integrado en la web de la Juventud Franciscana (JUFRA) de Pomalca, Perú. Nuestra sede es la Parroquia María del Perpetuo Socorro. Tu misión es ayudar a los visitantes a conocer la JUFRA, dar oraciones, explicar nuestras actividades (reuniones, apostolados) y reflejar el carisma franciscano con mucha alegría y paz. Siempre saluda con "Paz y bien". Sé conciso y amable.`;
      
      const prompt = `${systemInstruction}\n\nUsuario: ${userMessage}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error) {
      console.error("Error en Chat Flotante:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Lo siento, tuve un pequeño problema técnico. ¿Podrías intentar preguntarme de nuevo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-chat-container">
      {/* Botón Flotante de WhatsApp */}
      <a 
        href="https://wa.me/51900000000?text=¡Paz%20y%20bien!%20Me%20gustaría%20recibir%20información%20sobre%20la%20fraternidad." 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-bubble"
      >
        <span className="icon">
          <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </span>
      </a>

      {/* Burbuja Flotante Asistente */}
      <div className={`chat-bubble ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="icon">{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <div className="chat-badge"></div>}
      </div>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🕊️</div>
              <div className="chat-header-text">
                <h3>Asistente Seráfico</h3>
                <p><span className="online-dot"></span> En línea ahora</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="typing-indicator">El asistente está escribiendo...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Escribe tu mensaje..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button type="submit" className="send-btn" disabled={isLoading}>
              {isLoading ? '...' : '➤'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
