const async = require("async");
const membershipModel = require("../models").membership;
const usersModel = require("../models").users;
const brunchModel = require("../models").brunch;
const brunchMasterModel = require("../models").brunchMaster;
const accountModel = require("../models").account;
const loanModel = require("../models").loans;
const loanPostDatedModel = require("../models").loan_post_dated;
const loanNomineeModel = require("../models").loan_nominee;
const loanMspModel = require("../models").loan_msp;
const loanGuarantorModel = require("../models").loan_guarantor;
const loanBasicFirstModel = require("../models").loan_basic_first;
const loanBasicSecondModel = require("../models").loan_basic_second;
const loanOthers = require("../models").loan_others;

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'test';
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const ExifImage = require('exif').ExifImage;
const Op = require('sequelize').Op;
var Sequelize = require('sequelize');


module.exports = {

  upload_config: multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				// console.log("config",config);
        console.log("dbid",req.body);
				let userid = req.body.userId+'_';
                console.log("9999999999999999999",req.body.dbid);
        const userFolder = 'customer';
				let dest = path.join(config.FILE_UPLOAD_PATH, userFolder, userid);
				
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
    let dest = path.join(config.FILE_UPLOAD_PATH, dir);
    console.log('Create ' + dest);
    fs.mkdirSync(dest, callback);
  },



    async checkAcCount(req, res){
        console.log("oooooooooooooooooooooooooo",req.body.requestObject);
        
        const AcCount = await accountModel.count({
            where: {
                membershipId: req.body.requestObject,
                status: "Approved",
              }
        });

        try{
          return res.status(200).send({AcCount});
          }catch(err){
            return res.status(400).send(err);
          }
},



getLoanApplyListByFA(req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
  return loanModel
  .findAll({
    where: {
      userId: req.body.requestObject,
      [Op.or]: [
        { loan_status: "Applied"},
        { loan_status: "Rejected" },
        { loan_status: "Completed" },
        { loan_status: "Documents not Uploaded" },
      ]
      // loan_status: "Applied",
    },
    order: [
      ['createdAt', 'ASC']
    ],
    raw: true,
  })
  .then(data => {
    console.log("hhhhhhhhhhhhhhh",data);
    return res.status(200).send(data);
})
.catch(error => res.status(400).send(error));

},

getLoanApplyListByBM(req, res) {
  console.log("vvvvvvvvvvvvvvvvvvvv",req.body.requestObject);
  return loanModel
  .findAll({
    where: {
      brunchId: req.body.requestObject,
      reference_no: {
        [Op.ne]: null
      }
    },
    order: [
      ['createdAt', 'ASC']
    ],
    raw: true,
    include: [
      {
          model: loanOthers,
          required: false,
          attributes: ['id']
      }
      ],
  attributes: ['id', 'full_name', 'reference_no', 'fwd_status', 'fa_status', 'apply_amount', 'apply_date', 'loan_status', 'membership_id', 'bm_status', 'lo_status', 'md_status', 'cm_status','cm_proposed_amnt', 'userId',
  [Sequelize.col('loan_other.sanction_no'), 'sanction_no'],
  [Sequelize.col('loan_other.interest_type'), 'interest_type'],
  [Sequelize.col('loan_other.amount_of_emi'), 'amount_of_emi'],
  [Sequelize.col('loan_other.processing_fee'), 'processing_fee'],
  [Sequelize.col('loan_other.number_of_emi'), 'number_of_emi'],
  [Sequelize.col('loan_other.mss_super_fee'), 'mss_super_fee'],
  [Sequelize.col('loan_other.Lapsed_eposit'), 'Lapsed_eposit'],
  [Sequelize.col('loan_other.cheque_leaf_1'), 'cheque_leaf_1'],
  [Sequelize.col('loan_other.cheque_leaf_2'), 'cheque_leaf_2'],
  [Sequelize.col('loan_other.cheque_leaf_3'), 'cheque_leaf_3'],
  [Sequelize.col('loan_other.others'), 'others']]
  })
  .then(data => {
    console.log("hhhhhhhhhhhhhhh",data);
    return res.status(200).send(data);
})
.catch(error => res.status(400).send(error));

},

getLoanApplyListHOByLO(req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
  return loanModel
  .findAll({
    where: {
      [Op.or]: [
        { bm_status: "Rejected"},
        { bm_status: "Forwarded" },
      ]
      // loan_status: "Applied",
      // bm_status: "Forwarded",
    },
    order: [
      ['createdAt', 'ASC']
    ],
    raw: true,
  })
  .then(data => {
    console.log("hhhhhhhhhhhhhhh",data);
    return res.status(200).send(data);
})
.catch(error => res.status(400).send(error));

},

getLoanApplyListHOByMD(req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
  return loanModel
  .findAll({
    where: {
      [Op.or]: [
        { lo_status: "Rejected"},
        { lo_status: "Forwarded" },
      ]
      // loan_status: "Applied",
      // lo_status: "Forwarded",
    },
    order: [
      ['createdAt', 'ASC']
    ],
    raw: true,
  })
  .then(data => {
    console.log("hhhhhhhhhhhhhhh",data);
    return res.status(200).send(data);
})
.catch(error => res.status(400).send(error));

},

getLoanApplyListHOByCM(req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxx",req.body.requestObject);
  return loanModel
  .findAll({
    where: {
      [Op.or]: [
        { md_status: "Rejected"},
        { md_status: "Forwarded" },
      ]
      // loan_status: "Applied",
      // md_status: "Forwarded",
    },
    order: [
      ['createdAt', 'ASC']
    ],
    raw: true,
  })
  .then(data => {
    console.log("hhhhhhhhhhhhhhh",data);
    return res.status(200).send(data);
})
.catch(error => res.status(400).send(error));

},


createLoan(req, res) {
  console.log("lllllllllllll",req.body.requestObject);
  return loanModel
      .create({
        full_name: req.body.requestObject.full_name,
        age: req.body.requestObject.age,
        a_occupation: req.body.requestObject.a_occupation,
        a_maried: req.body.requestObject.a_maried,
        a_resident: req.body.requestObject.a_resident,
        a_stay_since: req.body.requestObject.a_stay_since,
        a_house_owner: req.body.requestObject.a_house_owner,
        a_house_owner_phone: req.body.requestObject.a_house_owner_phone,
        a_education: req.body.requestObject.a_education,
        a_temp_address: req.body.requestObject.a_temp_address,
        a_Depend_family: req.body.requestObject.a_Depend_family,
        fa_status: req.body.requestObject.fa_status,

        loan_status: "Documents not Uploaded",

        // reference_no: req.body.requestObject.reference_no,

        fwd_status: "Branch Manager",

        apply_date: req.body.requestObject.msp_apply_date,
        apply_amount: req.body.requestObject.l_aapply_amount,

        loan_approve_date: req.body.requestObject.loan_approve_date,
        membership_id: req.body.requestObject.membershipId,
        brunch_name: req.body.requestObject.brunch_name,

        membershipId: req.body.requestObject.id,
        userId: req.body.requestObject.userId,
        brunchId: req.body.requestObject.brunchId,
      })
      .then(loan => {
        console.log("check new entry", loan.id);
        async.parallel({
          insertLoanBasicFirst: fn1 => {
            console.log("loan Basic First Modellllllllll");
            loanBasicFirstModel
              .create({
                loanId: loan.id,
                l_loan_scheme: req.body.requestObject.l_loan_scheme,
                l_loan_scheme_intrst: req.body.requestObject.l_loan_scheme_intrst,
                l_aapply_amount: req.body.requestObject.l_aapply_amount,
                l_expected_month: req.body.requestObject.l_expected_month,
                l_mode_repay: req.body.requestObject.l_mode_repay,
                l_customer_id: req.body.requestObject.l_customer_id,
                l_share_amt: req.body.requestObject.l_share_amt,
                l_br_name: req.body.requestObject.l_br_name,
                l_fresh_loan: req.body.requestObject.l_fresh_loan,
                l_last_loan_amt: req.body.requestObject.l_last_loan_amt,
                l_last_purpose: req.body.requestObject.l_last_purpose,
                l_deposit_acNo: req.body.requestObject.l_deposit_acNo,
                l_deposit_balance: req.body.requestObject.l_deposit_balance,
                l_deposit_scheme: req.body.requestObject.l_deposit_scheme,
                l_deposit_status: req.body.requestObject.l_deposit_status,
                l_deposit_maturity: req.body.requestObject.l_deposit_maturity,
                l_deposit_acNo1: req.body.requestObject.l_deposit_acNo1,
                l_deposit_balance1: req.body.requestObject.l_deposit_balance1,
                l_deposit_scheme1: req.body.requestObject.l_deposit_scheme1,
                l_deposit_status1: req.body.requestObject.l_deposit_status1,
                l_deposit_maturity1: req.body.requestObject.l_deposit_maturity1,
                l_deposit_acNo2: req.body.requestObject.l_deposit_acNo2,
                l_deposit_balance2: req.body.requestObject.l_deposit_balance2,
                l_deposit_scheme2: req.body.requestObject.l_deposit_scheme2,
                l_deposit_status2: req.body.requestObject.l_deposit_status2,
                l_deposit_maturity2: req.body.requestObject.l_deposit_maturity2,
                l_deposit_acNo3: req.body.requestObject.l_deposit_acNo3,
                l_deposit_balance3: req.body.requestObject.l_deposit_balance3,
                l_deposit_scheme3: req.body.requestObject.l_deposit_scheme3,
                l_deposit_status3: req.body.requestObject.l_deposit_status3,
                l_deposit_maturity3: req.body.requestObject.l_deposit_maturity3,
                l_deposit_acN4: req.body.requestObject.l_deposit_acN4,
                l_deposit_balance4: req.body.requestObject.l_deposit_balance4,
                l_deposit_schem4: req.body.requestObject.l_deposit_schem4,
                l_deposit_statu4: req.body.requestObject.l_deposit_statu4,
                l_deposit_maturit4: req.body.requestObject.l_deposit_maturit4,
                l_goods_type: req.body.requestObject.l_goods_type,
                l_brand_name: req.body.requestObject.l_brand_name,
                l_model_no: req.body.requestObject.l_model_no,
                l_goods_colour: req.body.requestObject.l_goods_colour,
                l_warrentee: req.body.requestObject.l_warrentee,
              })
              .then(fund => {
                 
              });
          },

          insertLoanBasicSecond: fn2 => {
            console.log("loan Basic Second Modellllllllllll");
            loanBasicSecondModel
              .create({
                loanId: loan.id,
                l_employee_type: req.body.requestObject.l_employee_type,
                l_emp_emp_type: req.body.requestObject.l_emp_emp_type,
                l_emp_mode_salary: req.body.requestObject.l_emp_mode_salary,
                l_emp_net_salary: req.body.requestObject.l_emp_net_salary,
                l_emp_othr_incm: req.body.requestObject.l_emp_othr_incm,
                l_self_bsns_type: req.body.requestObject.l_self_bsns_type,
                l_self_bsns_start: req.body.requestObject.l_self_bsns_start,
                l_self_prfsn: req.body.requestObject.l_self_prfsn,
                l_self_practice_start: req.body.requestObject.l_self_practice_start,
                l_emp_anual_incm: req.body.requestObject.l_emp_anual_incm,
                l_emp_anual_expnd: req.body.requestObject.l_emp_anual_expnd,
                l_emp_net_income: req.body.requestObject.l_emp_net_income,
                l_self_reg_no: req.body.requestObject.l_self_reg_no,
                l_emp_name: req.body.requestObject.l_emp_name,
                l_emp_loan_amnt: req.body.requestObject.l_emp_loan_amnt,
                l_emp_emi: req.body.requestObject.l_emp_emi,
                l_emp_balance: req.body.requestObject.l_emp_balance,
                l_emp_startDate: req.body.requestObject.l_emp_startDate,
                l_emp_name1: req.body.requestObject.l_emp_name1,
                l_emp_loan_amnt1: req.body.requestObject.l_emp_loan_amnt1,
                l_emp_emi1: req.body.requestObject.l_emp_emi1,
                l_emp_balance1: req.body.requestObject.l_emp_balance1,
                l_emp_startDate1: req.body.requestObject.l_emp_startDate1,
                l_emp_name2: req.body.requestObject.l_emp_name2,
                l_emp_loan_amnt2: req.body.requestObject.l_emp_loan_amnt2,
                l_emp_emi2: req.body.requestObject.l_emp_emi2,
                l_emp_balance2: req.body.requestObject.l_emp_balance2,
                l_emp_startDate2: req.body.requestObject.l_emp_startDate2,
                l_emp_name3: req.body.requestObject.l_emp_name3,
                l_emp_loan_amnt3: req.body.requestObject.l_emp_loan_amnt3,
                l_emp_emi3: req.body.requestObject.l_emp_emi3,
                l_emp_balance3: req.body.requestObject.l_emp_balance3,
                l_emp_startDate3: req.body.requestObject.l_emp_startDate3,
                l_emp_name4: req.body.requestObject.l_emp_name4,
                l_emp_loan_amnt4: req.body.requestObject.l_emp_loan_amnt4,
                l_emp_emi4: req.body.requestObject.l_emp_emi4,
                l_emp_balance4: req.body.requestObject.l_emp_balance4,
                l_emp_startDate4: req.body.requestObject.l_emp_startDate4,
                l_make: req.body.requestObject.l_make,
                l_model: req.body.requestObject.l_model,
                l_colour: req.body.requestObject.l_colour,
                l_engine_no: req.body.requestObject.l_engine_no,
                l_chassis_no: req.body.requestObject.l_chassis_no,
                l_ac_name: req.body.requestObject.l_ac_name,
                l_ac_type: req.body.requestObject.l_ac_type,
                l_ac_no: req.body.requestObject.l_ac_no,
                l_ac_ifsc: req.body.requestObject.l_ac_ifsc,
                l_ac_bankName: req.body.requestObject.l_ac_bankName,
                l_ac_brName: req.body.requestObject.l_ac_brName,
              })
              .then(fund => {
                 
              });
          },

          insertLoanGuarantor: fn2 => {
            console.log("loan Guarantor Modellllllllllll");
            loanGuarantorModel
              .create({
                loanId: loan.id,
                g_f_name: req.body.requestObject.g_f_name,
                g_email: req.body.requestObject.g_email,
                g_fathers_name: req.body.requestObject.g_fathers_name,
                g_phone_no: req.body.requestObject.g_phone_no,
                g_address: req.body.requestObject.g_address,
                g_occupation: req.body.requestObject.g_occupation,
                g_dob: req.body.requestObject.g_dob,
                g_gender: req.body.requestObject.g_gender,
                g_maried: req.body.requestObject.g_maried,
                g_resident: req.body.requestObject.g_resident,
                g_house_owner: req.body.requestObject.g_house_owner,
                g_house_owner_phone: req.body.requestObject.g_house_owner_phone,
                g_stay_since: req.body.requestObject.g_stay_since,
                g_edu: req.body.requestObject.g_edu,
                g_temp_address: req.body.requestObject.g_temp_address,
                g_Depend_family: req.body.requestObject.g_Depend_family,
                g_ac_no: req.body.requestObject.g_ac_no,
                g_br_name: req.body.requestObject.g_br_name,
                g_scheme: req.body.requestObject.g_scheme,
                g_start: req.body.requestObject.g_start,
                g_customer_id: req.body.requestObject.g_customer_id,
                g_end: req.body.requestObject.g_end,
                g_total_amnt: req.body.requestObject.g_total_amnt,
                g_csp_msp: req.body.requestObject.g_csp_msp,
                g_adharNo: req.body.requestObject.g_adharNo,
                g_panNo: req.body.requestObject.g_panNo,
                g_employee_type: req.body.requestObject.g_employee_type,
                g_emp_emp_type: req.body.requestObject.g_emp_emp_type,
                g_emp_mode_salary: req.body.requestObject.g_emp_mode_salary,
                g_emp_net_salary: req.body.requestObject.g_emp_net_salary,
                g_emp_othr_incm: req.body.requestObject.g_emp_othr_incm,
                g_self_bsns_type: req.body.requestObject.g_self_bsns_type,
                g_self_bsns_start: req.body.requestObject.g_self_bsns_start,
                g_self_prfsn: req.body.requestObject.g_self_prfsn,
                g_self_practice_start: req.body.requestObject.g_self_practice_start,
                g_self_anual_incm: req.body.requestObject.g_self_anual_incm,
                g_self_anual_expnd: req.body.requestObject.g_self_anual_expnd,
                g_self_net_income: req.body.requestObject.g_self_net_income,
                g_LA_name: req.body.requestObject.g_LA_name,
                g_LA_loan_amnt: req.body.requestObject.g_LA_loan_amnt,
                g_LA_emi: req.body.requestObject.g_LA_emi,
                g_LA_balance: req.body.requestObject.g_LA_balance,
                g_LA_startDate: req.body.requestObject.g_LA_startDate,
                g_LA_name1: req.body.requestObject.g_LA_name1,
                g_LA_loan_amnt1: req.body.requestObject.g_LA_loan_amnt1,
                g_LA_emi1: req.body.requestObject.g_LA_emi1,
                g_LA_balance1: req.body.requestObject.g_LA_balance1,
                g_LA_startDate1: req.body.requestObject.g_LA_startDate1,
                g_LA_name2: req.body.requestObject.g_LA_name2,
                g_LA_loan_amnt2: req.body.requestObject.g_LA_loan_amnt2,
                g_LA_emi2: req.body.requestObject.g_LA_emi2,
                g_LA_balance2: req.body.requestObject.g_LA_balance2,
                g_LA_startDate2: req.body.requestObject.g_LA_startDate2,
                g_LA_name3: req.body.requestObject.g_LA_name3,
                g_LA_loan_amnt3: req.body.requestObject.g_LA_loan_amnt3,
                g_LA_emi3: req.body.requestObject.g_LA_emi3,
                g_LA_balance3: req.body.requestObject.g_LA_balance3,
                g_LA_startDate3: req.body.requestObject.g_LA_startDate3,
                g_LA_name4: req.body.requestObject.g_LA_name4,
                g_LA_loan_amnt4: req.body.requestObject.g_LA_loan_amnt4,
                g_LA_emi4: req.body.requestObject.g_LA_emi4,
                g_LA_balance4: req.body.requestObject.g_LA_balance4,
                g_LA_startDate4: req.body.requestObject.g_LA_startDate4,
              })
              .then(fund => {
                 
              });
          },

          insertLoanMsp: fn2 => {
            console.log("loan Msp Modellllllllll");
            loanMspModel
              .create({
                loanId: loan.id,
                msp_name: req.body.requestObject.msp_name,
                msp_nick_name: req.body.requestObject.msp_nick_name,
                msp_permanent_rsd: req.body.requestObject.msp_permanent_rsd,
                msp_temporary_rsd: req.body.requestObject.msp_temporary_rsd,
                msp_resident: req.body.requestObject.msp_resident,
                msp_bsns_resident: req.body.requestObject.msp_bsns_resident,
                msp_bsns_type: req.body.requestObject.msp_bsns_type,
                msp_knwn_since: req.body.requestObject.msp_knwn_since,
                msp_owner_bsns: req.body.requestObject.msp_owner_bsns,
                msp_bsns_coFndr: req.body.requestObject.msp_bsns_coFndr,
                msp_estbls_name: req.body.requestObject.msp_estbls_name,
                msp_mltpl_bsns: req.body.requestObject.msp_mltpl_bsns,
                msp_stock_value: req.body.requestObject.msp_stock_value,
                msp_size_bsns: req.body.requestObject.msp_size_bsns,
                no_of_ac: req.body.requestObject.no_of_ac,
                msp_reg_deposit: req.body.requestObject.msp_reg_deposit,
                msp_reg_deposit_bsns: req.body.requestObject.msp_reg_deposit_bsns,
                msp_intrst_savings: req.body.requestObject.msp_intrst_savings,
                msp_reg_intrst_loan: req.body.requestObject.msp_reg_intrst_loan,
                msp_aprx_incm: req.body.requestObject.msp_aprx_incm,
                msp_cordnt: req.body.requestObject.msp_cordnt,
                msp_behaviour: req.body.requestObject.msp_behaviour,
                msp_inters_us: req.body.requestObject.msp_inters_us,
                msp_service_satisfied: req.body.requestObject.msp_service_satisfied,
                msp_thnk_abt_us: req.body.requestObject.msp_thnk_abt_us,
                msp_criminal_hstry: req.body.requestObject.msp_criminal_hstry,
                msp_financ_knwldg: req.body.requestObject.msp_financ_knwldg,
                msp_mind_belief: req.body.requestObject.msp_mind_belief,
                msp_literate: req.body.requestObject.msp_literate,
                msp_code: req.body.requestObject.msp_code,
                msp_branch_name: req.body.requestObject.msp_branch_name,
                msp_apply_date: req.body.requestObject.msp_apply_date,
                msp_place: req.body.requestObject.msp_place,
              })
              .then(fund => {
                 
              });
          },

          insertLoanNominee: fn2 => {
            console.log("loan Nominee Modellllllll");
            loanNomineeModel
              .create({
                loanId: loan.id,
                n_nominee_name: req.body.requestObject.n_nominee_name,
                n_fathers_name: req.body.requestObject.n_fathers_name,
                n_dob: req.body.requestObject.n_dob,
                n_gender: req.body.requestObject.n_gender,
                n_adhar: req.body.requestObject.n_adhar,
                n_pnone_no: req.body.requestObject.n_pnone_no,
                n_pan: req.body.requestObject.n_pan,
                n_email: req.body.requestObject.n_email,
                n_address: req.body.requestObject.n_address,
                n_relation: req.body.requestObject.n_relation,
                n_margin: req.body.requestObject.n_margin,
                n_margin_qty: req.body.requestObject.n_margin_qty,
                n_margin_value: req.body.requestObject.n_margin_value,
                n_gold: req.body.requestObject.n_gold,
                n_gold_qty: req.body.requestObject.n_gold_qty,
                n_gold_value: req.body.requestObject.n_gold_value,
                n_land: req.body.requestObject.n_land,
                n_land_qty: req.body.requestObject.n_land_qty,
                n_land_value: req.body.requestObject.n_land_value,
                n_land_buildings: req.body.requestObject.n_land_buildings,
                n_land_buildings_qty: req.body.requestObject.n_land_buildings_qty,
                n_land_buildings_value: req.body.requestObject.n_land_buildings_value,
              })
              .then(fund => {
                 
              });
          },

          insertLoanPostDated: fn2 => {
            console.log("loan Post Dated Modelllllllllll");
            loanPostDatedModel
              .create({
                loanId: loan.id,
                // c_bank_name: req.body.requestObject.c_bank_name,
                // c_br_name: req.body.requestObject.c_br_name,
                // c_account: req.body.requestObject.c_account,
                // c_name_in_ac: req.body.requestObject.c_name_in_ac,
                // c_micr: req.body.requestObject.c_micr,
                // c_ck_leave: req.body.requestObject.c_ck_leave,
                // c_commencement: req.body.requestObject.c_commencement,
                // c_ck_number: req.body.requestObject.c_ck_number,
                // c_ck_amnt: req.body.requestObject.c_ck_amnt,
              })
              .then(fund => {
                 
              });
          },

          insertLoanOthers: fn2 => {
            console.log("loan Othersssssssssss");
            loanOthers
              .create({
                loanId: loan.id,
              })
              .then(fund => {
                 
              });
          },
        });
        // return res.status(200).send({message: hi});
        res.status(200).send(loan);
      })
      .catch(error =>{
        res.status(400).send(error);
      });
},



//upload

uploadIncome(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
        l_income_proof: req.file.originalname,
      }
  loanBasicFirstModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadBankStatement(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          l_bank_stmnt: req.file.originalname,
      }
  loanBasicFirstModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadOccuProof(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          l_occu_proof: req.file.originalname,
      }
  loanBasicFirstModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadGrntrPhoto(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          g_photo: req.file.originalname,
      }
  loanGuarantorModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadGrntrId(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          g_id_proof: req.file.originalname,
      }
  loanGuarantorModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadGrntrSign(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          g_sign: req.file.originalname,
      }
      loanGuarantorModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadGrntrAddress(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          g_address_proof: req.file.originalname,
      }
  loanGuarantorModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadGrntrFS(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          g_FS: req.file.originalname,
      }
  loanGuarantorModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadNomineePhoto(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          n_photo: req.file.originalname,
      }
  loanNomineeModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadNomineeId(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          n_id_proof: req.file.originalname,
      }
  loanNomineeModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadNomineeSign(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          n_sign: req.file.originalname,
      }
  loanNomineeModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadNomineeAddress(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          n_address_proof: req.file.originalname,
      }
  loanNomineeModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadNomineeFS(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
          n_FS: req.file.originalname,
      }
  loanNomineeModel
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

// end upload

// final save
finaLoanSave(req, res) {
  console.log("lllllllllllll",req.body.requestObject);
  const newData = {
    reference_no: req.body.requestObject.referenceNo,
    loan_status: "Applied",
  }
  loanModel
  .update(newData, {
    where: {
      id: req.body.requestObject.dbId,
    }
  })
  .then(project => {
    hi=project.id;
    console.log("hhhhhhhhhhhhhhh",hi);
    return res.status(200).send({message: hi});
})
.catch(error => res.status(400).send(error));
},

getLoanDataById(req, res){
  return loanModel
  .findOne({
    where: {
      id: req.params.rqstId
    },
    raw: true,
    include: [
      {
        model: loanBasicFirstModel,
        required: false,
      },
      {
        model: loanBasicSecondModel,
        required: false,
      },
      {
        model: loanGuarantorModel,
        required: false,
      },
      {
        model: loanMspModel,
        required: false,
      },
      {
        model: loanNomineeModel,
        required: false,
      },
      {
        model: loanPostDatedModel,
        required: false,
      },
      {
        model: loanOthers,
        required: false,
      },
      {
        model: usersModel,
        required: false,
      },
      {
        model: brunchModel,
        required: false,
      },
      {
        model: membershipModel,
        required: false,
        include: [
          {
            model: usersModel,
            required: false,
          },
          {
            model: brunchModel,
            required: false,
          },
        ]
      },
      ],
  })
  .then(project => {
    console.log("hhhhhhhhhhhhhhh",project);
    return res.status(200).send(project);
})
.catch(error => res.status(400).send(error));
},


updateBMstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    bm_proposed_amnt: req.body.requestObject.bm_proposed_amnt,
    bm_fwd_date: req.body.requestObject.bm_fwd_date,
    bm_status: req.body.requestObject.bm_status,
    fwd_status: "Loan Officer",

    loan_status: "Applied",

    md_status: null,

    lo_status: null,

    cm_status: null,
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},


updateLOstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    lo_proposed_amnt: req.body.requestObject.lo_proposed_amnt,
    lo_fwd_date: req.body.requestObject.lo_fwd_date,
    lo_status: req.body.requestObject.lo_status,
    fwd_status: "Managing Director",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},

updateMDstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    md_proposed_amnt: req.body.requestObject.md_proposed_amnt,
    md_fwd_date: req.body.requestObject.md_fwd_date,
    md_status: req.body.requestObject.md_status,
    fwd_status: "Chairman"
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},

updateCMstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    cm_proposed_amnt: req.body.requestObject.cm_proposed_amnt,
    cm_fwd_date: req.body.requestObject.cm_fwd_date,
    cm_status: "Approved",
    loan_status: "Approved",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},


// reject controller

rejectBMstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    bm_reason: req.body.requestObject.bm_reason,
    bm_fwd_date: req.body.requestObject.bm_fwd_date,
    bm_status: req.body.requestObject.bm_status,

    loan_status: "Rejected",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},


rejectLOstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    lo_reason: req.body.requestObject.lo_reason,
    lo_fwd_date: req.body.requestObject.lo_fwd_date,
    lo_status: req.body.requestObject.lo_status,

    loan_status: "Rejected",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},

rejectMDstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    md_reason: req.body.requestObject.md_reason,
    md_fwd_date: req.body.requestObject.md_fwd_date,
    md_status: req.body.requestObject.md_status,

    lo_status: "Rejected",
    lo_reason: "Managing Director Rejected",
    lo_fwd_date: req.body.requestObject.cm_fwd_date,

    loan_status: "Rejected",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},



rejectCMstatus(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  const newData = {
    cm_reason: req.body.requestObject.cm_reason,
    cm_fwd_date: req.body.requestObject.cm_fwd_date,
    cm_status: req.body.requestObject.cm_status,

    md_status: "Rejected",
    md_reason: "Chairman Rejected",
    md_fwd_date: req.body.requestObject.cm_fwd_date,

    lo_status: "Rejected",
    lo_reason: "Chairman Rejected",
    lo_fwd_date: req.body.requestObject.cm_fwd_date,

    loan_status: "Rejected",
  };
  loanModel
    .update(newData, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},












updateLoanOthersData(req, res){
  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
    const newDataOthers = {
      sanction_no: req.body.requestObject.sanction_no,
      interest_type: req.body.requestObject.interest_type,
      amount_of_emi: req.body.requestObject.amount_of_emi,
      number_of_emi: req.body.requestObject.number_of_emi,
      processing_fee: req.body.requestObject.processing_fee,
      sanction_amount: req.body.requestObject.sanction_amount,
      mss_super_fee: req.body.requestObject.mss_super_fee,
      Lapsed_eposit: req.body.requestObject.Lapsed_eposit,
      others: req.body.requestObject.others,
      loanStart: req.body.requestObject.loanStart,
      loanEnd: req.body.requestObject.loanEnd,
    };
    const newDataLoan = {
      loan_status: "Completed"
    };
    const newPostDated = {
      c_bank_name: req.body.requestObject.c_bank_name,
      c_br_name: req.body.requestObject.c_br_name,
      c_account: req.body.requestObject.c_account,
      c_name_in_ac: req.body.requestObject.c_name_in_ac,
      c_micr: req.body.requestObject.c_micr,
      c_ck_leave: req.body.requestObject.c_ck_leave,
      c_commencement: req.body.requestObject.c_commencement,
      c_ck_number: req.body.requestObject.c_ck_number,
      c_ck_amnt: req.body.requestObject.c_ck_amnt,
    }
    loanOthers
    .update(newDataOthers, {
      where: {
        loanId: req.body.requestObject.id
      }
    })
    loanPostDatedModel
    .update(newPostDated, {
      where: {
        loanId: req.body.requestObject.id
      }
    })
    loanModel
    .update(newDataLoan, {
      where: {
        id: req.body.requestObject.id
      }
    })
    .then(project => {
      console.log("hhhhhhhhhhhhhhh",project);
      return res.status(200).send({message: project});
  })
  .catch(error => res.status(400).send(error));
},


uploadCkLfFile1(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
        cheque_leaf_1: req.file.originalname,
      }
  loanOthers
  .update(newData, {
      where: {
        loanId: req.body.dbid
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


uploadCkLfFile2(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
        cheque_leaf_2: req.file.originalname,
      }
  loanOthers
  .update(newData, {
      where: {
        loanId: req.body.dbid
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

uploadCkLfFile3(req, res) {
  console.log("oooooooooooooooooooooooooo",req.file);
  console.log("jjjjjjjjjjjjjjjjj",req.body);
  if (!req.file) {
      console.log('File not found');
      return res.status(400).send({ status: false, message: 'File not found' });
  } else {
      const newData = {
        cheque_leaf_3: req.file.originalname,
      }
  loanOthers
  .update(newData, {
      where: {
        loanId: req.body.dbid
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


updateLoanData(req, res){

  console.log("++++++++++++++++++++++++++++++++",req.body.requestObject);
  
  const newData1 = {

        reference_no: req.body.requestObject.reference_no,
        apply_amount: req.body.requestObject.l_aapply_amount,
        a_occupation: req.body.requestObject.a_occupation,
        a_maried: req.body.requestObject.a_maried,
        a_resident: req.body.requestObject.a_resident,
        a_stay_since: req.body.requestObject.a_stay_since,
        a_house_owner: req.body.requestObject.a_house_owner,
        a_house_owner_phone: req.body.requestObject.a_house_owner_phone,
        a_education: req.body.requestObject.a_education,
        a_temp_address: req.body.requestObject.a_temp_address,
        a_Depend_family: req.body.requestObject.a_Depend_family,
        bm_status: null,
        bm_reason: null,
        bm_fwd_date: null,
        loan_status: "Applied"
  };
  const newData2 = {
        l_loan_scheme: req.body.requestObject.l_loan_scheme,
        l_loan_scheme_intrst: req.body.requestObject.l_loan_scheme_intrst,
        l_aapply_amount: req.body.requestObject.l_aapply_amount,
        l_expected_month: req.body.requestObject.l_expected_month,
        l_mode_repay: req.body.requestObject.l_mode_repay,
        l_share_amt: req.body.requestObject.l_share_amt,
        l_fresh_loan: req.body.requestObject.l_fresh_loan,
        l_last_loan_amt: req.body.requestObject.l_last_loan_amt,
        l_last_purpose: req.body.requestObject.l_last_purpose,
        l_deposit_acNo: req.body.requestObject.l_deposit_acNo,
        l_deposit_balance: req.body.requestObject.l_deposit_balance,
        l_deposit_scheme: req.body.requestObject.l_deposit_scheme,
        l_deposit_status: req.body.requestObject.l_deposit_status,
        l_deposit_maturity: req.body.requestObject.l_deposit_maturity,
        l_deposit_acNo1: req.body.requestObject.l_deposit_acNo1,
        l_deposit_balance1: req.body.requestObject.l_deposit_balance1,
        l_deposit_scheme1: req.body.requestObject.l_deposit_scheme1,
        l_deposit_status1: req.body.requestObject.l_deposit_status1,
        l_deposit_maturity1: req.body.requestObject.l_deposit_maturity1,
        l_deposit_acNo2: req.body.requestObject.l_deposit_acNo2,
        l_deposit_balance2: req.body.requestObject.l_deposit_balance2,
        l_deposit_scheme2: req.body.requestObject.l_deposit_scheme2,
        l_deposit_status2: req.body.requestObject.l_deposit_status2,
        l_deposit_maturity2: req.body.requestObject.l_deposit_maturity2,
        l_deposit_acNo3: req.body.requestObject.l_deposit_acNo3,
        l_deposit_balance3: req.body.requestObject.l_deposit_balance3,
        l_deposit_scheme3: req.body.requestObject.l_deposit_scheme3,
        l_deposit_status3: req.body.requestObject.l_deposit_status3,
        l_deposit_maturity3: req.body.requestObject.l_deposit_maturity3,
        l_deposit_acN4: req.body.requestObject.l_deposit_acN4,
        l_deposit_balance4: req.body.requestObject.l_deposit_balance4,
        l_deposit_schem4: req.body.requestObject.l_deposit_schem4,
        l_deposit_statu4: req.body.requestObject.l_deposit_statu4,
        l_deposit_maturit4: req.body.requestObject.l_deposit_maturit4,
        l_goods_type: req.body.requestObject.l_goods_type,
        l_brand_name: req.body.requestObject.l_brand_name,
        l_model_no: req.body.requestObject.l_model_no,
        l_goods_colour: req.body.requestObject.l_goods_colour,
        l_warrentee: req.body.requestObject.l_warrentee,
  };

  const newData3 = {
        l_employee_type: req.body.requestObject.l_employee_type,
        l_emp_emp_type: req.body.requestObject.l_emp_emp_type,
        l_emp_mode_salary: req.body.requestObject.l_emp_mode_salary,
        l_emp_net_salary: req.body.requestObject.l_emp_net_salary,
        l_emp_othr_incm: req.body.requestObject.l_emp_othr_incm,
        l_self_bsns_type: req.body.requestObject.l_self_bsns_type,
        l_self_bsns_start: req.body.requestObject.l_self_bsns_start,
        l_self_prfsn: req.body.requestObject.l_self_prfsn,
        l_self_practice_start: req.body.requestObject.l_self_practice_start,
        l_emp_anual_incm: req.body.requestObject.l_emp_anual_incm,
        l_emp_anual_expnd: req.body.requestObject.l_emp_anual_expnd,
        l_emp_net_income: req.body.requestObject.l_emp_net_income,
        l_self_reg_no: req.body.requestObject.l_self_reg_no,
        l_emp_name: req.body.requestObject.l_emp_name,
        l_emp_loan_amnt: req.body.requestObject.l_emp_loan_amnt,
        l_emp_emi: req.body.requestObject.l_emp_emi,
        l_emp_balance: req.body.requestObject.l_emp_balance,
        l_emp_startDate: req.body.requestObject.l_emp_startDate,
        l_emp_name1: req.body.requestObject.l_emp_name1,
        l_emp_loan_amnt1: req.body.requestObject.l_emp_loan_amnt1,
        l_emp_emi1: req.body.requestObject.l_emp_emi1,
        l_emp_balance1: req.body.requestObject.l_emp_balance1,
        l_emp_startDate1: req.body.requestObject.l_emp_startDate1,
        l_emp_name2: req.body.requestObject.l_emp_name2,
        l_emp_loan_amnt2: req.body.requestObject.l_emp_loan_amnt2,
        l_emp_emi2: req.body.requestObject.l_emp_emi2,
        l_emp_balance2: req.body.requestObject.l_emp_balance2,
        l_emp_startDate2: req.body.requestObject.l_emp_startDate2,
        l_emp_name3: req.body.requestObject.l_emp_name3,
        l_emp_loan_amnt3: req.body.requestObject.l_emp_loan_amnt3,
        l_emp_emi3: req.body.requestObject.l_emp_emi3,
        l_emp_balance3: req.body.requestObject.l_emp_balance3,
        l_emp_startDate3: req.body.requestObject.l_emp_startDate3,
        l_emp_name4: req.body.requestObject.l_emp_name4,
        l_emp_loan_amnt4: req.body.requestObject.l_emp_loan_amnt4,
        l_emp_emi4: req.body.requestObject.l_emp_emi4,
        l_emp_balance4: req.body.requestObject.l_emp_balance4,
        l_emp_startDate4: req.body.requestObject.l_emp_startDate4,
        l_make: req.body.requestObject.l_make,
        l_model: req.body.requestObject.l_model,
        l_colour: req.body.requestObject.l_colour,
        l_engine_no: req.body.requestObject.l_engine_no,
        l_chassis_no: req.body.requestObject.l_chassis_no,
        l_ac_name: req.body.requestObject.l_ac_name,
        l_ac_type: req.body.requestObject.l_ac_type,
        l_ac_no: req.body.requestObject.l_ac_no,
        l_ac_ifsc: req.body.requestObject.l_ac_ifsc,
        l_ac_bankName: req.body.requestObject.l_ac_bankName,
        l_ac_brName: req.body.requestObject.l_ac_brName,
  };

  const newData4 = {

        g_f_name: req.body.requestObject.g_f_name,
        g_email: req.body.requestObject.g_email,
        g_fathers_name: req.body.requestObject.g_fathers_name,
        g_phone_no: req.body.requestObject.g_phone_no,
        g_address: req.body.requestObject.g_address,
        g_occupation: req.body.requestObject.g_occupation,
        g_dob: req.body.requestObject.g_dob,
        g_gender: req.body.requestObject.g_gender,
        g_maried: req.body.requestObject.g_maried,
        g_resident: req.body.requestObject.g_resident,
        g_house_owner: req.body.requestObject.g_house_owner,
        g_house_owner_phone: req.body.requestObject.g_house_owner_phone,
        g_stay_since: req.body.requestObject.g_stay_since,
        g_edu: req.body.requestObject.g_edu,
        g_temp_address: req.body.requestObject.g_temp_address,
        g_Depend_family: req.body.requestObject.g_Depend_family,
        g_ac_no: req.body.requestObject.g_ac_no,
        g_br_name: req.body.requestObject.g_br_name,
        g_scheme: req.body.requestObject.g_scheme,
        g_start: req.body.requestObject.g_start,
        g_customer_id: req.body.requestObject.g_customer_id,
        g_end: req.body.requestObject.g_end,
        g_total_amnt: req.body.requestObject.g_total_amnt,
        g_csp_msp: req.body.requestObject.g_csp_msp,
        g_adharNo: req.body.requestObject.g_adharNo,
        g_panNo: req.body.requestObject.g_panNo,
        g_employee_type: req.body.requestObject.g_employee_type,
        g_emp_emp_type: req.body.requestObject.g_emp_emp_type,
        g_emp_mode_salary: req.body.requestObject.g_emp_mode_salary,
        g_emp_net_salary: req.body.requestObject.g_emp_net_salary,
        g_emp_othr_incm: req.body.requestObject.g_emp_othr_incm,
        g_self_bsns_type: req.body.requestObject.g_self_bsns_type,
        g_self_bsns_start: req.body.requestObject.g_self_bsns_start,
        g_self_prfsn: req.body.requestObject.g_self_prfsn,
        g_self_practice_start: req.body.requestObject.g_self_practice_start,
        g_self_anual_incm: req.body.requestObject.g_self_anual_incm,
        g_self_anual_expnd: req.body.requestObject.g_self_anual_expnd,
        g_self_net_income: req.body.requestObject.g_self_net_income,
        g_LA_name: req.body.requestObject.g_LA_name,
        g_LA_loan_amnt: req.body.requestObject.g_LA_loan_amnt,
        g_LA_emi: req.body.requestObject.g_LA_emi,
        g_LA_balance: req.body.requestObject.g_LA_balance,
        g_LA_startDate: req.body.requestObject.g_LA_startDate,
        g_LA_name1: req.body.requestObject.g_LA_name1,
        g_LA_loan_amnt1: req.body.requestObject.g_LA_loan_amnt1,
        g_LA_emi1: req.body.requestObject.g_LA_emi1,
        g_LA_balance1: req.body.requestObject.g_LA_balance1,
        g_LA_startDate1: req.body.requestObject.g_LA_startDate1,
        g_LA_name2: req.body.requestObject.g_LA_name2,
        g_LA_loan_amnt2: req.body.requestObject.g_LA_loan_amnt2,
        g_LA_emi2: req.body.requestObject.g_LA_emi2,
        g_LA_balance2: req.body.requestObject.g_LA_balance2,
        g_LA_startDate2: req.body.requestObject.g_LA_startDate2,
        g_LA_name3: req.body.requestObject.g_LA_name3,
        g_LA_loan_amnt3: req.body.requestObject.g_LA_loan_amnt3,
        g_LA_emi3: req.body.requestObject.g_LA_emi3,
        g_LA_balance3: req.body.requestObject.g_LA_balance3,
        g_LA_startDate3: req.body.requestObject.g_LA_startDate3,
        g_LA_name4: req.body.requestObject.g_LA_name4,
        g_LA_loan_amnt4: req.body.requestObject.g_LA_loan_amnt4,
        g_LA_emi4: req.body.requestObject.g_LA_emi4,
        g_LA_balance4: req.body.requestObject.g_LA_balance4,
        g_LA_startDate4: req.body.requestObject.g_LA_startDate4,
  };

  const newData5 = {

        msp_name: req.body.requestObject.msp_name,
        msp_nick_name: req.body.requestObject.msp_nick_name,
        msp_permanent_rsd: req.body.requestObject.msp_permanent_rsd,
        msp_temporary_rsd: req.body.requestObject.msp_temporary_rsd,
        msp_resident: req.body.requestObject.msp_resident,
        msp_bsns_resident: req.body.requestObject.msp_bsns_resident,
        msp_bsns_type: req.body.requestObject.msp_bsns_type,
        msp_knwn_since: req.body.requestObject.msp_knwn_since,
        msp_owner_bsns: req.body.requestObject.msp_owner_bsns,
        msp_bsns_coFndr: req.body.requestObject.msp_bsns_coFndr,
        msp_estbls_name: req.body.requestObject.msp_estbls_name,
        msp_mltpl_bsns: req.body.requestObject.msp_mltpl_bsns,
        msp_stock_value: req.body.requestObject.msp_stock_value,
        msp_size_bsns: req.body.requestObject.msp_size_bsns,
        msp_reg_deposit: req.body.requestObject.msp_reg_deposit,
        msp_reg_deposit_bsns: req.body.requestObject.msp_reg_deposit_bsns,
        msp_intrst_savings: req.body.requestObject.msp_intrst_savings,
        msp_reg_intrst_loan: req.body.requestObject.msp_reg_intrst_loan,
        msp_aprx_incm: req.body.requestObject.msp_aprx_incm,
        msp_cordnt: req.body.requestObject.msp_cordnt,
        msp_behaviour: req.body.requestObject.msp_behaviour,
        msp_inters_us: req.body.requestObject.msp_inters_us,
        msp_service_satisfied: req.body.requestObject.msp_service_satisfied,
        msp_thnk_abt_us: req.body.requestObject.msp_thnk_abt_us,
        msp_criminal_hstry: req.body.requestObject.msp_criminal_hstry,
        msp_financ_knwldg: req.body.requestObject.msp_financ_knwldg,
        msp_mind_belief: req.body.requestObject.msp_mind_belief,
        msp_literate: req.body.requestObject.msp_literate,
        msp_place: req.body.requestObject.msp_place,
  };

  const newData6 = {

        n_nominee_name: req.body.requestObject.n_nominee_name,
        n_fathers_name: req.body.requestObject.n_fathers_name,
        n_dob: req.body.requestObject.n_dob,
        n_gender: req.body.requestObject.n_gender,
        n_adhar: req.body.requestObject.n_adhar,
        n_pnone_no: req.body.requestObject.n_pnone_no,
        n_pan: req.body.requestObject.n_pan,
        n_email: req.body.requestObject.n_email,
        n_address: req.body.requestObject.n_address,
        n_relation: req.body.requestObject.n_relation,
        n_margin: req.body.requestObject.n_margin,
        n_margin_qty: req.body.requestObject.n_margin_qty,
        n_margin_value: req.body.requestObject.n_margin_value,
        n_gold: req.body.requestObject.n_gold,
        n_gold_qty: req.body.requestObject.n_gold_qty,
        n_gold_value: req.body.requestObject.n_gold_value,
        n_land: req.body.requestObject.n_land,
        n_land_qty: req.body.requestObject.n_land_qty,
        n_land_value: req.body.requestObject.n_land_value,
        n_land_buildings: req.body.requestObject.n_land_buildings,
        n_land_buildings_qty: req.body.requestObject.n_land_buildings_qty,
        n_land_buildings_value: req.body.requestObject.n_land_buildings_value,
  };

  const newData7 = {

        c_bank_name: req.body.requestObject.c_bank_name,
        c_br_name: req.body.requestObject.c_br_name,
        c_account: req.body.requestObject.c_account,
        c_name_in_ac: req.body.requestObject.c_name_in_ac,
        c_micr: req.body.requestObject.c_micr,
        c_ck_leave: req.body.requestObject.c_ck_leave,
        c_commencement: req.body.requestObject.c_commencement,
        c_ck_number: req.body.requestObject.c_ck_number,
        c_ck_amnt: req.body.requestObject.c_ck_amnt,                
  };
  console.log("mmmmmmmmmmmmmmmmmmmmmmm+",newData1);
  console.log("dddddddddddddddddddddddd+",newData2);

  loanModel
  .update(newData1, {
    where: {
      id: req.body.requestObject.mId
    }
  })
  .then(project => {
    console.log("hhhhhhhhhhhhhhh",project);
    async.parallel({
      insertLoanBasicFirst: fn1 => {
        console.log("cal111111111111111");
        loanBasicFirstModel
        .update(newData2, {
          where: {
            id: req.body.requestObject.mId
          }
        })
        .then(fund => {
                 
        });
    },
    insertLoanBasicSecond: fn1 => {
      console.log("cal22222222222");
      loanBasicSecondModel
      .update(newData3, {
        where: {
          loanId: req.body.requestObject.mId
        }
      })
      .then(fund => {
               
      });
    },
    insertLoanGuarantor: fn3 => {
      console.log("cal33333333333");
      loanGuarantorModel
      .update(newData4, {
        where: {
          loanId: req.body.requestObject.mId
        }
      })
      .then(fund => {
               
      });
    },

    insertLoanMsp: fn4 => {
      console.log("call44444444444");
      loanMspModel
      .update(newData5, {
        where: {
          loanId: req.body.requestObject.mId
        }
      })
      .then(fund => {
               
      });
    },

    insertLoanNominee: fn5 => {
      console.log("call55555555555");
      loanNomineeModel
      .update(newData6, {
        where: {
          loanId: req.body.requestObject.mId
        }
      })
      .then(fund => {
               
      });
    },

    insertLoanPostDated: fn6 => {
      console.log("call6666666666");
      loanPostDatedModel
      .update(newData7, {
        where: {
          loanId: req.body.requestObject.mId
        }
      })
      .then(fund => {
               
      });
    },

  });
  // return res.status(200).send({message: hi});
  return res.status(200).send({message: project});
})
.catch(error => res.status(400).send(error));
}

}