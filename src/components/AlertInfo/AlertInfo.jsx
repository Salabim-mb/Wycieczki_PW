import React from 'react';
import alertStyle from 'constants/alertOptions';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';


const AlertInfo = ({ isLoading, isError, children }) =>
	isLoading ? (
		<Alert color={alertStyle.INFO}>Ładowanie...</Alert>
	) : isError ? (
		<Alert color={alertStyle.ERROR}>{children}</Alert>
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
