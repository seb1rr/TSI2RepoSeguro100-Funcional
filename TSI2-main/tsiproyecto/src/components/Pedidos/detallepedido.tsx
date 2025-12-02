import { useEffect, useState } from "react";
import { pedidosService } from "../../services/pedidosServices";

// Componente para mostrar todos los pedidos activos
export default function VistaPedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]); // Estado donde guardo los pedidos obtenidos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [filtro, setFiltro] = useState(""); // Estado para almacenar el texto de búsqueda

  // Efecto que se ejecuta al montar el componente para cargar los pedidos
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await pedidosService.obtenerPedidosActivos(); // Llamo al servicio para traer los pedidos activos
        setPedidos(data); // Guardo los pedidos en el estado
      } catch (error) {
        console.error("Error cargando pedidos:", error); // Registro si ocurre algún error
      } finally {
        setLoading(false); // Termino el estado de carga
      }
    };

    cargarPedidos(); // Llamo a la función para cargar los pedidos
  }, []);

  // Aplico filtro sobre los pedidos según el código que escriba el usuario
  const pedidosFiltrados = pedidos.filter((p) =>
    p.cod_pedido.toLowerCase().includes(filtro.toLowerCase())
  );

  // Mensaje mientras se cargan los datos
  if (loading) return <p className="text-center text-light mt-5">Cargando pedidos...</p>;

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <h2 className="mb-4">Pedidos Activos</h2>

      {/* Input para filtrar los pedidos por código */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código de pedido"
          value={filtro} // Sincronizo el input con el estado
          onChange={(e) => setFiltro(e.target.value)} // Actualizo el estado cuando el usuario escribe
        />
      </div>

      {/* Condicional para mostrar mensaje si no hay pedidos filtrados */}
      {pedidosFiltrados.length === 0 ? (
        <p>No se encontraron pedidos.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-dark text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Fecha Pedido</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Itero sobre los pedidos filtrados para mostrarlos en la tabla */}
              {pedidosFiltrados.map((p) => (
                <tr key={p.cod_pedido}>
                  <td>{p.cod_pedido}</td>
                  <td>{new Date(p.fecha_pedido).toLocaleDateString()}</td> {/* Formateo la fecha */}
                  <td>${p.total.toLocaleString()}</td> {/* Formateo el total */}
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
