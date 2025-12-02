import { useState } from "react";
import { crearCliente } from "../services/CrearCuentaService";

export default function FormCrearCuenta() {
  // Estado del formulario
  const [form, setForm] = useState({
    rut: "",
    nombreApellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    contraseña: "",
  });

  // Mensajes de error y éxito
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Actualiza el estado del formulario cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validación de campos obligatorios
    if (!form.rut || !form.nombreApellido || !form.correo || !form.contraseña) {
      setError("Debes completar todos los campos obligatorios.");
      return;
    }

    try {
      // Llamada al servicio para crear cliente
      await crearCliente({
        codUsuario: form.rut, // Se usa RUT como código de usuario
        nombreApellido: form.nombreApellido,
        direccion: form.direccion,
        telefono: form.telefono,
        correo: form.correo,
        contraseña: form.contraseña,
      });

      setSuccess("Cuenta creada correctamente.");
      // Reiniciar formulario
      setForm({
        rut: "",
        nombreApellido: "",
        direccion: "",
        telefono: "",
        correo: "",
        contraseña: "",
      });
    } catch (err: any) {
      // Manejo de error: RUT duplicado
      if (err.response?.status === 409) {
        setError("El RUT ya existe.");
      } else {
        setError("Ocurrió un error al crear la cuenta. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Cuenta</h2>

      {/* Mensajes de error o éxito */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">RUT*</label>
          <input
            type="text"
            name="rut"
            className="form-control"
            value={form.rut}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre y Apellido*</label>
          <input
            type="text"
            name="nombreApellido"
            className="form-control"
            value={form.nombreApellido}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo*</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            value={form.correo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña*</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            value={form.contraseña}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}
