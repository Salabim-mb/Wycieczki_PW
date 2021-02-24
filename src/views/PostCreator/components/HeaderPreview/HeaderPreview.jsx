import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import paths from 'constants/api';
import { isYoutubeLink } from 'utils/helpers';
import { StyledImage } from './HeaderPreview.css';

const HeaderPreview = ({ header }) => {
	const createdHeader = useMemo(() => {
		if (header) {
			if (typeof header === 'string') {
				if (header.includes(paths.PLAIN)) {
					return <StyledImage src={header} />;
				}
				if (isYoutubeLink(header)) {
					return header;
				}
				return null;
			}
			return <StyledImage src={URL.createObjectURL(header)} />;
		}
		return null;
	}, [header]);

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>Podgląd nagłówka posta</Typography>
			</AccordionSummary>
			<AccordionDetails>{createdHeader}</AccordionDetails>
		</Accordion>
	);
};

HeaderPreview.propTypes = {
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ name: PropTypes.string })]),
};

HeaderPreview.defaultProps = {
	header: null,
};

export default HeaderPreview;
