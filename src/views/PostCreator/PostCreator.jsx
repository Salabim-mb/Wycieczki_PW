import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertInfo } from 'components';
import { Container, Card, CardHeader, CardContent } from '@material-ui/core';

import { PostForm } from './components';
import { usePostQuery } from './PostCreator.hooks';

const PostCreator = () => {
	const { id } = useParams();

	const { isLoading, isError, error, data } = usePostQuery(id);

	return (
		<Container>
			<Card>
				<CardHeader title="Stwórz wpis" />
				<CardContent>
					<PostForm post={data && Object.keys(data).length === 0 ? null : data} id={id} />
					<AlertInfo isLoading={isLoading} isError={isError}>
						{error?.message}
					</AlertInfo>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PostCreator;
