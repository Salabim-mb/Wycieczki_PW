import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CategoryTile from './CategoryTile';

import logo from '../../logo.svg'
// TRZEBA MOCK JESZCZE MATERIALA 
describe('CategoryTile', () => {
    let props;
    beforeEach(() => {
        props = {

            title: 'Geometria przestrzenna',
            cover: logo,
            desc: 'Opis jakiś tam coś tam bla bla',
            link: '/liceum/kolorowanki/1',
        };
    });
    it('should match snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <CategoryTile {...props} />
            </BrowserRouter>
        );

        expect(container).toMatchSnapshot();
    });

});