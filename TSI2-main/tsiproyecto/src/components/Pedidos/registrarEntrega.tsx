import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

// Componente para registrar la entrega de pedidos que ya fueron enviados
export default function RegistrarEntrega() {
  const [pedidos, setPedidos] = useState<any[]>([]); // Estado donde guardo los pedidos pendientes de entrega
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Efecto que se ejecuta al montar el componente para cargar los pedidos activos
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos(); // Llamo al servicio para traer todos los pedidos activos
        // Filtrar solo los pedidos que fueron enviados y todavía no entregados
        const pendientesEntrega = data.filter((p: any) => p.estado === "enviado");
        setPedidos(pendientesEntrega); // Guardo los pedidos pendientes de entrega en el estado
      } catch (error) {
        console.error("Error cargando pedidos:", error); // Registro si ocurre algún error
      } finally {
        setLoading(false); // Termino el estado de carga
      }
    };

    cargarPedidos(); // Llamo a la función para cargar los pedidos pendientes de entrega
  }, []);

  // Función para registrar la entrega de un pedido específico
  const registrarEntrega = async (cod_pedido: string) => {
    try {
      await pedidosService.registrarEntrega(cod_pedido); // Llamo al servicio para registrar la entrega
      alert("Entrega registrada correctamente"); // Mensaje de éxito

      // Actualizo el listado eliminando el pedido que ya se entregó
      setPedidos((prev) => prev.filter((p) => p.cod_pedido !== cod_pedido));
    } catch (error) {
      console.error("Error registrando entrega:", error); // Registro si ocurre algún error
      alert("Error registrando entrega"); // Mensaje de error
    }
  };

  // Mensaje mientras se cargan los datos
  if (loading) return <p className="text-center text-light mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <h2 className="mb-4">Registrar Entrega</h2>

      {/* Condicional para mostrar mensaje si no hay pedidos pendientes */}
      {pedidos.length === 0 ? (
        <p>No hay pedidos pendientes de entrega.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-dark text-center">
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
              {/* Itero sobre los pedidos pendientes para mostrarlos en la tabla */}
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{p.fecha_envio ? new Date(p.fecha_envio).toLocaleDateString() : "-"}</td> {/* Formateo la fecha de envío */}
                  <td>${p.total.toLocaleString()}</td> {/* Formateo el total del pedido */}
                  <td>
                    {/* Botón para registrar la entrega de este pedido */}
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
