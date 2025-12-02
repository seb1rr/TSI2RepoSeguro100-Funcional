import { useState, useEffect } from "react"; 
import { getProductos } from "../../services/AllProductos"; // Servicio para obtener la lista de productos
import { ajusteClient } from "../../services/AjusteServices"; // Servicio para crear ajustes en el stock

interface Producto {
  codProducto: string;
  nombre: string;
}

// Componente principal para crear ajustes de stock
export default function CrearAjuste() {
  // Estados para manejar la lista de productos y los datos del formulario
  const [productos, setProductos] = useState<Producto[]>([]); // Lista de productos disponibles
  const [codProducto, setCodProducto] = useState(""); // Producto seleccionado en el formulario
  const [tipoAjuste, setTipoAjuste] = useState<boolean>(true); // Tipo de ajuste: positivo o negativo
  const [cantidad, setCantidad] = useState<number>(1); // Cantidad del ajuste
  const [descripcion, setDescripcion] = useState(""); // Descripción del ajuste
  const [loading, setLoading] = useState(false); // Indica si se está procesando la creación del ajuste
  const [mensaje, setMensaje] = useState(""); // Mensaje de feedback para el usuario

  // Obtengo el código de usuario desde localStorage para saber quién realiza el ajuste
  const codUsuario = localStorage.getItem("cod_usuario");

  // Verifico que el usuario esté logueado al cargar el componente
  useEffect(() => {
    if (!codUsuario) {
      setMensaje("Debes iniciar sesión como administrador"); // Mensaje si no hay sesión
    }
  }, [codUsuario]);

  // Cargar la lista de productos disponibles al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos(); // Llamada al servicio para obtener productos
        setProductos(data); 
        if (data.length > 0) setCodProducto(data[0].codProducto); // Selecciono el primer producto por defecto
      } catch (err) {
        console.error("Error cargando productos:", err); // Manejo de errores al cargar productos
      }
    };
    fetchProductos();
  }, []);

  // Función para crear un nuevo ajuste de stock
  const handleCrearAjuste = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensaje previo

    // Validaciones básicas del formulario
    if (!codProducto || !descripcion || cantidad <= 0) {
      setMensaje("Todos los campos son obligatorios y la cantidad debe ser mayor a 0");
      return;
    }

    if (!codUsuario) {
      setMensaje("Debes iniciar sesión como administrador");
      return;
    }

    try {
      setLoading(true); // Indicar que se está procesando
      const res = await ajusteClient.crearAjuste(
        codUsuario,
        codProducto,
        tipoAjuste,
        cantidad,
        descripcion
      );
      setMensaje(res.message || "Ajuste creado correctamente"); // Mostrar mensaje de éxito
      setCantidad(1); // Resetear cantidad
      setDescripcion(""); // Resetear descripción
      setTipoAjuste(true); // Resetear tipo de ajuste
    } catch (err: any) {
      console.error("Error al crear ajuste:", err); // Manejo de error al crear ajuste
      setMensaje(err.response?.data?.message || err.message || "Error al crear ajuste"); // Mensaje de error
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  };

  return (
    <div className="container mt-4">
      {/* Contenedor principal del formulario */}
      <div className="card bg-dark text-light shadow p-4">
        <h2 className="mb-4">Crear Ajuste de Stock</h2>

        {/* Mostrar mensajes informativos o de error */}
        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {/* Formulario para capturar datos del ajuste */}
        <form onSubmit={handleCrearAjuste}>
          {/* Selección de producto */}
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

          {/* Selección del tipo de ajuste: positivo o negativo */}
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

          {/* Ingreso de cantidad */}
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

          {/* Ingreso de descripción */}
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {/* Botón de envío del formulario */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creando..." : "Crear Ajuste"}
          </button>
        </form>
      </div>
    </div>
  );
}
