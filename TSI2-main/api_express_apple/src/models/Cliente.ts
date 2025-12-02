import { BeforeCreate, Column, Model, DataType, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({tableName: "cliente"})
class Cliente extends Model{
    @Column({type: DataType.STRING(10), primaryKey: true, allowNull: false, field:"cod_usuario"})
    declare codUsuario: string

    @Column({type: DataType.STRING(20), field: "nombre_apellido"})
    declare nombreApellido: string

    @Column({type: DataType.STRING(40)})
    declare correo: string

    @Column({type: DataType.STRING(40)})
    declare direccion: string

    @Column({type: DataType.STRING(12)})
    declare telefono: string

    @Column({type: DataType.STRING(100), allowNull:false})
    declare contraseña: string

    @BeforeCreate
    static async hashPassword(cliente: Cliente){
        cliente.contraseña = await bcrypt.hash(cliente.contraseña, 10)
    }
}

export default Cliente