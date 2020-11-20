const axios = require('axios');
const addDataToSheet = require('../helper/writeToSheet.js');

const pollingEntity = async () => {
	isDataAdded = addDataToSheet();
};

const validate = () => {
	return isDataAdded;
};

module.exports = { pollingEntity, validate };
