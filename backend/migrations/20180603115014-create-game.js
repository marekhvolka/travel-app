'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            published: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Games');
    }
};
