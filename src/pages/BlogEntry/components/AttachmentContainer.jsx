import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GetAppIcon from "@material-ui/icons/GetApp";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { IconButton, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import api from 'constants/api';

const AttachmentContainer = ({fileUrl, filename}) => {
	const [bookmarked, setBookmarked] = useState(false);

	return (
		<Paper elevation={3}>
			<ListItem>
				<ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
				<ListItemText primary={filename} />
				<>
					<IconButton onClick={() => setBookmarked(!bookmarked)}>
						{bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
					</IconButton>
					<a target="_blank" href={`${api.PLAIN}${fileUrl}`} rel="noopener noreferrer">
						<IconButton><GetAppIcon /></IconButton>
					</a>
				</>
			</ListItem>
		</Paper>
	)
};

AttachmentContainer.propTypes = {
	fileUrl: PropTypes.string.isRequired,
	filename: PropTypes.string.isRequired
};

export default AttachmentContainer;