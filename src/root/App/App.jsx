import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import GlobalStyle from 'style/GlobalStyle'

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
