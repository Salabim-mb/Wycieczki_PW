import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PostTile from './PostTile';

import logo from '../../logo.svg';
// TRZEBA MOCK JESZCZE MATERIALA
describe('PostTile', () => {
	let props;
	beforeEach(() => {
		props = {
			title: 'Geometria przestrzenna',
			cover: logo,
			summary: 'Opis jakiś tam coś tam bla bla',
			link: '/liceum/kolorowanki/1',
		};
	});

	it('should match snapshot', () => {
		const { container } = render(
			<BrowserRouter>
				<PostTile {...props} />
			</BrowserRouter>,
		);

		expect(container).toMatchSnapshot();
	});
});
