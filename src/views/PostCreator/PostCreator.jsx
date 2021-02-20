import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AlertInfo } from 'components';
import { Container, Card, CardHeader, CardContent } from '@material-ui/core';
import { getPost } from './PostCreator.api';
import { PostForm } from './components';

const PostCreator = () => {
	const { id } = useParams();

	const { isLoading, isError, error, data } = useQuery('post', () => getPost('', id));

	return (
		<Container>
			<Card>
				<CardHeader title="Stwórz wpis" />
				<CardContent>
					<PostForm post={data} />
					<AlertInfo isLoading={isLoading} isError={isError}>
						{error?.message}
					</AlertInfo>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PostCreator;
