import React, { useEffect, useState } from 'react';
import paths from 'constants/api'
import Container from '@material-ui/core/Container';

import CategoryTile from 'components/CategoryTile'

const Post = () => {
    const [categories, setCategories] = useState()

    const getCategories = () => {
        fetch(`${paths.BLOG_TOPICS}`, {
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

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Container>
            {categories?.map((category) => (
                <CategoryTile title={category.title} cover={`https://wut-vtrips.herokuapp.com/${category.cover_url}`} desc={category.description} />
            ))}
        </Container>
    );
}
export default Post