import Category from 'views/Category'

export const pathList = {
    DASHBOARD: {
        name: "Strona główna",
        path: "/",
    },
    BLOG_CATEGORIES: {
        name: "Kategorie",
        path: "/:blog/:category",
    },
    BLOG_ENTRY: {
        name: "Wpis",
        path: "/:blog/:category/:entry_id",
        redirect: (category, entryId) => `/blog/${category}/${entryId}`,
    },
}

export default [
    {
        path: pathList.BLOG_CATEGORIES.path,
        component: Category
    }
]