import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedidosService } from "../../services/pedidosServices";

export default function VistaPedidoDetalle() {
  const { cod_pedido } = useParams<{ cod_pedido: string }>();
  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        if (!cod_pedido) return;

        const data = await pedidosService.obtenerPedidoPorId(cod_pedido);
        setPedido(data);
      } catch (error) {
        console.error("Error al cargar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedido();
  }, [cod_pedido]);

  if (loading) return <p className="text-center mt-5">Cargando información del pedido...</p>;
  if (!pedido) return <p className="text-center mt-5">Pedido no encontrado.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Detalle del Pedido: {pedido.cod_pedido}</h2>

      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Comprobante</th>
            <td>{pedido.comprobante}</td>
          </tr>
          <tr>
            <th>Cliente</th>
            <td>{pedido.cod_usuario}</td>
          </tr>
          <tr>
            <th>Fecha Pedido</th>
            <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>{pedido.estado}</td>
          </tr>
          <tr>
            <th>Empresa Envío</th>
            <td>{pedido.empresa_envio || "No asignada"}</td>
          </tr>
          <tr>
            <th>Fecha Envío</th>
            <td>{pedido.fecha_envio ? new Date(pedido.fecha_envio).toLocaleDateString() : "-"}</td>
          </tr>
          <tr>
            <th>Fecha Entrega</th>
            <td>{pedido.fecha_entrega ? new Date(pedido.fecha_entrega).toLocaleDateString() : "-"}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>${pedido.total.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Cantidad</th>
            <td>{pedido.cantidad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
