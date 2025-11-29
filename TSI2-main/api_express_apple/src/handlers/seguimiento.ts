import { Request, Response } from 'express';
import Seguimiento from '../models/Seguimiento';
import Pedido from '../models/Pedido';
import { Op } from 'sequelize';

// CREA UN NUEVO REGISTRO DE SEGUIMIENTO
export const crearSeguimiento = async (req: Request, res: Response) => {
    try {
        const { cod_pedido, estado } = req.body;

        // VALIDAMOS LOS CAMPOS REQUERIDOS
        if (!cod_pedido || estado === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: cod_pedido, estado'
            });
        }

        // VERIFICAMOS SI EL PEDIDO EXISTE
        const pedido = await Pedido.findByPk(cod_pedido);
        if (!pedido) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        // GENERA EL CODIGO AUTOMATICAMNETE
        const ultimoSeguimiento = await Seguimiento.findOne({
            order: [['nro_seguimiento', 'DESC']]
        });
        
        let nuevoNumero = 1;
        if (ultimoSeguimiento && ultimoSeguimiento.nroSeguimiento) {
            const ultimoNumero = parseInt(ultimoSeguimiento.nroSeguimiento.replace('SEG', ''));
            nuevoNumero = ultimoNumero + 1;
        }
        
        const nro_seguimiento = `SEG${nuevoNumero.toString().padStart(3, '0')}`;

        const nuevoSeguimiento = await Seguimiento.create({
            nroSeguimiento: nro_seguimiento,
            codPedido: cod_pedido,
            fechaCambio: new Date(),
            estado: estado
        } as any);

        return res.json({
            success: true,
            message: estado ? 'Pedido marcado como en tránsito' : 'Pedido marcado como no en tránsito',
            data: nuevoSeguimiento,
            codigo_generado: nuevoSeguimiento.nroSeguimiento
        });

    } catch (error: any) {
        console.error('Error al crear seguimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// OBTIENE TODOS LOS REGISTROS DE SEGUIMIENTOS
export const obtenerSeguimientos = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, cod_pedido, estado, fecha_inicio, fecha_fin } = req.query;

        const whereClause: any = {};

        if (cod_pedido) {
            whereClause.codPedido = cod_pedido;
        }

        if (estado !== undefined) {
            whereClause.estado = estado === 'true';
        }

        // FILTRO POR FECHA
        if (fecha_inicio || fecha_fin) {
            whereClause.fechaCambio = {};
            if (fecha_inicio) {
                whereClause.fechaCambio[Op.gte] = new Date(fecha_inicio as string);
            }
            if (fecha_fin) {
                whereClause.fechaCambio[Op.lte] = new Date(fecha_fin as string);
            }
        }

        const seguimientos = await Seguimiento.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Pedido,
                    attributes: ['codPedido'] 
                }
            ],
            order: [['fechaCambio', 'DESC']],
            limit: Number(limit),
            offset: (Number(page) - 1) * Number(limit)
        });

        return res.json({
            success: true,
            data: {
                seguimientos: seguimientos.rows,
                total: seguimientos.count,
                pagina: Number(page),
                totalPaginas: Math.ceil(seguimientos.count / Number(limit))
            }
        });

    } catch (error: any) {
        console.error('Error al obtener seguimientos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// OBTENER EL SEGUIMIENTO POR NUMERO DE SEGUIMIENTO
export const obtenerSeguimientoPorId = async (req: Request, res: Response) => {
    try {
        const { nro_seguimiento } = req.params;

        const seguimiento = await Seguimiento.findByPk(nro_seguimiento, {
            include: [
                {
                    model: Pedido,
                    attributes: ['codPedido'] 
                }
            ]
        });

        if (!seguimiento) {
            return res.status(404).json({
                success: false,
                message: 'Seguimiento no encontrado'
            });
        }

        return res.json({
            success: true,
            data: seguimiento
        });

    } catch (error: any) {
        console.error('Error al obtener seguimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// OBTENER EL HISTORIA DE SEGUIMIENTO
export const obtenerHistorialPedido = async (req: Request, res: Response) => {
    try {
        const { cod_pedido } = req.params;

        // Verificar que el pedido existe
        const pedido = await Pedido.findByPk(cod_pedido);
        if (!pedido) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        const historial = await Seguimiento.findAll({
            where: { codPedido: cod_pedido },
            order: [['fechaCambio', 'ASC']] //POR ORDEN CRONOLOGICO
        });

        // DETERMINAR EL ESTADO ACTUAL
        const estadoActual = historial.length > 0 ? historial[historial.length - 1].estado : null;

        return res.json({
            success: true,
            data: {
                pedido: cod_pedido,
                estado_actual: estadoActual ? 'En tránsito' : 'No en tránsito',
                total_registros: historial.length,
                historial: historial
            }
        });

    } catch (error: any) {
        console.error('Error al obtener historial del pedido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// ACTUALIZAR EL ESTADO DE SEGUIMIENTO
export const actualizarEstadoSeguimiento = async (req: Request, res: Response) => {
    try {
        const { nro_seguimiento } = req.params;
        const { estado } = req.body;

        if (estado === undefined) {
            return res.status(400).json({
                success: false,
                message: 'El campo estado es requerido'
            });
        }

        const seguimiento = await Seguimiento.findByPk(nro_seguimiento);
        if (!seguimiento) {
            return res.status(404).json({
                success: false,
                message: 'Seguimiento no encontrado'
            });
        }

        // ACTUALIZAR ESTADO Y FECHA DE CMABIO
        seguimiento.estado = estado;
        seguimiento.fechaCambio = new Date();
        await seguimiento.save();

        return res.json({
            success: true,
            message: estado ? 'Pedido marcado como en tránsito' : 'Pedido marcado como no en tránsito',
            data: seguimiento
        });

    } catch (error: any) {
        console.error('Error al actualizar estado de seguimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// ELIMINAR REGISTRO DE SEGUIMIENTO
export const eliminarSeguimiento = async (req: Request, res: Response) => {
    try {
        const { nro_seguimiento } = req.params;

        const seguimiento = await Seguimiento.findByPk(nro_seguimiento);
        if (!seguimiento) {
            return res.status(404).json({
                success: false,
                message: 'Seguimiento no encontrado'
            });
        }

        await seguimiento.destroy();

        return res.json({
            success: true,
            message: 'Seguimiento eliminado correctamente'
        });

    } catch (error: any) {
        console.error('Error al eliminar seguimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};