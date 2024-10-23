**todoApp/database/migrations/create_tasks_table.sql**

const { Model, DataTypes, Sequelize } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Task',
      timestamps: false
    });
  }
}

module.exports = Task;

**todoApp/database/seeders/seed_tasks.sql**

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tasks', [
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tasks', null, {})
};
