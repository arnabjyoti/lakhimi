'use strict';

module.exports = (sequelize, type) => {
    const cashierMaster = sequelize.define('cashierMaster', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // brunchId: type.INTEGER,
        // userId: type.INTEGER,
        doj: { type: 'DATE' },
        dor: { type: 'DATE' },
        status: type.STRING,
    }, {});
    cashierMaster.associate = function(models) {
        // associations can be defined here
        cashierMaster.belongsTo(models.brunch);
        cashierMaster.belongsTo(models.users);
    };

    return cashierMaster;
};