import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

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

const PostTile = ({ cover, title, desc, link }) => (
    <Card >
        <StyledDiv>
            <StyledCardMedia
                image={cover}
                title={title}
            />
            <CardActionArea component={Link} to={link}>

                <StyledCardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography noWrap variant="body2" color="textSecondary" component="p">
                        {desc}
                    </Typography>
                </StyledCardContent>
            </CardActionArea>
        </StyledDiv>
        <CardActions>
            <Button component={Link} to={link} size="small" color="primary">Czytaj dalej</Button>
        </CardActions>
    </Card>
);

PostTile.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
}

PostTile.defaultProps = {
    title: 'Tytuł',
    desc: "Tu powinien być opis",
    link: '',
    cover: '',
}

export default PostTile