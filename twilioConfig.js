var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, {
	lazyLoading: true,
});

module.exports = { accountSid, authToken };
