import React, { useEffect, useState } from "react";
import { carritoClient } from "../services/carritoservice";

const Carrito = () => {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const actualizarCantidad = async (cod_carrito: number, cantidad: number) => {
    try {
      await carritoClient.actualizarCantidad(cod_carrito, cantidad);
      cargarCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const eliminar = async (cod_carrito: number) => {
    try {
      await carritoClient.eliminarProducto(cod_carrito);
      cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const vaciar = async () => {
    try {
      await carritoClient.vaciarCarrito();
      cargarCarrito();
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando carrito...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mi Carrito</h2>

      {items.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <>
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

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <h4 className="mb-2">Total: ${total.toLocaleString()}</h4>
            <button
              className="btn btn-warning"
              onClick={vaciar}
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
