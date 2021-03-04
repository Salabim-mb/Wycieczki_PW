import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PropTypes from 'prop-types';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
		mutations: {
			retry: false,
		},
	},
});

const QCProvider = ({ children, ...rest }) => (
	<QueryClientProvider client={queryClient} {...rest}>
		{children}
	</QueryClientProvider>
);

QCProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default QCProvider;
