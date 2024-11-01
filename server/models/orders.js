import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'orders',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      delivery: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      delivery_address: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      delivery_name: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      delivery_phone: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      order_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      total_price: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: false,
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
