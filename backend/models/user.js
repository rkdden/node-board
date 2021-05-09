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
        db.User.hasMany(db.Post); // User테이블 1 : N Post테이블 
        db.User.hasMany(db.Comment); // User테이블 1 : N Comment테이블
        db.User.belongsToMany(db.Post, { through: 'Recommand'}); // User테이블 N : M Post테이블 
    }
};