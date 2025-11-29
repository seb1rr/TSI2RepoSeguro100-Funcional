
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cliente from "../models/Cliente";
import Usuario from "../models/Usuario";

export const login = async (request: Request, response: Response) => {
  const { codUsuario, contraseña } = request.body;
  const SECRET = process.env.SECRET_KEY;

  try {
    const cliente = await Cliente.findByPk(codUsuario);
    if (!cliente || !bcrypt.compareSync(contraseña, cliente.contraseña)) {
      return response.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ rut: cliente.codUsuario }, SECRET!, {
      expiresIn: "1h",
    });

    response.json({ token });
  } catch (error) {
    console.error("Error de login: ", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearCliente = async (request: Request, response: Response) => {
  const {
    codUsuario,
    nombreApellido,
    correo,
    direccion,
    telefono,
    contraseña,
  } = request.body;

  if (!codUsuario || !contraseña) {
    return response
      .status(400)
      .json({ error: "Rut y Contraseña son obligatorios" });
  }

  

  try {
    const existe = await Cliente.findByPk(codUsuario);
    if (existe) {
      return response
        .status(409)
        .json({ error: "Este usuario ya está registrado" });
    }

    // Crear cliente
    const nuevoCliente = await Cliente.create({
      codUsuario,
      nombreApellido,
      correo,
      direccion,
      telefono,
      contraseña,
    });

    // Crear usuario asociado
    const hash = await bcrypt.hash(contraseña, 10);
    await Usuario.create({
      cod_usuario: codUsuario,
      nombre_usuario: nombreApellido,
      contraseña: hash,
      tipo_usuario: 0, // cliente
    });

    response.status(201).json({
      message: "Cliente creado correctamente",
    });
  } catch (error) {
    console.error("Error al registrar el cliente/usuario: ", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

