import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './UserForm.css';

const UserRegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    emailAdm: '',
    nombre: '',
    apellido: '',
    password: '',
    celular: '',
    rol: 'alumni',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos básicos
    if (!formData.emailAdm || !formData.nombre || !formData.password || !formData.celular) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, rellena todos los campos obligatorios.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simular envío de datos a la API
      await onRegister(formData);

      // Resetear formulario
      setFormData({
        emailAdm: '',
        nombre: '',
        apellido: '',
        password: '',
        celular: '',
        rol: 'alumni',
      });

      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'El registro fue exitoso.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el usuario. Intenta de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-group">
        <label htmlFor="emailAdm">Correo Electrónico</label>
        <input
          type="email"
          id="emailAdm"
          name="emailAdm"
          value={formData.emailAdm}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="celular">Celular</label>
        <input
          type="tel"
          id="celular"
          name="celular"
          value={formData.celular}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleInputChange}
        >
          <option value="alumni">Alumni</option>
          <option value="admin">Administrador</option>
          <option value="docente">Docente</option>
        </select>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
      </button>
    </form>
  );
};

export default UserRegistrationForm;
