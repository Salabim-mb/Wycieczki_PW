export const paths = {
	DASHBOARD: {
		name: "Strona główna",
		path: "/",
	},
	BLOG: {
		name: 'Blog',
		path: '/:blog',
	},
	BLOG_CATEGORIES: {
		name: "Kategorie",
		path: "/blog/:category",
		redirect: (newCategory) => `/blog/${newCategory}`,
	},
	BLOG_ENTRY: {
		name: "Wpis",
		path: "/blog/:category/:entry_id",
		redirect: (category, entryId) => `/blog/${category}/${entryId}`,
	},
	POST_CREATOR: {
		name: 'Kreator wpisów',
		path: '/blog/post-creator/:id?',
		redirect: (entryId) => `/blog/post-creator/${entryId}`
	},
	CREATOR_CATEGORY: {
		name: "Krator kategorii",
		path: "/blog/category-creator/:id?",
		redirect: (categoryId) => `/blog/category-creator/${categoryId}`
	}
}