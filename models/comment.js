const Sequelize = require('sequelize');

// 게시글 번호: PostId  // 관계로 처리
// 작성자 : UserId      // 관계로 처리
// 댓글 : comment       // 필수, 최대 50자
// 작성일 : createdAt   //  자동 생성
// 수정일 : updateAt    //  자동 생성

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            comment: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db) {
        db.Comment.belongsTo(db.User); // Comment테이블 N : 1 User테이블
        db.Comment.belongsTo(db.Post); // Comment테이블 N : 1 Post테이블
    }
};