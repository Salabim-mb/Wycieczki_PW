import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { sendPost, reserveSpace } from 'views/PostCreator/PostCreator.api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { CloudUpload } from '@material-ui/icons';
import { ImageAdapter } from '..';

/* eslint-disable no-param-reassign */

const PostForm = ({ post }) => {
	const postMutation = useMutation(postData => sendPost('', postData));
	const reserveMutation = useMutation(() => reserveSpace());

	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		reserveMutation.mutate();
		const { data } = reserveMutation;
		editor.plugins.get('FileRepository').createUploadAdapter = loader =>
			new ImageAdapter(loader, data?.id);
	}

	const formik = useFormik({
		initialValues: {
			header: post?.header || null,
			cover: post?.cover || '',
			title: post?.title || '',
			content: post?.content || '',
		},

		onSubmit: values => {
			postMutation.mutate(values);
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Button variant="contained" component="label" color="default" startIcon={<CloudUpload />}>
					Prześlij cover
					<input
						id="cover"
						name="cover"
						type="file"
						hidden
						onChange={event => {
							formik.setFieldValue('cover', event.currentTarget.files[0]);
						}}
					/>
				</Button>
				<Button variant="contained" component="label" color="default" startIcon={<CloudUpload />}>
					Prześlij nagłówek
					<input
						id="header"
						name="header"
						type="file"
						hidden
						onChange={event => {
							formik.setFieldValue('header', event.currentTarget.files[0]);
						}}
					/>
				</Button>
				<TextField
					fullWidth
					id="title"
					name="title"
					label="Tytuł posta"
					value={formik.values.title}
					onChange={formik.handleChange}
				/>
				<CKEditor
					config={{
						language: 'pl',
						extraPlugins: [MyCustomUploadAdapterPlugin],
					}}
					onChange={(e, editor) => {
						formik.setFieldValue('content', editor.getData());
					}}
					className="text-justify"
					editor={ClassicEditor}
					data=""
				/>
				<Button type="submit">Prześlij post</Button>
			</form>
		</>
	);
};

PostForm.propTypes = {
	post: PropTypes.shape({
		header: PropTypes.string.isRequired,
		cover: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}),
};

PostForm.defaultProps = {
	post: null,
};

export default PostForm;
