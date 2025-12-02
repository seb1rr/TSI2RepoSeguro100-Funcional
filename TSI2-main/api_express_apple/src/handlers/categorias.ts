import { Request, Response } from "express"
import Categoria from "../models/Categoria"
import { Sequelize } from "sequelize-typescript"
import Producto from "../models/Producto"

//MUESTRA TODAS LAS CATEGORIAS
export const getCategoria = async(request:Request, response:Response)=>{
    const categorias = await Categoria.findAll()
    response.json({ data: categorias })
}

//MUESTRA TODAS LAS CATEGORIAS CON CUANTOS PRODUCTOS TIENE CADA UNA
export const getCategoriaConCantidadProductos = async(request:Request, response:Response)=>{
    const categorias = await Categoria.findAll({
        attributes: ["cod_categoria", "nombre", [ Sequelize.fn("COUNT", Sequelize.col("productos.cod_producto")),"cantidadProductos"]],
        include: [{
            model: Producto,
            required: false, //HACE LEFT JOIN PARA OBTENER LAS CATEGORIAS SIN PRODUCTOS
            attributes: [], //OCULTA LOS CAMPOS DE PRODUCTOS
        },],
        group: ["Categoria.cod_categoria"], //AGRUPAR POR CATEGORIA
    })
    response.json({data:categorias})
}

//MUESTRA INFO DEL PRODUCTO SEGUN SU ID
export const getCategoriaById = async(request:Request, response:Response)=>{
    const {cod_categoria} = request.params
    const categoria = await Categoria.findByPk(cod_categoria, {
        include: [{
            model: Producto,
            attributes: ["nombre"],
            required: false,
        },],
    })
    response.json({ data: categoria})
}

//AGREGA PRODUCTOS
export const agregarCategoria = async(request:Request, response:Response)=>{
    const { nombre, descripcion } = request.body;

    // SE BUSCA LA ULTIMA CATEGORIA CREADA
    const ultimaCategoria = await Categoria.findOne({
      order: [["codCategoria", "DESC"]],
    });

    // SE GENERA EL NUEVO CODIGO
    let nuevoCodigo = "CAT01";
    if (ultimaCategoria) {
      const codigoNum = parseInt(ultimaCategoria.codCategoria.replace("CAT", ""));
      const nuevoNum = codigoNum + 1;
      nuevoCodigo = "CAT" + nuevoNum.toString().padStart(2, "0");
    }

    // SE CREA LA CATEGORIA
    const categoriaNueva = await Categoria.create({
      codCategoria: nuevoCodigo,
      nombre,
      descripcion,
    });

    response.json({ data: categoriaNueva });
}

//EDITA PRODUCTOS
export const editarCategoria = async(request:Request, response:Response)=>{
    const {cod_categoria} = request.params
    const categoria = await Categoria.findByPk(cod_categoria)
    await categoria.update(request.body)
    await categoria.save()
    response.json({ data: categoria})
}

//BORRA PRODUCTOS
export const borrarCategoria = async(request:Request, response:Response)=>{
    const {cod_categoria} = request.params
    const categoria = await Categoria.findByPk(cod_categoria)
    await categoria.destroy()
    response.json({ data: "Categoria Borrada"})
}