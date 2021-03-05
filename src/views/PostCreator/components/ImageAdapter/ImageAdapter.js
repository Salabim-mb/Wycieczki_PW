import { uploadPhoto } from 'views/PostCreator/PostCreator.api';
import paths from 'constants/api';

const controller = new AbortController();
const { signal } = controller;
/* eslint-disable no-underscore-dangle, class-methods-use-this */
class ImageAdapter {
	constructor(loader, id, token, setImages) {
		// The file loader instance to use during the upload.
		this.loader = loader;
		this.id = id;
		this.token = token;
		this.setImages = setImages;
	}

	// Starts the upload process.
	upload() {
		return this.loader.file.then(
			file =>
				new Promise((resolve, reject) => {
					this._sendPhoto(file, resolve, reject);
				}),
		);
	}

	// Aborts the upload process.
	abort() {
		controller.abort();
	}

	_sendPhoto = async (file, resolve, reject) => {
		try {
			const response = await uploadPhoto(this.token, this.id, file, signal, null, false);
			this.setImages(prevState => [...prevState, response]);
			resolve({ default: `${paths.PLAIN}${response?.image_url}` });
		} catch (err) {
			reject('Błąd przesłania zdjęcia: ', err);
		}
	};
}

export default ImageAdapter;
