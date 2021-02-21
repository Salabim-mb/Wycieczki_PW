import Post from 'views/Post'

export const pathList = {
    DASHBOARD: {
        name: "Strona główna",
        path: "/",
    },
    BLOG_CATEGORIES: {
        name: "Kategorie",
        path: "/blog/:category",
        redirect: (newCategory) => `/blog/${newCategory}`,
    },
    BLOG_ENTRY: {
        name: "Wpis",
        path: "/blog/:category/:entry_id",
    },
}

export default [
    {
        path: pathList.BLOG_ENTRY.path,
        component: Post
    }
]