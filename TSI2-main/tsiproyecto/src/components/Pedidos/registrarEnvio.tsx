// src/views/RegistrarEnvio.tsx
import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";
import * as seguimientoService from "../../services/seguimientoServices"; 

export default function RegistrarEnvio() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [empresaEnvio, setEmpresaEnvio] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const empresasEnvioOpciones = ["Chilexpress", "Starken", "Correos de Chile", "Bluexpress"];

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos();
        const pedidosNoEnviados = data.filter((p: any) => p.estado !== "enviado");
        setPedidos(pedidosNoEnviados);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  const registrar = async (cod_pedido: string) => {
    const empresa = empresaEnvio[cod_pedido];
    if (!empresa) {
      alert("Debes seleccionar una empresa de envío");
      return;
    }

    try {
      // Registrar envío en pedidos
      await pedidosService.registrarEnvio(cod_pedido, empresa);

      // Crear seguimiento con estado 0 = No en tránsito
      await seguimientoService.crearSeguimiento({
        cod_pedido: cod_pedido,
        estado: 0
      });

      alert("Envío registrado correctamente y seguimiento creado (no en tránsito)");

      // Quitar pedido de la lista
      setPedidos((prev) => prev.filter((p) => p.cod_pedido !== cod_pedido));
    } catch (error) {
      console.error("Error registrando envío:", error);
      alert("Error registrando envío");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Envío</h2>

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
              {pedidos.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{p.cod_usuario}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td>
                  <td>${p.total.toLocaleString()}</td>
                  <td>{p.estado}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={empresaEnvio[p.cod_pedido] || ""}
                      onChange={(e) =>
                        setEmpresaEnvio({
                          ...empresaEnvio,
                          [p.cod_pedido]: e.target.value,
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
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => registrar(p.cod_pedido)}
                      disabled={p.estado === "enviado"}
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
