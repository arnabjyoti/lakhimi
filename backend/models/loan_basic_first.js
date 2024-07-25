'use strict';
module.exports = (sequelize, type) => {
    const loan_basic_first = sequelize.define('loan_basic_first', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        l_loan_scheme: type.STRING,
        l_loan_scheme_intrst: type.STRING,
        l_aapply_amount: type.STRING,
        l_expected_month: type.STRING,
        l_mode_repay: type.STRING,
        l_customer_id: type.STRING,
        l_share_amt: type.STRING,
        l_br_name:type.STRING,
        l_fresh_loan: type.STRING,
        l_last_loan_amt: type.STRING,
        l_last_purpose: type.STRING,
        l_deposit_acNo: type.STRING,
        l_deposit_balance: type.STRING,
        l_deposit_scheme: type.STRING,
        l_deposit_status: type.STRING,
        l_deposit_maturity: { type: 'DATE' },
        l_deposit_acNo1: type.STRING,
        l_deposit_balance1: type.STRING,
        l_deposit_scheme1: type.STRING,
        l_deposit_status1: type.STRING,
        l_deposit_maturity1: { type: 'DATE' },
        l_deposit_acNo2: type.STRING,
        l_deposit_balance2: type.STRING,
        l_deposit_scheme2: type.STRING,
        l_deposit_status2: type.STRING,
        l_deposit_maturity2: { type: 'DATE' },
        l_deposit_acNo3: type.STRING,
        l_deposit_balance3: type.STRING,
        l_deposit_scheme3: type.STRING,
        l_deposit_status3: type.STRING,
        l_deposit_maturity3: { type: 'DATE' },
        l_deposit_acN4: type.STRING,
        l_deposit_balance4: type.STRING,
        l_deposit_schem4: type.STRING,
        l_deposit_statu4: type.STRING,
        l_deposit_maturit4: type.STRING,
        l_income_proof: type.STRING,
        l_bank_stmnt: type.STRING,
        l_occu_proof: type.STRING,
        l_goods_type: type.STRING,
        l_brand_name: type.STRING,
        l_model_no: type.STRING,
        l_goods_colour: type.STRING,
        l_warrentee: type.STRING,

    }, {});
    loan_basic_first.associate = function(models) {
        // associations can be defined here
        loan_basic_first.belongsTo(models.loans)
    };
    return loan_basic_first;
};