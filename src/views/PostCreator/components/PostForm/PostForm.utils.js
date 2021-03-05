import { isYoutubeLink } from 'utils/helpers';
import paths from 'constants/api';

export const validate = values => {
	const errors = {};

	if (!values.cover) {
		errors.cover = 'Cover zdjęcia (zdjęcie w kafelku) jest wymagany.';
	}
	if (!values.title) {
		errors.title = 'Tytuł jest wymagany.';
	}
	if (values.topic === -1) {
		errors.topic = 'Temat posta jest wymagany.';
	}

	if (!values.content) {
		errors.content = 'Treść posta jest wymagana.';
	}

	if (
		values.header &&
		typeof values.header === 'string' &&
		!values.header.includes(paths.PLAIN) &&
		!isYoutubeLink(values.header)
	) {
		errors.header = 'Nieprawidłowy link yt';
	}
	return errors;
};
