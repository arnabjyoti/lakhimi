'use strict';
module.exports = (sequelize, type) => {
    const loans = sequelize.define('loans', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        full_name: type.STRING,
        age: type.STRING,
        a_occupation: type.STRING,
        a_maried: type.STRING,
        a_resident: type.STRING,
        a_stay_since: { type: 'DATE' },
        a_house_owner: type.STRING,
        a_house_owner_phone: type.STRING,
        a_education: type.STRING,
        a_temp_address: type.STRING,
        a_Depend_family: type.STRING,

        reference_no: type.STRING,
        fwd_status: type.STRING,

        fa_status: type.STRING,
        apply_date: { type: 'DATE' },
        apply_amount: type.STRING,

        loan_status: type.STRING,
        loan_approve_date: { type: 'DATE' },
        
        membership_id: type.STRING,
        brunch_name: type.STRING,

        bm_proposed_amnt: type.STRING,
        bm_status: type.STRING,
        bm_reason: type.STRING,
        bm_fwd_date: { type: 'DATE' },

        lo_proposed_amnt: type.STRING,
        lo_status: type.STRING,
        lo_reason: type.STRING,
        lo_fwd_date: { type: 'DATE' },

        md_proposed_amnt: type.STRING,
        md_status: type.STRING,
        md_reason: type.STRING,
        md_fwd_date: { type: 'DATE' },

        cm_proposed_amnt: type.STRING,
        cm_status: type.STRING,
        cm_reason: type.STRING,
        cm_fwd_date: { type: 'DATE' },

}, {});
loans.associate = function(models) {
    // associations can be defined here
    loans.belongsTo(models.brunch);
    loans.belongsTo(models.users);
    loans.belongsTo(models.membership);

    loans.hasOne(models.loan_post_dated);
    loans.hasOne(models.loan_nominee);
    loans.hasOne(models.loan_msp);
    loans.hasOne(models.loan_guarantor);
    loans.hasOne(models.loan_basic_first);
    loans.hasOne(models.loan_basic_second);
    loans.hasOne(models.loan_others);
    
};
return loans;
};