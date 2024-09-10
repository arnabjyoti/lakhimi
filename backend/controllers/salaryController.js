const async = require("async");
const usersModel = require("../models").users;
const salaryModel = require("../models").salary;
const brunchModel = require("../models").brunch;
const brunchMasterModel = require("../models").brunchMaster;
var _ = require('lodash');
const Op = require('sequelize').Op;
var Sequelize = require('sequelize');



module.exports = {

    async saveSalaries(req, res){
        console.log("salary dataaaaaaaaaaaaaa",req.body);
        
    try {
        const salaryData = req.body.requestObject;

        if (!Array.isArray(salaryData)) {
            return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
          }
    
        const savedSalaries = await Promise.all(
          salaryData.map(async (data) => {
            console.log("mapppppppppppp");
            
            return await salaryModel.create({
              userId: data.employeeId,
              basicPay: data.basicPay,
              pA: data.pA,
              tA: data.tA,
              GrossSalary: data.GrossSalary,
              PTax: data.PTax,
              insurance: data.insurance,
              eWF: data.eWF,
              canteenFee: data.canteenFee,
              absentCharge: data.absentCharge,
              EWFrefund: data.EWFrefund,
              loanEMI: data.loanEMI,
              Others: data.Others,
              netSalary: data.netSalary,
              entryDate: data.entryDate,
            });
          })
        );
    
        res.status(201).json(savedSalaries);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save salary data' });
      }
    },



    checkSalary(req, res) {
      console.log("salary dataaaaaaaaaaaaaa",req.body.requestObject);

      return salaryModel
      .findAll({
        raw: true,
        where: {
          entryDate: req.body.requestObject.year+req.body.requestObject.month,
        },
          include: [
            {
              model: usersModel,
              required: false,
              include: [
                {
                  model: brunchMasterModel,
                  required: false,
                  include: [
                    {
                      model: brunchModel,
                      required: false,
                    },
                  ]
                },
              ]
            },
        ],
        order: [
          [Sequelize.literal(`CASE 
            WHEN position = 'Head office' THEN 1 
            WHEN position = 'Branch Manager' THEN 2 
            WHEN position = 'Cashier' THEN 3 
            WHEN position = 'Field Agent' THEN 4
            ELSE 5
          END`), 'ASC']
        ]
      })
      .then(salaryData => {
        return res.status(200).send(salaryData);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send({ status: false, message: error });
      });
    }
    
}