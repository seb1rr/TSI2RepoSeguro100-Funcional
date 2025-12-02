import { Request, Response } from 'express';
import Ajuste from '../models/Ajuste';
import Producto from '../models/Producto';
import Usuario from '../models/Usuario';
import { Op } from 'sequelize';

// Crear un ajuste (positivo o negativo)
export const crearAjuste = async (req: Request, res: Response) => {
    try {
        const { cod_usuario, cod_producto, tipo_ajuste, cantidad, descripcion, cod_pedido } = req.body;

        // Validar campos requeridos
        if (!cod_usuario || !cod_producto || tipo_ajuste === undefined || tipo_ajuste === null || !cantidad || !descripcion) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: cod_usuario, cod_producto, tipo_ajuste, cantidad, descripcion',
                detalles: {
                    cod_usuario: !!cod_usuario,
                    cod_producto: !!cod_producto,
                    tipo_ajuste: tipo_ajuste !== undefined && tipo_ajuste !== null,
                    cantidad: !!cantidad,
                    descripcion: !!descripcion
                }
            });
        }

        // Verificar que el producto existe
        const producto = await Producto.findByPk(cod_producto);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(cod_usuario);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Crear el ajuste - USANDO camelCase como requiere el modelo
        const nuevoAjuste = await Ajuste.create({
            codUsuario: cod_usuario,
            codProducto: cod_producto,
            tipoAjuste: tipo_ajuste,
            cantidad: Math.abs(cantidad),
            descripcion: descripcion,
            fecha: new Date()
        } as any, {
            fields: ['codUsuario', 'codProducto', 'tipoAjuste', 'cantidad', 'descripcion', 'fecha']
        });

        // Actualizar el stock del producto según el tipo de ajuste
        if (tipo_ajuste) {
            // Ajuste positivo - aumentar stock
            producto.stock += Math.abs(cantidad);
        } else {
            // Ajuste negativo - disminuir stock (pero no permitir stock negativo)
            producto.stock = Math.max(0, producto.stock - Math.abs(cantidad));
        }

        await producto.save();

        return res.json({
            success: true,
            message: tipo_ajuste ? 'Ajuste positivo registrado' : 'Ajuste negativo registrado',
            data: nuevoAjuste,
            stock_actualizado: producto.stock
        });

    } catch (error: any) {
        console.error('Error al crear ajuste:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Obtener todos los ajustes
export const obtenerAjustes = async (req: Request, res: Response) => {
    try {
        const total = await Ajuste.count();
       
        const ajustes = await Ajuste.findAll({
            attributes: ['codAjuste', 'codProducto', 'codUsuario', 'tipoAjuste', 'cantidad', 'descripcion', 'fecha'],
            limit: 5, // Solo 5 registros para prueba
            order: [['fecha', 'DESC']]
        });
        
        return res.json({
            success: true,
            data: {
                ajustes: ajustes,
                total: total
            }
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error de conexión con la base de datos'
        });
    }
};

// Obtener ajuste por ID
export const obtenerAjustePorId = async (req: Request, res: Response) => {
    try {
        const { cod_ajuste } = req.params;

        const ajuste = await Ajuste.findByPk(cod_ajuste, {
            include: [
                {
                    model: Producto,
                    attributes: ['nombre', 'cod_producto', 'precio_unitario']
                },
                {
                    model: Usuario,
                    attributes: ['nombre_usuario', 'cod_usuario']
                }
            ]
        });

        if (!ajuste) {
            return res.status(404).json({
                success: false,
                message: 'Ajuste no encontrado'
            });
        }

        return res.json({
            success: true,
            data: ajuste
        });

    } catch (error: any) {
        console.error('Error al obtener ajuste:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};