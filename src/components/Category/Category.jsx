import React, { useState } from 'react';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";

import categoryTemp from 'assets/categoryTemp.jpeg'

import Image from './components/Image'


const dummyData = [
    {
        title: 'XDD',
        date: '21.21.2002'
    },
    {
        title: 'XDD',
        date: '21.21.2002'
    },
    {
        title: 'XDD',
        date: '21.21.2002'
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

    return (
        <StyledContainer>
            <Image imgSrc={categoryTemp} imgAlt="obrazek" />

            {dummyData.map((data) => (
                <Card >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {data.date}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {data.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={reciveData}>Learn More</Button>
                    </CardActions>
                </Card>
            ))}

        </StyledContainer>
    );
}
export default Category