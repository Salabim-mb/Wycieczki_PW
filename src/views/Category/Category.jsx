import React from 'react';
import { useParams, Redirect } from "react-router-dom";
import PostTile from 'components/PostTile'
import paths from 'constants/api'
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Image from './components/Image'
import StyledContainer from './Category.css'
import { useQueryCategory, useQueryPosts } from './Category.hooks'

const Category = () => {
    const params = useParams();

    const category = useQueryCategory(params)
    const posts = useQueryPosts(params)

    return (
        <StyledContainer>
            {category.isLoading ? (
                <Skeleton variant="rect" width={210} height={118} />
            ) : null}
            {category.isError ? <Redirect to='/error' /> : <>
                {category?.data?.header_url ? <Image imgSrc={`${paths.PLAIN}${category?.data?.header_url}`} imgAlt={category?.data?.title} /> : null}
                <Typography variant="h3">{category?.data?.title}</Typography>
            </>}
            {posts.isLoading ? (
                <Skeleton variant="circle" width={40} height={40} />
            ) : null}
            { posts.isError ? <div> Nie udało się pobrać postu </div> : posts?.data?.results?.map((data) => (
                <PostTile key={data.id} id={data.id} cover={data.cover} title={data.title} summary={data.summary} link={`/${params.category}/${data.id}`} />
            ))}
        </StyledContainer>
    );
}
export default Category