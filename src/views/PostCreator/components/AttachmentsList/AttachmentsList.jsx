import React from 'react';
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	IconButton,
	Avatar,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete, Attachment } from '@material-ui/icons';
import PropTypes from 'prop-types';

const AttachmentsList = ({ attachments, setAttachments }) => {
	const handleDeleteItem = id => {
		let newAttachments = [...attachments];
		const index = newAttachments.findIndex(attachment => attachment.id === id);
		newAttachments.splice(index, 1);
		newAttachments = newAttachments.map((attachment, i) => ({ ...attachment, id: i }));
		setAttachments(newAttachments);
	};

	return (
		<List>
			{attachments.map(({ file: { name }, id }) => (
				<ListItem key={id}>
					<ListItemAvatar>
						<Avatar>
							<Attachment />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={name} />
					<ListItemSecondaryAction
						onClick={() => handleDeleteItem(id)}
						data-testid={`deleteIcon${id}`}
					>
						<IconButton edge="end" aria-label="delete">
							<Delete />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	);
};

AttachmentsList.propTypes = {
	attachments: PropTypes.arrayOf(
		PropTypes.shape({ id: PropTypes.number.isRequired, file: PropTypes.shape({}).isRequired }),
	).isRequired,
	setAttachments: PropTypes.func.isRequired,
};

export default AttachmentsList;
