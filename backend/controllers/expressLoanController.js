const membershipModel = require("../models").membership;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const expressloansModel = require("../models").expressloans;
const vendorModel = require("../models").vendors;
var Sequelize = require('sequelize');
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
				// console.log("config",config);
        console.log("dbid",req.body);
				let userid = req.body.userId+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'customer';
				let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, userid);
				
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
    let dest = path.join(config.FILE_UPLOAD_PATH, dir);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },


    checkMemberReferenceData(req, res){
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return membershipModel
        .findOne({
            where: {
                reference_no: req.body.requestObject.Reference_no,
                brunchId: req.body.requestObject.brunchId
            },
            raw: true,
            include: [
                {
                    model: brunchModel,
                    required: false
                }
            ]
        })
        .then(data => {
            console.log("return data",data);
            return res.status(200).send(data);
        })
        .catch(error => res.status(400).send(error));
    },


    getExpressLoanApplyListByFA(req, res) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
      return expressloansModel
      .findAll({
        where: {
          userId: req.body.requestObject,
          [Op.or]: [
            { loan_status: "Applied"},
            { loan_status: "Rejected" },
            { loan_status: "Completed" },
            { loan_status: "Approved" },
            { loan_status: "Documents not Uploaded" },
          ]
          // loan_status: "Applied",
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

    createExpressLoan(req, res) {
        console.log("lllllllllllll",req.body.requestObject);
        return expressloansModel
            .create({
              full_name: req.body.requestObject.full_name,
              
                l_emp_type: req.body.requestObject.l_emp_type,
                l_annual_incm: req.body.requestObject.l_annual_incm,
                l_product_ategory: req.body.requestObject.l_product_ategory,
                l_make: req.body.requestObject.l_make,
                l_model: req.body.requestObject.l_model,
                l_serial_no: req.body.requestObject.l_serial_no,
                // l_vendor: req.body.requestObject.l_vendor,
                l_product_cost: req.body.requestObject.l_product_cost,
                l_down_payment_amount: req.body.requestObject.l_down_payment_amount,
                l_processing_fee: req.body.requestObject.l_processing_fee,
                l_tenure: req.body.requestObject.l_tenure,
                l_roi: req.body.requestObject.l_roi,
                l_EMI_amount: req.body.requestObject.l_EMI_amount,


                intro_name: req.body.requestObject.intro_name,
                intro_email: req.body.requestObject.intro_email,
                intro_telephone: req.body.requestObject.intro_telephone,
                intro_phone: req.body.requestObject.intro_phone,
                intro_gender: req.body.requestObject.intro_gender,
                intro_age: req.body.requestObject.intro_age,
                intro_address: req.body.requestObject.intro_address,
                
                // total_processing_fee: req.body.requestObject.total_processing_fee,
                // net_finance_amnt: req.body.requestObject.net_finance_amnt,
                // tenure_in_month: req.body.requestObject.tenure_in_month,
                // total_return: req.body.requestObject.total_return,
                // calculated_emi: req.body.requestObject.calculated_emi,
                // product_photo: req.body.requestObject.product_photo,
                // incm_prf: req.body.requestObject.incm_prf,

                share_fee: req.body.requestObject.share_fee,
                share_admsn_fee: req.body.requestObject.share_admsn_fee,
                ac_admsn_fee: req.body.requestObject.ac_admsn_fee,
                insrnc: req.body.requestObject.insrnc,
                nach: req.body.requestObject.nach,
                l_total_return_amnt: req.body.requestObject.l_total_return_amnt,
                emi_amnt: req.body.requestObject.emi_amnt,
                adv_emi: req.body.requestObject.adv_emi,



              fa_status: req.body.requestObject.fa_status,
      
              loan_status: "Documents not Uploaded",
      
              // reference_no: req.body.requestObject.reference_no,
      
              fwd_status: "Branch Manager",
      
              apply_date: req.body.requestObject.msp_apply_date,
              apply_amount: req.body.requestObject.l_aapply_amount,
      
              loan_approve_date: req.body.requestObject.loan_approve_date,
              membership_id: req.body.requestObject.membershipId,
              brunch_name: req.body.requestObject.brunch_name,
      
              membershipId: req.body.requestObject.id,
              userId: req.body.requestObject.userId,
              brunchId: req.body.requestObject.brunchId,
              vendorId: req.body.requestObject.l_vendor,
            })
            .then(loan => {
                hi=loan.id;
                console.log("hhhhhhhhhhhhhhh",hi);
                
                return res.status(200).send({id: hi});
            })
            .catch(error => res.status(400).send(error));
        },


        uploadExpressProduct(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    product_photo: req.file.originalname,
                    reference_no: req.body.reference_number,
                    loan_status: req.body.loan_status,
                }
                expressloansModel
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

        uploadExpressIncome(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    incm_prf: req.file.originalname,
                }
                expressloansModel
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


        getExpressLoanDataById(req, res){
          return expressloansModel
          .findOne({
            where: {
              id: req.params.rqstId
            },
            raw: true,
            include: [
              {
                model: vendorModel,
                required: false,
              },
              {
                model: usersModel,
                required: false,
              },
              {
                model: brunchModel,
                required: false,
              },
              {
                model: membershipModel,
                required: false,
                include: [
                  {
                    model: usersModel,
                    required: false,
                  },
                  {
                    model: brunchModel,
                    required: false,
                  },
                ]
              },
            ],
          })
          .then(project => {
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send(project);
        })
        .catch(error => res.status(400).send(error));
        },




        // get list




        getExpressLoanApplyListByBM(req, res) {
          console.log("vvvvvvvvvvvvvvvvvvvv",req.body.requestObject);
          return expressloansModel
          .findAll({
            where: {
              brunchId: req.body.requestObject,

              [Op.or]: [
                { loan_status: "Applied"},
                { loan_status: "Rejected" },
                { loan_status: "Completed" },
                { loan_status: "Approved" },
                {
                  loan_status: {
                    [Op.ne]: 'Documents not Uploaded'
                  }
                }
              ]


              
              // loan_status: "Applied",
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
        
        getExpressLoanApplyListHOByLO(req, res) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
          return expressloansModel
          .findAll({
            where: {
              [Op.or]: [
                { bm_status: "Rejected"},
                { bm_status: "Forwarded" },
              ]
              // loan_status: "Applied",
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
        
        getExpressLoanApplyListHOByMD(req, res) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
          return expressloansModel
          .findAll({
            where: {
              [Op.or]: [
                { lo_status: "Rejected"},
                { lo_status: "Forwarded" },
              ]
              // loan_status: "Applied",
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
        
        getExpressLoanApplyListHOByCM(req, res) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
          return expressloansModel
          .findAll({
            where: {
              [Op.or]: [
                { md_status: "Rejected"},
                { md_status: "Forwarded" },
              ]
              // loan_status: "Applied",
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

        ExpressLoanUpdateBMstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            bm_fwd_date: req.body.requestObject.bm_fwd_date,
            bm_status: req.body.requestObject.bm_status,
            fwd_status: "Loan Officer",
        
            loan_status: "Applied",
        
            md_status: null,
        
            lo_status: null,
        
            cm_status: null,
          };
          expressloansModel
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
        
        
        ExpressLoanUpdateLOstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            lo_fwd_date: req.body.requestObject.lo_fwd_date,
            lo_status: req.body.requestObject.lo_status,
            fwd_status: "Managing Director",
          };
          expressloansModel
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
        
        ExpressLoanUpdateMDstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            md_fwd_date: req.body.requestObject.md_fwd_date,
            md_status: req.body.requestObject.md_status,
            fwd_status: "Chairman"
          };
          expressloansModel
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
        
        ExpressLoanUpdateCMstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            cm_fwd_date: req.body.requestObject.cm_fwd_date,
            cm_status: "Approved",
            loan_status: "Approved",
          };
          expressloansModel
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
        
        ExpressLoanRejectBMstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            bm_reason: req.body.requestObject.bm_reason,
            bm_fwd_date: req.body.requestObject.bm_fwd_date,
            bm_status: req.body.requestObject.bm_status,
        
            loan_status: "Rejected",
          };
          expressloansModel
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
        
        
        ExpressLoanRejectLOstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            lo_reason: req.body.requestObject.lo_reason,
            lo_fwd_date: req.body.requestObject.lo_fwd_date,
            lo_status: req.body.requestObject.lo_status,
        
            loan_status: "Rejected",
          };
          expressloansModel
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
        
        ExpressLoanRejectMDstatus(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
          const newData = {
            md_reason: req.body.requestObject.md_reason,
            md_fwd_date: req.body.requestObject.md_fwd_date,
            md_status: req.body.requestObject.md_status,
        
            lo_status: "Rejected",
            lo_reason: "Managing Director Rejected",
            lo_fwd_date: req.body.requestObject.cm_fwd_date,
        
            loan_status: "Rejected",
          };
          expressloansModel
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
        
        
        
        ExpressLoanRejectCMstatus(req, res){
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
        
            loan_status: "Rejected",
          };
          expressloansModel
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
 
        
        expressLoanDataById(req, res){
          return expressloansModel
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
                  {
                    model: vendorModel,
                    required: false,
                  },
                  {
                    model: membershipModel,
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



    updateExpressLoanData(req, res){

      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      
      const newData1 = {
    
            reference_no: req.body.requestObject.reference_no,
            l_emp_type: req.body.requestObject.l_emp_type,
            l_annual_incm: req.body.requestObject.l_annual_incm,
            l_product_ategory: req.body.requestObject.l_product_ategory,
            l_make: req.body.requestObject.l_make,
            l_model: req.body.requestObject.l_model,
            l_serial_no: req.body.requestObject.l_serial_no,
            l_vendor: req.body.requestObject.l_vendor,
            l_product_cost: req.body.requestObject.l_product_cost_new,
            l_total_return_amnt: req.body.requestObject.l_total_return_amnt_new,
            l_processing_fee: req.body.requestObject.l_processing_fee_new,
            emi_amnt: req.body.requestObject.emi_amnt_new,
            adv_emi: req.body.requestObject.adv_emi_new,
            l_tenure: req.body.requestObject.l_tenure,
            bm_status: null,
            bm_reason: null,
            bm_fwd_date: null,
            loan_status: "Applied",
            vendorId: req.body.requestObject.l_vendor,
      };
      console.log("mmmmmmmmmmmmmmmmmmmmmmm+",newData1);

  expressloansModel
  .update(newData1, {
    where: {
      id: req.body.requestObject.mId
    }
  })
  .then(project => {
// return res.status(200).send({message: hi});
return res.status(200).send({message: project});
})
.catch(error => res.status(400).send(error));
},

}