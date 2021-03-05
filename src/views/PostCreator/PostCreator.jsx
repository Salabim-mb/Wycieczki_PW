import React from 'react';
import { useParams } from 'react-router-dom';
import { AlertInfo } from 'components';
import { Container, Card, CardHeader, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import { PostForm } from './components';
import { usePostQuery } from './PostCreator.hooks';

const StyledH1 = styled.h1`
	margin: 0;
	font-size: 2rem;
`;

const PostCreator = () => {
	const { id } = useParams();

	const { isLoading, isError, error, data } = usePostQuery(id);

	return (
		<Container>
			<Card>
				<CardHeader title={<StyledH1>Stwórz wpis</StyledH1>} />
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
