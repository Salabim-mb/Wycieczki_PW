import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { decryptCookie, encryptCookie } from 'utils/aesCiphrator';

const cookie = new Cookies();

export const UserContext = React.createContext({
	token: undefined,
	data: undefined,
	type: undefined,
	login: () => {},
	logout: () => {}
});

export const UserProvider = (props) => {
	const [token, setToken] = useState(
		decryptCookie(cookie.get("token")) || undefined
	);
	const [data, setData] = useState(
		decryptCookie(cookie.get("data")) || undefined
	);
	const [type, setType] = useState(
		decryptCookie(cookie.get("type")) || undefined
	)

	const user = {
		token,
		data,
		type,
		login: (newToken, newData, newType) => {
			setToken(newToken);
			setData(newData);
			setType(newType);
			cookie.set("token", encryptCookie(newToken), {
				path: "/",
				secure: process.env.REACT_APP_SECURE_COOKIES !== 'off'
			});
			cookie.set("data", encryptCookie(newData), {
				path: "/",
				secure: process.env.REACT_APP_SECURE_COOKIES !== 'off'
			});
			cookie.set("type", encryptCookie(newType), {
				path: "/",
				secure: process.env.REACT_APP_SECURE_COOKIES !== 'off'
			});
		},
		logout: () => {
			cookie.remove("token");
			cookie.remove("data");
			cookie.remove("type");
			setData(undefined);
			setToken(undefined);
			setType(undefined);
		},
	};

	return <UserContext.Provider value={user} {...props} />;
};