 
const sequelize = require('./db');
 
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Sử dụng { force: true } chỉ khi phát triển
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    process.exit();
  }
};

syncDatabase();
