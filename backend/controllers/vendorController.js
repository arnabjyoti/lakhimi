const vendorModel = require("../models").vendors;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'test';
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Op = require('sequelize').Op;

module.exports = {

    upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        console.log("dbid",req.body);
				let dbID = req.body.dbid+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'vendor';
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



    addVendor(req, res) {
        console.log("jjjjjjjjjjjjjjjjj",req.body.requestObject);
        
        return vendorModel
        .create({
            shop_name: req.body.requestObject.shop_name.toUpperCase(),
            proprietor_name: req.body.requestObject.proprietor_name,
            contact_number_1: req.body.requestObject.contact_number_1,
            contact_number_2: req.body.requestObject.contact_number_2,
            contact_number_3: req.body.requestObject.contact_number_3,
            gst_number: req.body.requestObject.gst_number,
            ac_name: req.body.requestObject.ac_name,
            ac_number: req.body.requestObject.ac_number,
            ifsc: req.body.requestObject.ifsc,
            bank_name: req.body.requestObject.bank_name,
            bank_branch: req.body.requestObject.bank_branch,
            address: req.body.requestObject.address,
            city: req.body.requestObject.city,
            p_o: req.body.requestObject.p_o,
            district: req.body.requestObject.district,
            state: req.body.requestObject.state,
            pin_code: req.body.requestObject.pin_code,
            // shop_photo: req.body.requestObject.shop_photo,
            // proprietor_photo: req.body.requestObject.proprietor_photo,
            // trade_license: req.body.requestObject.trade_license,
            // gst_certificate: req.body.requestObject.gst_certificate,
            // bank_stmnt: req.body.requestObject.bank_stmnt,
            // reference_number: req.body.requestObject.reference_no,
            status: "Pending",
            created_by: req.body.requestObject.createdBy,
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

    createDirectory(project, callback){
        console.log("directory",project.id);
        let dir = project.id+'_';
        console.log("dir",dir);
        const userFolder = 'vendor';
        let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, dir);
        console.log('Create ' + dest);
        fs.mkdirSync(dest, callback);
      },



    uploadShop(req, res) {
        if (!req.file) {
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                shop_photo: req.file.originalname,
                status: req.body.status,
            }
        vendorModel
        .update(newData, {
            where: {
              id: req.body.dbid
            }
          })
        .then(project => {
            hi=project.id;
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
      }
    },

    uploadProprietor(req, res) {
        if (!req.file) {
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                proprietor_photo: req.file.originalname,
                status: req.body.status,
            }
        vendorModel
        .update(newData, {
            where: {
              id: req.body.dbid
            }
          })
        .then(project => {
            hi=project.id;
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
      }
    },


    uploadTrade(req, res) {
        if (!req.file) {
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                trade_license: req.file.originalname,
                status: req.body.status,
            }
        vendorModel
        .update(newData, {
            where: {
              id: req.body.dbid
            }
          })
        .then(project => {
            hi=project.id;
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
      }
    },

    uploadGST(req, res) {
        if (!req.file) {
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                gst_certificate: req.file.originalname,
                status: req.body.status,
            }
        vendorModel
        .update(newData, {
            where: {
              id: req.body.dbid
            }
          })
        .then(project => {
            hi=project.id;
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
      }
    },

    uploadBank(req, res) {
        if (!req.file) {
            return res.status(400).send({ status: false, message: 'File not found' });
        } else {
            const newData = {
                bank_stmnt: req.file.originalname,
                status: req.body.status,
                reference_number: req.body.reference_no,
            }
        vendorModel
        .update(newData, {
            where: {
              id: req.body.dbid
            }
          })
        .then(project => {
            hi=project.id;
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
      }
    },


    getApplieVendorDataById(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return vendorModel
        .findAll({
          order: [
            ['createdAt', 'DESC']
          ],
          where: {
            created_by: req.body.requestObject,
          },
          raw: true,
        })
        .then(data => {
          console.log("hhhhhhhhhhhhhhh",data);
          return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
      
      },



      updateVendorAplData(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
            shop_name: req.body.requestObject.shop_name.toUpperCase(),
            proprietor_name: req.body.requestObject.proprietor_name,
            contact_number_1: req.body.requestObject.contact_number_1,
            contact_number_2: req.body.requestObject.contact_number_2,
            contact_number_3: req.body.requestObject.contact_number_3,
            gst_number: req.body.requestObject.gst_number,
            ac_name: req.body.requestObject.ac_name,
            ac_number: req.body.requestObject.ac_number,
            ifsc: req.body.requestObject.ifsc,
            bank_name: req.body.requestObject.bank_name,
            bank_branch: req.body.requestObject.bank_branch,
            address: req.body.requestObject.address,
            city: req.body.requestObject.city,
            p_o: req.body.requestObject.p_o,
            district: req.body.requestObject.district,
            state: req.body.requestObject.state,
            pin_code: req.body.requestObject.pin_code,
        };
        vendorModel
          .update(newData, {
            where: {
              id: req.body.requestObject.mId
            }
          })
          .then(project => {
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send({message: project});
        })
        .catch(error => res.status(400).send(error));
      },


      getApplieVendorDataByBranchId(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return vendorModel
        .findAll({
          order: [
            ['createdAt', 'DESC']
          ],
          where: {
            brunchId: req.body.requestObject,
            [Op.or]: [
                { status: "Applied"},
                { status: "Rejected" },
                { status: "Approved" },
              ]
          },
          raw: true,
        })
        .then(data => {
          console.log("hhhhhhhhhhhhhhh",data);
          return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
      
      },



      getVendorById(req, res){
        return vendorModel
        .findOne({
          where: {
            id: req.params.rqstId
          },
          raw: true
        })
        .then(project => {
          console.log("hhhhhhhhhhhhhhh",project);
          return res.status(200).send(project);
      })
      .catch(error => res.status(400).send(error));
    },


    resubmitVendorAplData(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
            status: req.body.requestObject.status,
            reference_number: req.body.requestObject.reference_number,
        };
        vendorModel
          .update(newData, {
            where: {
              id: req.body.requestObject.mId
            }
          })
          .then(project => {
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send({message: project});
        })
        .catch(error => res.status(400).send(error));
      },



    vendorApprovel(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
          status: req.body.requestObject.status,
        };
        vendorModel
          .update(newData, {
            where: {
              id: req.body.requestObject.mId
            }
          })
          .then(project => {
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send({message: project});
        })
        .catch(error => res.status(400).send(error));
      },
    
    vendorReject(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
          remark: req.body.requestObject.remark,
          status: req.body.requestObject.status,
        };
        vendorModel
          .update(newData, {
            where: {
              id: req.body.requestObject.mId
            }
          })
          .then(project => {
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send({message: project});
        })
        .catch(error => res.status(400).send(error));
      },


    //   getVendor(req, res){
    //     console.log("bbbbbbbbbbbbbb",req.body);
    //     let query={
    //       where: {
    //         brunchId: req.body.brunchId,
    //         status: "Approved"
    //       },
    //         raw: true,
    //         order: [
    //             ['shop_name', 'ASC']
    //           ]
    //     }

    // console.log("Query is==========> ppppppppppppppp",query);
    // return vendorModel
    //   .findAll(query)
    //   .then(vendor => {
    //     return res.status(200).send(vendor);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return res.status(400).send(error);
    //   });

    // },

    getVendor(req, res) {
      console.log("oooooooooooooooooooooooooo",req.body.requestObject);
      return vendorModel
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          brunchId: req.body.requestObject,
          status: "Approved",
        },
        raw: true,
      })
      .then(data => {
        console.log("hhhhhhhhhhhhhhh",data);
        return res.status(200).send(data);
    })
    .catch(error => res.status(400).send(error));
    
    },


    getAllVendorList(req, res) {
      return vendorModel
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          [Op.or]: [
              { status: "Applied"},
              { status: "Rejected" },
              { status: "Approved" },
            ]
        },
        raw: true,
      })
      .then(data => {
        console.log("hhhhhhhhhhhhhhh",data);
        return res.status(200).send(data);
    })
    .catch(error => res.status(400).send(error));
    
    },
}