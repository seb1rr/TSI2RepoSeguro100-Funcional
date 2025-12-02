import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

export default function RegistrarEntrega() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos();
        // Filtrar solo pedidos que están enviados pero no entregados
        const pendientesEntrega = data.filter((p: any) => p.estado === "enviado");
        setPedidos(pendientesEntrega);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  const registrarEntrega = async (cod_pedido: string) => {
    try {
      await pedidosService.registrarEntrega(cod_pedido);
      alert("Entrega registrada correctamente");

      // Actualizar listado
      setPedidos((prev) => prev.filter((p) => p.cod_pedido !== cod_pedido));
    } catch (error) {
      console.error("Error registrando entrega:", error);
      alert("Error registrando entrega");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Entrega</h2>

      {pedidos.length === 0 ? (
        <p>No hay pedidos pendientes de entrega.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Fecha Envío</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{p.fecha_envio ? new Date(p.fecha_envio).toLocaleDateString() : "-"}</td>
                  <td>${p.total.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => registrarEntrega(p.cod_pedido)}
                    >
                      Registrar Entrega
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
