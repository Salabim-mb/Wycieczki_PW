import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import PostTile from 'components/PostTile'
import paths from 'constants/api'
import Image from './components/Image'
import StyledContainer from './Category.css'

const Category = () => {
    const [category, setCategory] = useState([])
    const [posts, setPosts] = useState([])
    const params = useParams();
    const location = useLocation()

    const recivePosts = () => {
        fetch(`${paths.BLOG_POSTS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPosts(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const reciveCategory = () => {
        console.log(params)
        // to z tym location to średnie rozwiązanie (poprawić)
        fetch(`${paths.BLOG_TOPIC}/${location.categoryProps.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCategory(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        reciveCategory()
        recivePosts()
    }, [])

    return (
        <StyledContainer>
            <Image imgSrc={category.cover} imgAlt={category.title} />
        dfaskl;fadsjkasdflaskdfjadsfljadsf;j
            {posts?.map((data) => (
                <PostTile key={data.id} id={data.id} cover={data.cover} title={data.title} desc={data.summary} link={`/${params.category}/${data.id}`} />
            ))}
        </StyledContainer>
    );
}
export default Category