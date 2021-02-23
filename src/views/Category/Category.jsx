import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import PostTile from 'components/PostTile'
import paths from 'constants/api'
import Typography from '@material-ui/core/Typography';
import Image from './components/Image'
import StyledContainer from './Category.css'


const Category = () => {
    const [category, setCategory] = useState([])
    const [posts, setPosts] = useState([])
    const params = useParams();


    const recivePosts = () => {
        fetch(`${paths.BLOG_POSTS}?topic=${params.category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('post:', data);
                setPosts(data)
            })
            .catch((error) => {
                console.error('ErrorPSOT:', error);
            });
    }

    const reciveCategory = () => {
        fetch(`${paths.BLOG_TOPIC}${params.category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('CAt:', data);
                setCategory(data)
            })
            .catch((error) => {
                console.error('ErrorCAT:', error);
            });
    }
    const { isLoading } = useQuery('posts', () => recivePosts())

    useEffect(() => {
        reciveCategory()
        // recivePosts()
    }, [])

    return (
        <StyledContainer>
            <Image imgSrc={`${paths.PLAIN}${category?.cover_url}`} imgAlt={category?.title} />
            <Typography variant="h2">{category?.title}</Typography>
            {<div>{isLoading}</div> || posts?.results.map((data) => (
                <PostTile key={data.id} id={data.id} cover={data.cover} title={data.title} summary={data.summary} link={`/${params.category}/${data.id}`} />
            ))}
        </StyledContainer>
    );
}
export default Category