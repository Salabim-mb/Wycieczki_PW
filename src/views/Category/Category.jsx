import React from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import PostTile from 'components/PostTile'
import paths from 'constants/api'
import Typography from '@material-ui/core/Typography';
import Image from './components/Image'
import StyledContainer from './Category.css'


const Category = () => {
    const params = useParams();


    const getPosts = async () => {
        const url = `${paths.BLOG_POSTS}?topic=${params.category}`;

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, { headers, method: 'GET' });

        if (response.status !== 200) {
            throw new Error('błąd');
        }

        return response.json();
    };

    const getCategory = async () => {
        const url = `${paths.BLOG_TOPIC}${params.category}/`;

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, { headers, method: 'GET' });

        if (response.status !== 200) {
            throw new Error('błąd');
        }

        return response.json();
    };

    const posts = useQuery('posts', getPosts)
    const category = useQuery('category', getCategory)

    return (
        <StyledContainer>
            {category.isError ? <div>Nie udało się pobrać kategorii</div> : <>
                <Image imgSrc={`${paths.PLAIN}${category?.data?.cover_url}`} imgAlt={category?.data?.title} />
                <Typography variant="h2">{category?.data?.title}</Typography>
            </>}

            { posts.isError ? <div> Nie udało się pobrać postu </div> : posts?.data?.results?.map((data) => (
                <PostTile key={data.id} id={data.id} cover={data.cover} title={data.title} summary={data.summary} link={`/${params.category}/${data.id}`} />
            ))}
        </StyledContainer>
    );
}
export default Category