import { useState } from "react";
import { crearCliente } from "../services/CrearCuentaService";

export default function FormCrearCuenta() {
  const [form, setForm] = useState({
    rut: "",
    nombreApellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    contraseña: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    
    if (!form.rut || !form.nombreApellido || !form.correo || !form.contraseña) {
      setError("Debes completar todos los campos obligatorios.");
      return;
    }

    try {
      await crearCliente({
        codUsuario: form.rut, 
        nombreApellido: form.nombreApellido,
        direccion: form.direccion,
        telefono: form.telefono,
        correo: form.correo,
        contraseña: form.contraseña,
      });
      setSuccess("Cuenta creada correctamente.");
      setForm({
        rut: "",
        nombreApellido: "",
        direccion: "",
        telefono: "",
        correo: "",
        contraseña: "",
      });
    } catch (err: any) {
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

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

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
