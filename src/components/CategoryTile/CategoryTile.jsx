import React from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const CategoryTile = ({ title, desc, cover, link }) => (
    <Card >
        <CardActionArea component={Link} to={link}>
            <CardMedia
                image={cover}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {desc}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button component={Link} to={link} size="small" color="primary">
                Learn More
        </Button>
        </CardActions>
    </Card>
);

export default CategoryTile