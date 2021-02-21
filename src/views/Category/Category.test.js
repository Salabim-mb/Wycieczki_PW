import React from 'react';
import Category from './Category'
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElement } from '@testing-library/react';
// import logo from '../../logo.svg'


// jest.mock('../../components/PostTile', () => ({
//     PostTile: ({ cover, title, summary, link }) => <div><img src={cover} /><h2>{title}</h2><p>{summary}</p><a href={link} /></div>,
// }));


// jest.mock('./components/Image', () => ({
//     Image: ({ imgSrc, imgAlt }) => <img src={imgSrc} alt={imgAlt} />,
// }));

describe('Category - dashboard', () => {
    let failFetch = false;
    const data = [
        {
            id: 0,
            title: 'Matematyka',
            summary:
                'Proin ullamcorper vitae lorem eget tristique. Mauris urna nibh, vestibulum eget dolor ut, ornare scelerisque mauris. Sed semper hendrerit facilisis. ',
            link: '/blog/liceum/1',
            cover: '../../logo.svg',
        },
    ];

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                if (failFetch) {
                    resolve({ status: 500 });
                }
                resolve({
                    status: 200,
                    json: () => Promise.resolve(data),
                });
            });
        });
    });

    beforeEach(() => {
        failFetch = false;
        jest.clearAllMocks();
    });

    it('should match snapshot', async () => {
        const { container, getByText } = render(
            <BrowserRouter>
                <Category />
            </BrowserRouter>
,
        );

        expect(window.fetch).toHaveBeenCalledTimes(1);
        await waitForElement(() => getByText('Matematyka'));

        expect(container).toMatchSnapshot();
    });

    // it('should show error message if fetch fails', async () => {
    //     failFetch = true;

    //     const { container, getByText } = render(
    //         <BrowserRouter>
    //             <Category />
    //         </BrowserRouter>,
    //     );

    //     expect(window.fetch).toHaveBeenCalledTimes(1);
    //     await waitForElement(() => getByText('Nie udało się pobrać postów.', { exact: false }));

    //     expect(container).toMatchSnapshot();
    // });
});
