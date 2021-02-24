import CategoryCreator from 'views/CategoryCreator/CategoryCreator';

export const pathList = {
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
        redirect: (category, entryId) => `/blog/${category}/${entryId}`,
    },
    CREATOR_CATEGORY: {
        name: "Krator kategorii",
        path: "/blog/category-creator",
    }
}

export default [
    {
        path: pathList.CREATOR_CATEGORY.path,
        component: CategoryCreator
    }
]
