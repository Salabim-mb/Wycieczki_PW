import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
	usePostMutation,
	useAttachmentsMutation,
	useFileDeletion,
	useImageDeletion,
	useTopicsQuery,
} from 'views/PostCreator/PostCreator.hooks';
import paths from 'constants/api';
import PostForm from './PostForm';

// jest.mock('..', () => ({
// 	TopicSelector: () => <div>Select topic</div>,
// 	AttachmentsList: () => <div>Attachment list</div>,
// 	PostTilePreview: () => <div>Tile preview</div>,
// 	HeaderPreview: () => <div>Header preview</div>,
// 	HeaderInput: () => <div>Header input</div>,
// 	UploadButton: () => <div>Upload button</div>,
// 	PostEditor: () => <div>Editor</div>,
// }));

jest.mock('views/PostCreator/PostCreator.hooks', () => ({
	usePostMutation: jest.fn(),
	useAttachmentsMutation: jest.fn(),
	useFileDeletion: jest.fn(),
	useImageDeletion: jest.fn(),
	useTopicsQuery: jest.fn(),
}));

describe('PostForm', () => {
	const post = {
		content: 'aaa',
		cover: paths.PLAIN,
		downloadables: [{ id: 31, file_url: 'xd', reservation: 100 }],
		header: '',
		images: [{ id: 64, image_url: 'xd', reservation: 100, is_cover: true, is_header: false }],
		reservation: 100,
		summary: 'aaa',
		title: 'Sport',
	};

	beforeEach(() => {
		jest.clearAllMocks();

		usePostMutation.mockImplementation(() => ({
			isSuccess: true,
			isError: false,
			isLoading: false,
		}));
		useAttachmentsMutation.mockImplementation(() => ({
			isSuccess: true,
			isError: false,
			isLoading: false,
		}));

		useFileDeletion.mockImplementation(() => ({
			isSuccess: true,
			isError: false,
			isLoading: false,
		}));

		useImageDeletion.mockImplementation(() => ({
			isSuccess: true,
			isError: false,
			isLoading: false,
		}));

		useTopicsQuery.mockImplementation(() => ({
			isSuccess: true,
			data: [
				{
					id: 1,
					title: 'Kolorowanki',
				},
				{
					id: 2,
					title: 'Kolorowanki2',
				},
			],
			isError: false,
			isLoading: false,
		}));
	});

	it('should match snapshot', async () => {
		const { container } = render(
			<MemoryRouter>
				<PostForm />
			</MemoryRouter>,
		);

		expect(container).toMatchSnapshot();
	});

	it('should match snapshot', async () => {
		const { getByText, container } = render(
			<MemoryRouter>
				<PostForm post={post} id="100" />
			</MemoryRouter>,
		);

		fireEvent.click(getByText('Prześlij post'));

		expect(container).toMatchSnapshot();
	});
});
