import React from 'react';
import { render } from '@testing-library/react';
import paths from 'constants/api';
import HeaderPreview from './HeaderPreview';

describe('HeaderPreview', () => {
	let props;

	beforeEach(() => {
		props = {
			header: paths.PLAIN,
		};
	});

	it('should match snapshot', () => {
		const { container } = render(<HeaderPreview {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should match youtube link', () => {
		props.header = 'https://www.youtube.com/xdd';
		const { container } = render(<HeaderPreview {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should match file', () => {
		props.header = new File(['foo'], 'foo.jpg', {
			type: 'image/jpg',
		});

		global.URL.createObjectURL = jest.fn(() => '/link');

		const { getByTestId } = render(<HeaderPreview {...props} />);

		expect(getByTestId('header')).toBeInTheDocument();
	});

	it('should not render header if it not exist', () => {
		props.header = '';

		const { queryByTestId } = render(<HeaderPreview {...props} />);

		expect(queryByTestId('header')).not.toBeInTheDocument();
	});

	it('should not render header if someone already typing youtube link', () => {
		props.header = 'abc';

		const { queryByTestId } = render(<HeaderPreview {...props} />);

		expect(queryByTestId('header')).not.toBeInTheDocument();
	});
});
