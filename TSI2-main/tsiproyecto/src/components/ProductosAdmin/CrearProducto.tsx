import { useState } from "react";
import { crearProducto } from "../../services/CrearProducto"; // Importo servicio para crear producto

// Componente principal para crear un nuevo producto
const CrearProducto = () => {
  // Estado que almacena los valores del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioUnitario: 0,
    stock: 0,
    imagen: "",
    codCategoria: "",
  });

  // Estado para mostrar mensajes al usuario (éxito o error)
  const [mensaje, setMensaje] = useState("");

  // Estado para guardar errores de validación por campo
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  // Función para actualizar los valores del formulario cuando el usuario escribe
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // Actualizo el estado del formulario
    setErrores({ ...errores, [name]: "" }); // Limpio el error del campo al modificarlo
  };

  // Función para validar el formulario antes de enviarlo
  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio"; // Validación nombre
    if (!form.codCategoria.trim()) nuevosErrores.codCategoria = "El código de categoría es obligatorio"; // Validación categoría
    if (form.precioUnitario < 0) nuevosErrores.precioUnitario = "El precio no puede ser negativo"; // Validación precio
    if (form.stock < 0) nuevosErrores.stock = "El stock no puede ser negativo"; // Validación stock
    return nuevosErrores;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario(); // Valido los campos
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores); // Muestro errores en los campos
      setMensaje("Corrige los errores antes de continuar"); // Mensaje general de error
      return;
    }

    try {
      const resultado = await crearProducto(form); // Llamo al servicio para crear el producto
      setMensaje("Producto creado correctamente"); // Mensaje de éxito
      setForm({
        nombre: "",
        descripcion: "",
        precioUnitario: 0,
        stock: 0,
        imagen: "",
        codCategoria: "",
      }); // Limpio el formulario
      setErrores({}); // Limpio errores
    } catch (error: any) {
      setMensaje(error.message || "Error al crear producto"); // Muestro mensaje de error si falla
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Crear Producto</h2>

      <form onSubmit={handleSubmit} className="p-4 rounded bg-light border shadow-sm">
        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre *</label>
          <input
            type="text"
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`} // Cambio clase si hay error
            name="nombre"
            value={form.nombre}
            onChange={handleChange} // Actualizo valor al escribir
            placeholder="Ej: AirPods Pro"
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>} {/* Mensaje de error */}
        </div>

        {/* Campo Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción *</label>
          <textarea
            className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: Auriculares inalámbricos con cancelación de ruido"
          />
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>

        <hr />

        {/* Campo Precio Unitario */}
        <div className="mb-3">
          <label className="form-label">Precio Unitario *</label>
          <input
            type="number"
            className={`form-control ${errores.precioUnitario ? "is-invalid" : ""}`}
            name="precioUnitario"
            value={form.precioUnitario}
            onChange={handleChange}
            placeholder="Ej: 199990"
          />
          {errores.precioUnitario && <div className="invalid-feedback">{errores.precioUnitario}</div>}
        </div>

        {/* Campo Stock */}
        <div className="mb-3">
          <label className="form-label">Stock *</label>
          <input
            type="number"
            className={`form-control ${errores.stock ? "is-invalid" : ""}`}
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 50"
          />
          {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
        </div>

        <hr />

        {/* Campo Imagen */}
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
            placeholder="Ej: airpods-pro.jpg"
          />
        </div>

        {/* Campo Código de Categoría */}
        <div className="mb-3">
          <label className="form-label">Código de Categoría *</label>
          <select
            className={`form-select ${errores.codCategoria ? "is-invalid" : ""}`}
            name="codCategoria"
            value={form.codCategoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="CAT01">CAT01 - Mac</option>
            <option value="CAT02">CAT02 - iPad</option>
            <option value="CAT03">CAT03 - iPhone</option>
            <option value="CAT04">CAT04 - Accesorios</option>
          </select>
          {errores.codCategoria && <div className="invalid-feedback">{errores.codCategoria}</div>}
        </div>

        {/* Botón Enviar */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Crear Producto
        </button>
      </form>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <div className={`alert mt-4 ${mensaje.includes("correctamente") ? "alert-success" : "alert-danger"}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default CrearProducto; // Exporto el componente
