import Blog from 'views/Blog'


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
    },
    BLOG_ENTRY: {
        name: "Wpis",
        path: "/blog/:category/:id",
    },
}

export default [
    {
        path: pathList.BLOG.path,
        component: Blog
    }
]

