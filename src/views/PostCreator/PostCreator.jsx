import React from 'react';
import { useQuery } from 'react-query';
import { AlertInfo } from 'components';
import { Container, Card, CardHeader, CardContent } from '@material-ui/core';
import { getPost } from './PostCreator.api';
import { PostForm } from './components';

const PostCreator = () => {
	const { status, isLoading, isError, error, data } = useQuery('post', getPost);

	return (
		<Container>
			<Card>
				<CardHeader title="Stwórz wpis" />
				<CardContent>
					<PostForm post={data} />{' '}
					<AlertInfo isLoading={isLoading} isError={isError}>
						{error?.message}
					</AlertInfo>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PostCreator;
