import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import paths from 'constants/api';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import CategoryTile from 'components/CategoryTile';

const getCategories = async id => {
	const url = `${paths.BLOG_TOPICS}?blog=${id}`;

	const headers = {
		'Content-Type': 'application/json',
	};

	const response = await fetch(url, { headers, method: 'GET' });

	if (response.status !== 200) {
		throw new Error('błąd');
	}

	return response.json();
};

const getBlog = async id => {
	const url = `${paths.BLOG}${id}/`;

	const headers = {
		'Content-Type': 'application/json',
	};

	const response = await fetch(url, { headers, method: 'GET' });

	console.log(response);

	if (response.status !== 200) {
		throw new Error('błąd');
	}

	return response.json();
};

const Post = () => {
	// const [categories, setCategories] = useState()
	// const [blog, setBlog] = useState()
	const params = useParams();

	const categories = useQuery(['categories', params.blog], () => getCategories(params.blog));
	const blog = useQuery(['blog', params.blog], () => getBlog(params.blog));

	return (
		<Container>
			{blog.isError ? (
				<div>Nie można wczytać blogów</div>
			) : (
				<>
					<img src={blog?.data?.image_url} alt={blog?.data?.title} />
					<Typography variant="h2">{blog?.data?.title}</Typography>
				</>
			)}
			{categories.isError ? (
				<div>Nie można załadować kategorii</div>
			) : (
				categories.data?.map(category => (
					<CategoryTile
						key={category.id}
						title={category.title}
						cover={`https://wut-vtrips.herokuapp.com${category.cover_url}`}
						desc={category.description}
						link={`/${params.blog}/${category.id}`}
					/>
				))
			)}
		</Container>
	);
};
export default Post;
