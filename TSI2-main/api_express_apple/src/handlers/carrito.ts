import { Request, Response } from 'express';
import Carrito from '../models/Carrito';
import Producto from '../models/Producto';

export const agregarProductoAlCarrito = async (req: Request, res: Response) => {
    try {
        const { cod_usuario, cod_producto, cantidad, cod_pedido } = req.body;

        // Verificar que los campos requeridos estén presentes
        if (!cod_usuario || !cod_producto || !cantidad) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: cod_usuario, cod_producto, cantidad'
            });
        }

        console.log('🔍 Buscando producto:', cod_producto);

        // Verificar si el producto existe
        const producto = await Producto.findByPk(cod_producto);
        if (!producto) {
            console.log('❌ Producto no encontrado:', cod_producto);
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        // Verificar stock disponible
        if (producto.stock < cantidad) {
            return res.status(400).json({
                success: false,
                message: `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles`
            });
        }

        // Verificar si el MISMO producto ya está en el carrito del usuario
        const itemExistente = await Carrito.findOne({
            where: { 
                cod_usuario, 
                cod_producto,
                cod_pedido: cod_pedido || null 
            }
        });

        if (itemExistente) {
            console.log('🔄 Producto ya existe en carrito, actualizando cantidad');
            
            // Verificar stock para la nueva cantidad total
            const nuevaCantidadTotal = itemExistente.cantidad + cantidad;
            if (producto.stock < nuevaCantidadTotal) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente. No puedes agregar ${cantidad} más. Stock disponible: ${producto.stock}`
                });
            }

            // Actualizar la cantidad del producto existente
            itemExistente.cantidad = nuevaCantidadTotal;
            await itemExistente.save();
            
            console.log('✅ Cantidad actualizada para producto existente');
            return res.json({
                success: true,
                message: 'Cantidad actualizada en el carrito',
                data: itemExistente
            });
        } else {
            console.log('🆕 Creando NUEVO producto en carrito');
            
            const nuevoItem = await Carrito.create({
                cod_usuario: cod_usuario,
                cod_producto: cod_producto,
                cantidad: cantidad,
                precio_unitario: producto.precioUnitario,
                cod_pedido: cod_pedido || null
            }, {
                fields: ['cod_usuario', 'cod_producto', 'cantidad', 'precio_unitario', 'cod_pedido'] // Especificar campos explícitamente
            } as any);

            console.log('✅ NUEVO producto agregado al carrito:', nuevoItem);
            return res.json({
                success: true,
                message: 'Producto agregado al carrito',
                data: nuevoItem
            });
        }
    } catch (error: any) {
        
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const obtenerCarritoUsuario = async (req: Request, res: Response) => {
    try {
        const { cod_usuario } = req.params;
        // Ahora cod_pedido viene por query string en lugar de parámetro de ruta
        const { cod_pedido } = req.query;

        const whereClause: any = { cod_usuario };
        if (cod_pedido) {
            whereClause.cod_pedido = cod_pedido;
        }

        const carrito = await Carrito.findAll({
            where: whereClause,
            include: [{
                model: Producto,
                attributes: ['nombre', 'descripcion', 'imagen', 'stock']
            }]
        });

        // Calcular total
        const total = carrito.reduce((sum, item) => {
            return sum + (item.cantidad * item.precio_unitario);
        }, 0);

        return res.json({
            success: true,
            data: {
                items: carrito,
                total: total,
                cantidadItems: carrito.length
            }
        });
    } catch (error) {
        console.error('❌ Error al obtener carrito:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Actualizar cantidad de producto en carrito
export const actualizarCantidad = async (req: Request, res: Response) => {
    try {
        const { cod_carrito } = req.params;
        const { cantidad } = req.body;

        const item = await Carrito.findByPk(cod_carrito);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado en el carrito'
            });
        }

        if (cantidad <= 0) {
            // Si la cantidad es 0 o menor, eliminar el item
            await item.destroy();
            return res.json({
                success: true,
                message: 'Producto eliminado del carrito'
            });
        }

        item.cantidad = cantidad;
        await item.save();

        return res.json({
            success: true,
            message: 'Cantidad actualizada',
            data: item
        });
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Eliminar producto del carrito
export const eliminarProductoDelCarrito = async (req: Request, res: Response) => {
    try {
        const { cod_carrito } = req.params;

        const item = await Carrito.findByPk(cod_carrito);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado en el carrito'
            });
        }

        await item.destroy();

        return res.json({
            success: true,
            message: 'Producto eliminado del carrito'
        });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Vaciar carrito completo
export const vaciarCarrito = async (req: Request, res: Response) => {
    try {
        const { cod_usuario, cod_pedido } = req.body;

        await Carrito.destroy({
            where: { 
                cod_usuario,
                ...(cod_pedido && { cod_pedido })
            }
        });

        return res.json({
            success: true,
            message: 'Carrito vaciado correctamente'
        });
    } catch (error) {
        console.error('Error al vaciar carrito:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

