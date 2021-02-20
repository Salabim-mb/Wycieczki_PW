export const getCORSHeaders = (token=null) => {
	const headers = {
		"Content-Type": "application/json"
	};
	return token ? {...headers, "Authorization": `Token ${token}`} : headers;
}

export const getMultipartHeaders = (token=null) => {
	const headers = {
		"Content-Type": "multipart/form-data"
	};
	return token ? {...headers, "Authorization": `Token ${token}`} : headers;
}