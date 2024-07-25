const cashierMasterModel = require("../models").cashierMaster;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const cashCounterPaymentModel = require("../models").cashCounterPayment;
const Op = require('sequelize').Op;
var _ = require("lodash");
var Sequelize = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const request = require('request');
const env = process.env.NODE_ENV || 'test';
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

module.exports = {


  upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        console.log("dbid",req.body);
				let dbID = req.body.dbid+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'CashCounter';
				let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, dbID);
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
    const userFolder = 'CashCounter';
    let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, dir);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },


    addCashierBrunchDetails(req, res) {
    console.log("oooooooooooooooooooooooooo",req.body.requestObject);
    return cashierMasterModel
    .create({
        brunchId: req.body.requestObject.brunchId,
        userId: req.body.requestObject.userId,
        doj: req.body.requestObject.doj,
        dor: req.body.requestObject.dor,
        status: "Active"
    })
    .then(project => res.status(200).send({ message: "success" }))
    .catch(error => res.status(400).send(error));
},

getFreeCashier(req, res){
    return cashierMasterModel
    .findAll({
      order: [["userId", "ASC"]],
      raw: true,
    })
    .then(bm => {
      ss = _.map(bm, function(bm) { return bm.userId; })
      console.log("hhhhhhhhhhh",ss);
      if (!bm) {
        res.status(200).send({});
        // return fn(proj);
      }
          usersModel.findAll({
            where: {
              id: {[Op.notIn]: ss },
              role: "cashier"
            },
            raw: true
          })
          .then(brunch => {
            console.log("vvvvvvvvvvv",brunch);
            return res.status(200).send(brunch);
          })
          .catch(error => {
            console.log(error);
            return res.status(400).send(error);
          });
        
    })
  },



  getCashierDetails(req, res){
    console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    let query={
      raw: true,
      include: [
        {
          model: brunchModel,
          required: false,
          attributes : [
            "brunch_name",
            "brunch_code"
          ]
        },
        {
          model: usersModel,
          as: 'user',
          required: false,
          attributes : [
            "f_name",
            "l_name",
            "position",
            "phone_no",
            "address",
            "email"
          ],
        },
        ],
          where: {
            '$user.position$': 'Cashier',
          },
      }

      console.log("Query is==========> oooooooooooooooooooooooo",query);
      return cashierMasterModel
        .findAll(query)
        .then(brunch => {
          return res.status(200).send(brunch);
        })
        .catch(error => {
          console.log(error);
          return res.status(400).send(error);
        });

  },



  getCashierDetailsByBrunch(req, res){
    console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    return cashierMasterModel
    .findAll({
      raw: true,
      where: {
        brunchId: req.body.requestObject,
      },
      include: [
        {
          model: usersModel,
          required: false,
        },
      ]
    })
    .then(brunch => {
      console.log("hhhhhhhhhhhhhhh",brunch);
      return res.status(200).send(brunch);
  })
  .catch(error => res.status(400).send(error));
  },




  saveCashCounter(req, res) {
    console.log("saveCashCounterrrrrrrrrrr",req.file);
    console.log("reqqqqqqqqqqqqqq",req.body);
    if (!req.file) {
        console.log('File not found');
        return res.status(400).send({ status: false, message: 'File not found' });
    } else {
      return cashCounterPaymentModel
      .create({
        Co_op_ac_no: req.body.Co_op_ac_no,
        voucer_no: req.body.voucer_no,
        amount: req.body.amount,
        brunchId: req.body.brunchId,
        userId: req.body.dbid,
        entry_date: req.body.entry_date,
        photo: req.file.originalname,
        status: "Active"
      })
    .then(project => {
        hi=project.id;
        console.log("hhhhhhhhhhhhhhh",hi);
        return res.status(200).send({message: hi});
    })
    .catch(error => res.status(400).send(error));
  }
  },



  getCashCounterListByCA(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        userId: req.body.requestObject,
        status: "Active"
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },



  brDetailsCashCounter(req, res) {
    console.log("oooooooooooooooooooooooooo",req.body.requestObject);
    return cashierMasterModel
    .findOne({
      where: {
        userId: req.body.requestObject.id
      },
      raw: true,
      include: [
        {
          model: brunchModel,
          required: false,
          attributes: ['brunch_name','brunch_code','brunch_location','brunch_cntct_no','brunch_email','brunch_adrs']
        }
      ],
      attributes: ['id', 
      [Sequelize.col('brunch.id'), 'br_id'],
      [Sequelize.col('brunch.brunch_name'), 'br_name'],
      [Sequelize.col('brunch.brunch_code'), 'br_code'],
      [Sequelize.col('brunch.brunch_location'), 'br_loc'],
      [Sequelize.col('brunch.brunch_cntct_no'), 'br_cntc'],
      [Sequelize.col('brunch.brunch_email'), 'br_email'],
      [Sequelize.col('brunch.brunch_adrs'), 'br_adrs']],
    })
    .then(data => {
      br_name = data;
      console.log("hhhhhhhhhhhhhhh",br_name);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },



  getCashCounterListByadmin(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        status: "Active"
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },

  getCashCounterListByBranch(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        brunchId: req.body.requestObject,
        status: "Active"
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },




  filterDataByCashier(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        userId: req.body.requestObject.userId,
        status: "Active",
        entry_date: {
          [Op.between]: [req.body.requestObject.startDate, req.body.requestObject.endDate],
        },
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },



  filterDataByCashierBranch(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        brunchId: req.body.requestObject.brunchId,
        status: "Active",
        entry_date: {
          [Op.between]: [req.body.requestObject.startDate, req.body.requestObject.endDate],
        },
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },




  filterDataAll(req, res) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
    return cashCounterPaymentModel
    .findAll({
      where: {
        // brunchId: req.body.requestObject.brunchId,
        status: "Active",
        entry_date: {
          [Op.between]: [req.body.requestObject.startDate, req.body.requestObject.endDate],
        },
      },
      order: [
        ['createdAt', 'ASC']
      ],
      raw: true,
    })
    .then(data => {
      console.log("hhhhhhhhhhhhhhh",data);
      return res.status(200).send(data);
  })
  .catch(error => res.status(400).send(error));
  
  },
}