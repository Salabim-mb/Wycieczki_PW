import { useQuery } from 'react-query';
import { getBlogs } from './CategoryCreator.api'

export const useQueryBlogs = () => useQuery('blogs', getBlogs, { retry: false })