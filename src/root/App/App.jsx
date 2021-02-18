import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import CategoryTile from 'components/CategoryTile/CategoryTile';

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<CategoryTile />
				<Router />
			</BrowserRouter>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
