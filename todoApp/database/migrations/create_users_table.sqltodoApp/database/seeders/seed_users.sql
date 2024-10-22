todoApp/database/migrations/create_users_table.sql

const { Model, DataTypes, Sequelize } = require('sequelize');
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }
}
module.exports = User;

js
// File: todoApp/database/seeders/seed_users.sql

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', []),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
