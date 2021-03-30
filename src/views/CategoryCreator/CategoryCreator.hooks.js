import { useQuery, useMutation } from 'react-query';
import { getBlogs, sendCategory, getCategory } from './CategoryCreator.api'

export const useQueryBlogs = () => useQuery('blogs', getBlogs, { retry: false })
export const useQueryCategory = (id) => useQuery('categoryGet', () => getCategory(id), { retry: false })
export const useMutationCategory = (id) => useMutation((formData) => { console.log(id); sendCategory(formData, id) }, { retry: false })