'use strict';
module.exports = (sequelize, type) => {
    const loan_others = sequelize.define('loan_others', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        sanction_date: { type: 'DATE' },
        sanction_no: type.STRING,
        loan_tenure: type.STRING,
        interest_type: type.STRING,
        amount_of_emi: type.STRING,
        processing_fee: type.STRING,
        number_of_emi: type.STRING,
        sanction_amount:type.STRING,
        mss_super_fee: type.STRING,
        Lapsed_eposit: type.STRING,
        others: type.STRING,
        cheque_leaf_1: type.STRING,
        cheque_leaf_2: type.STRING,
        cheque_leaf_3: type.STRING,
        loanStart: { type: 'DATE' },
        loanEnd: { type: 'DATE' },
    }, {});
    loan_others.associate = function(models) {
        // associations can be defined here
        loan_others.belongsTo(models.loans)
    };
    return loan_others;
};