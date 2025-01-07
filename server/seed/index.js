const sequelize = require('../config/db')({
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
});
const Department = require('../models/Department');
const Class = require('../models/Class');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // This will drop the tables and recreate them
    await Department.createFakeData();
    await Class.createFakeData();
    console.log('Fake data has been created successfully.');
  } catch (error) {
    console.error('Error creating fake data:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
