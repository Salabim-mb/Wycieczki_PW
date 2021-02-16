import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";


import Image from './components/Image'

import logo from '../../logo.svg'

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

const Category = () => {
    const { id } = useParams();

    const reciveData = () => {
        console.log(id)
    }

    return (
        <Container>
            <Image imgSrc={logo} imgAlt="obrazek" />
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

        </Container>
    );
}
export default Category