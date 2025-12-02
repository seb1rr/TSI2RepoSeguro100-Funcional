import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedidosService } from "../../services/pedidosServices";

// Componente para mostrar el detalle de un pedido específico
export default function VistaPedidoDetalle() {
  const { cod_pedido } = useParams<{ cod_pedido: string }>(); // Obtengo el código del pedido desde la URL
  const [pedido, setPedido] = useState<any>(null); // Estado para almacenar la información del pedido
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Efecto para cargar la información del pedido cuando cambia el código
  useEffect(() => {
    const cargarPedido = async () => {
      try {
        if (!cod_pedido) return; // Si no hay código, no hago nada

        const data = await pedidosService.obtenerPedidoPorId(cod_pedido); // Llamo al servicio para obtener el pedido
        setPedido(data); // Guardo la información en el estado
      } catch (error) {
        console.error("Error al cargar pedido:", error); // Registro errores si ocurre alguno
      } finally {
        setLoading(false); // Termino el estado de carga
      }
    };

    cargarPedido(); // Llamo a la función para cargar el pedido
  }, [cod_pedido]);

  // Mensaje mientras se cargan los datos
  if (loading) return <p className="text-center text-light mt-5">Cargando información del pedido...</p>;

  // Mensaje si no se encontró el pedido
  if (!pedido) return <p className="text-center text-light mt-5">Pedido no encontrado.</p>;

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <h2 className="mb-4">Detalle del Pedido: {pedido.cod_pedido}</h2>

      {/* Tabla con los datos principales del pedido */}
      <table className="table table-striped table-dark">
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
            <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td> {/* Formateo la fecha */}
          </tr>
          <tr>
            <th>Estado</th>
            <td>{pedido.estado}</td>
          </tr>
          <tr>
            <th>Empresa Envío</th>
            <td>{pedido.empresa_envio || "No asignada"}</td> {/* Muestro mensaje si no hay empresa */}
          </tr>
          <tr>
            <th>Fecha Envío</th>
            <td>{pedido.fecha_envio ? new Date(pedido.fecha_envio).toLocaleDateString() : "-"}</td> {/* Muestro "-" si no hay fecha */}
          </tr>
          <tr>
            <th>Fecha Entrega</th>
            <td>{pedido.fecha_entrega ? new Date(pedido.fecha_entrega).toLocaleDateString() : "-"}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>${pedido.total.toLocaleString()}</td> {/* Formateo el total */}
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
