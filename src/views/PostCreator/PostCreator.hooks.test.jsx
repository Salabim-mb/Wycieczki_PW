import { renderHook, act } from '@testing-library/react-hooks';
import paths from 'constants/api';
import {
	useTopicsQuery,
	useFileDeletion,
	useImageDeletion,
	useAttachmentsMutation,
	usePostMutation,
	usePostQuery,
} from './PostCreator.hooks';
import { QCProvider as wrapper } from 'components';

describe('PostCreator - hooks', () => {
	let fail;
	const topics = [{ id: 1, name: '2' }];
	const post = {
		reservation: 1,
		header: '/link',
		cover: '/link2',
		topic: 1,
		content: 'aaaa',
		title: 'aaa',
	};

	const mockedFetch = (input, init) => {
		if (fail) {
			return Promise.resolve({
				status: 500,
				ok: false,
				json: () => Promise.resolve({ message: 'błąd' }),
			});
		}
		switch (init.method) {
			case 'GET':
				if (input === paths.BLOG_TOPICS) {
					return Promise.resolve({
						status: 200,
						ok: true,
						json: () => Promise.resolve(topics),
					});
				}

				return Promise.resolve({
					status: 200,
					ok: true,
					json: () => Promise.resolve(post),
				});

			case 'POST':
				if (input === paths.BLOG_DOWNLOADABLE) {
					return Promise.resolve({
						status: 201,
						ok: true,
						json: () => Promise.resolve({ id: 1, file_url: 'link' }),
					});
				}
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
		jest.spyOn(window, 'fetch');
	});

	beforeEach(() => {
		jest.clearAllMocks();

		window.fetch.mockImplementation(mockedFetch);
		fail = false;
	});

	describe('useTopicsQuery', () => {
		it('should fetch topics', async () => {
			const { result, waitFor } = renderHook(() => useTopicsQuery(), { wrapper });
			await waitFor(() => result.current.isSuccess);

			expect(result.current.data).toEqual(topics);
		});

		it('should not fetch topics if fail', async () => {
			fail = true;

			const { result, waitFor } = renderHook(() => useTopicsQuery(), { wrapper });
			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});
	});

	describe('useFileDeletion', () => {
		it('should delete file', async () => {
			const data = { images: [], attachments: [], prevAttachments: [{ id: 1 }] };
			const { result, waitFor } = renderHook(() => useFileDeletion(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});

			await waitFor(() => result.current.isSuccess);
		});

		it('should fail while delete file', async () => {
			fail = true;

			const data = { images: [], attachments: [], prevAttachments: [{ id: 1 }] };
			const { result, waitFor } = renderHook(() => useFileDeletion(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});

			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});
	});

	describe('useImageDeletion', () => {
		it('should delete image', async () => {
			const data = 1;
			const { result, waitFor } = renderHook(() => useImageDeletion(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});

			await waitFor(() => result.current.isSuccess);
		});

		it('should fail while delete image', async () => {
			fail = true;

			const data = 1;
			const { result, waitFor } = renderHook(() => useImageDeletion(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});
			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});
	});

	describe('useAttachmentsMutation', () => {
		const data = {
			attachments: [
				{ id: 1, file_url: '/abc', reservation: 1 },
				{
					id: 'abc',
					file: new File(['foo'], 'foo.jpg', {
						type: 'image/jpg',
					}),
				},
			],
			reservation: 1,
		};

		it('should send attachments', async () => {
			const { result, waitFor } = renderHook(() => useAttachmentsMutation(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});

			await waitFor(() => result.current.isSuccess);
		});

		it('should fail while sending attachments', async () => {
			fail = true;

			const { result, waitFor } = renderHook(() => useImageDeletion(''), { wrapper });

			act(() => {
				result.current.mutate(data);
			});
			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});
	});

	describe('usePostMutation', () => {
		it('should send attachments', async () => {
			const { result, waitFor } = renderHook(() => usePostMutation(''), { wrapper });

			act(() => {
				result.current.mutate(post);
			});

			await waitFor(() => result.current.isSuccess);
		});

		it('should fail while sending attachments', async () => {
			fail = true;

			const { result, waitFor } = renderHook(() => usePostMutation(''), { wrapper });

			act(() => {
				result.current.mutate(post);
			});
			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});
	});

	describe('usePostQuery', () => {
		it('should fetch post', async () => {
			const { result, waitFor } = renderHook(() => usePostQuery(1), { wrapper });
			await waitFor(() => result.current.isSuccess);

			expect(result.current.data).toEqual(post);
		});

		it('should not fetch post if fail', async () => {
			fail = true;

			const { result, waitFor } = renderHook(() => usePostQuery(1), { wrapper });
			await waitFor(() => result.current.isError);

			expect(result.current.error.message).toEqual('message: błąd');
		});

		it('should success without id', async () => {
			fail = true;

			const { result, waitFor } = renderHook(() => usePostQuery(), { wrapper });
			await waitFor(() => result.current.isSuccess);

			expect(result.current.data).toEqual({});
		});
	});
});
