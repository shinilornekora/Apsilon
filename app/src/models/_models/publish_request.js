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