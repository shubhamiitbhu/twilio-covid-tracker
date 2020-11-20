const axios = require('axios');
const messagingFuction = require('../helper/messageFunction.js');

const messagingController = async (req, res, next) => {
	const senderId = req.body.From;
	const messageBody = req.body.Body;

	const globalDataEndpoint = process.env.COVID_GLOBAL_DATA_API;
	const countryWiseDataEndpoint = process.env.COVID_COUNTRY_WISE_API;

	const messageContent = messageBody.toLowerCase().split(' ');

	let message;

	if (messageContent.length !== 2) {
		message = 'Query not understood. Please use Case(s) or Death(s) + country name/code only';
		messagingFuction(message, senderId);
	}

	const intent = messageContent[0].toString();
	const entity = messageContent[1].toString();

	switch (intent) {
		case 'case':
		case 'cases':
			if (entity === 'total') {
				const data = await axios.get(`${globalDataEndpoint}`);
				const globalCaseData = data.data;
				message = `Total Cases WorldWide: ${globalCaseData.cases}`;
			} else {
				try {
					const data = await axios.get(`${countryWiseDataEndpoint}` + `${entity}`);
					const casesData = data.data;
					message = `Total Cases in ${casesData.country}: ${casesData.cases}, Today: ${casesData.todayCases}`;
				} catch (error) {
					message = error.message;
				}
			}
			messagingFuction(message, senderId);
			break;

		case 'death':
		case 'deaths':
			if (entity === 'total') {
				const data = await axios.get(`${globalDataEndpoint}`);
				const globalCaseData = data.data;
				message = `Total Deaths Worldwide: ${globalCaseData.deaths}`;
			} else {
				try {
					const data = await axios.get(`${countryWiseDataEndpoint}` + `${entity}`);
					const casesData = data.data;
					message = `Total Cases in ${casesData.country}: ${casesData.deaths}, Today: ${casesData.todayDeaths}`;
				} catch (error) {
					message = error.message;
				}
			}
			messagingFuction(message, senderId);
			break;

		default:
			message = 'Query not understood. Please use Case(s) or Death(s) + country name/code only';
			messagingFuction(message, senderId);
	}
};

module.exports = messagingController;
