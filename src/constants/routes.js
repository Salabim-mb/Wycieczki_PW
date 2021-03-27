import CategoryCreator from 'views/CategoryCreator/CategoryCreator';
import { PostCreator } from 'views';
import Blog from 'views/Blog'

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
	CREATOR_CATEGORY: {
		name: "Krator kategorii",
		path: "/blog/category-creator/:id?",
	}
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
	},
	{
		path: pathList.CREATOR_CATEGORY.path,
		component: CategoryCreator
	}
];
