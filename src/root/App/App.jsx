import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'root/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import CategoryTile from 'components/CategoryTile/CategoryTile';

import logo from 'logo.svg'

const queryClient = new QueryClient();

const App = () => (
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<CategoryTile img={logo} title='dupa' desc='to tam troche dłuższe, to nw moze być docelowo ileś znaków z postu, założmy 30 i potem na koniec ..., albo jakieś oddzilen w kreatorze.' link='/blog/category/1' /> 
				{/* to wyżej to do wywalenia jak zaakcapotwany bedzie pr */}
				<Router />
			</BrowserRouter>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
