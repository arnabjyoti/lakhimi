const async = require("async");
const usersModel = require("../models").users;
const rolePrivilegeModel = require("../models").roles;
const privilegeModel = require("../models").privilege;
const brunchMasterModel = require("../models").brunchMaster;
const brunchModel = require("../models").brunch;
const bcrypt = require("bcrypt");
var request = require('request');
const Op = require('sequelize').Op;

module.exports = {
  //Start: Method to authenticate a user
  authenticate(req, res) {
    var flag = false;
    const email = req.body.requestObject.email;
    // const password = req.body.requestObject.password;
    // const hashPass = bcrypt.hashSync(password, 10);
    var userObject = {};
    var datasss = {};

    console.log("++++++++++++",userObject);

    return usersModel
      .findOne({
        where: {
          email: email,
          // password: hashPass,
          active: "Active"
        },
      })
      .then(userData => {
        if (!userData) {
          return res.status(200).send({
            status: false,
            message: `Wrong email.`,
            type: `email`
          });
        } else {
          userData = userData.get();
          userObject.usr = userData;
          console.log("llllllllllllllllllllll",userData);
              rolePrivilegeModel
                .findAll({
                  where: {
                    role: userData.role
                  },
                  include: [
                    {
                      model: privilegeModel,
                      attributes: ["id", "slug"]
                    }
                  ],
                  raw: true
                })
                .then(perm => {
                  // if(userObject.usr.position == "Brunch Manager"){
                  //   userObject = userObject
                  //   userObject.privileges = perm;
                  //   brunchMasterModel
                  //   .findAll({
                  //     where: {
                  //       userId: userData.id
                  //     },
                  //     include: [
                  //       {
                  //         model: brunchModel,
                  //       }
                  //     ],
                  //     raw: true
                  //   })
                  //   .then(br => {
                  //     brId = br.brunchId
                  //     console.log("vvvvvvvvvvvvvvvvvvvvvv",br);
                  //     userObject.br = br;
                      
                  //     datasss = userObject;
                  //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",datasss);
                  //   })
                  // return res
                  //   .status(200)
                  //   .send({ status: true, message: datasss });

                  // }else{
                  userObject.privileges = perm;
                  console.log("kkkkkkkkkkkkkkkkkkk");
                  return res
                    .status(200)
                    .send({ status: true, message: userObject });
                  // }
                })
                .catch(error => {
                  console.log(error);
                  return res
                    .status(500)
                    .send({ status: false, message: error });
                });
            

        }
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send({ status: false, message: error });
      });
  },
  //End


  verifyEmail(req, res){
      var emailID = req.body.requestObject;

      if(emailID===null || emailID===''){
        return res.status(400).send({'error':'Something went wrong'});
      }
      return usersModel
        .findOne({
          where: {
            email: emailID,
          },
          attributes: [
            "email",
          ]
        })
        .then(emailData => {
          if(!emailData){
            return res.status(200).send({ message: "notExist" });
          } else {
            return res.status(200).send({ message: "exist" });
          }
          // return res.status(200).send({ message: "exist" });
        })
        .catch(error => {
          console.log(error);
          return res.status(400).send(error);
        });
    },

  getUserList(req, res){
      let query={
          raw: true,
          order: [
              ['position', 'ASC']
            ],
            where: {
              role: { [Op.ne]: "head_office" }
            }
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

    
};
