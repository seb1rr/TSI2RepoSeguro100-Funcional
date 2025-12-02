import React, { useEffect, useState } from "react";
import {
  obtenerSeguimientos,
  actualizarEstadoSeguimiento,
  eliminarSeguimiento,
} from "../../services/seguimientoServices";

interface Seguimiento {
  nroSeguimiento: string;
  codPedido: string;
  estado: number;
  fechaCambio: string;
}

const VerSeguimientos: React.FC = () => {
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSeguimientos = async () => {
    try {
      setLoading(true);
      const res = await obtenerSeguimientos({ page: 1, limit: 50 });
      setSeguimientos(res.data.seguimientos);
    } catch (err: any) {
      setError(err.message || "Error al cargar seguimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeguimientos();
  }, []);

  const handleActualizarEstado = async (nro: string, estadoActual: number) => {
    try {
      const nuevoEstado = estadoActual === 2 ? 0 : 2; 
      await actualizarEstadoSeguimiento(nro, nuevoEstado);
      fetchSeguimientos();
    } catch (err: any) {
      alert(err.message || "Error al actualizar estado");
    }
  };

  const handleEliminar = async (nro: string) => {
    if (!window.confirm("¿Seguro quieres eliminar este seguimiento?")) return;
    try {
      await eliminarSeguimiento(nro);
      fetchSeguimientos();
    } catch (err: any) {
      alert(err.message || "Error al eliminar seguimiento");
    }
  };

  if (loading) return <p>Cargando seguimientos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Seguimientos</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nro Seguimiento</th>
            <th>Código Pedido</th>
            <th>Estado</th>
            <th>Fecha de Cambio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {seguimientos.map((s) => (
            <tr key={s.nroSeguimiento}>
              <td>{s.nroSeguimiento}</td>
              <td>{s.codPedido}</td>
              <td>{s.estado === 2 ? "En tránsito" : "No en tránsito"}</td>
              <td>{new Date(s.fechaCambio).toLocaleString()}</td>
              <td>
                <button
                  className={`btn btn-sm me-2 ${
                    s.estado === 2 ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => handleActualizarEstado(s.nroSeguimiento, s.estado)}
                >
                  {s.estado === 2 ? "Marcar No en tránsito" : "Marcar En tránsito"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(s.nroSeguimiento)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {seguimientos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay seguimientos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerSeguimientos;
