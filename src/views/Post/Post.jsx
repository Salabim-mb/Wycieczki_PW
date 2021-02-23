import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import paths from 'constants/api'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import CategoryTile from 'components/CategoryTile'

const Post = () => {
    const [categories, setCategories] = useState()
    const [blog, setBlog] = useState()
    const params = useParams()

    const getCategories = () => {
        fetch(`${paths.BLOG_TOPICS}?blog=${params.blog}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCategories(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getBlog = () => {
        fetch(`${paths.BLOG_TOPICS}${params.blog}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setBlog(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getCategories()
        getBlog()
    }, [])

    return (
        <Container>
            <img src={blog?.image_url} alt={blog?.title} />
            <Typography variant='h2'>{blog?.title}</Typography>
            {categories?.map((category) => (
                <CategoryTile key={category.id} title={category.title} cover={`https://wut-vtrips.herokuapp.com${category.cover_url}`} desc={category.description} link={`/${params.blog}/${category.id}`} />
            ))}
        </Container>
    );
}
export default Post