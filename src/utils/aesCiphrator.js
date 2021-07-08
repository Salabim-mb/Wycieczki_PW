import aesjs from 'aes-js';

const encryptCookie = data => {
	try {
		const stringKey = process.env.REACT_APP_COOKIE_ENCRYPTION_KEY;
		const key = stringKey.split('').map(item => item.charCodeAt(0));
		const dataBytes = aesjs.utils.utf8.toBytes(JSON.stringify(data));
		// eslint-disable-next-line new-cap
		const encryptedBytes = new aesjs.ModeOfOperation.ctr(
			new Uint8Array(key),
			new aesjs.Counter(5),
		).encrypt(dataBytes);
		return aesjs.utils.hex.fromBytes(encryptedBytes);
	} catch (e) {
		alert(
			'Wystąpił błąd przy szyfrowaniu Twoich plików Cookie. Twoja sesja nie będzie w pełni bezpieczna!',
		);
		return data;
	}
};

const decryptCookie = enc => {
	if (enc) {
		try {
			const stringKey = process.env.REACT_APP_COOKIE_ENCRYPTION_KEY;
			let key = stringKey.split('');
			key = key.map(item => item.charCodeAt(0));
			const encryptedBytes = aesjs.utils.hex.toBytes(enc);
			// eslint-disable-next-line new-cap
			const decryptedBytes = new aesjs.ModeOfOperation.ctr(
				new Uint8Array(key),
				new aesjs.Counter(5),
			).decrypt(encryptedBytes);
			return JSON.parse(aesjs.utils.utf8.fromBytes(decryptedBytes));
		} catch (e) {
			// alert("Nie możemy odczytać Twoich danych. Skontaktuj się z administratorem aplikacji.");
			return undefined;
		}
	} else {
		return undefined;
	}
};

export { decryptCookie, encryptCookie };
