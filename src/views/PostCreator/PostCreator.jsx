import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useQuery } from 'react-query';
import { AlertInfo } from 'components';
import { getPost } from './PostCreator.api';
import { PostForm } from './components';

const PostCreator = () => {
	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		return editor;
	}

	const { status, isLoading, isError, error, data } = useQuery('post', getPost);

	console.log(status);

	return (
		<>
			<PostForm post={data} />
			<CKEditor
				config={{
					language: 'pl',
					extraPlugins: [MyCustomUploadAdapterPlugin],
				}}
				onChange={(e, editor) => {
					console.log(editor, e);
				}}
				className="text-justify"
				editor={ClassicEditor}
				data=""
			/>
			<AlertInfo isLoading={isLoading} isError={isError}>
				{error?.message}
			</AlertInfo>
		</>
	);
};

export default PostCreator;
