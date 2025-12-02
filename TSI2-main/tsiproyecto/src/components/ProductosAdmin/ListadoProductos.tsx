import { useEffect, useState } from "react";
import { getProductos } from "../../services/AllProductos";
import { deleteProducto } from "../../services/BorrarProductos"; 
import { useNavigate } from "react-router-dom";

// Interfaz para tipar los productos
interface Producto {
  codProducto: string;
  nombre: string;
  precioUnitario?: number;
  stock?: number;
  codCategoria?: string;
}

export default function VistaProductosAdmin() {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estado para errores y mensajes
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Función que carga los productos desde el backend
  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      console.log(" Productos recibidos desde el backend:", data);
      setProductos(data);
    } catch (err: any) {
      setError("Error al cargar productos");
    }
  };

  // Función que elimina un producto
  const handleEliminar = async (codProducto: string) => {
    const confirmar = window.confirm(`¿Eliminar el producto ${codProducto}?`);
    if (!confirmar) return;

    try {
      await deleteProducto(codProducto);
      setMensaje("Producto eliminado correctamente");
      cargarProductos(); // recarga la lista
    } catch (err: any) {
      setError(err.message || "Error al eliminar producto");
    }
  };

  //  redireccionar al formulario de edición
  const navigate = useNavigate();
  const handleEditar = (codProducto: string) => {
    navigate(`/admin/productos/editar/${codProducto}`);
  };

  // Carga los productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary">Listado de Productos</h2>

      {/* Mensajes de error o éxito */}
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* Tabla de productos */}
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codProducto}>
              <td>{producto.codProducto}</td>
              <td>{producto.nombre || "—"}</td>
              <td>
                {typeof producto.precioUnitario === "number"
                  ? `$${producto.precioUnitario.toLocaleString("es-CL")}`
                  : "—"}
              </td>
              <td>{producto.stock ?? "—"}</td>
              <td>{producto.codCategoria || "—"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditar(producto.codProducto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(producto.codProducto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}