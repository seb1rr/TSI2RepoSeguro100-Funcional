import React, { useEffect, useState } from "react";
import {
  obtenerSeguimientos,
  actualizarEstadoSeguimiento,
  eliminarSeguimiento,
} from "../../services/seguimientoServices";

// Interfaz que define la estructura de un seguimiento
interface Seguimiento {
  nroSeguimiento: string;
  codPedido: string;
  estado: number; // 2 = En tránsito, 0 = No en tránsito
  fechaCambio: string;
}

const VerSeguimientos: React.FC = () => {
  // Estado para almacenar la lista de seguimientos
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores al obtener datos
  const [error, setError] = useState("");

  // Función para cargar los seguimientos desde el servicio
  const fetchSeguimientos = async () => {
    try {
      setLoading(true);
      const res = await obtenerSeguimientos({ page: 1, limit: 50 }); // Paginación simple
      setSeguimientos(res.data.seguimientos);
    } catch (err: any) {
      setError(err.message || "Error al cargar seguimientos");
    } finally {
      setLoading(false);
    }
  };

  // useEffect que ejecuta la carga de datos al montar el componente
  useEffect(() => {
    fetchSeguimientos();
  }, []);

  // Función para actualizar el estado de un seguimiento
  const handleActualizarEstado = async (nro: string, estadoActual: number) => {
    try {
      // Alterna entre 2 (En tránsito) y 0 (No en tránsito)
      const nuevoEstado = estadoActual === 2 ? 0 : 2; 
      await actualizarEstadoSeguimiento(nro, nuevoEstado);
      fetchSeguimientos(); // Recargo la lista después de actualizar
    } catch (err: any) {
      alert(err.message || "Error al actualizar estado");
    }
  };

  // Función para eliminar un seguimiento
  const handleEliminar = async (nro: string) => {
    if (!window.confirm("¿Seguro quieres eliminar este seguimiento?")) return;
    try {
      await eliminarSeguimiento(nro);
      fetchSeguimientos(); // Recargo la lista después de eliminar
    } catch (err: any) {
      alert(err.message || "Error al eliminar seguimiento");
    }
  };

  // Mostrar mensaje de carga
  if (loading) return <p>Cargando seguimientos...</p>;
  // Mostrar mensaje de error
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
                {/* Botón para alternar el estado */}
                <button
                  className={`btn btn-sm me-2 ${
                    s.estado === 2 ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => handleActualizarEstado(s.nroSeguimiento, s.estado)}
                >
                  {s.estado === 2 ? "Marcar No en tránsito" : "Marcar En tránsito"}
                </button>
                {/* Botón para eliminar */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(s.nroSeguimiento)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {/* Mensaje si no hay seguimientos */}
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
