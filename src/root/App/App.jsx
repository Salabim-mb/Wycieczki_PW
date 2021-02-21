import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import GlobalStyle from 'style/GlobalStyle'
import { AlertProvider } from '../../context/AlertContext';

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<BrowserRouter>
					<Router />

					<Link to={{
						pathname: '/blog/liceum',
						categoryProps: { id: 1 }
					}}>XDDDDD</Link>

				</BrowserRouter>
			</AlertProvider>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
