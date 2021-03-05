export const returnUrl = () =>
	window.location.href.slice(0, window.location.href.search(window.location.pathname));

const mapObjectFunction = message => {
	let newError = '';
	Object.keys(message).forEach(key => {
		newError += `${Number.isNaN(parseInt(key, 10)) ? `${key}: ` : ''}${
			typeof message[key] === 'object' ? mapObjectFunction(message[key]) : message[key]
		}`;
	});
	return newError;
};

export const errorMessageText = async response => {
	const messages = await response.json().then(description => description);
	let err = '';
	err += mapObjectFunction(messages);
	return err;
};

export const errorMessage = async response => {
	if (response.status === 404) {
		return window.location.replace(`${returnUrl()}/error`);
	}
	return errorMessageText(response);
};
