import React from 'react';
import { variants } from 'constants/materialConstants';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const { INFO, ERROR } = variants;

/* eslint-disable no-nested-ternary */

const AlertInfo = ({ isLoading, isError, children }) =>
	isLoading ? (
		<Alert color={INFO}>Ładowanie...</Alert>
	) : isError ? (
		<Alert color={ERROR}>{children}</Alert>
	) : null;

/* eslint-enable no-nested-ternary */

AlertInfo.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	children: PropTypes.string,
};

AlertInfo.defaultProps = {
	children: '',
};

export default AlertInfo;
