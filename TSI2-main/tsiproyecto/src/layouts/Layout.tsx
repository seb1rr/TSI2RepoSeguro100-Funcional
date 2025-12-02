import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />

      <main className="min-vh-100 position-relative">
        {/* Fondo de pantalla */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('/images/fondo1.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            zIndex: -1,
          }}
        />

        {/* Overlay oscuro */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" />

        {/* Contenido */}
        <div className="position-relative">
          <Outlet />
        </div>
      </main>
    </>
  );
}
