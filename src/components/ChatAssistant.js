import React, { useState } from 'react';
import './ChatAssistant.css'; // Archivo CSS para estilizar el chat
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            setTimeout(() => {
                setMessages((prev) => [...prev, { text: 'Estoy aquí para ayudarte!', sender: 'assistant' }]);
            }, 1000);
        }
    };

    return (
        <div className="chat-assistant-container">
            {/* Botón de ícono para abrir/cerrar el chat */}
            <button className="chat-icon" onClick={toggleChat}>
                <FontAwesomeIcon icon={faRobot} />
            </button>
            {isOpen && (
                <div className="chat-assistant">
                    <div className="chat-header" onClick={toggleChat}>
                        Hola, soy tu asistente
                    </div>
                    <div className="chat-body">
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe un mensaje..."
                            />
                            <button onClick={handleSendMessage}>Enviar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
