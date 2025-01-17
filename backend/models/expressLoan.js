'use strict';
module.exports = (sequelize, type) => {
    const expressloans = sequelize.define('expressloans', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        full_name: type.STRING,
        l_emp_type: type.STRING,
        l_annual_incm: type.STRING,
        l_product_ategory: type.STRING,
        l_make: type.STRING,
        l_model: type.STRING,
        l_serial_no: type.STRING,
        l_vendor: type.STRING,
        l_product_cost: type.STRING,
        l_down_payment_amount: type.STRING,
        l_processing_fee: type.STRING,
        l_tenure: type.STRING,
        l_roi: type.STRING,
        l_EMI_amount: type.STRING,

        intro_name: type.STRING,
        intro_email: type.STRING,
        intro_telephone: type.STRING,
        intro_phone: type.STRING,
        intro_gender: type.STRING,
        intro_age: type.STRING,
        intro_address: type.STRING,

        share_fee: type.STRING,
        share_admsn_fee: type.STRING,
        ac_admsn_fee: type.STRING,
        insrnc: type.STRING,
        nach: type.STRING,
        emi_card_fee: type.STRING,
        l_total_return_amnt: type.STRING,
        emi_amnt: type.STRING,
        adv_emi: type.STRING,

        product_photo: type.STRING,
        incm_prf: type.STRING,


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
expressloans.associate = function(models) {
    // associations can be defined here
    expressloans.belongsTo(models.brunch);
    expressloans.belongsTo(models.users);
    expressloans.belongsTo(models.membership);
    expressloans.belongsTo(models.vendors);
};
return expressloans;
};