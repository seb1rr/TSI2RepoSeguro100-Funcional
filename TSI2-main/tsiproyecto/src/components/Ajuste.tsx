import { useState, useEffect } from "react";
import { ajusteClient } from "../services/AjusteServices";
import { getProductos } from "../services/AllProductos";

interface Producto {
  codProducto: string;
  nombre: string;
}

export default function CrearAjuste() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [codProducto, setCodProducto] = useState("");
  const [tipoAjuste, setTipoAjuste] = useState<boolean>(true);
  const [cantidad, setCantidad] = useState<number>(1);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Obtener cod_usuario desde localStorage
  const codUsuario = localStorage.getItem("cod_usuario");
  if (!codUsuario) {
    setMensaje("Debes iniciar sesión como administrador");
  }

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        if (data.length > 0) setCodProducto(data[0].codProducto);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    fetchProductos();
  }, []);

  const handleCrearAjuste = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    if (!codProducto || !descripcion || cantidad <= 0) {
      setMensaje("Todos los campos son obligatorios y la cantidad debe ser mayor a 0");
      return;
    }

    if (!codUsuario) {
      setMensaje("Debes iniciar sesión como administrador");
      return;
    }

    try {
      setLoading(true);
      const res = await ajusteClient.crearAjuste(
        codUsuario,
        codProducto,
        tipoAjuste,
        cantidad,
        descripcion
      );
      setMensaje(res.message || "Ajuste creado correctamente");
      setCantidad(1);
      setDescripcion("");
      setTipoAjuste(true);
    } catch (err: any) {
      console.error("Error al crear ajuste:", err);
      setMensaje(err.response?.data?.message || err.message || "Error al crear ajuste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Ajuste de Stock</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form onSubmit={handleCrearAjuste}>
        <div className="mb-3">
          <label className="form-label">Producto</label>
          <select
            className="form-select"
            value={codProducto}
            onChange={(e) => setCodProducto(e.target.value)}
          >
            {productos.map((p) => (
              <option key={p.codProducto} value={p.codProducto}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de ajuste</label>
          <select
            className="form-select"
            value={tipoAjuste ? "true" : "false"}
            onChange={(e) => setTipoAjuste(e.target.value === "true")}
          >
            <option value="true">Positivo (aumenta stock)</option>
            <option value="false">Negativo (disminuye stock)</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            min={1}
            className="form-control"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear Ajuste"}
        </button>
      </form>
    </div>
  );
}
