const async = require("async");
const brunch = require("../models/brunch");
const fileUploadModel = require("../models").fileUpload;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const request = require('request');
// const env = process.env.NODE_ENV || 'test';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const ExifImage = require('exif').ExifImage;
const Op = require('sequelize').Op;

module.exports = {


    upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        const userFolder = 'files';
				let dest = path.join(config.FILE_UPLOAD_PATH, userFolder);
                console.log("dddddddddddddddddd",dest);
				module.exports.checkDirectory(dest, () => {
					cb(null, dest);
				});
			},
			filename: function(req, file, cb) {
                console.log("xxxxxxxxxxxx", file);
				cb(null, file.originalname);
			}
		})
	}),

    checkDirectory(directory, callback) {
		fs.stat(directory, (err, stats) => {
            console.log("nnnnnnnnnnnnnnnn",directory);
			//Check if error defined and the error code is "not exists"
			if (err && (err.errno === 34 || err.errno === -4058 || err.errno === -2)) {
				console.log('ERROR:  ', err, '   ERROR CODE:  ', err.errno);
				//Create the directory, call the callback.
				console.log('Create ' + directory);
				fs.mkdir(directory, callback);
			} else {
				//just in case there was a different error:
                console.log("cccccccccccccccccccccc");
				console.log('Directory not created ' + directory);
				if (!err) {
					return callback && callback();
				}
				console.log(err);
			}
		});
	},


  createDirectory(project, callback){
    console.log("directory",project.id);
    
    const userFolder = 'files';
    let dest = path.join(config.FILE_UPLOAD_PATH, userFolder);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },



    fileUpload(req, res) {        
        console.log("oooooooooooooooooooooooooo",req.file);
        console.log("jjjjjjjjjjjjjjjjj",req.body.file_name);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                return fileUploadModel
                .create({
                    file_name: req.body.file_name,
                    file: req.file.originalname,
                })
                .then(project => res.status(200).send({ message: "success" }))
                .catch(error => res.status(400).send(error));
          }
        },


    getFileUploadData(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return fileUploadModel
        .findAll({
          order: [
            ['createdAt', 'DESC']
          ],
          raw: true,
        })
        .then(data => {
          console.log("hhhhhhhhhhhhhhh",data);
          return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
      
      },


      deleteFileUpload(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          
          fileUploadModel
            .destroy({
              where: {
                id: req.body.requestObject
              }
            })
            .then(project => {
              console.log("hhhhhhhhhhhhhhh",project);
              return res.status(200).send({message: project});
          })
          .catch(error => res.status(400).send(error));
      },
}