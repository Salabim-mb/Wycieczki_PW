import { useQuery } from 'react-query'
import { getCategory, getPosts } from './Category.api'

export const useQueryPosts = (params) => useQuery('posts', () => getPosts(params), { retry: false })
export const useQueryCategory = (params) => useQuery('category', () => getCategory(params), { retry: false })