import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { actualizarProducto, getProductoPorCodigo } from "../../services/EditarProductos";

// Componente para editar un producto existente
export default function FormularioEditarProducto() {
  const { codProducto } = useParams(); // Obtengo el código del producto desde la URL
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estado que contiene los datos del producto
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precioUnitario: 0,
    stock: 0,
    imagen: "",
    cod_categoria: "",
  });

  // Estado para manejar errores de validación por campo
  const [errores, setErrores] = useState({
    nombre: "",
    imagen: "",
    precioUnitario: "",
    stock: "",
  });

  // useEffect para cargar los datos del producto cuando el componente se monta
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductoPorCodigo(codProducto!); // Llamo al servicio para obtener el producto
        setProducto({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          precioUnitario: data.precio_unitario || 0,
          stock: data.stock || "",
          imagen: data.imagen || "",
          cod_categoria: data.cod_categoria || 0,
        });
      } catch (error) {
        console.error(" Error al cargar producto:", error);
      }
    };
    cargarProducto();
  }, [codProducto]);

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]:  name === "stock" || name === "precioUnitario" ? Number(value) : value, // Convierte a número los campos numéricos
    });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Inicializo errores vacíos
    const nuevosErrores = {
      nombre: "",
      imagen: "",
      precioUnitario: "",
      stock: "",
    };

    let esValido = true;

    // Validaciones de los campos
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
      esValido = false;
    }

    if (!producto.imagen.match(/\.(png|jpg)$/i)) {
      nuevosErrores.imagen = "La imagen debe terminar en .png o .jpg.";
      esValido = false;
    }

    if (producto.precioUnitario < 0) {
      nuevosErrores.precioUnitario = "El precio no puede ser negativo.";
      esValido = false;
    }

    if (producto.stock < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo.";
      esValido = false;
    }

    setErrores(nuevosErrores); // Actualizo estado de errores

    if (!esValido) return; // Si hay errores, no continuar

    try {
      await actualizarProducto(codProducto!, producto); // Llamo al servicio para actualizar el producto
      console.log(" Producto actualizado");
      navigate("/admin/productos"); // Redirijo a la lista de productos
    } catch (error) {
      console.error(" Error al actualizar producto:", error);
    }
  };

  // Renderizado del formulario
  return (
    <div className="container py-5">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <input
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="form-control mb-2"
        />
        {errores.nombre && <div className="text-danger">{errores.nombre}</div>}

        {/* Descripción */}
        <input
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="form-control mb-2"
        />

        {/* Precio Unitario */}
        <input
          name="precioUnitario"
          type="number"
          min="0"
          step="0.01"
          value={producto.precioUnitario}
          onChange={handleChange}
          placeholder="Precio Unitario"
          className="form-control mb-2"
        />
        {errores.precioUnitario && <div className="text-danger">{errores.precioUnitario}</div>}

        {/* Stock */}
        <input
          name="stock"
          type="number"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="form-control mb-2"
        />
        {errores.stock && <div className="text-danger">{errores.stock}</div>}

        {/* Imagen */}
        <input
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          placeholder="URL de Imagen"
          className="form-control mb-2"
        />
        {errores.imagen && <div className="text-danger">{errores.imagen}</div>}

        {/* Botones */}
        <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate("/admin/productos")}>Volver</button>
      </form>
    </div>
  );
}
