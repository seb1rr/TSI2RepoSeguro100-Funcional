import { useEffect, useState } from "react";
import { getProductos } from "../services/AllProductos";
import { carritoClient } from "../services/carritoservice";

interface Producto {
  codProducto: string; // CORRECTO
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

        // Solo usamos codProducto como identificador
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
    if (!producto.codProducto) {
      alert("❌ Producto inválido");
      return;
    }
    if (producto.stock <= 0) {
      alert("❌ No hay stock disponible para este producto");
      return;
    }

    try {
      setAgregando(producto.codProducto);
      console.log("Agregando al carrito:", producto.codProducto);
      await carritoClient.agregarProducto(String(producto.codProducto), 1);
      alert(`✅ ${producto.nombre} agregado al carrito`);
    } catch (err: any) {
      console.error("Error agregando al carrito:", err);
      alert(err.response?.data?.message || err.message || "Error al agregar al carrito");
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
            <div className="card h-100 shadow-sm p-3 d-flex flex-column">
              {producto.imagen ? (
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              ) : (
                <div className="text-center p-5 bg-light">Sin imagen</div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="fw-bold">Precio: ${producto.precioUnitario}</p>
                <p className={`text-muted ${producto.stock === 0 ? "text-danger" : ""}`}>
                  Stock: {producto.stock}
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAgregarAlCarrito(producto)}
                  disabled={agregando === producto.codProducto || producto.stock <= 0}
                >
                  {agregando === producto.codProducto
                    ? "Agregando..."
                    : producto.stock > 0
                      ? "Agregar al carrito"
                      : "Agotado"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
