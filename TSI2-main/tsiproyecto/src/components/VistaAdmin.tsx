import { useNavigate } from "react-router-dom";

export default function VistaAdmin() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Acciones de Administrador</h1>
      </div>

      

      <div className="row g-4 mt-4">

        {/* Usuarios */}
        <div className="col-md-4">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">Gestiona cuentas de clientes y administradores.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/usuarios")}
              >
                Ver usuarios
              </button>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="col-md-4">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Agrega, edita o elimina productos del catálogo.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/productos")}
                >
                  Ver productos
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/admin/productos/crear")}
                >
                  Crear Producto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ajustes */}
        <div className="col-md-4">
          <div className="card border-warning shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Ajustes</h5>
              <p className="card-text">Gestiona ajustes de stock positivos y negativos.</p>
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/ajustes")}
                >
                  Ver ajustes
                </button>
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => navigate("/admin/ajustes/crear")}
                >
                  Crear Ajuste
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
