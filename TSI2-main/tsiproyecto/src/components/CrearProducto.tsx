import { useState } from "react";
import { crearProducto } from "../services/CrearProducto";

const CrearProducto = () => {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioUnitario: 0,
    stock: 0,
    imagen: "",
    codCategoria: "",
  });

  // Mensaje de éxito o error
  const [mensaje, setMensaje] = useState("");

  // Errores por campo
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  // Maneja cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  // Validación personalizada
  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.codCategoria.trim()) nuevosErrores.codCategoria = "El código de categoría es obligatorio";
    if (form.precioUnitario < 0) nuevosErrores.precioUnitario = "El precio no puede ser negativo";
    if (form.stock < 0) nuevosErrores.stock = "El stock no puede ser negativo";

    return nuevosErrores;
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMensaje("❌ Corrige los errores antes de continuar");
      return;
    }

    try {
      const resultado = await crearProducto(form);
      setMensaje("✅ Producto creado correctamente");
      console.log("Producto creado:", resultado);

      // Reinicia el formulario
      setForm({
        nombre: "",
        descripcion: "",
        precioUnitario: 0,
        stock: 0,
        imagen: "",
        codCategoria: "",
      });
      setErrores({});
    } catch (error: any) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Crear Producto</h2>

      <form onSubmit={handleSubmit} className="p-4 rounded bg-light border shadow-sm">
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <hr />

        {/* Precio Unitario */}
        <div className="mb-3">
          <label className="form-label">Precio Unitario</label>
          <input
            type="number"
            className={`form-control ${errores.precioUnitario ? "is-invalid" : ""}`}
            name="precioUnitario"
            value={form.precioUnitario}
            onChange={handleChange}
          />
          {errores.precioUnitario && <div className="invalid-feedback">{errores.precioUnitario}</div>}
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className={`form-control ${errores.stock ? "is-invalid" : ""}`}
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
          {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
        </div>

        <hr />

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">Imagen (nombre de archivo)</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
          />
        </div>

        {/* Código de Categoría */}
        <div className="mb-3">
          <label className="form-label">Código de Categoría</label>
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
          {errores.codCategoria && (
            <div className="invalid-feedback">{errores.codCategoria}</div>
          )}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Crear Producto
        </button>
      </form>

      {/* Mensaje final */}
      {mensaje && (
        <div
          className={`alert mt-4 ${
            mensaje.startsWith("✅") ? "alert-success" : "alert-danger"
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default CrearProducto;