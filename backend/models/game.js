'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        published: DataTypes.BOOLEAN,
        createdAt: {
            type: 'TIMESTAMP',
        },
        updatedAt: {
            type: 'TIMESTAMP',
        }
    }, {});

    Game.associate = function (models) {
        // associations can be defined here
        Game.hasMany(models.Step)
    };

    return Game;
};
