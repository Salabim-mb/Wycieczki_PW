import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import CategoryCreator from 'views/CategoryCreator/CategoryCreator';

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Router />
				<CategoryCreator />
			</BrowserRouter>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
