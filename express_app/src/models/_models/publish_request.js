const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    },
    templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'templates',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}