import React from 'react';
import { render } from '@testing-library/react';
import paths from 'constants/api';
import HeaderInput from './HeaderInput';

describe('HeaderInput', () => {
	let props;

	beforeEach(() => {
		props = {
			handleChangeFile: jest.fn(),
			header: 'Nagłówek',
			handleChangeLink: jest.fn(),
			error: '',
		};
	});

	it('should match snapshot', () => {
		const { container } = render(<HeaderInput {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should display error message ', () => {
		props.error = 'błąd';
		const { container } = render(<HeaderInput {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should header value be empty', () => {
		props.header = paths.PLAIN;
		const { getByTestId } = render(<HeaderInput {...props} />);

		expect(getByTestId('test-id').value).toBe('');
	});
});