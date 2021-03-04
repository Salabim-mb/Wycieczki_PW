import { useQuery, useMutation } from 'react-query';
import { getBlogs, sendCategory } from './CategoryCreator.api'

export const useQueryBlogs = () => useQuery('blogs', getBlogs, { retry: false })
export const useMutationCategory = () => useMutation((formData) => sendCategory(formData), { retry: false })