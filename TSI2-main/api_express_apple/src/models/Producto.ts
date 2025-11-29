import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Categoria from "./Categoria";
import Carrito from "./Carrito";

@Table({tableName: "productos"})
class Producto extends Model{
    @Column({type: DataType.STRING(10), primaryKey: true, allowNull: false, field: "cod_producto"})
    declare codProducto: string

    @Column({type: DataType.STRING(20)})
    declare nombre: string

    @Column({type: DataType.STRING(40)})
    declare descripcion: string

    @Column({type: DataType.FLOAT, field: "precio_unitario"})
    declare precioUnitario: number

    @Column({type: DataType.TINYINT})
    declare stock: number

    @Column({type: DataType.STRING(100)})
    declare imagen: string

    @Column({type: DataType.STRING(10), allowNull: false, field: "cod_categoria"})
    @ForeignKey(() => Categoria)
    declare codCategoria: string

    @BelongsTo(() => Categoria)
    declare categoria: Categoria

    @HasMany(() => Carrito)
    declare carritos: Carrito[];
}

export default Producto