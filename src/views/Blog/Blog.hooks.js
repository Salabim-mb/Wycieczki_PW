import { useQuery, useMutation } from 'react-query'
import { getBlog, getCategories, deleteCategory } from './Blog.api'


export const useQueryCategories = (params) => useQuery('categories', () => getCategories(params), { retry: false })
export const useQueryBlog = (params) => useQuery('blog', () => getBlog(params), { retry: false })
export const useMutationDeleteCategory = () => useMutation('category', (id) => deleteCategory(id), { retry: false })
