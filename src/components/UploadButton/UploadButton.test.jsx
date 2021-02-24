import React from 'react';
import { render } from '@testing-library/react';
import UploadButton from './UploadButton';

describe('UploadButton', () => {
	const props = {
		header: 'Dodaj plik',
		icon: <>xd</>,
		handleChange: jest.fn(),
		error: '',
	};

	it('should match snapshot', () => {
		const { container } = render(<UploadButton {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should display error', () => {
		props.error = 'Błąd';
		const { container } = render(<UploadButton {...props} />);

		expect(container).toMatchSnapshot();
	});
});
