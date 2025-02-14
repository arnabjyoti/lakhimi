const async = require("async");
const usersModel = require("../models").users;
const rolePrivilegeModel = require("../models").roles;
const privilegeModel = require("../models").privilege;
const brunchModel = require("../models").brunch;
const brunchMasterModel = require("../models").brunchMaster;
const bcrypt = require("bcrypt");
var request = require('request');
const Op = require('sequelize').Op;
var Sequelize = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// const env = process.env.NODE_ENV || 'test';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

module.exports = {

  upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        console.log("dbid",req.body);
				let dbID = req.body.dbid+'_';
                console.log("9999999999999999999",req.body.dbid);
        const staffFolder = 'staff';
				let dest = path.join(config.FILE_UPLOAD_PATH, staffFolder, dbID);
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
    let dir = project.id+'_';
    console.log("dir",dir);
    const staffFolder = 'staff';
    let dest = path.join(config.FILE_UPLOAD_PATH, staffFolder, dir);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },

  getuserDataById(req, res){
    console.log("reqqqqqqqqqqqqq ",req.body.requestObject);
    let query={
      raw: true,
        where: {
          id: req.body.requestObject
        },
  }

  console.log("Query is==========> ",query);
  return usersModel
  .findOne(query)
  .then(user => {
    return res.status(200).send(user);
  })
  .catch(error => {
    console.log(error);
    return res.status(400).send(error);
  });
},


updateProfileData(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    const newData = {
      f_name: req.body.requestObject.f_name.toUpperCase(),
      l_name: req.body.requestObject.l_name.toUpperCase(),
      address: req.body.requestObject.address,
      phone_no: req.body.requestObject.phone_no,
    };
    usersModel
      .update(newData, {
        where: {
          id: req.body.requestObject.id
        }
      })
      .then(project => {
        console.log("hhhhhhhhhhhhhhh",project);
        return res.status(200).send({message: project});
    })
    .catch(error => res.status(400).send(error));
},


uploadAvatar(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          avatar: req.file.originalname,
      }
  usersModel
  .update(newData, {
      where: {
        id: req.body.dbid
      }
    })
  .then(project => {
      hi=project.id;
      console.log("hhhhhhhhhhhhhhh",hi);
      return res.status(200).send({message: hi});
  })
  .catch(error => res.status(400).send(error));
}
},

  getUserList(req, res){
      let query={
          raw: true,
          order: [
            [Sequelize.literal(`CASE 
              WHEN category = 'NON MANAGERIAL STAFF' THEN 1 
              WHEN category = 'BRANCH MANAGER' THEN 2 
              WHEN category = 'OFFICE ASSISTANT STAFF' THEN 3 
              WHEN category = 'FIELD EXECUTIVE STAFF' THEN 4
              ELSE 5
            END`), 'ASC']
          ]
            // where: {
            //   role: { [Op.ne]: "head_office" }
            // }
      }

  console.log("Query is==========> ",query);
  return usersModel
    .findAll(query)
    .then(user => {
      return res.status(200).send(user);
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send(error);
    });

  },

  employeeList(req, res){
    let query={
        raw: true,
        order: [
          [Sequelize.literal(`CASE 
            WHEN category = 'NON MANAGERIAL STAFF' THEN 1 
            WHEN category = 'BRANCH MANAGER' THEN 2 
            WHEN category = 'OFFICE ASSISTANT STAFF' THEN 3 
            WHEN category = 'FIELD EXECUTIVE STAFF' THEN 4
            ELSE 5
          END`), 'ASC']
        ],
        where: {
          salaried: "Yes",
          active: "Active"
        },
    }

console.log("Query is==========> ",query);
return usersModel
  .findAll(query)
  .then(user => {
    return res.status(200).send(user);
  })
  .catch(error => {
    console.log(error);
    return res.status(400).send(error);
  });

},

  createUser(req, res) {
    console.log("data recieved from frontend",req.body.requestObject);
    return usersModel
      .create({
        f_name: req.body.requestObject.f_name.toUpperCase(),
        l_name: req.body.requestObject.l_name.toUpperCase(),
        email: req.body.requestObject.email,
        role: req.body.requestObject.role,
        position: req.body.requestObject.position,
        category: req.body.requestObject.category,
        phone_no: req.body.requestObject.phone_no,
        address: req.body.requestObject.address,
        createdBy: req.body.requestObject.createdBy,
        employeeId: req.body.requestObject.employeeId,
        salaried: req.body.requestObject.salaried,
        designation: req.body.requestObject.designation,
        // brunch_location: req.body.requestObject.brunch_location,
        // brunch_adrs: req.body.requestObject.brunch_adrs,
        // brunch_cntct_no: req.body.requestObject.brunch_cntct_no,
        // brunch_email: req.body.requestObject.brunch_email,
        // password: hashPass,
        // temp_password: req.body.requestObject.password,
        // role: req.body.requestObject.role,
        // avatar: req.body.requestObject.avatar,
        active: "Active"
      })
      .then(project => res.status(200).send({ message: "success" }))
      .catch(error => res.status(400).send(error));
  },


  getfieldAgent(req, res){
    let query={
        raw: true,
        order: [
            ['f_name', 'ASC']
          ],
          where: {
            role: "field_agent"
          },
        //   where: {
        //     '$userA.id$': { [Op.ne]: userId }
        //   },
    }

console.log("Query is==========> ",query);
return usersModel
  .findAll(query)
  .then(user => {
    return res.status(200).send(user);
  })
  .catch(error => {
    console.log(error);
    return res.status(400).send(error);
  });

},



getBrunchManager(req, res){
  let query={
      raw: true,
      where: {
          role: "branch_manager",
      }
  }

console.log("Query is==========> ppppppppppppppp",query);
return usersModel
.findAll(query)
.then(brunch => {
  return res.status(200).send(brunch);
})
.catch(error => {
  console.log(error);
  return res.status(400).send(error);
});

},






    
};
