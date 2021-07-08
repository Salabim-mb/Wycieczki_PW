export const paths = {
	DASHBOARD: {
		name: "Strona główna",
		path: "/",
	},
	BLOG_CATEGORIES: {
		name: "Kategorie",
		path: "/blog/:category",
		redirect: (category) => `/blog/${category}`
	},
	BLOG_ENTRY: {
		name: "Wpis",
		path: "/blog/:category/:entryId",
		redirect: (category, entryId) => `/blog/${category}/${entryId}`,
	},
	ERROR: {
		name: "Strona 404",
		path: "/error"
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
