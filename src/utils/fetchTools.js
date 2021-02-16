export const getCORSHeaders = (token=null) => {
	const headers = {
		"Content-Type": "application/json"
	};
	return token ? {...headers, "Authorization": `Token ${token}`} : headers;
}