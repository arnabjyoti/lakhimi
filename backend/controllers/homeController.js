const membershipModel = require("../models").membership;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const brunchMasterModel = require("../models").brunchMaster;
const accountModel = require("../models").account;
const loanModel = require("../models").loans;
const Op = require('sequelize').Op;



module.exports = {
    async headCount(req, res){
   
        const membershipApproveCount = await membershipModel.count({
            where: {
                status: "Approved",
              }
        });

        const membershipAppliedCount = await membershipModel.count({
          where: {
              status: "Applied",
            }
        });

        const accountApproveCount = await accountModel.count({
          where: {
              status: "Approved",
            }
        });

        const accountAppliedCount = await accountModel.count({
          where: {
              status: "Applied",
            }
        });
    
        const branchCount = await brunchModel.count({
        });

        const branchManagerCount = await usersModel.count({
            where: {
              role: "branch_manager"
            }
          });
        
        const fieldAgentCount = await usersModel.count({
            where: {
              role: "field_agent"
            }
          });

        const adminloanAppliedCount = await loanModel.count({
            where: {
              [Op.or]: [
                { loan_status: "Applied"},
                { loan_status: "Approved" },
              ]
            }
          });

        const adminloanApprovedCount = await loanModel.count({
            where: {
              loan_status: "Completed"
            }
          });
        console.log("Total Count =========>>>",membershipAppliedCount);
        try{
        return res.status(200).send({membershipApproveCount,membershipAppliedCount,accountApproveCount,accountAppliedCount,branchCount,branchManagerCount,fieldAgentCount,adminloanAppliedCount,adminloanApprovedCount});
        }catch(err){
          return res.status(400).send(err);
        }
      },


      async branchOfficeCount(req, res){
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        
        const membershipApproveCount = await membershipModel.count({
            where: {
                brunchId: req.body.requestObject,
                status: "Approved",
              }
        });

        const membershipAppliedCount = await membershipModel.count({
          where: {
              brunchId: req.body.requestObject,
              status: "Applied",
            }
        });

        const accountApproveCount = await accountModel.count({
          where: {
              brunchId: req.body.requestObject,
              status: "Approved",
            }
        });

        const accountAppliedCount = await accountModel.count({
          where: {
              brunchId: req.body.requestObject,
              status: "Applied",
            }
        });

        const fieldAgentCount = await brunchMasterModel.count({
          where: {
            brunchId: req.body.requestObject,
          }
        });

        const loanAppliedCount = await loanModel.count({
          where: {
            [Op.or]: [
              { loan_status: "Applied"},
              { loan_status: "Approved" },
            ],
            brunchId: req.body.requestObject,
          }
        });

      const loanApprovedCount = await loanModel.count({
          where: {
            loan_status: "Completed",
            brunchId: req.body.requestObject,
          }
        });

        try{
          return res.status(200).send({membershipApproveCount,membershipAppliedCount,accountApproveCount,accountAppliedCount,fieldAgentCount,loanAppliedCount,loanApprovedCount});
          }catch(err){
            return res.status(400).send(err);
          }
},


async fieldOfficeCount(req, res){
  console.log("oooooooooooooooooooooooooo",req.body.requestObject);
  
  const membershipApproveCount = await membershipModel.count({
      where: {
          userId: req.body.requestObject,
          status: "Approved",
        }
  });

  const membershipAppliedCount = await membershipModel.count({
    where: {
        userId: req.body.requestObject,
        status: "Applied",
      }
  });

  const accountApproveCount = await accountModel.count({
    where: {
        userId: req.body.requestObject,
        status: "Approved",
      }
  });

  const accountAppliedCount = await accountModel.count({
    where: {
        userId: req.body.requestObject,
        status: "Applied",
      }
  });

  const loanAppliedCount = await loanModel.count({
    where: {
        userId: req.body.requestObject,
        loan_status: "Applied",
      }
  });

  const loanApproveCount = await loanModel.count({
    where: {
        userId: req.body.requestObject,
        loan_status: "Approved",
      }
  });

  try{
    return res.status(200).send({membershipApproveCount,membershipAppliedCount,accountApproveCount,accountAppliedCount,loanAppliedCount,loanApproveCount});
    }catch(err){
      return res.status(400).send(err);
    }
},


}