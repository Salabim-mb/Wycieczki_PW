import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQueryBlogs } from './CategoryCreator.hooks'


describe('Blog - hooks', () => {
    let failBlogs
    const blogs = [{

        id: 1,
        index: 1,
        content: 'aaa',
        image_url: '/link',
        title: 'bbb',
        show_title: true,
        color: '#000'
    }];


    const mockedFetch = () => {
        if (failBlogs) {
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        else {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve(blogs),
            });
        }

    };

    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });

    beforeEach(() => {
        jest.clearAllMocks();

        window.fetch.mockImplementation(mockedFetch);
        failBlogs = false;
    });

    describe('useQueryBlogs', () => {
        it('should fetch blogs', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );
            const { result, waitFor } = renderHook(() => useQueryBlogs(1), { wrapper });
            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual(blogs);
        });

        it('should not fetch topic if fail', async () => {
            failBlogs = true;
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryBlogs(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });

});