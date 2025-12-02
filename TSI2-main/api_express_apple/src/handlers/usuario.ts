// src/handlers/usuario.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

export const loginAdmin = async (Request: Request, Response: Response) => {
  const { cod_usuario, contraseña } = Request.body;
  const SECRET = process.env.SECRET_KEY;

  try {
    const usuario = await Usuario.findByPk(cod_usuario);

    if (!usuario || !bcrypt.compareSync(contraseña, usuario.contraseña)) {
      return Response.status(401).json({ error: "Credenciales incorrectas" });
    }

    if (usuario.tipo_usuario !== 1) {
      return Response.status(403).json({ error: "Acceso denegado: no es administrador" });
    }

    const token = jwt.sign(
      {
        cod_usuario: usuario.cod_usuario,
        tipo_usuario: usuario.tipo_usuario,
      },
      SECRET!,
      { expiresIn: "1h" }
    );

    Response.json({
      message: "Login exitoso como administrador",
      token,
      tipo_usuario: usuario.tipo_usuario,
    });
  } catch (error) {
    console.error("Error en login admin:", error);
    Response.status(500).json({ error: "Error interno del servidor" });
  }
};


export const contenidoSegunRol = async (Request: Request, Response: Response) => {
  const { tipo_usuario } = Request.usuario!;

  if (tipo_usuario === 1) {
    Response.json({
      message: "Bienvenido administrador",
    });
  } else {
    Response.json({
      message: "Bienvenido cliente",
    });
  }
};

