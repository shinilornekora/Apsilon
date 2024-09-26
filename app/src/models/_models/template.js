const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}