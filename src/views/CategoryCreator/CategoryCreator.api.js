import paths from 'constants/api';

export const getBlogs = async () => {
    const url = `${paths.BLOGS}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers, method: 'GET' });

    if (response.status !== 200) {
        throw new Error('błąd');
    }

    return response.json();
}

export const sendCategory = (formData) => {
    fetch(`${paths.BLOG_TOPIC}`, {
        method: 'POST',

        body: formData,
    })
        .then(response => response.json())
        .then(resp => {
            console.log('Success:', resp);
        })
        .catch((err) => {
            console.error('Error:', err);
        });
}