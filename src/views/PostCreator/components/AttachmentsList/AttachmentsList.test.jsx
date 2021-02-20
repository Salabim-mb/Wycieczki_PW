import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttachmentsList from './AttachmentsList';

describe('AttachmentsList', () => {
	let props;

	beforeEach(() => {
		props = {
			attachments: [{ id: 0, file: { name: 'attachment.jpg' } }],
			setAttachments: jest.fn(),
		};
	});

	it('should match snapshot', () => {
		const { container } = render(<AttachmentsList {...props} />);

		expect(container).toMatchSnapshot();
	});

	it('should delete item', () => {
		props.attachments = [
			{ id: 0, file: { name: 'attachment.jpg' } },
			{ id: 1, file: { name: 'attachment2.jpg' } },
			{ id: 2, file: { name: 'attachment3.jpg' } },
		];
		const { getByTestId } = render(<AttachmentsList {...props} />);

		fireEvent.click(getByTestId('deleteIcon1'));

		expect(props.setAttachments).toHaveBeenCalledWith([
			{ id: 0, file: { name: 'attachment.jpg' } },
			{ id: 1, file: { name: 'attachment3.jpg' } },
		]);
	});
});
