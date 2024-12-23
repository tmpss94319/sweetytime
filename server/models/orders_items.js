import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'orders_items',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        commit: '訂單id',
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        commit: '商品id',
      },
      amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        commit: '數量',
      },
      that_time_price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        commit: '該品項總金額',
      },
    },
    {
      sequelize,
      tableName: 'orders_items',
      timestamps: false,
      charset: 'utf8mb4', // 全域性設定 charset
      collate: 'utf8mb4_unicode_ci', // 全域性設定 collate
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}
