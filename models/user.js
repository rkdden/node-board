const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(20),
                allowNull: true,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {

    }
};