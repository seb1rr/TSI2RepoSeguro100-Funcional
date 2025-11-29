import { useEffect, useState } from "react";
import { carritoClient } from "../services/carritoservice";
import { getProductos } from "../services/AllProductos";

interface Producto {
  codProducto: string;
  nombre: string;
  descripcion: string;
  stock: number;
  precioUnitario: number;
}

interface CarritoItem {
  cod_carrito: number;
  cod_producto: string;
  cantidad: number;
  precio_unitario: number;
}

export default function Carrito() {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCarrito = async () => {
    try {
      setLoading(true);
      const data = await carritoClient.obtenerCarrito();
      setItems(data.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCarrito();
  }, []);

  const getNombreProducto = (cod_producto: string) => {
    const prod = productos.find(p => p.codProducto === cod_producto);
    return prod ? prod.nombre : cod_producto; // si no lo encuentra, muestra el código
  };

  const total = items.reduce((sum, item) => sum + item.cantidad * item.precio_unitario, 0);

  if (loading) return <div>Cargando carrito...</div>;
  if (items.length === 0) return <div>El carrito está vacío</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mi Carrito</h2>
      {items.map(item => (
        <div key={item.cod_carrito} className="mb-3 p-3 border rounded">
          <p><strong>Producto:</strong> {getNombreProducto(item.cod_producto)}</p>
          <p><strong>Cantidad:</strong> {item.cantidad}</p>
          <p><strong>Precio unitario:</strong> ${item.precio_unitario}</p>
          <p><strong>Subtotal:</strong> ${item.cantidad * item.precio_unitario}</p>
        </div>
      ))}
      <h4>Total: ${total}</h4>
    </div>
  );
}
