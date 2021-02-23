import React from 'react';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import paths from 'constants/api'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import CategoryTile from 'components/CategoryTile'

const Post = () => {
    // const [categories, setCategories] = useState()
    // const [blog, setBlog] = useState()
    const params = useParams()

    const getCategories = async () => {
        const url = `${paths.BLOG_TOPICS}?blog=${params.blog}`;

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, { headers, method: 'GET' });

        if (response.status !== 200) {
            throw new Error('błąd');
        }

        return response.json();
    };

    const getBlog = async () => {
        const url = `${paths.BLOG}${params.blog}/`;

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, { headers, method: 'GET' });

        if (response.status !== 200) {
            throw new Error('błąd');
        }

        return response.json();
    };


    const categories = useQuery('categories', getCategories)
    const blog = useQuery('blog', getBlog)

    return (
        <Container>
            {blog.isError ? <div>Nie można wczytać blogów</div> : <>
                <img src={blog?.data?.image_url} alt={blog?.data?.title} />
                <Typography variant='h2'>{blog?.data?.title}</Typography>
            </>}
            {categories.isError ? <div>Nie można załadować kategorii</div> : categories.data?.map((category) => (
                <CategoryTile key={category.id} title={category.title} cover={`https://wut-vtrips.herokuapp.com${category.cover_url}`} desc={category.description} link={`/${params.blog}/${category.id}`} />
            ))}
        </Container>
    );
}
export default Post