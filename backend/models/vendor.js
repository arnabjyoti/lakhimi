'use strict';

module.exports = (sequelize, type) => {
    const vendors = sequelize.define('vendors', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shop_name: type.STRING,
        proprietor_name: type.STRING,
        contact_number_1: type.STRING,
        contact_number_2: type.STRING,
        contact_number_3: type.STRING,
        gst_number: type.STRING,
        ac_name: type.STRING,
        ac_number: type.STRING,
        ifsc: type.STRING,
        bank_name: type.STRING,
        bank_branch: type.STRING,
        address: type.STRING,
        city: type.STRING,
        p_o: type.STRING,
        district: type.STRING,
        state: type.STRING,
        pin_code: type.STRING,
        shop_photo: type.STRING,
        proprietor_photo: type.STRING,
        trade_license: type.STRING,
        gst_certificate: type.STRING,
        bank_stmnt: type.STRING,
        reference_number: type.STRING,
        status: type.STRING,
        remark: type.STRING,
        created_by: type.INTEGER
    }, {});
    vendors.associate = function(models) {
        vendors.belongsTo(models.brunch);
        vendors.hasMany(models.expressloans);
    };

    return vendors;
};