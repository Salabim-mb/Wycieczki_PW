import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ckeditor.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Box, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import { PhotoCamera, CloudUpload } from '@material-ui/icons';
import { ImageAdapter, TopicSelector, AttachmentsList } from '..';
import {
	usePostMutation,
	useAttachmentsMutation,
	useReserveMutation,
} from '../../PostCreator.hooks';

/* eslint-disable no-param-reassign */

const PostForm = ({ post }) => {
	const [attachments, setAttachments] = useState([]);
	const [reservation, setReservation] = useState(0);

	const postMutation = usePostMutation('');
	const attachmentsMutation = useAttachmentsMutation('');
	const reserveMutation = useReserveMutation();

	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		let id = post?.reservation;
		if (!post) {
			reserveMutation.mutate();
			const { data } = reserveMutation;
			setReservation(data.id);
			id = data?.id;
		}

		editor.plugins.get('FileRepository').createUploadAdapter = loader =>
			new ImageAdapter(loader, id);
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
				<Box mt={2}>
					<TextField
						fullWidth
						id="title"
						name="title"
						label="Tytuł posta"
						variant="outlined"
						value={formik.values.title}
						onChange={formik.handleChange}
					/>
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
