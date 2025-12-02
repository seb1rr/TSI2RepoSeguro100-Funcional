import { Column, Model, Table, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey } from "sequelize-typescript";
import Producto from "./Producto";
import Usuario from "./Usuario";

@Table({ 
    tableName: "carrito",
    timestamps: false
})
class Carrito extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER,
        field: "cod_carrito" 
    })
    declare cod_carrito: number;

    @ForeignKey(() => Usuario)
    @Column({ 
        type: DataType.STRING(10), 
        allowNull: false, 
        field: "cod_usuario" 
    })
    declare cod_usuario: string;

    @ForeignKey(() => Producto)
    @Column({ 
        type: DataType.STRING(10), 
        allowNull: false, 
        field: "cod_producto" 
    })
    declare cod_producto: string;

    @Column({ 
        type: DataType.INTEGER,
        allowNull: false, 
        field: "cantidad" 
    })
    declare cantidad: number;

    @Column({ 
        type: DataType.INTEGER,
        allowNull: false, 
        field: "precio_unitario" 
    })
    declare precio_unitario: number;

    @Column({ 
        type: DataType.STRING(10), 
        allowNull: true,
        field: "cod_pedido" 
    })
    declare cod_pedido: string;

    // Relaciones
    @BelongsTo(() => Producto, 'cod_producto')
    declare producto: Producto;

    @BelongsTo(() => Usuario, 'cod_usuario')
    declare usuario: Usuario;
}

export default Carrito;