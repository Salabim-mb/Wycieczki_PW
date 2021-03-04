import React from 'react';
import { render } from '@testing-library/react';
import AlertInfo from './AlertInfo';

describe('AlertInfo', () => {
	let props = {};

	beforeEach(() => {
		props = { isLoading: true, isError: false, children: '' };
	});

	it('should match snapshot (loading)', () => {
		const { container, getByText } = render(<AlertInfo {...props} />);

		expect(getByText('Ładowanie...')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should match snapshot (error)', () => {
		props = { isLoading: false, isError: true, children: 'Wystąpił błąd' };

		const { container, getByText } = render(<AlertInfo {...props} />);

		expect(getByText('Wystąpił błąd')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render nothing if flags are false', () => {
		props = { isLoading: false, isError: false, children: '' };

		const { container } = render(<AlertInfo {...props} />);

		expect(container).toMatchSnapshot();
	});
});
