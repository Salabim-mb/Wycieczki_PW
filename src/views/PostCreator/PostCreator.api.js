export const getPost = async (token, id) => {
	if (id) {
		// fetch post
		const url = '';

		const headers = {};

		const response = await fetch(url, { headers, method: 'GET' });

		if (response.status === 200) {
			return response.json();
		}
		throw new Error('');
	}
	// return empty if id is not provided
	return {};
};

export const sendPost = async (token, post, id) => {
	const url = `${id}`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'GET' });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};

export const uploadPhoto = async (token, post, id) => {
	const url = `${id}`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'GET' });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};

export const reserveSpace = async (token, post, id) => {
	const url = `${id}`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'POST' });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};
