import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageAdapter } from 'views/PostCreator/components';
import { reserveSpace } from 'views/PostCreator/PostCreator.api';
import { Alert } from '@material-ui/lab';
import { AlertInfo } from 'components';
import './ckeditor.css';

const PostEditor = ({
	setReservation,
	reservation,
	setImages,
	handleChange,
	content,
	errorValidation,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		const getId = async () => {
			let response;
			if (!reservation) {
				setLoading(true);
				try {
					response = await reserveSpace('');
					setReservation(response.id);

					/* eslint-disable arrow-body-style */
				} catch (err) {
					setError(err.message);
				}
				setLoading(false);
			}
			// eslint-disable-next-line no-param-reassign
			editor.plugins.get('FileRepository').createUploadAdapter = loader => {
				return new ImageAdapter(loader, reservation || response.id, '', setImages);
			};
		};

		getId();
	}

	return (
		<>
			<CKEditor
				config={{
					language: 'pl',
					extraPlugins: [MyCustomUploadAdapterPlugin],
				}}
				onChange={handleChange}
				editor={ClassicEditor}
				data={content}
			/>
			{errorValidation && <Alert severity="error">{errorValidation}</Alert>}
			<AlertInfo isError={error} isLoading={loading} error={error} />
		</>
	);
};

PostEditor.propTypes = {
	setReservation: PropTypes.func.isRequired,
	reservation: PropTypes.string,
	setImages: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
	errorValidation: PropTypes.string,
};

PostEditor.defaultProps = {
	reservation: null,
	errorValidation: null,
};

export default PostEditor;
