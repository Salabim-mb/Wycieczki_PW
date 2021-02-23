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
import paths from 'constants/api';

const AttachmentsList = ({ attachments, setAttachments }) => {
	const handleDeleteItem = id => {
		let newAttachments = [...attachments];

		const index = newAttachments.findIndex(attachment => attachment.id === id);
		newAttachments.splice(index, 1);
		newAttachments = newAttachments.map(attachment => ({
			...attachment,
			id: attachment.file_url ? attachment.id : Math.random().toString(36).substr(2, 9),
		}));
		setAttachments(newAttachments);
	};

	return (
		<List>
			{attachments.map(({ file, id, file_url: fileUrl }, i) => (
				<ListItem key={id}>
					<ListItemAvatar>
						<Avatar>
							<Attachment />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							file?.name || (
								<a
									href={`${paths.PLAIN}${fileUrl}`}
									target="_blank"
									rel="noopener noreferrer"
								>{`Załącznik ${i + 1}`}</a>
							)
						}
					/>
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
		PropTypes.oneOfType([
			PropTypes.shape({ id: PropTypes.string.isRequired, file: PropTypes.shape({}).isRequired }),
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				file_url: PropTypes.string.isRequired,
				reservation: PropTypes.number.isRequired,
			}),
		]),
	).isRequired,
	setAttachments: PropTypes.func.isRequired,
};

export default AttachmentsList;
