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
      <h2 className="text-center mb-4 fw-bold">Catálogo de Productos</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.codProducto}>
            <div className="card h-100 shadow-lg border-0 rounded-3 producto-card">

              {/* Imagen */}
              {producto.imagen ? (
                <div className="img-container">
                  <img
                    src={`/images/${producto.imagen}`}
                    className="card-img-top"
                    alt={producto.nombre}
                  />
                </div>
              ) : (
                <div className="no-image d-flex align-items-center justify-content-center">
                  Sin imagen
                </div>
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{producto.nombre}</h5>

                <p className="card-text text-muted text-truncate">{producto.descripcion}</p>

                <p className="fw-semibold">
                  Precio: <span className="text-success">${producto.precioUnitario.toLocaleString()}</span>
                </p>

                <p className={producto.stock === 0 ? "text-danger" : "text-secondary"}>
                  {producto.stock === 0 ? "Agotado" : `Stock disponible: ${producto.stock}`}
                </p>

                <button
                  className={`btn btn-lg mt-auto ${
                    producto.stock === 0 ? "btn-secondary" : "btn-primary"
                  }`}
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

      {/* Estilos mejorados */}
      <style>
        {`
          .producto-card {
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .producto-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.12);
          }

          .img-container {
            width: 100%;
            height: 220px;
            overflow: hidden;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }

          .img-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: #f8f9fa;
            padding: 10px;
          }

          .no-image {
            height: 220px;
            background: #efefef;
            border-radius: 8px 8px 0 0;
            color: #888;
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
}
