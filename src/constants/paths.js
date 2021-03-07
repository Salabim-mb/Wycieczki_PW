const paths = {
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
	}
}

export default paths;