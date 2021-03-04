import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import GlobalStyle from 'style/GlobalStyle';
import { AlertProvider } from 'context/AlertContext';
import { AlertPopup } from 'components';

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<AlertPopup />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AlertProvider>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
