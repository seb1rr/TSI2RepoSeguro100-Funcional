
import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

export default function PedidosEntregados() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosEntregados();
        setPedidos(data);
      } catch (error) {
        console.error("Error cargando pedidos entregados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando pedidos entregados...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Pedidos Entregados</h2>

      {pedidos.length === 0 ? (
        <p>No hay pedidos entregados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Fecha Pedido</th>
                <th>Fecha Entrega</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td>
                  <td>{p.fecha_entrega ? new Date(p.fecha_entrega).toLocaleDateString() : "N/A"}</td>
                  <td>${p.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
