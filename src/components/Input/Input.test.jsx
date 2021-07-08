import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
	const props = {
		value: '',
		handleChange: jest.fn(),
		error: '',
		id: 'input',
		label: 'Input',
	};

	it('should match snapshot', () => {
		const { container } = render(<Input {...props} />);

		expect(container).toMatchSnapshot();
	});
});
