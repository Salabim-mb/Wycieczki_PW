import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ckeditor.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Box, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { PhotoCamera, CloudUpload } from '@material-ui/icons';
import { usePostMutation, useAttachmentsMutation } from 'views/PostCreator/PostCreator.hooks';
import { reserveSpace } from 'views/PostCreator/PostCreator.api';
import { ImageAdapter, TopicSelector, AttachmentsList } from '..';

/* eslint-disable no-param-reassign */

const PostForm = ({ post }) => {
	const [attachments, setAttachments] = useState([]);
	const [reservation, setReservation] = useState(post?.reservation);
	const postMutation = usePostMutation('');
	const attachmentsMutation = useAttachmentsMutation('');

	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		const getId = async () => {
			let response;
			if (!reservation) {
				try {
					response = await reserveSpace('');
					setReservation(response.id);

					/* eslint-disable arrow-body-style */

					editor.plugins.get('FileRepository').createUploadAdapter = loader => {
						return new ImageAdapter(loader, reservation || response.id, '');
					};
				} catch (err) {
					console.log('');
				}
			}
		};

		getId();
	}

	const validate = values => {
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

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			header: post?.header || null,
			cover: post?.cover || '',
			title: post?.title || '',
			content: post?.content || '',
			topic: post?.topic || -1,
			showTitle: post?.show_title || true,
		},
		validate,
		onSubmit: values => {
			attachmentsMutation.mutate(attachments);
			postMutation.mutate({ reservation, ...values });
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Button variant="contained" component="label" color="default" startIcon={<PhotoCamera />}>
					Prześlij cover
					<input
						id="cover"
						name="cover"
						type="file"
						accept="image/*"
						hidden
						onChange={event => {
							formik.setFieldValue('cover', event.currentTarget.files[0]);
						}}
					/>
				</Button>
				{formik.touched.cover && formik.errors.cover && (
					<Alert severity="error">{formik.errors.cover}</Alert>
				)}
				<Box my={2}>
					<Button variant="contained" component="label" color="default" startIcon={<PhotoCamera />}>
						Prześlij nagłówek
						<input
							id="header"
							name="header"
							type="file"
							accept="image/*"
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
				{formik.touched.topic && formik.errors.topic && (
					<Alert severity="error">{formik.errors.topic}</Alert>
				)}
				<Box mt={2}>
					<TextField
						fullWidth
						id="title"
						name="title"
						label="Tytuł posta"
						variant="outlined"
						value={formik.values.title}
						inputProps={{ minLength: 1, maxLength: 120 }}
						onChange={formik.handleChange}
					/>
					{formik.touched.title && formik.errors.title && (
						<Alert severity="error">{formik.errors.title}</Alert>
					)}
				</Box>
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
				{formik.touched.content && formik.errors.content && (
					<Alert severity="error">{formik.errors.content}</Alert>
				)}
				<Box my={2}>
					<Button
						variant="contained"
						my={2}
						component="label"
						color="default"
						startIcon={<CloudUpload />}
					>
						Dodaj załącznik do posta
						<input
							id="header"
							name="header"
							type="file"
							hidden
							onChange={event => {
								setAttachments(prevAttachments => [
									...prevAttachments,
									{ id: prevAttachments.length, file: event.currentTarget.files[0] },
								]);
							}}
						/>
					</Button>
				</Box>
				<AttachmentsList attachments={attachments} setAttachments={setAttachments} />
				<Button type="submit" variant="contained" color="primary">
					Prześlij post
				</Button>
			</form>
		</>
	);
};

PostForm.propTypes = {
	post: PropTypes.shape({
		reservation: PropTypes.number.isRequired,
		header: PropTypes.string.isRequired,
		cover: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		topic: PropTypes.number,
		show_title: PropTypes.bool,
	}),
};

PostForm.defaultProps = {
	post: {},
};

export default PostForm;
