import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import paths from 'constants/api'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Post = () => {
    const [post, setPost] = useState()
    const params = useParams();

    const getPost = () => {
        fetch(`${paths.BLOG_POST}/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPost(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <Container>
            <img src={post?.cover} alt={post?.title} />

            <Typography variant='h2'>{post?.title}</Typography>

            <Typography variant='body1'>{post?.content}</Typography>


        </Container>
    );
}
export default Post