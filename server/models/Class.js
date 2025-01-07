const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/db');
const Department = require('./Department');

const Class = sequelize.define('Class', {
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
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Class.createFakeData = async function() {
  await Class.bulkCreate([
    { name: 'CS101', department_id: 1 },
    { name: 'MATH101', department_id: 2 },
    { name: 'PHYS101', department_id: 3 },
  ]);
};

Class.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(Class, { foreignKey: 'department_id' });

module.exports = Class;
