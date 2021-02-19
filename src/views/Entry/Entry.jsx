import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

const Entry = ({ title, image, content }) => {
    const [postData, setPostData] = useState([])
    const { category, id } = useParams()
    const getData = () => {
        fetch('https://example.com/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPostData(data)
                console.log(postData)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getData()
        console.log(category, id)
    }, [])

    return (
        <Container>
            {/* img zostanie podmienione na komponent z brancha categoryComponent to póki nie jest zaakceptowany to zostnaie takie prowizoryczne */}
            <img src={image} alt={title} />
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="p">
                {content}
            </Typography>
        </Container>
    )
}

export default Entry