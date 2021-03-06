import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import GlobalStyle from 'style/GlobalStyle';
import { AlertProvider } from 'context/AlertContext';
import { AlertPopup, QCProvider } from 'components';
import { UserProvider } from 'context/UserContext';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<QCProvider>
				<AlertProvider>
					<AlertPopup />
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</AlertProvider>
			</QCProvider>
		</ThemeProvider>
	</UserProvider>
);

export default App;
