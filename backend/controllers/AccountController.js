const membershipModel = require("../models").membership;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const accountModel = require("../models").account;
var Sequelize = require('sequelize');
const Op = require('sequelize').Op;

module.exports = {
    checkMemberData(req, res){
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return membershipModel
        .findOne({
            where: {
                membership_id: req.body.requestObject.membershipId,
                // brunchId: req.body.requestObject.brunchId
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


    checkPreAc(req, res){
      console.log("oooooooooooooooooooooooooo",req.body.requestObject);
      return accountModel
      .findAll({
        where: {
            membershipId: {
                [Op.ne]: null, // Ensure membershipId is not null
                [Op.eq]: req.body.requestObject // Match the given ID
            },
            status: {
                [Op.ne]: "Reject" // Exclude rejected records
            }
        }
    })
      .then(data => {
        if (data.length > 0) {
          console.log("ifffffffffffffff");
          
          return res.status(200).send({
            status: true,
            message: `Membership already exist.`,
          });
        } else {
          console.log("elseeeeeeeeeeeee");
          return res.status(200).send({
            status: false,
          });
          
        }
      })
      .catch(error => res.status(400).send(error));
  },



    addNewAccount(req, res) {
        console.log("jjjjjjjjjjjjjjjjj",req.body.requestObject);
        
        return accountModel
        .create({
            class: req.body.requestObject.class,
            classPrice: req.body.requestObject.classPrice,
            classAdminFee: req.body.requestObject.classAdminFee,
            nomineeName: req.body.requestObject.nomineeName.toUpperCase(),
            nomineeDOB: req.body.requestObject.nomineeDOB,
            nomineeGender: req.body.requestObject.nomineeGender,
            nomineePhnoe: req.body.requestObject.nomineePhnoe,
            nomineeRelation: req.body.requestObject.nomineeRelation,
            opening_balance: req.body.requestObject.opening_balance,
            type: req.body.requestObject.type,
            scheme: req.body.requestObject.scheme,
            dep_period: req.body.requestObject.dep_period,
            dep_frequency: req.body.requestObject.dep_frequency,
            startDate: req.body.requestObject.startDate,
            endDate: req.body.requestObject.endDate,
            first_instlmnt: req.body.requestObject.first_instlmnt,
            openingFee: req.body.requestObject.openingFee,
            brName: req.body.requestObject.brName,
            csp_msp: req.body.requestObject.csp_msp,
            ac_name: req.body.requestObject.ac_name,
            ac_type: req.body.requestObject.ac_type,
            ac_no: req.body.requestObject.ac_no,
            ac_ifsc: req.body.requestObject.ac_ifsc,
            ac_bankName: req.body.requestObject.ac_bankName,
            ac_brName: req.body.requestObject.ac_brName,
            status: "Applied",
            userId: req.body.requestObject.createdBy,
            brunchId: req.body.requestObject.brunchId,
            membershipId: req.body.requestObject.membershipId,
            reference_no: req.body.requestObject.reference_no
        })
        .then(project => {
            hi=project.id;
            console.log("hhhhhhhhhhhhhhh",project);
            return res.status(200).send({message: hi});
        })
        .catch(error => res.status(400).send(error));
    },

    updateAccountAplData(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
            class: req.body.requestObject.class,
            classPrice: req.body.requestObject.classPrice,
            classAdminFee: req.body.requestObject.classAdminFee,
            nomineeName: req.body.requestObject.nomineeName.toUpperCase(),
            nomineeDOB: req.body.requestObject.nomineeDOB,
            nomineeGender: req.body.requestObject.nomineeGender,
            nomineePhnoe: req.body.requestObject.nomineePhnoe,
            nomineeRelation: req.body.requestObject.nomineeRelation,
            opening_balance: req.body.requestObject.opening_balance,
            type: req.body.requestObject.type,
            scheme: req.body.requestObject.scheme,
            dep_period: req.body.requestObject.dep_period,
            dep_frequency: req.body.requestObject.dep_frequency,
            startDate: req.body.requestObject.startDate,
            endDate: req.body.requestObject.endDate,
            first_instlmnt: req.body.requestObject.first_instlmnt,
            openingFee: req.body.requestObject.openingFee,
            brName: req.body.requestObject.brName,
            csp_msp: req.body.requestObject.csp_msp,
            ac_name: req.body.requestObject.ac_name,
            ac_type: req.body.requestObject.ac_type,
            ac_no: req.body.requestObject.ac_no,
            ac_ifsc: req.body.requestObject.ac_ifsc,
            ac_bankName: req.body.requestObject.ac_bankName,
            ac_brName: req.body.requestObject.ac_brName,
            status: "Applied",
            userId: req.body.requestObject.createdBy,
            brunchId: req.body.requestObject.brunchId,
            membershipId: req.body.requestObject.membershipId,
            reference_no: req.body.requestObject.reference_no
        };
        accountModel
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
    
    



    getAppliedAcOpenData(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        let query={
            raw: true,
            order: [
                ['status', 'ASC']
              ],
              where: {
                brunchId: req.body.requestObject.brunchId
              },
              raw: true,
          include: [
            {
                model: membershipModel,
                required: false
            }
          ]
        }
  
    console.log("Query is==========> ",query);
    return accountModel
      .findAll(query)
      .then(user => {
        return res.status(200).send(user);
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
    },



    getAplAcById(req, res) {
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        return accountModel
        .findAll({
          order: [
            ['status', 'ASC']
          ],
          where: {
            userId: req.body.requestObject,
          },
          raw: true,
          include: [
            {
                model: membershipModel,
                required: false
            }
        ]
        })
        .then(data => {
          console.log("hhhhhhhhhhhhhhh",data);
          return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
      
      },



      getAcOpenById(req, res){
        return accountModel
        .findOne({
          where: {
            id: req.params.rqstId
          },
          raw: true,
          include: [
            {
                model: membershipModel,
                required: false,
                attributes: ['f_name','l_name','fathers_name', 'phone_no','address','dob','gender','panNo','adharNo','purpose','occupation','introducer','introducer_id']
            }
        ],
        attributes: ['id', 'account_no', 'class','classPrice','classAdminFee','nomineeName','nomineeDOB','nomineeGender','nomineePhnoe','nomineeRelation','type','scheme','dep_period','dep_frequency','startDate','endDate','first_instlmnt','openingFee','brName','csp_msp','ac_name','ac_type','ac_no','ac_ifsc','ac_bankName','ac_brName','status','userId','brunchId','membershipId','reference_no',
            [Sequelize.col('membership.f_name'), 'f_name'],
            [Sequelize.col('membership.l_name'), 'l_name'],
            [Sequelize.col('membership.fathers_name'), 'fathers_name'],
            [Sequelize.col('membership.phone_no'), 'phone_no'],
            [Sequelize.col('membership.address'), 'address'],
            [Sequelize.col('membership.dob'), 'dob'],
            [Sequelize.col('membership.gender'), 'gender'],
            [Sequelize.col('membership.panNo'), 'panNo'],
            [Sequelize.col('membership.adharNo'), 'adharNo'],
            [Sequelize.col('membership.purpose'), 'purpose'],
            [Sequelize.col('membership.occupation'), 'occupation'],
            [Sequelize.col('membership.introducer'), 'introducer'],
            [Sequelize.col('membership.introducer_id'), 'introducer_id']]
        })
        .then(project => {
          console.log("hhhhhhhhhhhhhhh",project);
          return res.status(200).send(project);
      })
      .catch(error => res.status(400).send(error));
    },



    updateAccountApprovel(req, res){
        console.log("******************************",req.body.requestObject);
        
        
        accountModel
        .findOne({
          limit: 1,
          order: [ [ 'account_no', 'DESC' ]]
        })
        .then(p=>{
          console.log("zzzzzzzzzzzzz",p.account_no);
          if (p.account_no == null) {
            const updateData = {
              status: "Approved",
              account_no: "2000000000001"
            };
            console.log("xxxxxxxxxxxxxxx",updateData);
            accountModel
            .update(updateData, {
              where: {
                id: req.body.requestObject.mId
              }
            })
            .then(s => {
              console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",s);
              return res.status(200).send({message: s});
          })
          .catch(error => res.status(400).send(error));
          }else{
            console.log("ggggggggggggggggggggg",p.account_no++);
            const updateData = {
              remark: null,
              status: req.body.requestObject.status,
              account_no: p.account_no++,
            };
            console.log("eeeeeeeeeeeeeeeeeeeeee",updateData);
          accountModel
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



      updateAccountReject(req, res){
        console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        const newData = {
          remark: req.body.requestObject.remark,
          status: req.body.requestObject.status,
        };
        accountModel
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



    getAppliedAcOpenDataForAdmin(req, res){
      console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
        let query={
            raw: true,
            order: [
                ['status', 'ASC']
              ],
              raw: true,
          include: [
            {
                model: membershipModel,
                required: false
            }
          ]
        }
  
    console.log("Query is==========> ",query);
    return accountModel
      .findAll(query)
      .then(user => {
        return res.status(200).send(user);
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error);
      });
    },

}