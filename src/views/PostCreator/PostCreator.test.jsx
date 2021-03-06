import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import paths from 'constants/api';
import PostCreator from './PostCreator';
import { usePostQuery } from './PostCreator.hooks';

jest.mock('./components', () => ({
	PostForm: () => <div>formularz cały</div>,
}));

jest.mock('views/PostCreator/PostCreator.hooks', () => ({
	usePostQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		id: 'abc',
	}),
}));

describe('PostCreator', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should match snapshot', async () => {
		usePostQuery.mockImplementationOnce(() => ({
			isSuccess: true,
			data: {
				content: 'aaa',
				cover: paths.PLAIN,
				downloadables: [],
				header: '',
				images: [],
				reservation: 100,
				summary: 'aaa',
				title: 'Sport',
			},
			isError: false,
			isLoading: false,
		}));
		const { container } = render(
			<MemoryRouter>
				<PostCreator />
			</MemoryRouter>,
		);

		expect(container).toMatchSnapshot();
	});

	it('should work withoud data', async () => {
		usePostQuery.mockImplementationOnce(() => ({
			isSuccess: true,
			data: {},
			isError: false,
			isLoading: false,
		}));
		const { container } = render(
			<MemoryRouter>
				<PostCreator />
			</MemoryRouter>,
		);

		expect(container).toMatchSnapshot();
	});
});
