'use strict';
module.exports = (sequelize, type) => {
    const salary = sequelize.define('salary', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        basicPay: type.STRING,
        pA: type.STRING,
        tA: type.STRING,
        GrossSalary: type.STRING,
        PTax: type.STRING,
        insurance: type.STRING,
        eWF: type.STRING,
        canteenFee: type.STRING,
        absentCharge: type.STRING,
        EWFrefund: type.STRING,
        loanEMI: type.STRING,
        Others: type.STRING,
        netSalary: type.STRING,
        entryDate:  type.STRING,
    }, {});
    salary.associate = function(models) {
        // associations can be defined here
        salary.belongsTo(models.users);
    };
    return salary;
};