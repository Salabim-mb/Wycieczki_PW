import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container';
import { useParams } from "react-router-dom";

import PostTile from 'components/PostTile'

import categoryTemp from 'assets/categoryTemp.jpeg'

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
    const [categories, setCategories] = useState([])
    const params = useParams();

    const reciveData = () => {
        console.log(params)
        fetch('https://example.com/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCategories(data)
                console.log(categories)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        reciveData()

    }, [])

    return (
        <StyledContainer>
            <Image imgSrc={categoryTemp} imgAlt="obrazek" />

            {dummyData.map((data) => (
                <PostTile cover={data.cover} title={data.title} desc={data.desc} link={data.link} />
            ))}

        </StyledContainer>
    );
}
export default Category