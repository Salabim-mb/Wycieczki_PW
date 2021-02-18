import paths from 'constants/api';

export const getPost = async (token, id) => {
	if (id) {
		// fetch post
		const url = `${paths.BLOG_POST}${id}/`;

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
	const url = `${paths.BLOG_POST}${id ? `${id}/` : ''}`;

	const headers = {
		Authorization: `${token}`,
	};

	const method = id ? 'PATCH' : 'POST';
	const expectedResponseStatus = id ? 200 : 201;

	const response = await fetch(url, { headers, method });

	if (response.status !== expectedResponseStatus) {
		throw new Error('');
	}
};

export const uploadPhoto = async (token, id, file, flag, attachment) => {
	const url = `${paths.BLOG_RESERVATION}${id}/${attachment ? 'attachment' : 'image'}/`;

	const formData = new FormData();
	formData.append('file', file, file.name);
	if (flag) {
		formData.append(flag, true);
	}

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'POST' });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};

export const uploadAttachment = async (token, id, file) => uploadPhoto(token, id, file, null, true);

export const deleteAttachment = async (token, id, isImage) => {
	const startOfUrl = isImage ? paths.BLOG_IMAGE : paths.BLOG_DOWNLOADABLE;
	const url = `${startOfUrl}${id}/`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'DELETE' });

	if (response.status === 200) {
		return response.json();
	}
	throw new Error('');
};

export const reserveSpace = async token => {
	const url = `${paths.BLOG_RESERVATION}`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'POST' });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};

export const getReservation = async id => {
	if (id) {
		const url = `${paths.BLOG_RESERVATION}${id}/`;

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

export const getTopics = async () => {
	const url = `${paths.BLOG_TOPICS}`;

	const headers = {};

	const response = await fetch(url, { headers, method: 'GET' });

	if (response.status === 200) {
		return response.json();
	}
	throw new Error('');
};
