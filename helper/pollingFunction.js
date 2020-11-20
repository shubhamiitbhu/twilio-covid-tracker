const polling = async (pollingEntity, validate, interval, maxAttempts) => {
	const pollingPromise = new Promise(async (resolve, reject) => {
		let attemps = 0;
		const result = await pollingEntity();
		attemps++;

		if (validate()) {
			resolve(result);
		} else if (attemps === maxAttempts) {
			reject(new Error('Maximum Attempts reached'));
		} else {
			setTimeout(pollingPromise, interval, resolve, reject);
		}
	});

	return pollingPromise;
};

module.exports = polling;
