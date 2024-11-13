const AuthController = require('./AuthController');
const DepartmentController = require('./departmentController');
const sendMail = require('./sendMail');
const brunchController = require('./brunchController');
const brunchMasterController = require('./brunchMasterController');
const userController = require('./userController');
const membershipController = require('./membershipController');
const AccountController = require('./AccountController');
const homeController = require('./homeController');
const loanController = require('./loanController');
const vendorController = require('./vendorController');
const expressLoanController = require('./expressLoanController');
const accountClosingEOController = require('./accountClosingEOController');
const CashierController = require('./CashierController');
const salaryController = require('./salaryController');
const fileUploadController = require('./fileUploadController');

module.exports = {
	AuthController,
	DepartmentController,
	sendMail,
	brunchController,
	brunchMasterController,
	userController,
	membershipController,
	AccountController,
	homeController,
	loanController,
	vendorController,
	expressLoanController,
	accountClosingEOController,
	CashierController,
	salaryController,
	fileUploadController
};
