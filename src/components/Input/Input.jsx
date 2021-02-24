import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const Input = ({ value, handleChange, error, id, ...rest }) => (
	<TextField
		name={id}
		variant="outlined"
		value={value}
		onChange={handleChange}
		placeholder=""
		{...rest}
		error={!!error}
		helperText={error}
	/>
);

Input.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	id: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	rest: PropTypes.object,
};

Input.defaultProps = {
	error: '',
	rest: {},
};

export default Input;
