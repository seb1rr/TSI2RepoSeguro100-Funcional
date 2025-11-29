import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Producto from "./Producto"; 
import Usuario from "./Usuario"; 

@Table({ tableName: "ajustes" })
class Ajuste extends Model {
    @Column({ 
        type: DataType.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        field: "cod_ajuste" 
    })
    declare codAjuste: number;

    @ForeignKey(() => Producto)
    @Column({ 
        type: DataType.STRING, 
        allowNull: false, 
        field: "cod_producto" 
    })
    declare codProducto: string;

    @ForeignKey(() => Usuario)
    @Column({ 
        type: DataType.STRING(10), 
        allowNull: false, 
        field: "cod_usuario" 
    })
    declare codUsuario: string;

    @Column({ 
        type: DataType.BOOLEAN, 
        allowNull: false, 
        field: "tipo_ajuste" 
    })
    declare tipoAjuste: boolean;

    @Column({ 
        type: DataType.INTEGER, 
        allowNull: false, 
        field: "cantidad" 
    })
    declare cantidad: number;

    @Column({ 
        type: DataType.TEXT, 
        allowNull: false, 
        field: "descripcion" 
    })
    declare descripcion: string;

    @Column({ 
        type: DataType.DATE, 
        allowNull: false, 
        field: "fecha" 
    })
    declare fecha: Date;

    // Relaciones
    @BelongsTo(() => Producto)
    declare producto: Producto;

    @BelongsTo(() => Usuario)
    declare usuario: Usuario;
}

export default Ajuste;