import { useEffect, useState } from "react";
import { obtenerSeguimientos } from "../services/seguimientoServices";

// Componente para buscar y mostrar seguimientos por código de pedido o número de seguimiento
export default function BuscarSeguimiento() {
  // Estado para almacenar todos los seguimientos cargados desde el backend
  const [seguimientos, setSeguimientos] = useState<any[]>([]);
  // Estado para almacenar el valor del filtro de búsqueda ingresado por el usuario
  const [filtro, setFiltro] = useState("");
  // Estado para almacenar los resultados filtrados según el input del usuario
  const [resultado, setResultado] = useState<any[]>([]);
  // Estado de carga para mostrar mensaje mientras se obtienen los datos
  const [loading, setLoading] = useState(true);

  // useEffect para cargar todos los seguimientos al montar el componente
  useEffect(() => {
    const cargarSeguimientos = async () => {
      try {
        // Llamada al servicio que obtiene los seguimientos, con límite de 1000
        const res = await obtenerSeguimientos({ limit: 1000 }); 
        // Guardar los seguimientos en el estado, si no hay datos asigna un array vacío
        setSeguimientos(res.data.seguimientos || []);
      } catch (error) {
        // Captura de errores al obtener los datos
        console.error("Error cargando seguimientos:", error);
      } finally {
        // Indicamos que la carga ha finalizado
        setLoading(false);
      }
    };
    cargarSeguimientos();
  }, []);

  // Función para filtrar los seguimientos según el valor del input
  const buscar = () => {
    if (!filtro.trim()) {
      // Si el filtro está vacío, limpiar resultados
      setResultado([]);
      return;
    }

    // Filtrar seguimientos que contengan el filtro en codPedido o nroSeguimiento (insensible a mayúsculas)
    const filtrados = seguimientos.filter(
      (s) =>
        s.codPedido?.toLowerCase().includes(filtro.toLowerCase()) ||
        s.nroSeguimiento?.toLowerCase().includes(filtro.toLowerCase())
    );
    // Guardar resultados filtrados
    setResultado(filtrados);
  };

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) return <p className="text-center mt-5">Cargando seguimientos...</p>;

  // Renderizado del componente
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Buscar Seguimiento</h2>

      {/* Input para filtro de búsqueda y botón para ejecutar búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ingresa código de pedido o número de seguimiento"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="btn btn-primary" onClick={buscar}>
          Buscar
        </button>
      </div>

      {/* Mostrar resultados filtrados */}
      {resultado.length === 0 ? (
        <p>No se encontraron registros.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Número Seguimiento</th>
                <th>Código Pedido</th>
                <th>Fecha Cambio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeo de resultados */}
              {resultado.map((s) => (
                <tr key={s.nroSeguimiento}>
                  <td>{s.nroSeguimiento}</td>
                  <td>{s.codPedido}</td>
                  {/* Conversión de fecha a formato legible */}
                  <td>{new Date(s.fechaCambio).toLocaleString()}</td>
                  <td>{s.estado === 2 ? "En tránsito" : "No en tránsito"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
