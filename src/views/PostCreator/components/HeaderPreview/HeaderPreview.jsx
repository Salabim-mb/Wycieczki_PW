import React, { useMemo } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { isYoutubeLink } from 'utils/helpers';
import { StyledImage } from './HeaderPreview.css';

const HeaderPreview = ({ header }) => {
	const wait = useMemo(() => {});
	console.log(wait, header);
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>Podgląd nagłówka posta</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{header ? (
					isYoutubeLink(header) ? null : (
						<StyledImage src={typeof header === 'string' ? header : URL.createObjectURL(header)} />
					)
				) : null}
			</AccordionDetails>
		</Accordion>
	);
};

export default HeaderPreview;
