import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

// Componente para mostrar todos los pedidos que ya fueron entregados
export default function PedidosEntregados() {
  const [pedidos, setPedidos] = useState<any[]>([]); // Estado donde guardo los pedidos obtenidos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Efecto que se ejecuta al montar el componente para cargar los pedidos entregados
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosEntregados(); // Llamo al servicio para traer los pedidos entregados
        setPedidos(data); // Guardo los pedidos en el estado
      } catch (error) {
        console.error("Error cargando pedidos entregados:", error); // Registro si ocurre algún error
      } finally {
        setLoading(false); // Termino el estado de carga
      }
    };

    cargarPedidos(); // Llamo a la función para cargar los pedidos entregados
  }, []);

  // Mensaje mientras se cargan los datos
  if (loading) return <p className="text-center text-light mt-5">Cargando pedidos entregados...</p>;

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <h2 className="mb-4">Pedidos Entregados</h2>

      {/* Condicional para mostrar mensaje si no hay pedidos entregados */}
      {pedidos.length === 0 ? (
        <p>No hay pedidos entregados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-dark text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Fecha Pedido</th>
                <th>Fecha Entrega</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Itero sobre los pedidos para mostrarlos en la tabla */}
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td> {/* Formateo la fecha de pedido */}
                  <td>{p.fecha_entrega ? new Date(p.fecha_entrega).toLocaleDateString() : "N/A"}</td> {/* Formateo la fecha de entrega o muestro N/A */}
                  <td>${p.total.toLocaleString()}</td> {/* Formateo el total del pedido */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
