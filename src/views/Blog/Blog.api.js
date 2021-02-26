import paths from 'constants/api'

export const getCategories = async (params) => {
    const url = `${paths.BLOG_TOPICS}?blog=${params.blog}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers, method: 'GET' });

    if (response.status !== 200) {
        throw new Error('błąd');
    }

    return response.json();
};

export const getBlog = async (params) => {
    const url = `${paths.BLOG}${params.blog}/`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers, method: 'GET' });

    if (response.status !== 200) {
        throw new Error('błąd');
    }

    return response.json();
};