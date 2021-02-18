import React from 'react';
import PropTypes from 'prop-types';
import './ckeditor.css';
import { useMutation } from 'react-query';
import { sendPost, reserveSpace } from 'views/PostCreator/PostCreator.api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Box, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import { CloudUpload } from '@material-ui/icons';
import { ImageAdapter, TopicSelector } from '..';

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
			topic: post?.topic || -1,
			showTitle: post?.show_title || true,
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
				<Box my={2}>
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
				</Box>
				<TopicSelector
					value={formik.values.topic}
					handleChange={event => {
						formik.setFieldValue('topic', event.target.value);
					}}
				/>
				<TextField
					fullWidth
					id="title"
					name="title"
					label="Tytuł posta"
					value={formik.values.title}
					onChange={formik.handleChange}
				/>
				<FormControl>
					<FormControlLabel
						checked={formik.values.showTitle}
						control={<Checkbox />}
						label="Pokazuj tytuł"
						onChange={() => {
							formik.setFieldValue('showTitle', !formik.values.showTitle);
						}}
					/>
				</FormControl>
				<CKEditor
					config={{
						language: 'pl',
						extraPlugins: [MyCustomUploadAdapterPlugin],
					}}
					onChange={(e, editor) => {
						formik.setFieldValue('content', editor.getData());
					}}
					editor={ClassicEditor}
					data={formik.values.content}
				/>
				<Box my={2}>
					<Button
						variant="contained"
						my={2}
						component="label"
						color="default"
						startIcon={<CloudUpload />}
					>
						Dodaj załącznik do posta
						<input id="header" name="header" type="file" hidden />
					</Button>
				</Box>

				<Button type="submit" variant="contained" color="primary">
					Prześlij post
				</Button>
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
		topic: PropTypes.number,
		show_title: PropTypes.bool,
	}),
};

PostForm.defaultProps = {
	post: null,
};

export default PostForm;
