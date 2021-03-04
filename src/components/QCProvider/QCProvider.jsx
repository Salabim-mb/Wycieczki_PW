import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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

export default QCProvider;
