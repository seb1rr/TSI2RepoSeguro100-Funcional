import { useEffect, useState } from "react";
import { getProductos } from "../services/AllProductos";
import { carritoClient } from "../services/carritoservice";

interface Producto {
  codProducto: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
  stock: number;
  precioUnitario: number;
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agregando, setAgregando] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        if (!Array.isArray(data)) throw new Error("Los productos no están en formato de lista");
        setProductos(data);
      } catch (err: any) {
        console.error("Error al cargar productos:", err);
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregarAlCarrito = async (producto: Producto) => {
    if (!producto.codProducto || producto.stock <= 0) return;

    try {
      setAgregando(producto.codProducto);
      await carritoClient.agregarProducto(String(producto.codProducto), 1);
    } catch (err: any) {
      console.error("Error agregando al carrito:", err);
    } finally {
      setAgregando(null);
    }
  };

  if (loading) return <div className="container mt-5 text-center"><p>Cargando productos...</p></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (productos.length === 0) return <div className="container mt-5 text-center"><p>No hay productos disponibles</p></div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.codProducto}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden transition hover-scale">
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="text-center bg-light"
                  style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  Sin imagen
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-truncate">{producto.descripcion}</p>
                <p className="fw-bold mb-1">Precio: ${producto.precioUnitario.toLocaleString()}</p>
                <p className={`mb-3 ${producto.stock === 0 ? "text-danger" : "text-muted"}`}>
                  {producto.stock === 0 ? "Agotado" : `Stock: ${producto.stock}`}
                </p>
                <button
                  className={`btn ${producto.stock === 0 ? "btn-secondary" : "btn-primary"} mt-auto`}
                  onClick={() => handleAgregarAlCarrito(producto)}
                  disabled={agregando === producto.codProducto || producto.stock <= 0}
                >
                  {agregando === producto.codProducto ? "Agregando..." : "Agregar al carrito"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.02);
            transition: transform 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
