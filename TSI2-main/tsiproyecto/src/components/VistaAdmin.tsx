export default function VistaAdmin() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Bienvenido, Administrador 👋</h1>
      <p className="lead">Aquí tienes acceso rápido a las funciones principales del sistema.</p>

      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">Gestiona cuentas de clientes y administradores.</p>
              <a href="/admin/usuarios" className="btn btn-primary">Ver usuarios</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Agrega, edita o elimina productos del catálogo.</p>
              <a href="/admin/productos" className="btn btn-success">Ver productos</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-warning shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Reportes</h5>
              <p className="card-text">Consulta estadísticas y actividad reciente.</p>
              <a href="/admin/reportes" className="btn btn-warning">Ver reportes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}