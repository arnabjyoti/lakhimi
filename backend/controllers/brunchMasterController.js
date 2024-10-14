const async = require("async");
const brunch = require("../models/brunch");
const brunchMasterModel = require("../models").brunchMaster;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const Op = require('sequelize').Op;
var _ = require("lodash");
var Sequelize = require('sequelize');


module.exports = {

    addBrunchDetails(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return brunchMasterModel
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

      brDetails(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return brunchMasterModel
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


     getBrunchDetails(req, res){
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
                "position"
              ],
            },
            ],
              where: {
                '$user.position$': 'Branch Manager',
              },
          }

          console.log("Query is==========> oooooooooooooooooooooooo",query);
          return brunchMasterModel
            .findAll(query)
            .then(brunch => {
              return res.status(200).send(brunch);
            })
            .catch(error => {
              console.log(error);
              return res.status(400).send(error);
            });

      },


      getFieldAgentDetails(req, res){
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
                "address"
              ],
            },
            ],
              where: {
                '$user.position$': 'Field Agent',
              },
          }

          console.log("Query is==========> oooooooooooooooooooooooo",query);
          return brunchMasterModel
            .findAll(query)
            .then(brunch => {
              return res.status(200).send(brunch);
            })
            .catch(error => {
              console.log(error);
              return res.status(400).send(error);
            });

      },

      getFieldAgentDetailsByBrunch(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        return brunchMasterModel
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


      getFreeBrunch(req, res){
        return brunchMasterModel
        .findAll({
          order: [["brunchId", "ASC"]],
          raw: true,
        })
        .then(bm => {
          ss = _.map(bm, function(bm) { return bm.brunchId; })
          console.log("hhhhhhhhhhh",ss);
          if (!bm) {
            res.status(200).send({});
            // return fn(proj);
          }
              brunchModel.findAll({
                where: {
                  id: {[Op.notIn]: ss }
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

      getFreeUser(req, res){
        return brunchMasterModel
        .findAll({
          order: [["brunchId", "ASC"]],
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
                  role: "branch_manager"
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


      getFreeFieldAgent(req, res){
        return brunchMasterModel
        .findAll({
          order: [["userId", "ASC"]],
          raw: true,
        })
        .then(bm => {
          ss = _.map(bm, function(bm) { return bm.userId; })
          // bm is all branchmaster data
          console.log("hhhhhhhhhhh",ss);
          // ss is branch master userId(foreign key) who is assigned to branch
          if (!bm) {
            res.status(200).send({});
            // return fn(proj);
          }
              usersModel.findAll({
                where: {
                  id: {[Op.notIn]: ss },
                  role: "field_agent"
                },
                raw: true
              })
              .then(brunch => {
                // here we compare user model Id with branch master userId and whose role is "field_agent" in user model
                console.log("free agent",brunch);
                return res.status(200).send(brunch);
              })
              .catch(error => {
                console.log(error);
                return res.status(400).send(error);
              });
            
        })
      },


      brunchByUserId(req, res){
        console.log("rrrrrrrrrrrrrr",req.body.userId);
        return brunchMasterModel
        .findOne({
          where: {
            userId: req.body.requestObject.userId
          },
          raw: true
        })
        .then(project => {
          console.log("hhhhhhhhhhhhhhh",project);
          return res.status(200).send(project);
      })
      .catch(error => res.status(400).send(error));
      },

    // console.log("Query is==========> ppppppppppppppp",query);
    // return brunchModel
    //   .findAll(query)
    //   .then(brunch => {
    //     return res.status(200).send(brunch);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return res.status(400).send(error);
    //   });

    // },



    updateBrunchManager(req, res) {
      console.log("oooooooooooooooooooooooooo",req.body.requestObject);
      const newData = {
        userId: req.body.requestObject.usr_id,
      };
      brunchMasterModel
      .update(newData, {
        where: {
          id: req.body.requestObject.id,
        }
      })
      .then(project => res.status(200).send({ message: "success" }))
      .catch(error => res.status(400).send(error));
    }
    
}