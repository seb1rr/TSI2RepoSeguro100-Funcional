import { Router } from "express";
import { agregarProductos, borrarProductos, editarProductos, getProductoById, getProductos, getProductosConCantidadProductos } from "./handlers/productos";
import { agregarCategoria, borrarCategoria, editarCategoria, getCategoria, getCategoriaById, getCategoriaConCantidadProductos } from "./handlers/categorias";
import { crearCliente, login } from "./handlers/clientes";
import { verificarTokens } from "./middleware/verificarTokens";
import { borrarPedido, crearPedido, getPedidoById, getPedidosActivos, getPedidosEntregados, registrarEntrega, registrarEnvio } from "./handlers/pedido";
import { loginAdmin } from "./handlers/usuario";
import {actualizarCantidad, agregarProductoAlCarrito, eliminarProductoDelCarrito, obtenerCarritoUsuario, vaciarCarrito } from "./handlers/carrito";
import { crearAjuste, obtenerAjustePorId, obtenerAjustes} from "./handlers/ajustes";
import { actualizarEstadoSeguimiento, crearSeguimiento, eliminarSeguimiento, obtenerHistorialPedido, obtenerSeguimientoPorId, obtenerSeguimientos } from "./handlers/seguimiento";

const router = Router()

//ENPOINT LOGIN
router.post("/login/admin", loginAdmin)
router.post("/login", login)
router.post("/clientes/crear", crearCliente)

//MIDDLEWARE DESDE AQUI
router.use(verificarTokens)

//ENPOINT CATEGORIAS
router.get("/categorias", getCategoria) //ENPOINT MOSTRAR TODAS LAS CATEGORIAS
router.get("/categorias/cantidad", getCategoriaConCantidadProductos) //ENPOINT DE CATEGORIAS CON LA CANTIDAD DE PRODUCTOS QUE TIENE CADA UNA
router.get("/categorias/:cod_categoria", getCategoriaById) //ENPOINT DE CATEGORIAS SEGUN SU ID
router.post("/categorias", agregarCategoria) //ENPOINT AGREGAR CATEGORIAS
router.put("/categorias/:cod_categoria", editarCategoria) //ENPOINT EDITAR CATEGORIAS
router.delete("/categorias/:cod_categoria", borrarCategoria) //ENPOINT BORRAR CATEGORIAS

//ENPOINT PRODUCTOS
router.get("/productos", getProductos)// ENPOINT MOSTRAR TODOS LOS PRODUCTOS
router.get("/productos/cantidad", getProductosConCantidadProductos) //ENPOINT CANTIDAD DE PRODUCTOS
router.get("/productos/:cod_producto", getProductoById) //ENPOINT DE PRODUCTOS SEGUN SU ID
router.post("/productos", agregarProductos) //ENPOINT AGREGAR PRODUCTOS
router.put("/productos/editar/:cod_producto", editarProductos) //ENPOINT EDITAR PRODUCTOS
router.delete("/productos/:cod_producto", borrarProductos) //ENPOINT BORRAR PRODUCTOS

//ENPOINT DE PEDIDOS
router.get("/pedidos/activos", getPedidosActivos) //ENPOINT MOSTRAR PEDIDOS ACTIVOS
router.get("/pedidos/entregados", getPedidosEntregados) //ENPOINT MOSTRAR PEDIDOS ENTREGADOS
router.get("/pedidos/informacion", getPedidoById) //ENPOINT MOSTRAR INFO DE PEDIDOS
router.post("/pedido/crear", crearPedido) //ENPOINT CREAR PEDIDOS
router.put("/pedidos/:cod_pedido", registrarEnvio) //ENPOINT REGISTRAR ENVIO
router.put("/pedidos/:cod_pedido", registrarEntrega) //ENPOINT REGISTRAR ENTREGA
router.delete("/pedidos/:cod_pedido", borrarPedido) //ENPOINT BORRAR PEDIDO

//ENPOINT DE CARRITO
router.post('/carrito/agregar', agregarProductoAlCarrito); //ENPOINT PARA AGREGRAR PRODUCTO AL CARRITO
router.get('/carrito/usuario/:cod_usuario', obtenerCarritoUsuario); //ENPOINT PARA MOSTRAR EL CARRITO DEL USUARIO
router.put('/carrito/actualizar/:cod_carrito', actualizarCantidad); //ENPOINT PARA ACTUALIZAR LA CANTIDAD
router.delete('/carrito/eliminar/:cod_carrito', eliminarProductoDelCarrito); //ENPOINT PARA ELIMINAR PRODUCTO DEL CARRITO
router.delete('/carrito/vaciar', vaciarCarrito); //ENPOINT PARA VACIAR EL CARRITO

//ENPOINT DE AJUSTES
router.post('/ajustes', crearAjuste); //CREAR AJUSTE NEGATIVO O POSITIVO
router.get('/ajustes/ver', obtenerAjustes); //VER TODOS LOS AJUSTES 
router.get('/ajustes/:cod_ajuste', obtenerAjustePorId); //FILTRAR PARA VER AJUSTE POR ID

router.post('/seguimiento', crearSeguimiento); //CREAR SEGUIMIENTO
router.get('/seguimiento/ver', obtenerSeguimientos); //VER SEGUIMIENTO
router.get('/seguimiento/:nro_seguimiento', obtenerSeguimientoPorId); //VER SEGUIMIENTO SEGUN SU ID
router.get('/seguimiento/pedido/:cod_pedido/historial', obtenerHistorialPedido); //VER EL HISTORIAL DEL PEDIDO
router.put('/seguimiento/:nro_seguimiento/estado', actualizarEstadoSeguimiento); //ACTUALIZAR EL ESTADO DEL SEGUIMIENTO
router.delete('/seguimiento/:nro_seguimiento', eliminarSeguimiento); //ELIMINAR EL SEGUIMIENTO

export default router