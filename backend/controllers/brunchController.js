const async = require("async");
const brunchModel = require("../models").brunch;
const brunchMasterModel = require("../models").brunchMaster;
var _ = require('lodash');
const Op = require('sequelize').Op;

module.exports = {

    addBrunch(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return brunchModel
        .create({
            brunch_name: req.body.requestObject.brunch_name.toUpperCase(),
            brunch_code: req.body.requestObject.brunch_code.toUpperCase(),
            brunch_location: req.body.requestObject.brunch_location.toUpperCase(),
            brunch_adrs: req.body.requestObject.brunch_adrs.toUpperCase(),
            brunch_cntct_no: req.body.requestObject.brunch_cntct_no,
            brunch_email: req.body.requestObject.brunch_email,
        })
        .then(project => res.status(200).send({ message: "success" }))
        .catch(error => res.status(400).send(error));
      },


      getBrunch(req, res){
        let query={
            raw: true,
            order: [
                ['brunch_name', 'ASC']
              ]
        }

    console.log("Query is==========> ppppppppppppppp",query);
    return brunchModel
      .findAll(query)
      .then(brunch => {
        return res.status(200).send(brunch);
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });

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
    
}