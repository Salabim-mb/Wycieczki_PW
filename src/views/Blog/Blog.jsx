import React from 'react';
import { useQuery } from 'react-query'
import { useParams, Redirect } from 'react-router-dom'
import paths from 'constants/api'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CategoryTile from 'components/CategoryTile'
import { getBlog, getCategories } from './Blog.api'

const Post = () => {
    const params = useParams()

    const categories = useQuery('categories', () => getCategories(params), { retry: 1 })
    const blog = useQuery('blog', () => getBlog(params), { retry: 1 })

    return (
        <Container>
            {blog.isLoading ? (
                <Skeleton variant="rect" width={210} height={118} />
            ) : null}
            {blog.isError ? <Redirect to="/error" /> : <>
                <img src={blog?.data?.image_url} alt={blog?.data?.title} />
                <Typography variant='h3'>{blog?.data?.title}</Typography>
            </>}
            {categories.isLoading ? (
                <Skeleton animation="wave" variant="circle" width={40} height={40} />
            ) : null}
            {categories.isError ? <div>Nie można załadować kategorii</div> : categories.data?.map((category) => (
                <CategoryTile key={category.id} title={category.title} cover={`${paths.PLAIN}${category.cover_url}`} desc={category.description} link={`/${params.blog}/${category.id}`} />
            ))}
        </Container>
    );
}
export default Post