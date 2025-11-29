import { Request, Response } from "express"
import Producto from "../models/Producto"
import Categoria from "../models/Categoria"
import { Op } from "sequelize"

//MUESTRA TODOS LOS PRODUCTOS
export const getProductos = async(request:Request, response:Response)=>{
    const productos = await Producto.findAll()
    response.json({ data: productos })
}

//MUESTRA LOS PRODUCTOS INDICANDO LA CATEGORIA DE CADA UNO
export const getProductosConCantidadProductos = async(request:Request, response:Response)=>{
    const productos = await Producto.findAll({
        attributes: {exclude: ["imagen"]},
        include: [{
            model: Categoria,
            attributes: ["nombre"],
        },],
    })
    response.json({ data:productos})
}

//MUESTRA INFO DEL PRODUCTO SEGUN SU ID
export const getProductoById = async(request:Request, response:Response)=>{
    const {cod_producto} = request.params
    const productos = await Producto.findByPk(cod_producto)
    response.json({ data: productos})
}

//AGREGA PRODUCTOS
export const agregarProductos = async (request: Request, response: Response) => {
  try {
    const { nombre, descripcion, precioUnitario, stock, imagen, codCategoria } = request.body;

    if (!nombre || !codCategoria) {
      return response.status(400).json({ error: "El nombre y codCategoria son obligatorios" });
    }

    if (precioUnitario < 0 || stock < 0) {
      return response.status(400).json({ error: "El precio y el stock no pueden ser negativos" });
    }

    // Definir prefijos por categoría
    const prefijos: Record<string, string> = {
      CAT01: "MAC",
      CAT02: "IPA",
      CAT03: "IPH",
      CAT04: "ACC",
    };

    const prefijo = prefijos[codCategoria];
    if (!prefijo) {
      return response.status(400).json({ error: "Categoría no válida" });
    }

    // Buscar el último producto con ese prefijo
    const ultimoProducto = await Producto.findOne({
      where: {
        codProducto: {
          [Op.like]: `${prefijo}%`,
        },
      },
      order: [["codProducto", "DESC"]],
    });

    // Generar nuevo código
    let nuevoCodigo = `${prefijo}01`;
    if (ultimoProducto && typeof ultimoProducto.codProducto === "string") {
      const match = ultimoProducto.codProducto.match(new RegExp(`^${prefijo}(\\d+)$`));
      if (match) {
        const codigoNum = parseInt(match[1]);
        const nuevoNum = codigoNum + 1;
        nuevoCodigo = `${prefijo}${nuevoNum.toString().padStart(2, "0")}`;
      }
    }

    // Crear el producto
    const nuevoProducto = await Producto.create({
      codProducto: nuevoCodigo,
      nombre,
      descripcion,
      precioUnitario,
      stock,
      imagen,
      codCategoria,
    });

    return response.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al agregar el producto" });
  }
};



//EDITA PRODUCTOS
export const editarProductos = async(request:Request, response:Response)=>{
    const {cod_producto} = request.params
    const producto = await Producto.findByPk(cod_producto)
    await producto.update(request.body)
    await producto.save()
    response.json({ data: producto})
}

//BORRA PRODUCTOS
export const borrarProductos = async (request: Request, response: Response) => {
  const { cod_producto } = request.params;

  const producto = await Producto.findOne({
    where: { codProducto: cod_producto },
  });

  if (!producto) {
    return response.status(404).json({ error: "Producto no encontrado" });
  }

  await producto.destroy();
  response.json({ data: "Producto Borrado" });
};
