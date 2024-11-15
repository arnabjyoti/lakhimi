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
              oA: data.oA,
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
                  ],
                  where: {
                    id: {
                      [Sequelize.Op.in]: Sequelize.literal(`
                        (SELECT MAX(id) 
                         FROM brunchmasters
                         WHERE brunchmasters.userId = user.id
                         GROUP BY userId)
                      `),
                    },
                  },
                },
              ]
            },
        ],
        order: [
          [Sequelize.literal(`CASE 
            WHEN category = 'NON MANAGERIAL STAFF' THEN 1 
            WHEN category = 'BRANCH MANAGER' THEN 2 
            WHEN category = 'OFFICE ASSISTANT STAFF' THEN 3 
            WHEN category = 'FIELD EXECUTIVE STAFF' THEN 4
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
    },


    async checkSalaryRange(req, res) {
      try {
        console.log("Salary data:", req.body.requestObject);
    
        const { fromMonthYear, toMonthYear } = req.body.requestObject;
    
        // Check if `fromMonthYear` exists
        const fromData = await salaryModel.findOne({
          where: {
            entryDate: fromMonthYear,
          },
        });
    
        if (!fromData) {
          return res.status(200).send({
            status: false,
            message: `From month-year is invalid.`,
          });
        }
    
        // Check if `toMonthYear` exists
        const toData = await salaryModel.findOne({
          where: {
            entryDate: toMonthYear,
          },
        });
    
        if (!toData) {
          return res.status(200).send({
            status: false,
            message: `To month-year is invalid.`,
          });
        }
    
        // Fetch records within the specified range
        const records = await salaryModel.findAll({
          where: {
            entryDate: {
              [Op.between]: [fromMonthYear, toMonthYear],
            },
          },
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('basicPay')), 'totalBasicPay'],
            [Sequelize.fn('SUM', Sequelize.col('pA')), 'totalPA'],
            [Sequelize.fn('SUM', Sequelize.col('tA')), 'totalTA'],
            [Sequelize.fn('SUM', Sequelize.col('oA')), 'totalOA'],
            [Sequelize.fn('SUM', Sequelize.col('GrossSalary')), 'totalGrossSalary'],
            [Sequelize.fn('SUM', Sequelize.col('PTax')), 'totalPTax'],
            [Sequelize.fn('SUM', Sequelize.col('insurance')), 'totalInsurance'],
            [Sequelize.fn('SUM', Sequelize.col('eWF')), 'totalEWF'],
            [Sequelize.fn('SUM', Sequelize.col('canteenFee')), 'totalCanteenFee'],
            [Sequelize.fn('SUM', Sequelize.col('absentCharge')), 'totalAbsentCharge'],
            [Sequelize.fn('SUM', Sequelize.col('EWFrefund')), 'totalEWFrefund'],
            [Sequelize.fn('SUM', Sequelize.col('loanEMI')), 'totalLoanEMI'],
            [Sequelize.fn('SUM', Sequelize.col('Others')), 'totalOthers'],
            [Sequelize.fn('SUM', Sequelize.col('netSalary')), 'totalNetPay'],
          ],
        });

        // Extract totals from the response
        const totalData = { totalBasicPay, totalPA, totalTA, totalOA, totalGrossSalary, totalPTax, totalInsurance, totalEWF, totalCanteenFee, totalAbsentCharge, totalEWFrefund, totalLoanEMI, totalOthers, totalNetPay } = records[0].dataValues;
    
        // console.log("Total Basic Pay:", totalBasicPay);
        // console.log("Total Net Pay:", totalNetPay);
        // console.log("Records:", records);
    
        return res.status(200).send({
          status: true,
          message: "Records fetched successfully.",
          data: totalData,
        });
    
      } catch (error) {
        console.error("Error in checkSalaryRange:", error);
        return res.status(500).send({
          status: false,
          message: "An error occurred while fetching salary range records.",
        });
      }
    }
    
}