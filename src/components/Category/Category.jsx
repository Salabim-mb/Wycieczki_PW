import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container';
import { useParams } from "react-router-dom";

import PostTile from 'components/PostTile'

import paths from 'constants/api'

import Image from './components/Image'

import logo from '../../logo.svg'


const dummyData = [
    {
        title: 'XDD',
        cover: logo,
        desc: "dsflkjlkafsdjlsadfkjasdlkjafdsl;kjasdlkfjasdlkjfasldjfalskdjfalds;kjfadslkfjasldkjadslkjfadslkfjasdlkjadslkfjsadl;jadsflkjfasdjkfasld",
        link: '/blog/liceum/1'
    },
    {
        title: 'XDD',
        cover: logo,
        desc: "dsflkjlkafsdjlsadfkjasdlkjafdsl;kjasdlkfjasdlkjfasldjfalskdjfalds;kjfadslkfjasldkjadslkjfadslkfjasdlkjadslkfjsadl;jadsflkjfasdjkfasld",
        link: '/blog/liceum/1'
    },
    {
        title: 'XDD',
        cover: logo,
        desc: "dsflkjlkafsdjlsadfkjasdlkjafdsl;kjasdlkfjasdlkjfasldjfalskdjfalds;kjfadslkfjasldkjadslkjfadslkfjasdlkjadslkfjsadl;jadsflkjfasdjkfasld",
        link: '/blog/liceum/1'
    },
]

const StyledContainer = styled(Container)`
    margin:0;
    padding: 0!important;
`;

const Category = () => {
    const [category, setCategory] = useState([])
    const [posts, setPosts] = useState([])
    const params = useParams();

    const recivePosts = () => {
        console.log(params)
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
                console.log(posts)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const reciveCategory = () => {
        console.log(params)
        fetch(`${paths.BLOG_TOPIC}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCategory(data)
                console.log(category)
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

            {dummyData.map((data) => (
                <PostTile cover={data.cover} title={data.title} desc={data.desc} link={`/liceum/${params.category}/${data.id}`} />
            ))}

        </StyledContainer>
    );
}
export default Category