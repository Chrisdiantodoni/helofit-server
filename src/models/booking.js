const { DataTypes } = require("sequelize");
const database = require("../../database");
const userModel = require("./user");

const booking = database.define(
  "booking",
  {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    booking_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

booking.sync({
  alter: false,
});

userModel.hasMany(booking, {
  foreignKey: "userId",
});

booking.belongsTo(userModel);

module.exports = booking;
