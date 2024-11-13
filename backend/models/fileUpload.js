'use strict';
module.exports = (sequelize, type) => {
    const fileUpload = sequelize.define('fileUpload', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        file_name: type.STRING,
        file: type.STRING,
    }, {});
    fileUpload.associate = function(models) { 
    };
    return fileUpload;
};