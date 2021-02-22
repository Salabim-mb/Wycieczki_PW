import Post from 'views/Post'

export const pathList = {
    DASHBOARD: {
        name: "Strona główna",
        path: "/",
    },
    BLOG: {
        name: "Wpis",
        path: "/:blog",
    },
    BLOG_CATEGORIES: {
        name: "Kategorie",
        path: "/blog/:category",
        redirect: (newCategory) => `/blog/${newCategory}`,
    },
    BLOG_ENTRY: {
        name: "Wpis",
        path: "/blog/:category/:id",
    },
}

export default [
    {
        path: pathList.BLOG.path,
        component: Post
    }
]