import React from 'react';
import variants from 'constants/alertOptions';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const { ERROR, INFO } = variants;

const AlertInfo = ({ isLoading, isError, children }) =>
	isLoading ? (
		<Alert color={INFO}>Ładowanie...</Alert>
	) : isError ? (
		<Alert color={ERROR}>{children}</Alert>
	) : null;

AlertInfo.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	children: PropTypes.string,
};

AlertInfo.defaultProps = {
	children: '',
};

export default AlertInfo;
