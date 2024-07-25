'use strict';
module.exports = (sequelize, type) => {
    const users = sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        f_name: type.STRING,
        m_name: type.STRING,
        l_name: type.STRING,
        position: type.STRING,
        designation: type.STRING,
        email: type.STRING,
        phone_no: type.STRING,
        address: type.STRING,
        avatar: {
            type: type.STRING,
            default: 'storage/default.png'
        },
        password: type.STRING,
        temp_password: type.STRING,
        role: type.STRING,
        active: type.STRING,
        rememberToken: type.STRING,
        accessKeyword: type.STRING,
        createdBy: type.INTEGER,
    }, {});
    users.associate = function(models) {
        // associations can be defined here
        users.hasMany(models.brunchMaster);
        users.hasMany(models.cashierMaster);
        users.hasMany(models.membership);
        users.hasMany(models.account);
        users.hasMany(models.loans);
        users.hasMany(models.expressloans);
        users.hasMany(models.accountClosingEO);
        users.hasMany(models.cashCounterPayment); 
    };
    return users;
};