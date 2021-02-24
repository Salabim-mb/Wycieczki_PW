import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { PostTile } from 'components';

/* eslint-disable no-useless-escape */

const PostTilePreview = ({ cover, title, summary }) => (
	<Accordion>
		<AccordionSummary
			expandIcon={<ExpandMore />}
			aria-controls="panel1a-content"
			id="panel1a-header"
		>
			<Typography>Podgląd kafelka posta</Typography>
		</AccordionSummary>
		<AccordionDetails>
			<PostTile
				cover={typeof cover === 'string' ? cover : URL.createObjectURL(cover)}
				title={title}
				summary={summary.replace(/(<\/?[^>]+(>|$))|(\&nbsp;)/g, '')}
			/>
		</AccordionDetails>
	</Accordion>
);

PostTilePreview.propTypes = {
	cover: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ name: PropTypes.string })]),
	title: PropTypes.string,
	summary: PropTypes.string,
};

PostTilePreview.defaultProps = {
	cover: null,
	title: '',
	summary: '',
};

export default PostTilePreview;
