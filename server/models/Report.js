const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  report_data: {
    type: DataTypes.JSON, // Lưu dữ liệu báo cáo dưới dạng JSON
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Report;
