import React from 'react';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import logo from '../../logo.svg'

const StyledCardMedia = styled(CardMedia)`
    height: 200px;


    @media (min-width:768px){
        width:30%;
        height: auto;
    }
`;

const StyledDiv = styled.div`
    @media (min-width:768px){
    display:flex;
    flex-direction:row;
    }
`;

const StyledCardContent = styled(CardContent)`
@media (min-width:768px){
        width:100%;
    }
`;

const CategoryTile = () => (
    <Card >
        <StyledDiv>
            <StyledCardMedia
                image={logo}
                title="Contemplative Reptile"
            />
            <CardActionArea>

                <StyledCardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </StyledCardContent>
            </CardActionArea>
        </StyledDiv>
        <CardActions>
            <Button size="small" color="primary">
                Share
        </Button>
            <Button size="small" color="primary">
                Learn More
        </Button>
        </CardActions>
    </Card>
);

export default CategoryTile