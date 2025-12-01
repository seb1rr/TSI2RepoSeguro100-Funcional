import { useParams } from "react-router-dom";
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
  codCategoria: string;
}

export default function ProductosPorCategoria() {
  const { cod_categoria } = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState("");
  const [loading] = useState(false);
  const [agregando, setAgregando] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        const filtrados = data.filter(
          (p: Producto) => String(p.codCategoria) === String(cod_categoria)
        );
        setProductos(filtrados);
      } catch (err: any) {
        setError("No se pudo cargar los productos");
      }
    };

    fetchProductos();
  }, [cod_categoria]);

  const handleAgregar = async (producto: Producto) => {
    if (producto.stock <= 0) {
      alert("No hay stock disponible");
      return;
    }

    try {
      setAgregando(producto.codProducto);
      await carritoClient.agregarProducto(producto.codProducto, 1);

      alert(`${producto.nombre} agregado al carrito`);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error al agregar al carrito");
    } finally {
      setAgregando(null);
    }
  };

  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">
        Productos de la categoría <span className="text-primary">{cod_categoria}</span>
      </h2>

      {productos.length === 0 ? (
        <div className="alert alert-info">No hay productos en esta categoría.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map((producto) => (
            <div className="col" key={producto.codProducto}>
              <div className="card h-100 shadow-lg border-0 rounded-3 producto-card">

                {/* Imagen */}
                {producto.imagen ? (
                  <div className="img-container">
                    <img
                      src={`/images/${producto.imagen}`}
                      alt={producto.nombre}
                      className="card-img-top"
                    />
                  </div>
                ) : (
                  <div className="no-image d-flex align-items-center justify-content-center">
                    Sin imagen
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{producto.nombre}</h5>

                  <p className="card-text text-muted text-truncate">
                    {producto.descripcion}
                  </p>

                  <p className="fw-bold text-success">
                    ${producto.precioUnitario.toLocaleString("es-CL")}
                  </p>

                  <p className={producto.stock === 0 ? "text-danger" : "text-secondary"}>
                    {producto.stock === 0 ? "Agotado" : `Stock disponible: ${producto.stock}`}
                  </p>

                  <button
                    className={`btn btn-lg mt-auto ${
                      producto.stock === 0 ? "btn-secondary" : "btn-primary"
                    }`}
                    onClick={() => handleAgregar(producto)}
                    disabled={agregando === producto.codProducto || loading}
                  >
                    {agregando === producto.codProducto ? "Agregando..." : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     
    </div>
  );
}
