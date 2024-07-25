'use strict';
module.exports = (sequelize, type) => {
    const accountClosingEO = sequelize.define('accountClosingEO', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        closing_type: type.STRING,
        claim_for: type.STRING,
        type_of_ac: type.STRING,
        specify: type.STRING,
        new_ac_no: type.STRING,
        open_date: type.STRING,
        end_date: type.STRING,
        claiming_ac_holder_name: type.STRING,
        claiming_ac_no: type.STRING,
        claiming_c_id: type.STRING,
        claiming_opening_date: type.STRING,
        claiming_closing_date: type.STRING,
        claiming_agent_name: type.STRING,
        claiming_code: type.STRING,
        claiming_branch_name: type.STRING,
        nominee_name: type.STRING,
        address: type.STRING,
        cause: type.STRING,
        bank_name: type.STRING,
        br_name: type.STRING,
        name_ac: type.STRING,
        ac_no: type.STRING,
        ifsc: type.STRING,


        passbook_lakhimi: type.STRING,
        passbook_bank: type.STRING,


        reference_no: type.STRING,
        fwd_status: type.STRING,

        fa_status: type.STRING,
        apply_date: { type: 'DATE' },

        closing_status: type.STRING,
        closing_approve_date: { type: 'DATE' },

        bm_status: type.STRING,
        bm_reason: type.STRING,
        bm_fwd_date: { type: 'DATE' },

        lo_status: type.STRING,
        lo_reason: type.STRING,
        lo_fwd_date: { type: 'DATE' },

        md_status: type.STRING,
        md_reason: type.STRING,
        md_fwd_date: { type: 'DATE' },

        cm_status: type.STRING,
        cm_reason: type.STRING,
        cm_fwd_date: { type: 'DATE' },

}, {});
accountClosingEO.associate = function(models) {
    // associations can be defined here
    accountClosingEO.belongsTo(models.brunch);
    accountClosingEO.belongsTo(models.users);
   
};
return accountClosingEO;
};