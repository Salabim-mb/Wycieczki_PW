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

	if (post.cover && typeof post.cover !== 'string') {
		const cover = await uploadPhoto('', post.reservation, postNew.cover, null, 'is_cover', false);
		postNew.cover = `${paths.PLAIN}${cover.image_url}`;
	}

	if (post.header && typeof post.header !== 'string') {
		const header = await uploadPhoto(
			'',
			post.reservation,
			postNew.header,
			null,
			'is_header',
			false,
		);
		postNew.header = `${paths.PLAIN}${header.image_url}`;
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

export const sendAttachments = async (token, attachmentsObject) => {
	const { attachments, reservation } = attachmentsObject;
	await Promise.all(
		attachments?.map(({ file }) => file && uploadAttachment(token, reservation, file)),
	);
};

export const deleteAttachment = async (token, id, isImage) => {
	const startOfUrl = isImage ? paths.BLOG_IMAGE : paths.BLOG_DOWNLOADABLE;
	const url = `${startOfUrl}${id}/`;

	const headers = {
		Authorization: `${token}`,
	};

	const response = await fetch(url, { headers, method: 'DELETE' });

	if (response.status !== 204) {
		throw new Error('');
	}
	return response;
};

export const deleteAttachments = async (token, files) => {
	const imagesToDelete = files?.images.filter(
		({ image_url: imageUrl }) => !files.content.includes(imageUrl),
	);

	let attachmentsToDelete = [];

	if (files.prevAttachments) {
		attachmentsToDelete = files.prevAttachments.filter(
			e => !files.attachments.some(item => item.id === e.id),
		);
	}

	await Promise.all(imagesToDelete.map(({ id }) => deleteAttachment(token, id, true)));

	await Promise.all(attachmentsToDelete.map(({ id }) => deleteAttachment(token, id, false)));
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
