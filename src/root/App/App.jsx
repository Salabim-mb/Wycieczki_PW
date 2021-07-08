import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import GlobalStyle from 'style/GlobalStyle';
import { AlertProvider } from 'context/AlertContext';
import { AlertPopup, QCProvider } from 'components';

const App = () => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<QCProvider>
			<AlertProvider>
				<AlertPopup />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
				<AlertPopup />
			</AlertProvider>
		</QCProvider>
	</ThemeProvider>
);

export default App;
