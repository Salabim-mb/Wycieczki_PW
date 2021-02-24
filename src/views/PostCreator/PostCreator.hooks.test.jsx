import React from 'react';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider, queryCache } from 'react-query';
import paths from 'constants/api';
import {
	useTopicsQuery,
	useFileDeletion,
	useImageDeletion,
	useAttachmentsMutation,
	usePostMutation,
} from './PostCreator.hooks';

// const queryClient = new QueryClient();
// const wrapper = ({ children }) => (
// 	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// Object.defineProperty(global, 'fetch', { writable: true });

describe('PostCreator - hooks', () => {
	let fail;
	let topics = [{ id: 1, name: '2' }];

	const mockedFetch = (input, init) => {
		if (fail) {
			return Promise.resolve({
				status: 500,
				ok: false,
				json: () => Promise.resolve([{ id: 0, name: 'xd' }]),
			});
		}
		switch (init.method) {
			case 'GET':
				return Promise.resolve({
					status: 200,
					ok: true,
					json: () => Promise.resolve(topics),
				});
			case 'POST':
				return Promise.resolve({
					status: 201,
					ok: true,
				});
			case 'DELETE':
				return Promise.resolve({
					status: 204,
					ok: true,
				});
			default:
				return null;
		}
	};

	beforeAll(() => {
		// console.log(global.fetch, window.fetch);
		jest.spyOn(window, 'fetch');
		// global.fetch = jest.fn().mockImplementationOnce(() => {
		// 	return new Promise((resolve, reject) => {
		// 		resolve({
		// 			status: 200,
		// 			json: () => Promise.resolve(topics),
		// 		});
		// 	});
		// });
	});

	beforeEach(() => {
		jest.clearAllMocks();

		window.fetch.mockImplementation(mockedFetch);
		fail = false;
	});

	it('should fetch topics', async () => {
		// window.fetch.mockResolvedValueOnce({
		// 	ok: true,
		// 	status: 200,
		// 	json: () => Promise.resolve(topics),
		// });
		const queryClient = new QueryClient();

		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const { result, waitFor } = renderHook(() => useTopicsQuery(), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual(topics);
	});

	it('should not fetch topics if fail', async () => {
		// window.fetch.mockResolvedValueOnce({
		// 	status: 404,
		// 	json: () => Promise.resolve({ message: 'error' }),
		// });
		fail = true;
		const queryClient = new QueryClient();
		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result, waitFor } = renderHook(() => useTopicsQuery(), { wrapper });
		await waitFor(() => result.current.isLoading);
		// await waitFor(() => !result.current.isLoading);

		expect(result.current.data).toEqual(undefined);
	});

	it('should delete file', async () => {
		const queryClient = new QueryClient();

		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const data = { images: [], attachments: [], prevAttachments: [{ id: 1 }] };
		const { result } = renderHook(() => useFileDeletion(''), { wrapper });

		act(() => {
			result.current.mutate(data);
		});
	});

	it('should fail while delete file', async () => {
		fail = true;

		const queryClient = new QueryClient();

		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const data = { images: [], attachments: [], prevAttachments: [{ id: 1 }] };
		const { result } = renderHook(() => useFileDeletion(''), { wrapper });

		act(() => {
			result.current.mutate(data);
		});
	});

	it('should delete image', async () => {
		const queryClient = new QueryClient();

		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const data = 1;
		const { result } = renderHook(() => useImageDeletion(''), { wrapper });

		act(() => {
			result.current.mutate(data);
		});
	});

	it('should fail while delete image', async () => {
		fail = true;

		const queryClient = new QueryClient();

		const wrapper = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		const data = 1;
		const { result } = renderHook(() => useImageDeletion(''), { wrapper });

		act(() => {
			result.current.mutate(data);
		});
	});
});
