import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</QueryClientProvider>
);

export default App;
