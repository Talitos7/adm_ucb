import React, { useState } from 'react';
import './ChatAssistant.css'; // Archivo CSS para estilizar el chat
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import stringSimilarity from 'string-similarity';  // Importar la librería

const knowledgeBase = [
    {
        question: "¿Qué información puedo ver en la página de invitado?",
        answer: "En la página de invitado puedes ver información sobre la historia de la carrera, los docentes, los beneficios de la carrera y las redes sociales."
    },
    {
        question: "¿Quiénes pueden realizar publicaciones?",
        answer: "Pueden realizar publicaciones los estudiantes de intercambio, los estudiantes de la sociedad científica, los estudiantes del centro de estudiantes, los graduados y el administrador."
    },
    {
        question: "¿Qué publicaciones puede hacer el administrador?",
        answer: "El administrador puede realizar publicaciones de empresas aliadas, información sobre pasantías, eventos, y gestionar las publicaciones de los demás roles."
    },
    {
        question: "¿Qué funciones tiene el administrador?",
        answer: "El administrador puede agregar nuevos usuarios, aceptar o rechazar solicitudes de publicaciones, y publicar información de empresas aliadas, pasantías, y eventos."
    },
    {
        question: "¿Qué roles existen en la página?",
        answer: "Los roles en la página son: administrador, estudiante regular, estudiante de intercambio, estudiante de la sociedad científica, estudiante del centro de estudiantes y graduado."
    },
    {
        question: "¿Quiénes pueden enviar solicitudes de publicación?",
        answer: "Los estudiantes graduados, los estudiantes de intercambio y los estudiantes de la sociedad científica pueden enviar solicitudes de publicación."
    }
];

// Poder procesar preguntas similares
const getAnswer = (userInput) => {
    const questions = knowledgeBase.map(item => item.question);  // Poder extraer solo las preguntas :)
    const similarities = stringSimilarity.findBestMatch(userInput.toLowerCase(), questions.map(q => q.toLowerCase()));  // Encontrar la mejor coincidencia

    // Si la similitud es suficientemente alta (por ejemplo, mayor al 0.5)
    if (similarities.bestMatch.rating > 0.5) {
        const bestMatchIndex = similarities.bestMatchIndex;
        return knowledgeBase[bestMatchIndex].answer;
    } else {
        return "Lo siento, no tengo esa información en este momento. Por favor, consulta al administrador.";
    }
};

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Buscar la respuesta más similar de la base de conocimientos
            const response = getAnswer(input);
            // Agregar la respuesta del asistente
            setTimeout(() => {
                setMessages((prev) => [...prev, { text: response, sender: 'assistant' }]);
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
