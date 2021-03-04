import React from 'react';
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import paths from 'constants/api'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AlertInfo } from 'components';
import CategoryTile from 'components/CategoryTile'
import { useQueryBlog, useQueryCategories } from './Blog.hooks'

const StyledContainer = styled(Container)`
    display:flex!important;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Post = () => {
    const params = useParams()

    const blog = useQueryBlog(params)
    const categories = useQueryCategories(params)

    return (
        <Container>


            <AlertInfo isLoading={blog.isLoading} isError={blog.isError}>
                {blog.error?.message}
            </AlertInfo>

            {blog.isError ? <Redirect to="/error" /> : <>
                <img src={blog?.data?.image_url} alt={blog?.data?.title} />
                <Typography variant='h3'>{blog?.data?.title}</Typography>
            </>}
            <StyledContainer>
                <AlertInfo isLoading={categories.isLoading} isError={categories.isError}>
                    {categories.error?.message}
                </AlertInfo>

                {categories.isError ? <div>Nie można załadować kategorii</div> : categories.data?.map((category) => (
                    <CategoryTile key={category.id} title={category.title} cover={`${paths.PLAIN}${category.cover_url}`} desc={category.description} link={`/${params.blog}/${category.id}`} />
                ))}

            </StyledContainer>
        </Container>
    );
}
export default Post