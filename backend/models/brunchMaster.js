'use strict';

module.exports = (sequelize, type) => {
    const brunchMaster = sequelize.define('brunchMaster', {
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
    brunchMaster.associate = function(models) {
        // associations can be defined here
        brunchMaster.belongsTo(models.brunch);
        brunchMaster.belongsTo(models.users);
    };

    return brunchMaster;
};