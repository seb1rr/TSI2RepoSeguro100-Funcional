import { useEffect, useState } from "react";
import { carritoClient } from "../services/carritoservice";
import axios from "axios";

const Carrito = () => {
  // Estado para los productos en el carrito
  const [items, setItems] = useState<any[]>([]);
  // Estado para el total del carrito
  const [total, setTotal] = useState(0);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // Función para cargar los productos del carrito desde el servicio
  const cargarCarrito = async () => {
    try {
      const data = await carritoClient.obtenerCarrito();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = async (cod_carrito: number, cantidad: number) => {
    try {
      await carritoClient.actualizarCantidad(cod_carrito, cantidad);
      cargarCarrito(); // Recargar carrito después de actualizar
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminar = async (cod_carrito: number) => {
    try {
      await carritoClient.eliminarProducto(cod_carrito);
      cargarCarrito(); // Recargar carrito después de eliminar
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para vaciar todo el carrito
  const vaciar = async () => {
    try {
      await carritoClient.vaciarCarrito();
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  // Función para crear un pedido a partir del carrito
  const crearPedido = async () => {
    try {
      const token = localStorage.getItem("token");

      const dataPedido = {
        fecha: new Date(),
        estado: "Pendiente",
        total: total,
        empresa_envio: null,
        fecha_envio: null,
        fecha_entrega: null,
        cantidad: items.reduce((acc, p) => acc + p.cantidad, 0),
        fecha_pedido: new Date(),
      };

      const res = await axios.post(
        "http://localhost:3000/api/pedido/crear",
        dataPedido,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Vaciar carrito después de crear pedido
      await carritoClient.vaciarCarrito();
      setItems([]);
      setTotal(0);

      // Mostrar mensaje con el código y comprobante generado
      alert(
        `Pedido creado correctamente!\n\nCódigo: ${res.data.codigo_generado}\nComprobante: ${res.data.comprobante_generado}`
      );
    } catch (error) {
      console.error("Error al crear pedido:", error);
      alert("Error al crear pedido. Revisa consola.");
    }
  };

  // Cargar carrito al montar el componente
  useEffect(() => {
    cargarCarrito();
  }, []);

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) return <p className="text-center mt-5">Cargando carrito...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mi Carrito</h2>

      {items.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <>
          {/* Tabla con los productos del carrito */}
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.cod_carrito}>
                    <td>{item.producto?.nombre || "N/A"}</td>
                    <td>${item.producto?.precio?.toLocaleString() || 0}</td>
                    <td style={{ maxWidth: "80px" }}>
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(item.cod_carrito, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>${(item.producto?.precio * item.cantidad).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminar(item.cod_carrito)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total y botones de acción */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <h4 className="mb-2">Total: ${total.toLocaleString()}</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-warning" onClick={vaciar}>
                Vaciar Carrito
              </button>
              <button className="btn btn-success" onClick={crearPedido}>
                Crear Pedido
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
