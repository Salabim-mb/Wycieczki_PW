import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import paths from 'constants/api';
import Blog from './Blog';
import { useQueryBlog, useQueryCategories } from './Blog.hooks';

jest.mock('views/Blog/Blog.hooks', () => ({
    useQueryBlog: jest.fn(),
    useQueryCategories: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 'abc',
    }),
}));

describe('Blog', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot - data', async () => {
        useQueryBlog.mockImplementation(() => ({
            isSuccess: true,
            data: {
                title: 1,
                id: 1,
                image_url: '/link',
                topic: 1,
                show_title: true,
                color: '#000'
            },
            isError: false,
            isLoading: false,
        }));
        useQueryCategories.mockImplementationOnce(() => ({
            isSuccess: true,
            data: [{ id: 1, name: '2' }],
            isError: false,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <Blog />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isError', async () => {
        useQueryBlog.mockImplementation(() => ({
            isSuccess: true,
            data: {},
            error: 'błąd',
            isError: true,
            isLoading: false,
        }));
        useQueryCategories.mockImplementationOnce(() => ({
            isSuccess: true,
            data: [],
            error: 'błąd',
            isError: true,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <Blog />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isLoading', async () => {
        useQueryBlog.mockImplementation(() => ({
            isSuccess: true,
            data: {},
            isError: false,
            isLoading: true,
        }));
        useQueryCategories.mockImplementationOnce(() => ({
            isSuccess: true,
            data: [],
            isError: false,
            isLoading: true,
        }));
        const { container } = render(
            <MemoryRouter>
                <Blog />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});