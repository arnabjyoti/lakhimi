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

module.exports = {
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
          salaried: "Yes"
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
        // brunch_name: req.body.requestObject.brunch_name,
        // brunch_code: req.body.requestObject.brunch_code,
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
