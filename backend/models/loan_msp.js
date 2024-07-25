'use strict';
module.exports = (sequelize, type) => {
    const loan_msp = sequelize.define('loan_msp', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        msp_name: type.STRING,
        msp_nick_name: type.STRING,
        msp_permanent_rsd: type.STRING,
        msp_temporary_rsd: type.STRING,
        msp_resident: type.STRING,
        msp_bsns_resident: type.STRING,
        msp_bsns_type: type.STRING,
        msp_knwn_since: { type: 'DATE' },
        msp_owner_bsns: type.STRING,
        msp_bsns_coFndr: type.STRING,
        msp_estbls_name: type.STRING,
        msp_mltpl_bsns: type.STRING,
        msp_stock_value: type.STRING,
        msp_size_bsns: type.STRING,
        no_of_ac: type.STRING,
        msp_reg_deposit: type.STRING,
        msp_reg_deposit_bsns: type.STRING,
        msp_intrst_savings: type.STRING,
        msp_reg_intrst_loan: type.STRING,
        msp_aprx_incm: type.STRING,
        msp_cordnt: type.STRING,
        msp_behaviour: type.STRING,
        msp_inters_us: type.STRING,
        msp_service_satisfied: type.STRING,
        msp_thnk_abt_us: type.STRING,
        msp_criminal_hstry: type.STRING,
        msp_financ_knwldg: type.STRING,
        msp_mind_belief: type.STRING,
        msp_literate: type.STRING,
        msp_code: type.STRING,
        msp_branch_name: type.STRING,
        msp_apply_date: { type: 'DATE' },
        msp_place: type.STRING,
    }, {});
    loan_msp.associate = function(models) {
        // associations can be defined here
        loan_msp.belongsTo(models.loans)
    };
    return loan_msp;
};