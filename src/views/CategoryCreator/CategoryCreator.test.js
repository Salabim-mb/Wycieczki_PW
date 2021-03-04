import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import CategoryCreator from './CategoryCreator';
import { useQueryBlogs } from './CategoryCreator.hooks';

jest.mock('views/CategoryCreator/CategoryCreator.hooks', () => ({
    useQueryBlogs: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 'abc',
    }),
}));

describe('CategoryCreator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot - data', async () => {
        useQueryBlogs.mockImplementation(() => ({
            isSuccess: true,
            data: [{
                id: 1,
                index: 1,
                content: 'aaa',
                image_url: '/link',
                title: 'bbb',
                show_title: true,
                color: '#000'
            }],
            isError: false,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <ThemeProvider theme={theme}>
                    <CategoryCreator />
                </ThemeProvider>
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isError', async () => {
        useQueryBlogs.mockImplementation(() => ({
            isSuccess: true,
            data: [],
            error: 'błąd',
            isError: true,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <ThemeProvider theme={theme}>
                    <CategoryCreator />
                </ThemeProvider>
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isLoading', async () => {
        useQueryBlogs.mockImplementation(() => ({
            isSuccess: true,
            data: [],
            isError: false,
            isLoading: true,
        }));
        const { container } = render(
            <MemoryRouter>
                <ThemeProvider theme={theme}>
                    <CategoryCreator />
                </ThemeProvider>
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});