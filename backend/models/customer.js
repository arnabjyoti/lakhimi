'use strict';
module.exports = (sequelize, type) => {
    const customers = sequelize.define('customers', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        f_name: type.STRING,
        m_name: type.STRING,
        l_name: type.STRING,
        email: type.STRING,
        phone_no: type.STRING,
        role: type.STRING,
        active: {
            type: type.BOOLEAN,
            default: true
        },
        rememberToken: type.STRING,
        accessKeyword: type.STRING,
    }, {});
    customers.associate = function(models) {
        // associations can be defined here
        
    };
    return customers;
};