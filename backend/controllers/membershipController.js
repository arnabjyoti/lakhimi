const async = require("async");
const brunch = require("../models/brunch");
const membershipModel = require("../models").membership;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const request = require('request');
const { sign } = require("crypto");
const env = process.env.NODE_ENV || 'test';
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const ExifImage = require('exif').ExifImage;
const Op = require('sequelize').Op;

module.exports = {


    upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				console.log("config",config);
        console.log("dbid",req.body);
				let dbID = req.body.dbid+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'customer';
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
    const userFolder = 'customer';
    let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, dir);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },

    

  checkExistMember(req, res) {
    return membershipModel
    .findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { phone_no: req.body.requestObject.phone_no },
              { panNo: req.body.requestObject.panNo },
              { adharNo: req.body.requestObject.adharNo }
            ]
          },
          {
            status: {
              [Op.ne]: "Reject"
            }
          }
        ]
      }
    })
    .then(memberData => {
      console.log("memberDataaaaaaaaaaaaaaaaaaa",memberData);
      if (memberData) {
        console.log("ifffffffffffffff");
        
        return res.status(200).send({
          status: false,
          message: `Membership already exist.`,
        });
      } else {
        console.log("elseeeeeeeeeeeee");
        return res.status(200).send({
          status: true,
        });
        
      }
      })
      .catch(error => {
        console.log(error);
        return res
          .status(500)
          .send({ status: false, message: error });
      });
    },
      

    addMembership(req, res) {
        console.log("jjjjjjjjjjjjjjjjj",req.body.requestObject);
        
        return membershipModel
        .create({
            f_name: req.body.requestObject.f_name.toUpperCase(),
            l_name: req.body.requestObject.l_name.toUpperCase(),
            fathers_name: req.body.requestObject.fathers_name.toUpperCase(),
            address: req.body.requestObject.address,
            dob: req.body.requestObject.dob,
            gender: req.body.requestObject.gender,
            purpose: req.body.requestObject.purpose,
            occupation: req.body.requestObject.occupation,
            introducer: req.body.requestObject.introducer.toUpperCase(),
            introducer_id: req.body.requestObject.introducer_id,
            panNo: req.body.requestObject.panNo,
            adharNo: req.body.requestObject.adharNo,
            email: req.body.requestObject.email,
            phone_no: req.body.requestObject.phone_no,
            status: req.body.requestObject.status,
            reference_no: req.body.requestObject.reference_no,
            userId: req.body.requestObject.createdBy,
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


    uploadAllMembershipImage(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body);
      console.log("++++++++++++++++++++++++++++++++",req.file);
      if(req.body.photo_number == "pan"){
        const newData = {
          panCard: req.file ? req.file.originalname : null, // Handle null case
          status: "Applied",
        };
        membershipModel
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
      }if(req.body.photo_number == "adhar"){
        const newData = {
          adharCard: req.file ? req.file.originalname : null, // Handle null case
          status: "Applied",
        };
        membershipModel
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
      }if(req.body.photo_number == "photo"){
        const newData = {
          photo: req.file ? req.file.originalname : null, // Handle null case
          status: "Applied",
        };
        membershipModel
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
      }if(req.body.photo_number == "sign"){
        const newData = {
          sign: req.file ? req.file.originalname : null, // Handle null case
          status: "Applied",
        };
        membershipModel
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



    

    uploadPan(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    // panCard: req.file.path,
                    panCard: req.file.originalname,
                    status: req.body.status,
                }
            membershipModel
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


        uploadAdhar(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    adharCard: req.file.originalname,
                    status: req.body.status,
                }
            membershipModel
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


        uploadPhoto(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    photo: req.file.originalname,
                    status: req.body.status,
                }
            membershipModel
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


        uploadSign(req, res) {
            console.log("oooooooooooooooooooooooooo",req.file);
            console.log("jjjjjjjjjjjjjjjjj",req.body);
            if (!req.file) {
        		console.log('File not found');
        		return res.status(400).send({ status: false, message: 'File not found' });
        	} else {
                const newData = {
                    sign: req.file.originalname,
                    status: req.body.status,
                }
            membershipModel
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


        getAppliedMemberData(req, res){
          console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
            let query={
                raw: true,
                order: [
                    ['createdAt', 'DESC']
                  ]
                  // where: {
                  //   brunchId: req.body.requestObject.brunchId
                  // }
            }
      
        console.log("Query is==========> ",query);
        return membershipModel
          .findAll(query)
          .then(user => {
            return res.status(200).send(user);
          })
          .catch(error => {
            console.log(error);
            return res.status(400).send(error);
          });
        },



        getAplMembrById(req, res) {
          console.log("oooooooooooooooooooooooooo",req.body.requestObject);
          return membershipModel
          .findAll({
            order: [
              ['createdAt', 'DESC']
            ],
            where: {
              brunchId: req.body.requestObject,
            },
            raw: true,
          })
          .then(data => {
            console.log("hhhhhhhhhhhhhhh",data);
            return res.status(200).send(data);
        })
        .catch(error => res.status(400).send(error));
        
        },






    getMembershipById(req, res){
      return membershipModel
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


  updateMemberAplData(req, res){
    console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    const newData = {
      f_name: req.body.requestObject.f_name.toUpperCase(),
      l_name: req.body.requestObject.l_name.toUpperCase(),
      fathers_name: req.body.requestObject.fathers_name.toUpperCase(),
      address: req.body.requestObject.address,
      dob: req.body.requestObject.dob,
      gender: req.body.requestObject.gender,
      purpose: req.body.requestObject.purpose,
      occupation: req.body.requestObject.occupation,
      introducer: req.body.requestObject.introducer.toUpperCase(),
      introducer_id: req.body.requestObject.introducer_id,
      email: req.body.requestObject.email,
      panNo: req.body.requestObject.panNo,
      adharNo: req.body.requestObject.adharNo,
      status: "Applied"
    };
    membershipModel
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


  updateApprovel(req, res){
    console.log("******************************",req.body.requestObject);
    
    
    membershipModel
    .findOne({
      limit: 1,
      order: [ [ 'membership_id', 'DESC' ]]
    })
    .then(p=>{
      console.log("zzzzzzzzzzzzz",p.membership_id);
      if (p.membership_id == null) {
        const newData = {
          eOfficeAcNo: req.body.requestObject.eOfficeAcNo,
          status: req.body.requestObject.status,
          membership_id: "10000000001"
        };
        console.log("xxxxxxxxxxxxxxx",newData);
        membershipModel
        .update(newData, {
          where: {
            id: req.body.requestObject.mId
          }
        })
        .then(project => {
          console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",project);
          return res.status(200).send({message: project});
      })
      .catch(error => res.status(400).send(error));
      }else{
        console.log("ggggggggggggggggggggg",p.membership_id++);
        const updateData = {
          eOfficeAcNo: req.body.requestObject.eOfficeAcNo,
          status: req.body.requestObject.status,
          membership_id: p.membership_id++,
        };
        console.log("eeeeeeeeeeeeeeeeeeeeee",updateData);
      membershipModel
      .update(updateData, {
        where: {
          id: req.body.requestObject.mId
        }
      })
      .then(s => {
        console.log("ttttttttttttttttttttttttt",s);
        return res.status(200).send({message: s});
    })
    .catch(error => res.status(400).send(error));
  }
    })
    
  },

  //   membershipModel
  //     .update(newData, {
  //       where: {
  //         id: req.body.requestObject.mId
  //       }
  //     })
  //     .then(project => {
  //       console.log("hhhhhhhhhhhhhhh",project);
  //       return res.status(200).send({message: project});
  //   })
  //   .catch(error => res.status(400).send(error));
  // },


  updateReject(req, res){
    console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    const newData = {
      remark: req.body.requestObject.remark,
      status: req.body.requestObject.status,
    };
    membershipModel
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



  getMemberDataForAdmin(req, res){
    console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
      let query={
          raw: true,
          order: [
              ['createdAt', 'DESC']
            ],
      }

  console.log("Query is==========> ",query);
  return membershipModel
    .findAll(query)
    .then(user => {
      return res.status(200).send(user);
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send(error);
    });
  },









        // (req, res) {
        //     console.log("oooooooooooooooooooooooooo",req.file);
        //     console.log("jjjjjjjjjjjjjjjjj",req.body);
        //     if (!req.file) {
        // 		console.log('File not found');
        // 		return res.status(400).send({ status: false, message: 'File not found' });
        // 	} else {
        //         const newData = {
        //             panCard: req.file.path,
        //         }
        //     membershipModel
        //     .update(newData, {
        //         where: {
        //           id: req.body.dbID
        //         }
        //       })
        //     .then(project => {
        //         hi=project.id;
        //         console.log("hhhhhhhhhhhhhhh",hi);
        //         return res.status(200).send({message: hi});
        //     })
        //     .catch(error => res.status(400).send(error));
        //   }
        // },

















    // addMembership(req, res) {
    //     console.log("oooooooooooooooooooooooooo",req.file);
    //     console.log("jjjjjjjjjjjjjjjjj",req.body);
    //     if (!req.file) {
	// 		console.log('File not found');
	// 		return res.status(400).send({ status: false, message: 'File not found' });
	// 	} else {
    //     return membershipModel
    //     .create({
    //         f_name: req.body.f_name,
    //         m_name: req.body.m_name,
    //         l_name: req.body.l_name,
    //         path: req.file.path,
    //         fathers_name: req.body.fathers_name,
    //         address: req.body.address,
    //         dob: req.body.dob,
    //         gender: req.body.gender,
    //         purpose: req.body.purpose,
    //         occupation: req.body.occupation,
    //         introducer: req.body.introducer,
    //         email: req.body.email,
    //         phone_no: req.body.phone_no,
    //         status: req.body.status,
    //         userId: req.body.createdBy,
    //     })
    //     .then(project => {
    //         hi=project.id;
    //         console.log("hhhhhhhhhhhhhhh",hi);
    //         return res.status(200).send({message: hi});
    //     })
    //     .catch(error => res.status(400).send(error));
    //   }
    // },
    
}