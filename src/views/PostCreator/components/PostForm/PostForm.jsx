import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ckeditor.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useHistory } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { PhotoCamera, CloudUpload } from '@material-ui/icons';
import {
	usePostMutation,
	useAttachmentsMutation,
	useFileDeletion,
	useImageDeletion,
} from 'views/PostCreator/PostCreator.hooks';
import paths from 'constants/api';
import { reserveSpace } from 'views/PostCreator/PostCreator.api';
import { AlertInfo } from 'components';
import {
	ImageAdapter,
	TopicSelector,
	AttachmentsList,
	PostTilePreview,
	HeaderPreview,
	HeaderInput,
	UploadButton,
} from '..';
import { validate } from './PostForm.utils';

/* eslint-disable no-param-reassign */

const generateProps = files => {
	if (files) {
		return files.length === 0 ? [] : files;
	}
	return [];
};

const PostForm = ({ post, id }) => {
	const [attachments, setAttachments] = useState([]);
	const [images, setImages] = useState([]);
	const [reservation, setReservation] = useState(id);

	const [prevCover, setPrevCover] = useState(undefined);
	const [prevHeader, setPrevHeader] = useState(undefined);
	const [prevAttachments, setPrevAttachments] = useState([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const history = useHistory();

	const postMutation = usePostMutation('', post?.reservation);
	const attachmentsMutation = useAttachmentsMutation('');
	const fileDeletion = useFileDeletion('');
	const imageDeletion = useImageDeletion('');

	useEffect(() => {
		if (post.reservation) {
			setAttachments(post?.downloadables);
			setPrevAttachments(post?.downloadables);
			setImages(
				generateProps(
					post?.images
						.filter(({ is_header: isHeader }) => !isHeader)
						.filter(({ is_cover: isCover }) => !isCover),
				),
			);
			setPrevHeader(post?.images?.find(header => header.is_header));
			setPrevCover(post?.images?.find(cover => cover.is_cover));
		}
	}, [post]);

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
			editor.plugins.get('FileRepository').createUploadAdapter = loader => {
				return new ImageAdapter(loader, reservation || response.id, '', setImages);
			};
		};

		getId();
	}

	const formik = useFormik({
		initialValues: {
			header: post?.header || null,
			cover: post?.cover || '',
			title: post?.title || '',
			content: post?.content || '',
			topic: post?.topic || -1,
		},
		enableReinitialize: true,
		validate,
		onSubmit: async values => {
			if (prevHeader && `${paths.PLAIN}${prevHeader.image_url}` !== values.header) {
				await imageDeletion.mutateAsync(prevHeader.id);
			}

			if (prevCover && `${paths.PLAIN}${prevCover.image_url}` !== values.cover) {
				await imageDeletion.mutateAsync(prevCover.id);
			}
			await fileDeletion.mutateAsync({
				images,
				attachments,
				prevAttachments,
				content: values.content,
			});

			await attachmentsMutation.mutateAsync({ attachments, reservation });

			await postMutation.mutateAsync(
				{ reservation, ...values },
				{ onSuccess: () => history.push(`/blog/${formik.values.topic}/${reservation}`) },
			);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<UploadButton
				header="Prześlij cover"
				id="cover"
				accept="image/*"
				icon={<PhotoCamera />}
				handleChange={event => {
					formik.setFieldValue('cover', event.currentTarget.files[0]);
				}}
				error={formik.touched.cover && formik.errors.cover ? formik.errors.cover : ''}
			/>
			<HeaderInput
				handleChangeFile={event => {
					formik.setFieldValue('header', event.currentTarget.files[0]);
				}}
				handleChangeLink={event => {
					formik.setFieldValue('header', event.target.value);
				}}
				header={formik.values.header}
				error={formik.touched.header && formik.errors.header ? formik.errors.header : ''}
			/>
			<TopicSelector
				value={formik.values.topic}
				handleChange={event => {
					formik.setFieldValue('topic', event.target.value);
				}}
			/>
			{formik.touched.topic && formik.errors.topic && (
				<Alert severity="error">{formik.errors.topic}</Alert>
			)}
			<Box my={2}>
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
			<PostTilePreview
				cover={formik.values.cover}
				title={formik.values.title}
				summary={formik.values.content.substring(0, 100)}
			/>
			<HeaderPreview header={formik.values.header} />
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
				<UploadButton
					header="Dodaj załącznik do posta"
					id="attachments"
					icon={<CloudUpload />}
					handleChange={event => {
						setAttachments(prevAttachmentsArr => [
							...prevAttachmentsArr,
							{
								id: Math.random().toString(36).substr(2, 9),
								file: event.currentTarget.files[0],
							},
						]);
					}}
				/>
			</Box>
			<AttachmentsList attachments={attachments} setAttachments={setAttachments} />
			<AlertInfo isError={error} isLoading={loading} error={error} />
			<Button type="submit" variant="contained" color="primary">
				Prześlij post
			</Button>
		</form>
	);
};

PostForm.propTypes = {
	id: PropTypes.string,
	post: PropTypes.shape({
		reservation: PropTypes.number.isRequired,
		header: PropTypes.string,
		cover: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		topic: PropTypes.number,
		show_title: PropTypes.bool,
		downloadables: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				reservation: PropTypes.number.isRequired,
				file_url: PropTypes.string.isRequired,
			}),
		),
		images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				reservation: PropTypes.number.isRequired,
				is_header: PropTypes.bool.isRequired,
				is_cover: PropTypes.bool.isRequired,
				image_url: PropTypes.string.isRequired,
			}),
		),
	}),
};

PostForm.defaultProps = {
	post: { reservation: 0, cover: '', title: '', content: '' },
	id: null,
};

export default PostForm;
