import { useEffect, useState } from "react";
import { getCategorias } from "../services/categoriaService";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        console.log("Categorías en NavBar:", data);
        setCategorias(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCategorias();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cod_usuario");

    navigate("/login"); // Redirige al login
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {categorias.length === 0 && !error && (
        <div className="alert alert-warning">Cargando categorías...</div>
      )}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/app">
            apple.fr.accesories
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <NavLink className="nav-link active" to="/app">
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Accesorios Apple
                </a>
                <ul className="dropdown-menu">
                  {categorias.map((cat: any) =>
                    cat.codCategoria ? (
                      <li key={cat.codCategoria}>
                        <NavLink
                          className="dropdown-item"
                          to={`/app/categoria/${cat.codCategoria}`}
                        >
                          {cat.nombre}
                        </NavLink>
                      </li>
                    ) : null
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/app/contacto">
                  Contacto
                </NavLink>
              </li>
            </ul>

            {/*  CARRITO */}
            <div className="d-flex gap-2">

              <NavLink className="btn btn-dark" to="/app/carrito">
                🛒 Carrito
              </NavLink>

             
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
