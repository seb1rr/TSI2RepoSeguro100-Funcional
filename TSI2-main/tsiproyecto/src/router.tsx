import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos from "./components/Productos";
import Login from "./components/Login";
import Categorias from "./components/catalogo";

import NavbarAmin from "./layouts/LayoutAdmin";
import VistaAdmin from "./components/Admin/VistaAdmin";
import VistaProductosAdmin from "./components/ProductosAdmin/ListadoProductos";

import Carrito from "./components/Carrito";

import RegistrarEnvio from "./components/Pedidos/registrarEnvio";
import RegistrarEntrega from "./components/Pedidos/registrarEntrega";
import PedidosEntregados from "./components/Pedidos/entregados";
import DetallePedido from "./components/Pedidos/detallepedido";
import CrearProducto from "./components/ProductosAdmin/CrearProducto";
import CrearAjuste from "./components/Ajustes/Ajuste";
import VistaAjustes from "./components/Ajustes/ListaAjustes";
import LoginAdmin from "./components/Admin/LoginAdministradores";
import FormCrearCuenta from "./components/crearCuenta";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <FormCrearCuenta />,
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Categorias />,
      },
      {
        path: "categoria/:cod_categoria",
        element: <Productos />,
      },

     
      {
        path: "carrito",
        element: <Carrito />,
      },
    ],
  },
  {
    path: "/admin",
    element: <NavbarAmin />,
    children: [
      {
        index: true,
        element: <VistaAdmin />,
      },
      {
        path: "dashboard",
        element: <VistaAdmin />,
      },
      {
        path: "productos",
        element: <VistaProductosAdmin />,
      },
      {
        path: "productos/editar/:codProducto",
        element: <CrearProducto />,
      },
      {
        path: "productos/crear",
        element: <CrearProducto />,
      },
      {
        path: "ajustes/crear",
        element: <CrearAjuste/>,
      },
      {
        path: "ajustes",
        element: <VistaAjustes/>,
      },
      {
        path: "envios/registrar",
        element: <RegistrarEnvio/>,
      },
         {
      path: "envios/entregar",
      element: <RegistrarEntrega />,
    },
    {
      path: "pedidos/entregados",
      element: <PedidosEntregados/>,
    },
    {
      path: "pedidos/detalle",
      element: <DetallePedido/>,
    }
     
    ],
  },
]);
