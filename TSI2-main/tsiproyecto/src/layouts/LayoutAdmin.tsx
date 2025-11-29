import React from "react";

import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminLayout() {
  return (
    <>
      <NavbarAdmin />

      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}
