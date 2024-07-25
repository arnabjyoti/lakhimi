'use strict';
module.exports = (sequelize, type) => {
    const loan_nominee = sequelize.define('loan_nominee', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        n_nominee_name: type.STRING,
        n_fathers_name: type.STRING,
        n_dob: { type: 'DATE' },
        n_gender: type.STRING,
        n_adhar: type.STRING,
        n_pnone_no: type.STRING,
        n_pan: type.STRING,
        n_email: type.STRING,
        n_address: type.STRING,
        n_relation: type.STRING,
        n_margin: type.STRING,
        n_margin_qty: type.STRING,
        n_margin_value: type.STRING,
        n_gold: type.STRING,
        n_gold_qty: type.STRING,
        n_gold_value: type.STRING,
        n_land: type.STRING,
        n_land_qty: type.STRING,
        n_land_value: type.STRING,
        n_land_buildings: type.STRING,
        n_land_buildings_qty: type.STRING,
        n_land_buildings_value: type.STRING,
        n_photo: type.STRING,
        n_id_proof: type.STRING,
        n_sign: type.STRING,
        n_address_proof: type.STRING,
        n_FS: type.STRING,

    }, {});
    loan_nominee.associate = function(models) {
        // associations can be defined here
        loan_nominee.belongsTo(models.loans)
    };
    return loan_nominee;
};