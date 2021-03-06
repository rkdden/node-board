const Sequelize = require('sequelize');

// 게시글번호 : id  // 시퀄라이즈 기본 아이디
// 제목 : title     // 필수, 최대 50자
// 내용 : content   // 필수, 최대 200자
// 작성자 : UserId  // 관계로 처리
// 조회수 : view    // 라우터에서 중복처리
// 작성일 : createdAt   //자동
// 수정일 : updateAt    //자동

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            view: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db) {
        db.Post.belongsTo(db.User); // Post테이블 N : 1 User테이블
        db.Post.hasMany(db.Comment); // Post테이블 1 : N Comment테이블
        db.Post.belongsToMany(db.User, { through: 'Recommand', as: 'Recommander'}); // Post테이블 N : M User테이블
    }
};