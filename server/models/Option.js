const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Option = sequelize.define('Option', {
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  option_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Option;
