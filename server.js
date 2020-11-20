const express = require('express');
const Twilio = require('twilio');
require('dotenv').config();

const { accountSid, authToken } = require('./twilioConfig.js');
const sendMessage = require('./helper/messageFunction.js');
const messaging = require('./api/mesaging.js');
const pollingFunction = require('./helper/pollingFunction.js');
const addDataToSheet = require('./helper/writeToSheet.js');
const { pollingEntity, validate } = require('./controllers/pollingController.js');

const PORT = process.env.PORT;
const pollingInterval = process.env.POLLING_INTERVAL;
const maximumPollingAttempts = process.env.MAXIMUM_POLLING_ATTEMPTS;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', messaging);

const polling = (() => {
	setInterval(pollingFunction, pollingInterval, pollingEntity, validate, 10000, maximumPollingAttempts);
})();

app.listen(PORT, () => {
	console.log('Acknowldgement. Server is Listening to', PORT);
});

module.exports = app;
