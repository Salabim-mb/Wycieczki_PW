import React from 'react';
import { render } from '@testing-library/react';
import TopicSelector from './TopicSelector';
import { useTopicsQuery } from '../../PostCreator.hooks';

jest.mock('views/PostCreator/PostCreator.hooks', () => ({
	useTopicsQuery: jest.fn(),
}));

describe('TopicSelector', () => {
	let props;

	beforeEach(() => {
		jest.clearAllMocks();

		props = { value: -1, handleChange: jest.fn() };
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
		const { container } = render(<TopicSelector {...props} />);

		expect(container).toMatchSnapshot();
	});
});
