
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import paths from 'constants/api';
import {
    useQueryBlog,
    useQueryCategories
} from './Blog.hooks';

describe('Blog - hooks', () => {
    let failBlog, failCategories;
    const topics = [{ id: 1, name: '2' }];
    const blog = {
        title: 1,
        id: 1,
        image_url: '/link',
        topic: 1,
        show_title: true,
        color: '#000'
    };

    const mockedFetch = (input) => {
        if (failBlog) {
            console.log(failBlog, 'XDdupa')
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        else if (failCategories && input.includes(paths.BLOG_TOPICS)) {
            return Promise.resolve({
                status: 500,
                ok: false,
                json: () => Promise.resolve({ message: 'błąd' }),
            });
        }
        if (input.includes(paths.BLOG_TOPICS)) {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve(topics),
            });
        }
        return Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve(blog),
        });

    };

    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });

    beforeEach(() => {
        jest.clearAllMocks();

        window.fetch.mockImplementation(mockedFetch);
        failBlog = false;
        failCategories = false;
    });

    describe('useQueryCategories', () => {
        it('should fetch topics(categoires)', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );
            const { result, waitFor } = renderHook(() => useQueryCategories(1), { wrapper });
            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual(topics);
        });

        it('should not fetch topics if fail', async () => {
            failCategories = true;
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryCategories(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });

    describe('useQueryBlog', () => {
        it('should fetch blog', async () => {
            const queryClient = new QueryClient();

            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );
            const { result, waitFor } = renderHook(() => useQueryBlog(1), { wrapper });
            await waitFor(() => result.current.isSuccess);

            expect(result.current.data).toEqual(blog);
        });

        it('should not fetch topics if fail', async () => {
            failBlog = true;
            const queryClient = new QueryClient();
            const wrapper = ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            const { result, waitFor } = renderHook(() => useQueryBlog(1), { wrapper });
            await waitFor(() => result.current.isError);

            expect(result.current.error.message).toEqual('błąd');
        });
    });
});