import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const UploadButton = ({ header, icon, handleChange, error, ...rest }) => (
	<>
		<Button variant="contained" component="label" color="default" startIcon={icon}>
			{header}
			<input name={rest.id} type="file" {...rest} hidden onChange={handleChange} />
		</Button>
		{error && <Alert severity="error">{error}</Alert>}
	</>
);

UploadButton.propTypes = {
	header: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	icon: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};

UploadButton.defaultProps = {
	error: '',
};

export default UploadButton;
