'use strict';
module.exports = (sequelize, type) => {
    const loan_basic_second = sequelize.define('loan_basic_second', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        l_employee_type: type.STRING,
        l_emp_emp_type: type.STRING,
        l_emp_mode_salary: type.STRING,
        l_emp_net_salary: type.STRING,
        l_emp_othr_incm: type.STRING,
        l_self_bsns_type: type.STRING,
        l_self_bsns_start: { type: 'DATE' },
        l_self_prfsn: type.STRING,
        l_self_practice_start: { type: 'DATE' },
        l_emp_anual_incm: type.STRING,
        l_emp_anual_expnd: type.STRING,
        l_emp_net_income: type.STRING,
        l_self_reg_no: type.STRING,
        l_emp_name: type.STRING,
        l_emp_loan_amnt: type.STRING,
        l_emp_emi: type.STRING,
        l_emp_balance: type.STRING,
        l_emp_startDate: { type: 'DATE' },
        l_emp_name1:type.STRING,
        l_emp_loan_amnt1: type.STRING,
        l_emp_emi1: type.STRING,
        l_emp_balance1: type.STRING,
        l_emp_startDate1: { type: 'DATE' },
        l_emp_name2: type.STRING,
        l_emp_loan_amnt2: type.STRING,
        l_emp_emi2: type.STRING,
        l_emp_balance2: type.STRING,
        l_emp_startDate2: { type: 'DATE' },
        l_emp_name3: type.STRING,
        l_emp_loan_amnt3: type.STRING,
        l_emp_emi3: type.STRING,
        l_emp_balance3: type.STRING,
        l_emp_startDate3: { type: 'DATE' },
        l_emp_name4: type.STRING,
        l_emp_loan_amnt4: type.STRING,
        l_emp_emi4: type.STRING,
        l_emp_balance4: type.STRING,
        l_emp_startDate4: { type: 'DATE' },
        l_make: type.STRING,
        l_model: type.STRING,
        l_colour: type.STRING,
        l_engine_no: type.STRING,
        l_chassis_no: type.STRING,
        l_ac_name: type.STRING,
        l_ac_type: type.STRING,
        l_ac_no: type.STRING,
        l_ac_ifsc: type.STRING,
        l_ac_bankName: type.STRING,
        l_ac_brName: type.STRING,
    }, {});
    loan_basic_second.associate = function(models) {
        // associations can be defined here
        loan_basic_second.belongsTo(models.loans)
    };
    return loan_basic_second;
};