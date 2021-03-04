import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import paths from 'constants/api';
import Category from './Category';
import { useQueryCategory, useQueryPosts } from './Category.hooks';

jest.mock('views/Category/Category.hooks', () => ({
    useQueryPosts: jest.fn(),
    useQueryCategory: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 'abc',
    }),
}));

describe('Category', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot - data', async () => {
        useQueryPosts.mockImplementation(() => ({
            isSuccess: true,
            data: [{
                count: 1,
                next: 'aa',
                previous: 'bb',
                results: {
                    reservation: 1,
                    header: 1,
                    topic: 1,
                    content: 'aaa',
                    title: 'bbb',
                    date_created: '21.10.2020',
                    summary: 'ccc'
                }
            }],
            isError: false,
            isLoading: false,
        }));
        useQueryCategory.mockImplementationOnce(() => ({
            isSuccess: true,
            data: {
                title: 'abc',
                id: 1,
                index: 1,
                header_url: '/link',
                cover_url: '/link1',
                blog: 1,
                show_title: true,
                description: 'aaaaaa'
            },
            isError: false,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <Category />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isError', async () => {
        useQueryPosts.mockImplementation(() => ({
            isSuccess: true,
            data: [],
            error: 'błąd',
            isError: true,
            isLoading: false,
        }));
        useQueryCategory.mockImplementationOnce(() => ({
            isSuccess: true,
            data: {},
            error: 'błąd',
            isError: true,
            isLoading: false,
        }));
        const { container } = render(
            <MemoryRouter>
                <Category />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot - isLoading', async () => {
        useQueryPosts.mockImplementation(() => ({
            isSuccess: true,
            data: [],
            isError: false,
            isLoading: true,
        }));
        useQueryCategory.mockImplementationOnce(() => ({
            isSuccess: true,
            data: {},
            isError: false,
            isLoading: true,
        }));
        const { container } = render(
            <MemoryRouter>
                <Category />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});