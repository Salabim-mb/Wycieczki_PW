// import React from 'react';
import { PostCreator } from 'views';
import BlogList from '../pages/BlogList';
import { paths } from './paths';

export default [
	{
		path: paths.POST_CREATOR.path,
		component: PostCreator,
	},
	{
		path: paths.DASHBOARD.path,
		component: BlogList,
		exact: true
	}
];
