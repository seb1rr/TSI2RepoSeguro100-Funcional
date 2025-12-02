import { useState, useEffect } from "react"; 
import { getProductos } from "../../services/AllProductos"; 
import { ajusteClient } from "../../services/AjusteServices";

interface Producto {
  codProducto: string;
  nombre: string;
}

export default function CrearAjuste() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [codProducto, setCodProducto] = useState(""); // Empieza vacío
  const [tipoAjuste, setTipoAjuste] = useState(""); // Empieza vacío
  const [cantidad, setCantidad] = useState<number | "">(""); // Empieza vacío
  const [descripcion, setDescripcion] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const codUsuario = localStorage.getItem("cod_usuario");

  useEffect(() => {
    if (!codUsuario) setMensaje("Debes iniciar sesión como administrador");
  }, [codUsuario]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    fetchProductos();
  }, []);

  const handleCrearAjuste = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    if (!codProducto || !tipoAjuste || !descripcion || !cantidad || cantidad <= 0) {
      setMensaje("Todos los campos obligatorios (*) deben completarse y la cantidad debe ser mayor a 0");
      return;
    }

    if (!codUsuario) {
      setMensaje("Debes iniciar sesión como administrador");
      return;
    }

    try {
      setLoading(true);
      const fechaActual = new Date().toISOString();

      const res = await ajusteClient.crearAjuste(
        codUsuario,
        codProducto,
        tipoAjuste === "true",
        cantidad,
        descripcion,
        undefined,
        fechaActual
      );

      setMensaje(res.message || "Ajuste creado correctamente");
      setCodProducto("");
      setTipoAjuste("");
      setCantidad("");
      setDescripcion("");
    } catch (err: any) {
      console.error("Error al crear ajuste:", err);
      setMensaje(err.response?.data?.message || err.message || "Error al crear ajuste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-light shadow p-4">
        <h2 className="mb-4">Crear Ajuste de Stock</h2>

        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        <form onSubmit={handleCrearAjuste}>
          {/* Producto */}
          <div className="mb-3">
            <label className="form-label">Producto *</label>
            <select
              className="form-select"
              value={codProducto}
              onChange={(e) => setCodProducto(e.target.value)}
            >
              <option value="">-- Selecciona un producto --</option>
              {productos.map((p) => (
                <option key={p.codProducto} value={p.codProducto}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de ajuste */}
          <div className="mb-3">
            <label className="form-label">Tipo de ajuste *</label>
            <select
              className="form-select"
              value={tipoAjuste}
              onChange={(e) => setTipoAjuste(e.target.value)}
            >
              <option value="">-- Selecciona tipo de ajuste --</option>
              <option value="true">Positivo (aumenta stock)</option>
              <option value="false">Negativo (disminuye stock)</option>
            </select>
          </div>

          {/* Cantidad */}
          <div className="mb-3">
            <label className="form-label">Cantidad *</label>
            <input
              type="number"
              min={1}
              className="form-control"
              value={cantidad}
              placeholder="Ingresa la cantidad"
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label className="form-label">Descripción *</label>
            <textarea
              className="form-control"
              value={descripcion}
              placeholder="Describe el motivo del ajuste"
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creando..." : "Crear Ajuste"}
          </button>
        </form>
      </div>
    </div>
  );
}
