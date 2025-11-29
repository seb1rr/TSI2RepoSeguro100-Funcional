import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import { Op } from "sequelize";

// MOSTRAR TODOS LOS PEDIDOS ACTIVOS (no anulados)
export const getPedidosActivos = async (request: Request, response: Response) => {
  try {
    const pedidos = await Pedido.findAll({ where: { anulado: 0 } });
    response.json({ data: pedidos });
  } catch (error) {
    console.error("Error al obtener pedidos activos:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// MOSTRAR TODOS LOS PEDIDOS ENTREGADOS
export const getPedidosEntregados = async (request: Request, response: Response) => {
  try {
    const pedidos = await Pedido.findAll({ where: { estado: "entregado", anulado: 0 } });
    response.json({ data: pedidos });
  } catch (error) {
    console.error("Error al obtener pedidos entregados:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// BUSCAR PEDIDO POR CÓDIGO
export const getPedidoById = async (request: Request, response: Response) => {
  try {
    const { cod_pedido } = request.params;
    const pedido = await Pedido.findByPk(cod_pedido);
    if (!pedido) {
      return response.status(404).json({ error: "Pedido no encontrado" });
    }
    response.json({ data: pedido });
  } catch (error) {
    console.error("Error al obtener pedido por ID:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// CREAR UN NUEVO PEDIDO
export const crearPedido = async (request: Request, response: Response) => {
  const {
    fecha,
    estado,
    total,
    empresa_envio,
    fecha_envio,
    fecha_entrega,
    cantidad,
    fecha_pedido
  } = request.body;

  try {
    if (!fecha || !estado || total === undefined || cantidad === undefined || !fecha_pedido) {
      return response.status(400).json({ 
        error: "Faltan campos requeridos: fecha, estado, total, cantidad, fecha_pedido" 
      });
    }

    // GENERA EL CODIGO DE PEDIDO AUTOMATICAMENTE
    const ultimoPedido = await Pedido.findOne({
      order: [['cod_pedido', 'DESC']]
    });
    
    let nuevoNumeroPedido = 1;
    if (ultimoPedido && ultimoPedido.cod_pedido) {
      const ultimoNumero = parseInt(ultimoPedido.cod_pedido.replace('PED', ''));
      nuevoNumeroPedido = ultimoNumero + 1;
    }
    
    const cod_pedido = `PED${nuevoNumeroPedido.toString().padStart(3, '0')}`;

    // GENERA EL COMPROBANTE AUTOMATICAMENTE
    const ultimoComprobante = await Pedido.findOne({
      order: [['comprobante', 'DESC']],
      where: {
        comprobante: {
          [Op.like]: 'COMP%'
        }
      }
    });
    
    let nuevoNumeroComprobante = 1;
    if (ultimoComprobante && ultimoComprobante.comprobante) {
      const ultimoNumero = parseInt(ultimoComprobante.comprobante.replace('COMP', ''));
      nuevoNumeroComprobante = ultimoNumero + 1;
    }
    
    const comprobante = `COMP${nuevoNumeroComprobante.toString().padStart(3, '0')}`;

    // CREAR EL PEDIDO CON LOS CODIGOS GENERADOS
    const nuevoPedido = await Pedido.create({
      cod_pedido: cod_pedido,
      comprobante: comprobante,
      fecha: new Date(fecha),
      estado,
      total: parseInt(total),
      empresa_envio: empresa_envio || null,
      fecha_envio: fecha_envio ? new Date(fecha_envio) : null,
      fecha_entrega: fecha_entrega ? new Date(fecha_entrega) : null,
      cantidad: parseInt(cantidad),
      anulado: 0,
      fecha_pedido: new Date(fecha_pedido)
    } as any);

    response.status(201).json({ 
      message: "Pedido creado", 
      data: nuevoPedido,
      codigo_generado: nuevoPedido.cod_pedido,
      comprobante_generado: nuevoPedido.comprobante
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// REGISTRAR ENVÍO
export const registrarEnvio = async (request: Request, response: Response) => {
  try {
    const { cod_pedido } = request.params;
    const { empresa_envio } = request.body;

    const pedido = await Pedido.findByPk(cod_pedido);
    if (!pedido) {
      return response.status(404).json({ error: "Pedido no encontrado" });
    }

    pedido.empresa_envio = empresa_envio;
    pedido.fecha_envio = new Date();
    pedido.estado = "enviado"; // CAMBIAR ESTADO A "enviado"
    await pedido.save();

    response.json({ message: "Envío registrado", data: pedido });
  } catch (error) {
    console.error("Error al registrar envío:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// REGISTRAR ENTREGA
export const registrarEntrega = async (request: Request, response: Response) => {
  try {
    const { cod_pedido } = request.params;

    const pedido = await Pedido.findByPk(cod_pedido);
    if (!pedido) {
      return response.status(404).json({ error: "Pedido no encontrado" });
    }

    pedido.fecha_entrega = new Date();
    pedido.estado = "entregado"; 
    await pedido.save();

    response.json({ message: "Entrega registrada", data: pedido });
  } catch (error) {
    console.error("Error al registrar entrega:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// ELIMINAR PEDIDO (marcar como anulado)
export const borrarPedido = async (request: Request, response: Response) => {
  try {
    const { cod_pedido } = request.params;

    const pedido = await Pedido.findByPk(cod_pedido);
    if (!pedido) {
      return response.status(404).json({ error: "Pedido no encontrado" });
    }

    // SE MARCA COMO ANULADO
    pedido.anulado = 1;
    await pedido.save();

    response.json({ message: "Pedido marcado como anulado" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

// OBTENER TODOS LOS PEDIDOS
export const getTodosPedidos = async (request: Request, response: Response) => {
  try {
    const { estado, anulado } = request.query;
    
    const whereClause: any = {};
    
    if (estado) {
      whereClause.estado = estado;
    }
    
    if (anulado !== undefined) {
      whereClause.anulado = anulado === '1' ? 1 : 0;
    }

    const pedidos = await Pedido.findAll({ 
      where: whereClause,
      order: [['fecha', 'DESC']]
    });
    
    response.json({ data: pedidos });
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};