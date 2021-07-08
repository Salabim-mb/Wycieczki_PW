import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import paths from 'constants/api';
import { useQueryCategory, useQueryPosts } from './Category.hooks'


describe('Blog - hooks', () => {
    let failPosts, failCategory;
    const posts = [{
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
    }];
    const category = {
        title: 'abc',
        id: 1,
        index: 1,
        header_url: '/link',
        cover_url: '/link1',
        blog: 1,
        show_title: true,
        description: 'aaaaaa'
    };

    const mockedFetch = (input) => {
        if (failPosts) {
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        else if (failCategory && input.includes(paths.BLOG_TOPIC)) {
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        if (input.includes(paths.BLOG_TOPIC)) {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve(category),
            });
        }
        else {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve(posts),
            });
        }

    };

    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });

    beforeEach(() => {
        jest.clearAllMocks();

        window.fetch.mockImplementation(mockedFetch);
        failPosts = false;
        failCategory = false;
    });

    describe('useQueryCategory', () => {
        it('should fetch topic(category)', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );
            const { result, waitFor } = renderHook(() => useQueryCategory(1), { wrapper });
            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual(category);
        });

        it('should not fetch topic if fail', async () => {
            failCategory = true;
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryCategory(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });

    describe('useQueryPosts', () => {
        it('should fetch posts', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );
            const { result, waitFor } = renderHook(() => useQueryPosts(1), { wrapper });
            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual(posts);
        });

        it('should not fetch posts if fail', async () => {
            failPosts = true;
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryPosts(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });
});