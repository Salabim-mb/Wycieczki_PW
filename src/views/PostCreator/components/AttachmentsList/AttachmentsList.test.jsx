import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttachmentsList from './AttachmentsList';

describe('AttachmentsList', () => {
	let props;

	beforeEach(() => {
		props = {
			attachments: [{ id: 'abc', file: { name: 'attachment.jpg' } }],
			setAttachments: jest.fn(),
		};
	});

	it('should match snapshot', () => {
		const { container } = render(<AttachmentsList {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should delete item', () => {
		props.attachments = [
			{ id: 'a', file: { name: 'attachment.jpg' } },
			{ id: 'b', file: { name: 'attachment2.jpg' } },
			{ id: 'c', file: { name: 'attachment3.jpg' } },
			{ id: 3, file_url: '/link', reservation: 1 },
		];
		const { getByTestId } = render(<AttachmentsList {...props} />);

		fireEvent.click(getByTestId('deleteIconb'));

		expect(props.setAttachments).toHaveBeenCalledWith([
			{ id: 'a', file: { name: 'attachment.jpg' } },
			{ id: 'c', file: { name: 'attachment3.jpg' } },
			{ id: 3, file_url: '/link', reservation: 1 },
		]);
	});
});
