const accountClosingEOModel = require("../models").accountClosingEO;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const request = require('request');
const env = process.env.NODE_ENV || 'test';
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Op = require('sequelize').Op;
var Sequelize = require('sequelize');

module.exports = {

    upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        console.log("dbid",req.body);
				let dbID = req.body.dbid+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'closed_account';
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
        const userFolder = 'closed_account';
        let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, dir);
        console.log('Create ' + dest);
        fs.mkdirSync(dest, callback);
      },


  createEOcloseAc(req, res) {
    console.log("lllllllllllll",req.body.requestObject);
    return accountClosingEOModel
        .create({
            closing_type: req.body.requestObject.closing_type,
            claim_for: req.body.requestObject.claim_for,
            type_of_ac: req.body.requestObject.type_of_ac,
            specify: req.body.requestObject.specify,
            new_ac_no: req.body.requestObject.new_ac_no,
            open_date: req.body.requestObject.open_date,
            end_date: req.body.requestObject.end_date,
            claiming_ac_holder_name: req.body.requestObject.claiming_ac_holder_name,
            claiming_ac_no: req.body.requestObject.claiming_ac_no,
            claiming_c_id: req.body.requestObject.claiming_c_id,
            claiming_opening_date: req.body.requestObject.claiming_opening_date,
            claiming_closing_date: req.body.requestObject.claiming_closing_date,
            claiming_agent_name: req.body.requestObject.claiming_agent_name,
            claiming_code: req.body.requestObject.claiming_code,
            claiming_branch_name: req.body.requestObject.claiming_branch_name,
            nominee_name: req.body.requestObject.nominee_name,
            address: req.body.requestObject.address,
            cause: req.body.requestObject.cause,
            bank_name: req.body.requestObject.bank_name,
            br_name: req.body.requestObject.br_name,
            name_ac: req.body.requestObject.name_ac,
            ac_no: req.body.requestObject.ac_no,
            ifsc: req.body.requestObject.ifsc,
            apply_date: req.body.requestObject.apply_date,

          fa_status: req.body.requestObject.fa_status,
  
          closing_status: "Documents not Uploaded",
  
          reference_no: req.body.requestObject.reference_no,
  
          fwd_status: "Branch Manager",
  
  
          userId: req.body.requestObject.userId,
          brunchId: req.body.requestObject.brunchId,
        })
        .then(project => {
            module.exports.createDirectory(project, (result) => {
              console.log("call");
              if (result.status) {
                return res.status(200).send(result);
              }
              return res.status(500).send(result);
            });
              hi=project.id;
              console.log("hhhhhhhhhhhhhhh",hi);
              
              return res.status(200).send({message: hi});
          })
          .catch(error => res.status(400).send(error));
      },



    uploadLakhimiPassbook(req, res) {
        console.log("oooooooooooooooooooooooooo",req.file);
        console.log("jjjjjjjjjjjjjjjjj",req.body);
        if (!req.file) {
            console.log('File not found');
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                passbook_lakhimi: req.file.originalname,
            }
            accountClosingEOModel
        .update(newData, {
            where: {
              id: req.body.dbid,
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

    uploadBankPassbook(req, res) {
        console.log("oooooooooooooooooooooooooo",req.file);
        console.log("jjjjjjjjjjjjjjjjj",req.body);
        if (!req.file) {
            console.log('File not found');
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                passbook_bank: req.file.originalname,
                closing_status: req.body.closing_status,
                // apply_date: req.body.apply_date,
            }
            accountClosingEOModel
        .update(newData, {
            where: {
              id: req.body.dbid,
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


    getCloseAcEOByFA(req, res) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
      return accountClosingEOModel
      .findAll({
        where: {
          userId: req.body.requestObject,
          [Op.or]: [
            { closing_status: "Applied"},
            { closing_status: "Rejected" },
            { closing_status: "Completed" },
            { closing_status: "Approved" },
            { closing_status: "Documents not Uploaded" },
          ]
          // closing_status: "Applied",
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



    closeAcDataById(req, res){
      return accountClosingEOModel
      .findOne({
        where: {
          id: req.params.rqstId
        },
        raw: true,
        include: [
              {
                model: usersModel,
                required: false,
              },
              {
                model: brunchModel,
                required: false,
              },
          ],
      })
      .then(project => {
        console.log("hhhhhhhhhhhhhhh",project);
        return res.status(200).send(project);
    })
    .catch(error => res.status(400).send(error));
    },



    getCloseAcApplyListByBM(req, res) {
      console.log("vvvvvvvvvvvvvvvvvvvv",req.body.requestObject);
      return accountClosingEOModel
      .findAll({
        where: {
          brunchId: req.body.requestObject,
          // closing_status: "Applied",
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



    getCloseAcDataById(req, res){
      return accountClosingEOModel
      .findOne({
        where: {
          id: req.params.rqstId
        },
        raw: true,
        include: [
              {
                model: usersModel,
                required: false,
              },
              {
                model: brunchModel,
                required: false,
              },
        ],
      })
      .then(project => {
        console.log("hhhhhhhhhhhhhhh",project);
        return res.status(200).send(project);
    })
    .catch(error => res.status(400).send(error));
    },


    getCloseAcApplyListHOByLO(req, res) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
      return accountClosingEOModel
      .findAll({
        where: {
          [Op.or]: [
            { bm_status: "Rejected"},
            { bm_status: "Forwarded" },
          ]
          // closing_status: "Applied",
          // bm_status: "Forwarded",
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




    getCloseAcApplyListHOByMD(req, res) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
      return accountClosingEOModel
      .findAll({
        where: {
          [Op.or]: [
            { lo_status: "Rejected"},
            { lo_status: "Forwarded" },
          ]
          // closing_status: "Applied",
          // lo_status: "Forwarded",
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
    
    getCloseAcApplyListHOByCM(req, res) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
      return accountClosingEOModel
      .findAll({
        where: {
          [Op.or]: [
            { md_status: "Rejected"},
            { md_status: "Forwarded" },
          ]
          // closing_status: "Applied",
          // md_status: "Forwarded",
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





    
        //update reject module

        CloseAcUpdateBMstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        bm_fwd_date: req.body.requestObject.bm_fwd_date,
        bm_status: req.body.requestObject.bm_status,
        fwd_status: "Loan Officer",
    
        closing_status: "Applied",
    
        md_status: null,
    
        lo_status: null,
    
        cm_status: null,
      };
      accountClosingEOModel
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
    
    
    CloseAcUpdateLOstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        lo_fwd_date: req.body.requestObject.lo_fwd_date,
        lo_status: req.body.requestObject.lo_status,
        fwd_status: "Managing Director",
      };
      accountClosingEOModel
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
    
    CloseAcUpdateMDstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        md_fwd_date: req.body.requestObject.md_fwd_date,
        md_status: req.body.requestObject.md_status,
        fwd_status: "Chairman"
      };
      accountClosingEOModel
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
    
    CloseAcUpdateCMstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        cm_fwd_date: req.body.requestObject.cm_fwd_date,
        cm_status: "Approved",
        closing_status: "Completed",
      };
      accountClosingEOModel
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
    
    
    // reject controller
    
    CloseAcRejectBMstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        bm_reason: req.body.requestObject.bm_reason,
        bm_fwd_date: req.body.requestObject.bm_fwd_date,
        bm_status: req.body.requestObject.bm_status,
    
        closing_status: "Rejected",
      };
      accountClosingEOModel
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
    
    
    CloseAcRejectLOstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        lo_reason: req.body.requestObject.lo_reason,
        lo_fwd_date: req.body.requestObject.lo_fwd_date,
        lo_status: req.body.requestObject.lo_status,
    
        closing_status: "Rejected",
      };
      accountClosingEOModel
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
    
    CloseAcRejectMDstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        md_reason: req.body.requestObject.md_reason,
        md_fwd_date: req.body.requestObject.md_fwd_date,
        md_status: req.body.requestObject.md_status,
    
        lo_status: "Rejected",
        lo_reason: "Managing Director Rejected",
        lo_fwd_date: req.body.requestObject.cm_fwd_date,
    
        closing_status: "Rejected",
      };
      accountClosingEOModel
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
    
    
    
    CloseAcRejectCMstatus(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      const newData = {
        cm_reason: req.body.requestObject.cm_reason,
        cm_fwd_date: req.body.requestObject.cm_fwd_date,
        cm_status: req.body.requestObject.cm_status,
    
        md_status: "Rejected",
        md_reason: "Chairman Rejected",
        md_fwd_date: req.body.requestObject.cm_fwd_date,
    
        lo_status: "Rejected",
        lo_reason: "Chairman Rejected",
        lo_fwd_date: req.body.requestObject.cm_fwd_date,
    
        closing_status: "Rejected",
      };
      accountClosingEOModel
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
}