import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos from "./components/Productos";
import Login from "./components/Login";
import Categorias from "./components/catalogo";
import Registro from "./components/FormCrearCuenta";
import LoginAdmin from "./components/LoginAdministradores";
import NavbarAmin from "./layouts/LayoutAdmin";
import VistaAdmin from "./components/VistaAdmin";
import VistaProductosAdmin from "./components/AdminProductos";
import FormEditarProducto from "./components/FormEditarProductos";
import CrearProducto from "./components/CrearProducto";
import Carrito from "./components/Carrito";

// 👉 IMPORTA LA VISTA DEL CARRITO


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
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

      // 👉 RUTA DEL CARRITO
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
        element: <FormEditarProducto />,
      },
      {
        path: "productos/crear",
        element: <CrearProducto />,
      },
    ],
  },
]);
