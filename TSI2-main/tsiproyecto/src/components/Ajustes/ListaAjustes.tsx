import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ajusteClient } from "../../services/AjusteServices";

interface Ajuste {
  codAjuste: string;
  codProducto: string;
  codUsuario: string;
  tipoAjuste: boolean;
  cantidad: number;
  descripcion: string;
  fecha: string;
}

export default function VistaAjustes() {
  const [ajustes, setAjustes] = useState<Ajuste[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAjustes = async () => {
      try {
        setLoading(true);
        const data = await ajusteClient.obtenerAjustes(); 
        setAjustes(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error cargando ajustes");
      } finally {
        setLoading(false);
      }
    };
    fetchAjustes();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-light shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Ajustes de Stock</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/ajustes/crear")}
          >
            Crear Nuevo Ajuste
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <p>Cargando ajustes...</p>
        ) : ajustes.length === 0 ? (
          <p>No hay ajustes registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>ID Ajuste</th>
                  <th>Producto</th>
                  <th>Usuario</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ajustes.map((a) => (
                  <tr key={a.codAjuste}>
                    <td>{a.codAjuste}</td>
                    <td>{a.codProducto}</td>
                    <td>{a.codUsuario}</td>
                    <td>{a.tipoAjuste ? "Positivo" : "Negativo"}</td>
                    <td>{a.cantidad}</td>
                    <td>{a.descripcion}</td>
                    <td>{new Date(a.fecha).toLocaleDateString()}</td> {/* Solo fecha */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
