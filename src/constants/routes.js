import BlogEntry from 'pages/BlogEntry/BlogEntry';
import { PostCreator } from 'views';
import paths from './paths';

export default [
	{
		path: paths.POST_CREATOR.path,
		component: PostCreator,
	},
	{
		path: paths.BLOG_ENTRY.path,
		component: BlogEntry,
		exact: true
	}
];
