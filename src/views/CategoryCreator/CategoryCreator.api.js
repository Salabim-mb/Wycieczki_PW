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

// export const sendCategory = async (formData) => {
//     const url = `${paths.BLOG_TOPIC}`;

//     const headers = {
//         'Content-Type': 'multipart/form-data',
//     };

//     const response = await fetch(url, { headers, method: 'POST', body: formData });

//     console.log(response)

//     if (response.status !== 200) {
//         throw new Error('błąd');
//     }

//     return response.json();
// }

export const sendCategory = (formData) => {
    fetch(`${paths.BLOG_TOPIC}`, {
        method: 'POST',

        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(data => data)
        .catch(err => err.message)
}