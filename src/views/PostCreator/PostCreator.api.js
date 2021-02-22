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

export const uploadPhoto = async (token, id, file, signal, flag, attachment) => {
	const url = `${attachment ? paths.BLOG_DOWNLOADABLE : paths.BLOG_IMAGE}`;

	const formData = new FormData();
	formData.append('reservation', id);
	formData.append(attachment ? 'file' : 'image', file, file.name);

	if (flag) {
		formData.append(flag, true);
	}

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'POST', signal, body: formData });

	if (response.status === 201) {
		return response.json();
	}
	throw new Error('');
};

export const sendPost = async (token, post, id) => {
	const url = `${paths.BLOG_POST}${id ? `${id}/` : ''}`;

	const headers = {
		Authorization: `${token}`,
		'Content-Type': 'application/json',
	};

	const postNew = { ...post };

	if (post.cover) {
		const cover = await uploadPhoto('', post.reservation, postNew.cover, null, 'is_cover', false);
		postNew.cover = cover;
	}
	if (post.header) {
		const header = await uploadPhoto(
			'',
			post.reservation,
			postNew.header,
			null,
			'is_header',
			false,
		);
		postNew.header = header;
	}

	const method = id ? 'PATCH' : 'POST';
	const expectedResponseStatus = id ? 200 : 201;

	const response = await fetch(url, { headers, method, body: JSON.stringify(postNew) });

	if (response.status !== expectedResponseStatus) {
		throw new Error('');
	}
};

export const uploadAttachment = async (token, id, file) =>
	uploadPhoto(token, id, file, null, null, true);

export const sendAttachments = async (token, id, attachments) => {
	const response = await Promise.all(
		attachments.map(({ file }) => uploadAttachment(token, id, file)),
	);
	const isFail = response.forEach(({ status }) => {
		if (status !== 201) {
			throw new Error('');
		}
	});
	return isFail;
};

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

	if (response.status !== 200) {
		throw new Error('błąd');
	}

	return response.json();
};
