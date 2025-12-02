import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

export default function VistaPedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos(); // todos los pedidos activos
        setPedidos(data);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  // Filtrar pedidos por código
  const pedidosFiltrados = pedidos.filter((p) =>
    p.cod_pedido.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return <p className="text-center text-light mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <h2 className="mb-4">Pedidos Activos</h2>

      {/* Input de filtro */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código de pedido"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {pedidosFiltrados.length === 0 ? (
        <p>No se encontraron pedidos.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-dark text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Fecha Pedido</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td>
                  <td>${p.total.toLocaleString()}</td>
                  <td>{p.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
