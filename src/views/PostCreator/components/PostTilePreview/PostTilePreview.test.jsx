import React from 'react';
import { render } from '@testing-library/react';
import paths from 'constants/api';
import PostTilePreview from './PostTilePreview';

jest.mock('components', () => ({
	// eslint-disable-next-line react/prop-types
	PostTile: ({ cover, title, summary }) => (
		<div>
			<img src={cover} alt="img" />
			<p>{title}</p>
			<p>{summary}</p>
		</div>
	),
}));

global.URL.createObjectURL = jest.fn().mockImplementation(() => '/link');

describe('PostTilePreview', () => {
	let props;

	beforeEach(() => {
		props = {
			cover: '/link',
			title: 'tytuł kafla',
			summary: 'opis',
		};
	});

	it('should match snapshot', () => {
		const { container } = render(<PostTilePreview {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should match snapshot with file', () => {
		props.cover = new File(['foo'], 'foo.jpg', {
			type: 'image/jpg',
		});

		const { container } = render(<PostTilePreview {...props} />);

		expect(container).toMatchSnapshot();
	});
});
