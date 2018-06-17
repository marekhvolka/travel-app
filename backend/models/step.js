'use strict';
module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define('Step', {
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
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
        },
        updatedAt: {
            type: 'TIMESTAMP',
        }
    }, {});

    Step.associate = function (models) {
        // associations can be defined here

        Step.belongsTo(models.Game);
    };

    return Step;
};
