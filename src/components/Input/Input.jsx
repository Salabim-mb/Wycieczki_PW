import React from 'react';
import { TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Input = ({ value, handleChange, error, id, ...rest }) => (
	<>
		<TextField name={id} variant="outlined" value={value} onChange={handleChange} {...rest} />
		{error && <Alert severity="error">{error}</Alert>}
	</>
);

export default Input;
