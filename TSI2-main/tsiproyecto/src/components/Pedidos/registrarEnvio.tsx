import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";
import * as seguimientoService from "../../services/seguimientoServices"; 

// Componente para registrar los envíos de los pedidos que aún no han sido enviados
export default function RegistrarEnvio() {
  const [pedidos, setPedidos] = useState<any[]>([]); // Estado para guardar los pedidos pendientes de envío
  const [empresaEnvio, setEmpresaEnvio] = useState<{ [key: string]: string }>({}); // Estado para almacenar la empresa seleccionada por pedido
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Opciones de empresas de envío disponibles
  const empresasEnvioOpciones = ["Chilexpress", "Starken", "Correos de Chile", "Bluexpress"];

  // Efecto que se ejecuta al montar el componente para cargar los pedidos pendientes de envío
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos(); // Traigo todos los pedidos activos
        // Filtro los pedidos que aún no fueron enviados
        const pedidosNoEnviados = data.filter((p: any) => p.estado !== "enviado");
        setPedidos(pedidosNoEnviados); // Guardo los pedidos filtrados en el estado
      } catch (error) {
        console.error("Error cargando pedidos:", error); // Registro error si falla la carga
      } finally {
        setLoading(false); // Termino el estado de carga
      }
    };

    cargarPedidos(); // Llamo a la función de carga
  }, []);

  // Función para registrar el envío de un pedido específico
  const registrar = async (cod_pedido: string) => {
    const empresa = empresaEnvio[cod_pedido]; // Obtengo la empresa seleccionada para este pedido
    if (!empresa) {
      alert("Debes seleccionar una empresa de envío"); // Valido que se haya seleccionado una empresa
      return;
    }

    try {
      // Registro el envío en el pedido
      await pedidosService.registrarEnvio(cod_pedido, empresa);

      // Creo un seguimiento inicial para el pedido con estado 0 (no en tránsito)
      await seguimientoService.crearSeguimiento({
        cod_pedido: cod_pedido,
        estado: 0
      });

      alert("Envío registrado correctamente y seguimiento creado (no en tránsito)"); // Mensaje de éxito

      // Actualizo la lista de pedidos eliminando el que ya se envió
      setPedidos((prev) => prev.filter((p) => p.cod_pedido !== cod_pedido));
    } catch (error) {
      console.error("Error registrando envío:", error); // Registro error si falla la operación
      alert("Error registrando envío"); // Mensaje de error
    }
  };

  // Mensaje mientras se cargan los pedidos
  if (loading) return <p className="text-center mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Envío</h2>

      {/* Condicional para mostrar mensaje si no hay pedidos pendientes */}
      {pedidos.length === 0 ? (
        <p>No hay pedidos pendientes de envío.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Fecha Pedido</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Empresa de Envío</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {/* Itero sobre los pedidos pendientes para mostrarlos en la tabla */}
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td> {/* Formateo fecha de pedido */}
                  <td>${p.total.toLocaleString()}</td> {/* Formateo el total del pedido */}
                  <td>{p.estado}</td>
                  <td>
                    {/* Selector para elegir la empresa de envío para cada pedido */}
                    <select
                      className="form-select form-select-sm"
                      value={empresaEnvio[p.cod_pedido] || ""}
                      onChange={(e) =>
                        setEmpresaEnvio({
                          ...empresaEnvio,
                          [p.cod_pedido]: e.target.value, // Actualizo el estado de la empresa seleccionada
                        })
                      }
                    >
                      <option value="">Seleccione...</option>
                      {empresasEnvioOpciones.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* Botón para registrar el envío */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => registrar(p.cod_pedido)}
                      disabled={p.estado === "enviado"} // Evito registrar si ya está enviado
                    >
                      Registrar Envío
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
