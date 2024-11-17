import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import './Publications.css';

const PublicationsIntercambio = ({ darkMode }) => {
    const [publications, setPublications] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const loadApprovedPublications = async () => {
        try {
            const response = await axios.get('/src/servicios/MostrarPublicacionesAprobadas.php');
            console.log('Publicaciones aprobadas:', response.data);
            setPublications(response.data || []);
        } catch (error) {
            console.error('Error al cargar publicaciones aprobadas:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las publicaciones aprobadas.',
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        loadApprovedPublications();
    }, []);

    return (
        <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
            <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
                <h1>Publicaciones Aprobadas</h1>
                <button
                    className={`new-publication-btn ${darkMode ? 'dark-mode' : ''}`}
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? 'Cerrar Formulario' : 'Nueva Publicación'}
                </button>
            </header>

            {isFormVisible && (
                <PublicationForm darkMode={darkMode} onSubmit={loadApprovedPublications} />
            )}

            <div className="publications-grid">
                {publications.length > 0 ? (
                    publications.map((publication) => (
                        <PublicationCard
                            key={publication.idpublicacion}
                            publication={publication}
                        />
                    ))
                ) : (
                    <p>No hay publicaciones aprobadas disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default PublicationsIntercambio;
