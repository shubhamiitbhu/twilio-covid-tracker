const Twilio = require('twilio');

const { accountSid, authToken } = require('../twilioConfig.js');

const twilio = new Twilio(accountSid, authToken);

const sendMessage = async (message, senderId) => {
	try {
		await twilio.messages.create({
			from: 'whatsapp:+14155238886',
			to: senderId,
			body: message,
		});
	} catch (error) {
		throw new Error(error.message);
	}
	return;
};

module.exports = sendMessage;
