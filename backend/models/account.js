'use strict';
module.exports = (sequelize, type) => {
    const account = sequelize.define('account', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_no: type.STRING,
        class: type.STRING,
        classPrice: type.STRING,
        classAdminFee: type.STRING,
        nomineeName: type.STRING,
        nomineeDOB: { type: 'DATE' },
        nomineeGender: type.STRING,
        nomineePhnoe: type.STRING,
        nomineeRelation: type.STRING,
        opening_balance: type.STRING,
        type: type.STRING,
        scheme: type.STRING,
        dep_period: type.STRING,
        dep_frequency: type.STRING,
        startDate: { type: 'DATE' },
        endDate: { type: 'DATE' },
        first_instlmnt: type.STRING,
        openingFee: type.STRING,
        brName: type.STRING,
        csp_msp: type.STRING,
        ac_name: type.STRING,
        ac_type: type.STRING,
        ac_no: type.STRING,
        ac_ifsc: type.STRING,
        ac_bankName: type.STRING,
        ac_brName: type.STRING,
        status: type.STRING,
        reference_no: type.STRING,
        remark: type.STRING,
        account_closing_date: { type: 'DATE' }
    }, {});
    account.associate = function(models) {
        // associations can be defined here
        account.belongsTo(models.users);
        account.belongsTo(models.brunch);
        account.belongsTo(models.membership);
    };
    return account;
};