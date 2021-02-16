import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostCreator = () => {
	function MyCustomUploadAdapterPlugin(editor) {
		// adapter for images
		return editor;
	}

	return (
		<>
			{' '}
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
		</>
	);
};

export default PostCreator;
