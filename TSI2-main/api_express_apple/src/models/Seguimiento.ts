import { Column, Model, Table, DataType, ForeignKey, BelongsTo, BeforeCreate } from "sequelize-typescript";
import Pedido from "./Pedido"; 

@Table({ tableName: "seguimiento" })
class Seguimiento extends Model {
    @Column({ 
        type: DataType.STRING(10), 
        primaryKey: true, 
        allowNull: false, 
        field: "nro_seguimiento" 
    })
    declare nroSeguimiento: string;

    @ForeignKey(() => Pedido)
    @Column({ 
        type: DataType.STRING(20), 
        allowNull: false, 
        field: "cod_pedido" 
    })
    declare codPedido: string;

    @Column({ 
        type: DataType.DATE, 
        allowNull: false, 
        field: "fecha_cambio" 
    })
    declare fechaCambio: Date;

    @Column({ 
        type: DataType.BOOLEAN, 
        allowNull: false, 
        field: "estado" 
    })
    declare estado: boolean;

    // RELACION CON LA TABLA PEDIDO
    @BelongsTo(() => Pedido)
    declare pedido: Pedido;

    // GENERAMOS EL CODIGO AUTOMATICAMENTE
    @BeforeCreate
    static async generarCodigo(seguimiento: Seguimiento) {
        if (!seguimiento.nroSeguimiento) {
            const ultimoSeguimiento = await Seguimiento.findOne({
                order: [['nro_seguimiento', 'DESC']]
            });
            
            let nuevoNumero = 1;
            if (ultimoSeguimiento && ultimoSeguimiento.nroSeguimiento) {
                const ultimoNumero = parseInt(ultimoSeguimiento.nroSeguimiento.replace('SEG', ''));
                nuevoNumero = ultimoNumero + 1;
            }
            
            seguimiento.nroSeguimiento = `SEG${nuevoNumero.toString().padStart(3, '0')}`;
        }
    }
}

export default Seguimiento;