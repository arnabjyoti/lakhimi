'use strict';

module.exports = (sequelize, type) => {
    const cashCounterPayment = sequelize.define('cashCounterPayment', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Co_op_ac_no: type.STRING,
        voucer_no: type.STRING,
        amount: type.STRING,
        photo: type.STRING,
        entry_date: { type: 'DATE' },
        status: type.STRING,
    }, {});
    cashCounterPayment.associate = function(models) {
        // associations can be defined here
        cashCounterPayment.belongsTo(models.brunch);
        cashCounterPayment.belongsTo(models.users);
    };

    return cashCounterPayment;
};