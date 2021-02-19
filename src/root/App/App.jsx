import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import { AlertProvider } from '../../context/AlertContext';

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AlertProvider>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
