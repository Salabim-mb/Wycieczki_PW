import Blog from 'views/Blog'
import { PostCreator } from 'views';

export const pathList = {
	DASHBOARD: {
		name: 'Strona główna',
		path: '/',
	},
	BLOG: {
		name: "Blog",
		path: "/:blog",
	},
	BLOG_CATEGORIES: {
		name: 'Kategorie',
		path: '/blog/:category',
	},
	BLOG_ENTRY: {
		name: 'Wpis',
		path: '/blog/:category/:entry_id',
		redirect: (category, entryId) => `/blog/${category}/${entryId}`,
	},
	POST_CREATOR: {
		name: 'Kreator wpisów',
		path: '/blog/post-creator/:id?',
	},
};

export default [
	{
		path: pathList.POST_CREATOR.path,
		component: PostCreator,
	},
	{
		path: pathList.BLOG.path,
		component: Blog,
		exact: true
	}
];
