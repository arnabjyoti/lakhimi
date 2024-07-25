'use strict';
module.exports = (sequelize, type) => {
    const loan_post_dated = sequelize.define('loan_post_dated', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        c_bank_name: type.STRING,
        c_br_name: type.STRING,
        c_account: type.STRING,
        c_name_in_ac: type.STRING,
        c_micr: type.STRING,
        c_ck_leave: type.STRING,
        c_commencement: { type: 'DATE' },
        c_ck_number: type.STRING,
        c_ck_amnt: type.STRING,
    }, {});
    loan_post_dated.associate = function(models) {
        // associations can be defined here
        loan_post_dated.belongsTo(models.loans)
    };
    return loan_post_dated;
};