import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Category = () => (
    <Card >
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                Word of the Day
        </Typography>
            <Typography variant="h5" component="h2">
                xdd
            </Typography>
            <Typography color="textSecondary">
                adjective
        </Typography>
            <Typography variant="body2" component="p">
                well meaning and kindly.
                </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card>
);

export default Category