import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";

@Table({tableName: "categorias"})
class Categoria extends Model{
    @Column({type: DataType.STRING(10), primaryKey: true, allowNull: false, field: "cod_categoria"})
    declare codCategoria: string

    @Column({type: DataType.STRING(20)})
    declare nombre: string

    @Column({type: DataType.STRING(40)})
    declare descripcion: string

    @HasMany(() => Producto)
    declare productos: Producto[]
}

export default Categoria