'use strict';
module.exports = (sequelize, type) => {
    const brunch = sequelize.define('brunch', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brunch_name: type.STRING,
        brunch_code: type.STRING,
        brunch_location: type.STRING,
        brunch_adrs: type.STRING,
        brunch_cntct_no: type.STRING,
        brunch_email: type.STRING,
    }, {});
    brunch.associate = function(models) {
        // associations can be defined here
        brunch.hasMany(models.brunchMaster);
        brunch.hasMany(models.cashierMaster);
        brunch.hasMany(models.membership);
        brunch.hasMany(models.account);
        brunch.hasMany(models.loans);
        brunch.hasMany(models.vendors);
        brunch.hasMany(models.expressloans);
        brunch.hasMany(models.accountClosingEO);
        brunch.hasMany(models.cashCounterPayment);        
    };
    return brunch;
};