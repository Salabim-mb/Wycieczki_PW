import paths from 'constants/api'


export const getPosts = async (params) => {
    const url = `${paths.BLOG_POSTS}?topic=${params.category}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers, method: 'GET' });

    if (response.status !== 200) {
        throw new Error('błąd');
    }

    return response.json();
};

export const getCategory = async (params) => {
    const url = `${paths.BLOG_TOPIC}${params.category}/`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers, method: 'GET' });

    if (response.status !== 200) {
        throw new Error('błąd');
    }

    return response.json();
};