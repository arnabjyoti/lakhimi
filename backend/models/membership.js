'use strict';
module.exports = (sequelize, type) => {
    const membership = sequelize.define('membership', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        path: type.STRING,
        f_name: type.STRING,
        m_name: type.STRING,
        l_name: type.STRING,
        fathers_name: type.STRING,
        address: type.STRING,
        dob: { type: 'DATE' },
        gender: type.STRING,
        purpose: type.STRING,
        occupation: type.STRING,
        introducer: type.STRING,
        introducer_id: type.STRING,
        email: type.STRING,
        phone_no: type.STRING,
        membership_id: type.STRING,
        reference_no: type.STRING,
        entered_by: type.STRING,
        status: type.STRING,
        panNo: type.STRING,
        panCard: type.STRING,
        adharNo: type.STRING,
        photo: type.STRING,
        sign: type.STRING,
        adharCard: type.STRING,
        remark: type.STRING,
        eOfficeAcNo: type.STRING,
    }, {});
    membership.associate = function(models) {
        // associations can be defined here
        membership.belongsTo(models.users);
        membership.belongsTo(models.brunch);
        membership.hasMany(models.account);
        membership.hasMany(models.loans);
        membership.hasMany(models.expressloans);
    };
    return membership;
};