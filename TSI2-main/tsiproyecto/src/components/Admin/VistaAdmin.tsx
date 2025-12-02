import { useNavigate } from "react-router-dom";

export default function VistaAdmin() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-light">Acciones de Administrador</h1>
      </div>

      <div className="row g-4 mt-4">

        {/* Envíos */}
        <div className="col-md-3">
          <div className="card shadow-sm bg-light bg-opacity-75 border-info">
            <div className="card-body">
              <h5 className="card-title">Envíos</h5>
              <p className="card-text">Registra envíos y entregas de pedidos.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/admin/envios/registrar")}
                >
                  Registrar Envío
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/admin/envios/entregar")}
                >
                  Registrar Entrega
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/admin/pedidos/entregados")}
                >
                  Ver Pedidos Entregados
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/admin/pedidos/detalle")}
                >
                  Ver Detalle Pedido
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="col-md-3">
          <div className="card shadow-sm bg-light bg-opacity-75 border-success">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Agrega, edita o elimina productos del catálogo.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/productos")}
                >
                  Ver Productos
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/productos/crear")}
                >
                  Crear Producto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ajustes */}
        <div className="col-md-3">
          <div className="card shadow-sm bg-light bg-opacity-75 border-warning">
            <div className="card-body">
              <h5 className="card-title">Ajustes</h5>
              <p className="card-text">Gestiona ajustes de stock positivos y negativos.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/ajustes")}
                >
                  Ver Ajustes
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/ajustes/crear")}
                >
                  Crear Ajuste
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Seguimiento */}
        <div className="col-md-3">
          <div className="card shadow-sm bg-light bg-opacity-75 border-primary">
            <div className="card-body">
              <h5 className="card-title">Seguimiento</h5>
              <p className="card-text">Administra el estado y el historial de pedidos.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/seguimiento/crear")}
                >
                  Crear Seguimiento
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/seguimiento/ver")}
                >
                  Ver Seguimientos
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/seguimiento/historial")}
                >
                  Ver Historial Pedido
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
