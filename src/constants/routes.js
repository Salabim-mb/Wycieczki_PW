import Category from 'components/Category'

export const path_list = {
    DASHBOARD: {
        name: "Strona główna",
        path: "/",
    },
    BLOG_CATEGORIES: {
        name: "Kategorie",
        path: "/blog/:category",
    },
    BLOG_ENTRY: {
        name: "Wpis",
        path: "/blog/:category/:entry_id",
        redirect: (category, entry_id) => `/blog/${category}/${entry_id}`,
    },
}

export default [
    {
        path: path_list.BLOG_CATEGORIES.path,
        component: Category
    }
]