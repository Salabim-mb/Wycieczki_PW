import { useQuery } from 'react-query'
import { getBlog, getCategories } from './Blog.api'


export const useQueryCategories = (params) => useQuery('categories', () => getCategories(params), { retry: false })
export const useQueryBlog = (params) => useQuery('blog', () => getBlog(params), { retry: false })
