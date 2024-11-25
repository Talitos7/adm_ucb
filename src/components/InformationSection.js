import React from 'react';

const InformationSection = ({ title, description, imageUrl, darkMode }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '20px auto',
        color: darkMode ? '#f1f1f1' : '#333',
      }}
    >
      {/* Sección de texto */}
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: darkMode ? '#f1f1f1' : '#333',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            textAlign: 'justify',
            color: darkMode ? '#cccccc' : '#555',
          }}
        >
          {description}
        </p>
      </div>

      {/* Imagen */}
      <div style={{ flexShrink: 0 }}>
        <img
          src={imageUrl}
          alt={title}
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
            borderRadius: '8px',
            objectFit: 'contain',
            boxShadow: darkMode
              ? '0 4px 8px rgba(255, 255, 255, 0.2)'
              : '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    </div>
  );
};

export default InformationSection;
