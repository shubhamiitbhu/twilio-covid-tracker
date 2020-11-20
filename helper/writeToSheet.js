const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require('axios');

const endpoint = process.env.COVID_ALL_COUNTRY_API;
const sheetId = process.env.SPREADSHEET_ID;

const doc = new GoogleSpreadsheet(sheetId);
doc.useServiceAccountAuth(require('../sheetsCredentials.json'));

const addDataToSheet = async () => {
	var executable = false;
	try {
		await doc.loadInfo();
		const sheet = await doc.sheetsByIndex[0];
		const data = await axios.get(endpoint);
		const covidData = data.data;
		const rows = await sheet.getRows();
		let iterator = 0;
		for (var key in covidData) {
			rows[iterator].Country = covidData[key].cases;
			iterator++;
			await rows[iterator].save();
		}
		executable = true;
	} catch (error) {
		const errorObject = new Error(error);
		throw errorObject.message;
	} finally {
		return executable;
	}
};

module.exports = addDataToSheet;
