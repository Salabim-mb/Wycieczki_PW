import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
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
import { Input, UploadButton } from 'components';
import {
	TopicSelector,
	AttachmentsList,
	PostTilePreview,
	HeaderPreview,
	HeaderInput,
	PostEditor,
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

	const history = useHistory();

	const postMutation = usePostMutation('', post?.reservation);
	const attachmentsMutation = useAttachmentsMutation('');
	const fileDeletion = useFileDeletion('');
	const imageDeletion = useImageDeletion('');

	useEffect(() => {
		if (post?.reservation) {
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
				<Input
					fullWidth
					id="title"
					inputProps={{ minLength: 1, maxLength: 120 }}
					value={formik.values.title}
					handleChange={e => formik.setFieldValue('title', e.target.value)}
					label="Tytuł posta"
					error={formik.touched?.title && formik.error?.title ? formik.error.title : ''}
				/>
			</Box>
			<PostTilePreview
				cover={formik.values.cover}
				title={formik.values.title}
				summary={formik.values.content.substring(0, 100)}
			/>
			<HeaderPreview header={formik.values.header} />
			<PostEditor
				setReservation={setReservation}
				handleChange={(e, editor) => {
					formik.setFieldValue('content', editor.getData());
				}}
				setImages={setImages}
				reservation={reservation}
				content={formik.values.content}
				errorValidaiton={
					formik.touched?.content && formik.error?.content ? formik.error?.content : ''
				}
			/>
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
	post: null,
	id: null,
};

export default PostForm;
