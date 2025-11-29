import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductos } from "../services/AllProductos";

export default function ProductosPorCategoria() {
  const { cod_categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        const filtrados = data.filter(
          (p: any) => p.codCategoria === cod_categoria
        );
        setProductos(filtrados);
      } catch (err: any) {
        setError("No se pudo cargar los productos");
      }
    };

    fetchProductos();
  }, [cod_categoria]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-2">Productos de la categoría {cod_categoria}</h2>

      {productos.length === 0 ? (
        <div className="alert alert-info">No hay productos en esta categoría.</div>
      ) : (
        <div className="row">
          {productos.map((producto: any) => (
            <div className="col-md-4 mb-4" key={producto.codProducto}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`/images/${producto.imagen}`}
                  alt={producto.nombre}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <p className="card-text fw-bold text-primary">
                    ${producto.precioUnitario.toLocaleString("es-CL")}
                  </p>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-outline-success">Agregar al carrito</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}