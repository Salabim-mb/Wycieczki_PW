import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PostTile from 'components/PostTile';
import api from 'constants/api';
import Typography from '@material-ui/core/Typography';
import { AlertInfo } from 'components';
import Image from './components/Image';
import { StyledContainer, StyledPostDisplay } from './Category.css';
import { useQueryCategory, useQueryPosts } from './Category.hooks';
import { paths } from '../../constants/paths';

const Category = () => {
	const params = useParams();

	const category = useQueryCategory(params);
	const posts = useQueryPosts(params);

	return (
		<StyledContainer>
			<AlertInfo isLoading={category.isLoading} isError={category.isError}>
				{category.error?.message}
			</AlertInfo>

			{category.isError ? (
				<Redirect to="/error" />
			) : (
				<>
					{category?.data?.header_url ? (
						<Image
							imgSrc={`${api.PLAIN}${category?.data?.header_url}`}
							imgAlt={category?.data?.title}
						/>
					) : null}
					<Typography variant="h3">{category?.data?.title}</Typography>
				</>
			)}

			<StyledPostDisplay>
				<AlertInfo isLoading={posts.isLoading} isError={posts.isError}>
					{posts.error?.message}
				</AlertInfo>

				{posts.isError ? (
					<div> Nie udało się pobrać postu </div>
				) : (
					posts?.data?.results?.map(data => (
						<PostTile
							key={data.reservation}
							id={data.reservation}
							cover={data.cover}
							title={data.title}
							summary={data.summary}
							link={paths.BLOG_ENTRY.redirect(params.category, data.reservation)}
						/>
					))
				)}
			</StyledPostDisplay>
		</StyledContainer>
	);
};
export default Category;
