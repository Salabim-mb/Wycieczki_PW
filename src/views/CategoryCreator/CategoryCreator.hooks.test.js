import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQueryBlogs, useMutationCategory } from './CategoryCreator.hooks'


describe('Blog - hooks', () => {
    let failBlogs
    let failCategory
    const blogs = [{
        id: 1,
        index: 1,
        content: 'aaa',
        image_url: '/link',
        title: 'bbb',
        show_title: true,
        color: '#000'
    }];

    // const category = {
    //     blog: 1,
    //     title: 'aa',
    //     description: 'bb',
    //     show_title: true,
    //     cover_image: '/link1',
    //     header_image: '/link2',
    // }
    const category = {
        blog: 1,
        id: 1,
        index: 1,
        title: 'aa',
        description: 'bb',
        show_title: true,
        cover_image: '/link1',
        header_image: '/link2',
    }

    const mockedFetch = (init) => {
        if (failCategory) {
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        if (failBlogs) {
            console.log("JESTEM HARDKOREM")
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        if (init.method !== 'POST') {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve(blogs),
            });
        }
        return Promise.resolve({
            status: 201,
            ok: true,
            json: () => Promise.resolve(category),
        });
        // switch (init.method) {
        //     case 'GET':
        //         // if (input.includes(paths.BLOGS)) {
        //         return Promise.resolve({
        //             status: 200,
        //             ok: true,
        //             json: () => Promise.resolve(blogs),
        //         });
        //     // }

        //     case 'POST':
        //         // if (input.includes(paths.BLOG_TOPIC)) {
        //         return Promise.resolve({
        //             status: 201,
        //             ok: true,
        //             json: () => Promise.resolve(category),
        //         });
        //     // }

        //     default:
        //         return null;
        // }
    };


    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });

    beforeEach(() => {
        jest.clearAllMocks();

        window.fetch.mockImplementation(mockedFetch);
        failBlogs = false;
        failCategory = false;
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
            console.log(failBlogs, 'BLOGSY')

            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryBlogs(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });


    describe('useMutationCategory', () => {
        it('should send attachments', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useMutationCategory(''), { wrapper });

            act(() => {
                result.current.mutate(category);
            });

            await waitFor(() => result.current.isSuccess);
        });

        it('should fail while sending attachments', async () => {
            failCategory = true;
            console.log(failCategory, 'CATEGIRSY')

            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useMutationCategory(''), { wrapper });

            act(() => {
                result.current.mutate(category);
            });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });
});