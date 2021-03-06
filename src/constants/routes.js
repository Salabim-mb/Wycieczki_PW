// import React from 'react';
import { PostCreator, Blog, Category, BlogList, CategoryCreator } from 'views';
import { paths } from './paths';
import BlogEntry from '../pages/BlogEntry/BlogEntry';

export default [
	{
		path: paths.POST_CREATOR.path,
		component: PostCreator,
	},
	{
		component: Category,
		path: paths.BLOG_CATEGORIES.path,
		exact: true,
	},
	{
		path: paths.BLOG.path,
		component: Blog,
		exact: true
	},
	{
		path: paths.DASHBOARD.path,
		component: BlogList,
		exact: true
	},
	{
		path: paths.CREATOR_CATEGORY.path,
		component: CategoryCreator
	},
	{
		path: paths.BLOG_ENTRY.path,
		component: BlogEntry,
		exact: true
	}
];
