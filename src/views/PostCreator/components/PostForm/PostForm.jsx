import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { sendPost } from 'views/PostCreator/PostCreator.api';

const PostForm = ({ post }) => {
	const [header, setHeader] = useState(post?.header || null);
	const [cover, setCover] = useState(post?.cover || null);
	const [title, setTitle] = useState(post?.title || '');
	const [content, setContent] = useState(post?.content || '');

	const mutation = useMutation(postData => sendPost('', postData));

	return (
		<>
			<button
				type="submit"
				onClick={() => {
					mutation.mutate({ header, cover, title, content });
				}}
			>
				Create Todo
			</button>
		</>
	);
};

PostForm.propTypes = {
	post: PropTypes.shape({
		header: PropTypes.element.isRequired,
		cover: PropTypes.element.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}),
};

PostForm.defaultProps = {
	post: undefined,
};

export default PostForm;
