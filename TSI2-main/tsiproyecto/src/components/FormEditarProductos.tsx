import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductoPorCodigo, actualizarProducto } from "../services/EditarProductos";

export default function FormularioEditarProducto() {
  const { codProducto } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precioUnitario: 0,
    stock: 0,
    imagen: "",
    cod_categoria: "",
  });

  
const [errores, setErrores] = useState({
  nombre: "",
  imagen: "",
  precioUnitario: "",
  stock: "",
});


  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductoPorCodigo(codProducto!);
        setProducto({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          precioUnitario: data.precio_unitario || 0,
          stock: data.stock || "",
          imagen: data.imagen || "",
          cod_categoria: data.cod_categoria || 0,
        });
      } catch (error) {
        console.error("❌ Error al cargar producto:", error);
      }
    };
    cargarProducto();
  }, [codProducto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]:  name === "stock" || name === "precioUnitario" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const nuevosErrores = {
    nombre: "",
    imagen: "",
    precioUnitario: "",
    stock: "",
  };

  let esValido = true;

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

  setErrores(nuevosErrores);

  if (!esValido) return;

  try {
    await actualizarProducto(codProducto!, producto);
    console.log("✅ Producto actualizado");
    navigate("/admin/productos");
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
  }
};

  return (
    <div className="container py-5">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="form-control mb-2"
        />
        {errores.nombre && <div className="text-danger">{errores.nombre}</div>}

        <input
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="form-control mb-2"
        />

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

        <input
          name="stock"
          type="number"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="form-control mb-2"
        />
        {errores.stock && <div className="text-danger">{errores.stock}</div>}

        <input
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          placeholder="URL de Imagen"
          className="form-control mb-2"
        />
        {errores.imagen && <div className="text-danger">{errores.imagen}</div>}

        <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate("/admin/productos")}>Volver</button>
      </form>
    </div>
  );
}