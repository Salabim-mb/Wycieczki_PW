import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import PropTypes from 'prop-types';
import paths from 'constants/api';
import { Input, UploadButton } from 'components';

const HeaderInput = ({ handleChangeFile, header, handleChangeLink, error }) => {
	const FILE_LABEL = '';
	return (
		<FormGroup>
			<UploadButton
				handleChange={handleChangeFile}
				header="Prześlij nagłówek"
				id="header"
				accept="image/*"
				icon={<PhotoCamera />}
			/>
			<Typography>lub</Typography>
			<Input
				fullWidth
				id="headerLink"
				name="headerLink"
				label="Link do filmu yt"
				variant="outlined"
				value={typeof header === 'string' && !header?.includes(paths.PLAIN) ? header : FILE_LABEL}
				inputProps={{ minLength: 1, maxLength: 120, 'data-testid': 'test-id' }}
				handleChange={handleChangeLink}
				error={error}
			/>
		</FormGroup>
	);
};

HeaderInput.propTypes = {
	handleChangeFile: PropTypes.func.isRequired,
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ name: PropTypes.string })]),
	handleChangeLink: PropTypes.func.isRequired,
	error: PropTypes.string,
};

HeaderInput.defaultProps = {
	error: '',
	header: null,
};

export default HeaderInput;
