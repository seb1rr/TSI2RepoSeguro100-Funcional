import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/Admin/NavbarAdmin";

export default function AdminLayout() {
  return (
    <div className="position-relative min-vh-100">

      {/* Fondo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/images/fondo2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: -2,
        }}
      />

      {/* Overlay semi-transparente */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" />

      {/* Contenido */}
      <div className="position-relative">
        <NavbarAdmin />
        <main className="container mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
