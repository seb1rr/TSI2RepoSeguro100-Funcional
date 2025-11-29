import { Table, Column, Model, DataType, BeforeCreate } from "sequelize-typescript";

@Table({ tableName: "pedido" })
export class Pedido extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    allowNull: false,
    field: "cod_pedido",
  })
  declare cod_pedido: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: "fecha",
  })
  declare fecha: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: "estado",
  })
  declare estado: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "total",
  })
  declare total: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
    field: "comprobante",
  })
  declare comprobante?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    field: "empresa_envio",
  })
  declare empresa_envio?: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: "fecha_envio",
  })
  declare fecha_envio?: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: "fecha_entrega",
  })
  declare fecha_entrega?: Date;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: "cantidad",
  })
  declare cantidad?: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: "anulado",
  })
  declare anulado?: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: "fecha_pedido",
  })
  declare fecha_pedido?: Date;

  // GENERA CODIGO AUTOMATICAMENTE ANTES DE CREAR
  @BeforeCreate
  static async generarCodigo(pedido: Pedido) {
    if (!pedido.cod_pedido) {
      const ultimoPedido = await Pedido.findOne({
        order: [['cod_pedido', 'DESC']]
      });
      
      let nuevoNumero = 1;
      if (ultimoPedido && ultimoPedido.cod_pedido) {
        const ultimoNumero = parseInt(ultimoPedido.cod_pedido.replace('PED', ''));
        nuevoNumero = ultimoNumero + 1;
      }
      
      pedido.cod_pedido = `PED${nuevoNumero.toString().padStart(3, '0')}`;
    }
  }
}

export default Pedido;