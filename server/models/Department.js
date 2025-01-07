const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

Department.createFakeData = async function() {
  await Department.bulkCreate([
    { name: 'Computer Science' },
    { name: 'Mathematics' },
    { name: 'Physics' },
  ]);
};

module.exports = Department;
