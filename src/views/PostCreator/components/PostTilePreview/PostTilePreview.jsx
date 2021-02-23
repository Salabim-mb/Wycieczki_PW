import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const PostTilePreview = () => (
	<Accordion>
		<AccordionSummary
			expandIcon={<ExpandMore />}
			aria-controls="panel1a-content"
			id="panel1a-header"
		>
			<Typography>Podgląd kafelka posta</Typography>
		</AccordionSummary>
		<AccordionDetails>
			<Typography>Tu będzie kafel</Typography>
		</AccordionDetails>
	</Accordion>
);

export default PostTilePreview;
