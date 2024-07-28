const { sendMail, brunchController, brunchMasterController, userController, membershipController, loanController, vendorController, expressLoan, expressLoanController } = require('../controllers');
const AccountController = require('../controllers/AccountController');
const departmentController = require('../controllers/departmentController');
const homeController = require('../controllers/homeController');
const accountClosingEOController = require('../controllers/accountClosingEOController');
const CashierController = require('../controllers/CashierController');
const AuthController = require('../controllers').AuthController;

//Api's
module.exports = (app) => {
	app.get('/api', (req, res) =>
		res.status(200).send({
			message: 'Welcome'
		})
	);

	app.post('/api/authenticate', AuthController.authenticate);

	app.get('/api/department', departmentController.getDepartment);

	app.post('/api/addDepartment', departmentController.addDepartment);
	
	app.post('/api/updateDept', departmentController.updateDept);

	app.post('/api/verifyEmail', AuthController.verifyEmail);

	app.post('/api/sendOtp', sendMail.sendOtp);


	//user
	app.get('/api/getUserList', userController.getUserList);

	app.post('/api/createUser', userController.createUser);

	app.get('/api/getfieldAgent', userController.getfieldAgent);
	
	app.post('/api/brunchByUserId', brunchMasterController.brunchByUserId);

	app.get('/api/getBrunchManager', userController.getBrunchManager);


	//brunch
	app.post('/api/addBrunch', brunchController.addBrunch);

	app.get('/api/getBrunch', brunchController.getBrunch);
	

	//brunch master
	app.get('/api/getBrunchDetails', brunchMasterController.getBrunchDetails);

	app.get('/api/getFreeBrunch', brunchMasterController.getFreeBrunch);

	app.get('/api/getFreeUser', brunchMasterController.getFreeUser);

	app.post('/api/addBrunchDetails', brunchMasterController.addBrunchDetails);
	
	app.post('/api/updateBrunchManager', brunchMasterController.updateBrunchManager);

	app.get('/api/getFreeFieldAgent', brunchMasterController.getFreeFieldAgent);

	app.post('/api/brDetails', brunchMasterController.brDetails);

	app.get('/api/getFieldAgentDetails', brunchMasterController.getFieldAgentDetails);

	app.post('/api/getFieldAgentDetailsByBrunch', brunchMasterController.getFieldAgentDetailsByBrunch);


	//cashier
	app.get('/api/getFreeCashier', CashierController.getFreeCashier);

	app.get('/api/getCashierDetails', CashierController.getCashierDetails);

	app.post('/api/addCashierBrunchDetails', CashierController.addCashierBrunchDetails);

	app.post('/api/getCashierDetailsByBrunch', CashierController.getCashierDetailsByBrunch);

	app.post('/api/saveCashCounter', CashierController.upload_config.single('file'), CashierController.saveCashCounter);

	app.post('/api/getCashCounterListByCA', CashierController.getCashCounterListByCA);

	app.post('/api/brDetailsCashCounter', CashierController.brDetailsCashCounter);

	app.post('/api/getCashCounterListByadmin', CashierController.getCashCounterListByadmin);

	app.post('/api/getCashCounterListByBranch', CashierController.getCashCounterListByBranch);

	app.post('/api/filterDataByCashier', CashierController.filterDataByCashier);

	app.post('/api/filterDataByCashierBranch', CashierController.filterDataByCashierBranch);

	app.post('/api/filterDataAll', CashierController.filterDataAll);

	app.post('/api/filterDataCondition', CashierController.filterDataCondition);
	

	//Field Agent 
	app.get('/api/getFreeBrunch', brunchController.getFreeBrunch);


	//membership
	app.post('/api/addMembership', membershipController.addMembership);

	app.post('/api/uploadPan', membershipController.upload_config.single('file'), membershipController.uploadPan);

	app.post('/api/uploadAdhar', membershipController.upload_config.single('file'), membershipController.uploadAdhar);

	app.post('/api/uploadPhoto', membershipController.upload_config.single('file'), membershipController.uploadPhoto);

	app.post('/api/uploadSign', membershipController.upload_config.single('file'), membershipController.uploadSign);

	app.post('/api/getAppliedMemberData', membershipController.getAppliedMemberData);

	app.post('/api/getAplMembrById', membershipController.getAplMembrById);

	app.get('/api/getMembershipById/:rqstId', membershipController.getMembershipById);

	app.post('/api/updateMemberAplData', membershipController.updateMemberAplData);

	app.post('/api/updateApprovel', membershipController.updateApprovel);

	app.post('/api/updateReject', membershipController.updateReject);
	
	//account
	app.post('/api/checkMemberData', AccountController.checkMemberData);

	app.post('/api/addNewAccount', AccountController.addNewAccount);

	app.post('/api/getAppliedAcOpenData', AccountController.getAppliedAcOpenData);

	app.post('/api/getAplAcById', AccountController.getAplAcById);

	app.get('/api/getAcOpenById/:rqstId', AccountController.getAcOpenById);

	app.post('/api/updateAccountAplData', AccountController.updateAccountAplData);

	app.post('/api/updateAccountApprovel', AccountController.updateAccountApprovel);

	app.post('/api/updateAccountReject', AccountController.updateAccountReject);

	

	//count
	app.get('/api/headCount', homeController.headCount);

	app.post('/api/branchOfficeCount', homeController.branchOfficeCount);

	app.post('/api/fieldOfficeCount', homeController.fieldOfficeCount);


	//loan 
	app.post('/api/checkAcCount', loanController.checkAcCount);

	app.post('/api/createLoan', loanController.createLoan);

	app.post('/api/uploadIncome', loanController.upload_config.single('file'), loanController.uploadIncome);

	app.post('/api/uploadBankStatement', loanController.upload_config.single('file'), loanController.uploadBankStatement);

	app.post('/api/uploadOccuProof', loanController.upload_config.single('file'), loanController.uploadOccuProof);

	app.post('/api/uploadGrntrPhoto', loanController.upload_config.single('file'), loanController.uploadGrntrPhoto);

	app.post('/api/uploadGrntrId', loanController.upload_config.single('file'), loanController.uploadGrntrId);

	app.post('/api/uploadGrntrSign', loanController.upload_config.single('file'), loanController.uploadGrntrSign);

	app.post('/api/uploadGrntrAddress', loanController.upload_config.single('file'), loanController.uploadGrntrAddress);

	app.post('/api/uploadGrntrFS', loanController.upload_config.single('file'), loanController.uploadGrntrFS);

	app.post('/api/uploadNomineePhoto', loanController.upload_config.single('file'), loanController.uploadNomineePhoto);

	app.post('/api/uploadNomineeId', loanController.upload_config.single('file'), loanController.uploadNomineeId);

	app.post('/api/uploadNomineeSign', loanController.upload_config.single('file'), loanController.uploadNomineeSign);

	app.post('/api/uploadNomineeAddress', loanController.upload_config.single('file'), loanController.uploadNomineeAddress);

	app.post('/api/uploadNomineeFS', loanController.upload_config.single('file'), loanController.uploadNomineeFS);

	app.post('/api/finaLoanSave', loanController.finaLoanSave);

	app.post('/api/getLoanApplyListByFA', loanController.getLoanApplyListByFA);

	app.post('/api/getLoanApplyListByBM', loanController.getLoanApplyListByBM);

	app.post('/api/getLoanApplyListHOByLO', loanController.getLoanApplyListHOByLO);

	app.post('/api/getLoanApplyListHOByMD', loanController.getLoanApplyListHOByMD);

	app.post('/api/getLoanApplyListHOByCM', loanController.getLoanApplyListHOByCM);

	app.get('/api/getLoanDataById/:rqstId', loanController.getLoanDataById);

	app.post('/api/updateBMstatus', loanController.updateBMstatus);

	app.post('/api/rejectBMstatus', loanController.rejectBMstatus);

	app.post('/api/updateLOstatus', loanController.updateLOstatus);

	app.post('/api/rejectLOstatus', loanController.rejectLOstatus);

	app.post('/api/updateMDstatus', loanController.updateMDstatus);

	app.post('/api/rejectMDstatus', loanController.rejectMDstatus);

	app.post('/api/updateCMstatus', loanController.updateCMstatus);

	app.post('/api/rejectCMstatus', loanController.rejectCMstatus);

	app.post('/api/updateLoanOthersData', loanController.updateLoanOthersData);

	app.post('/api/uploadCkLfFile1', loanController.upload_config.single('file'), loanController.uploadCkLfFile1);
	
	app.post('/api/uploadCkLfFile2', loanController.upload_config.single('file'), loanController.uploadCkLfFile2);

	app.post('/api/uploadCkLfFile3', loanController.upload_config.single('file'), loanController.uploadCkLfFile3);

	app.post('/api/updateLoanData', loanController.updateLoanData);

	//vendor
	app.post('/api/addVendor', vendorController.addVendor);

	app.post('/api/getApplieVendorDataById', vendorController.getApplieVendorDataById);

	app.post('/api/uploadShop', vendorController.upload_config.single('file'), vendorController.uploadShop);

	app.post('/api/uploadProprietor', vendorController.upload_config.single('file'), vendorController.uploadProprietor);

	app.post('/api/uploadTrade', vendorController.upload_config.single('file'), vendorController.uploadTrade);

	app.post('/api/uploadGST', vendorController.upload_config.single('file'), vendorController.uploadGST);

	app.post('/api/uploadBank', vendorController.upload_config.single('file'), vendorController.uploadBank);

	app.post('/api/updateVendorAplData', vendorController.updateVendorAplData);

	app.post('/api/getApplieVendorDataByBranchId', vendorController.getApplieVendorDataByBranchId);

	app.get('/api/getVendorById/:rqstId', vendorController.getVendorById);

	app.post('/api/resubmitVendorAplData', vendorController.resubmitVendorAplData);

	app.post('/api/vendorApprovel', vendorController.vendorApprovel);

	app.post('/api/vendorReject', vendorController.vendorReject);

	app.post('/api/getVendor', vendorController.getVendor);


	//express loan

	app.post('/api/checkMemberReferenceData', expressLoanController.checkMemberReferenceData);

	app.post('/api/createExpressLoan', expressLoanController.createExpressLoan);

	app.post('/api/uploadExpressIncome', expressLoanController.upload_config.single('file'), expressLoanController.uploadExpressIncome);

	app.post('/api/uploadExpressProduct', expressLoanController.upload_config.single('file'), expressLoanController.uploadExpressProduct);
	
	app.post('/api/getExpressLoanApplyListByFA', expressLoanController.getExpressLoanApplyListByFA);

	app.post('/api/getExpressLoanApplyListByBM', expressLoanController.getExpressLoanApplyListByBM);

	app.post('/api/getExpressLoanApplyListHOByLO', expressLoanController.getExpressLoanApplyListHOByLO);

	app.post('/api/getExpressLoanApplyListHOByMD', expressLoanController.getExpressLoanApplyListHOByMD);

	app.post('/api/getExpressLoanApplyListHOByCM', expressLoanController.getExpressLoanApplyListHOByCM);

	app.get('/api/getExpressLoanDataById/:rqstId', expressLoanController.getExpressLoanDataById);

	app.post('/api/ExpressLoanUpdateBMstatus', expressLoanController.ExpressLoanUpdateBMstatus);

	app.post('/api/ExpressLoanRejectBMstatus', expressLoanController.ExpressLoanRejectBMstatus);

	app.post('/api/ExpressLoanUpdateLOstatus', expressLoanController.ExpressLoanUpdateLOstatus);

	app.post('/api/ExpressLoanRejectLOstatus', expressLoanController.ExpressLoanRejectLOstatus);

	app.post('/api/ExpressLoanUpdateMDstatus', expressLoanController.ExpressLoanUpdateMDstatus);

	app.post('/api/ExpressLoanRejectMDstatus', expressLoanController.ExpressLoanRejectMDstatus);

	app.post('/api/ExpressLoanUpdateCMstatus', expressLoanController.ExpressLoanUpdateCMstatus);

	app.post('/api/ExpressLoanRejectCMstatus', expressLoanController.ExpressLoanRejectCMstatus);

	app.get('/api/expressLoanDataById/:rqstId', expressLoanController.expressLoanDataById);

	app.post('/api/updateExpressLoanData', expressLoanController.updateExpressLoanData);


	//close account E office 
	app.post('/api/createEOcloseAc', accountClosingEOController.createEOcloseAc);
	
	app.post('/api/uploadLakhimiPassbook', accountClosingEOController.upload_config.single('file'), accountClosingEOController.uploadLakhimiPassbook);

	app.post('/api/uploadBankPassbook', accountClosingEOController.upload_config.single('file'), accountClosingEOController.uploadBankPassbook);
	
	app.post('/api/getCloseAcEOByFA', accountClosingEOController.getCloseAcEOByFA);

	app.get('/api/closeAcDataById/:rqstId', accountClosingEOController.closeAcDataById);

	app.post('/api/getCloseAcApplyListByBM', accountClosingEOController.getCloseAcApplyListByBM);

	app.get('/api/getCloseAcDataById/:rqstId', accountClosingEOController.getCloseAcDataById);

	app.post('/api/getCloseAcApplyListHOByLO', accountClosingEOController.getCloseAcApplyListHOByLO);

	app.post('/api/getCloseAcApplyListHOByMD', accountClosingEOController.getCloseAcApplyListHOByMD);

	app.post('/api/getCloseAcApplyListHOByCM', accountClosingEOController.getCloseAcApplyListHOByCM);

	app.post('/api/CloseAcUpdateBMstatus', accountClosingEOController.CloseAcUpdateBMstatus);

	app.post('/api/CloseAcRejectBMstatus', accountClosingEOController.CloseAcRejectBMstatus);

	app.post('/api/CloseAcUpdateLOstatus', accountClosingEOController.CloseAcUpdateLOstatus);

	app.post('/api/CloseAcRejectLOstatus', accountClosingEOController.CloseAcRejectLOstatus);

	app.post('/api/CloseAcUpdateMDstatus', accountClosingEOController.CloseAcUpdateMDstatus);

	app.post('/api/CloseAcRejectMDstatus', accountClosingEOController.CloseAcRejectMDstatus);

	app.post('/api/CloseAcUpdateCMstatus', accountClosingEOController.CloseAcUpdateCMstatus);

	app.post('/api/CloseAcRejectCMstatus', accountClosingEOController.CloseAcRejectCMstatus)
	};