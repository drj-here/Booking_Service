'use strict';
const { Model, DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Booking.init(
    {
      flightId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull:false,
        values:['Inprocess','Booked','Cancelled'],
        defaultValue:'Inprocess'
      },
      noOfSeats:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
      },
      totalCost:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      }
      
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
