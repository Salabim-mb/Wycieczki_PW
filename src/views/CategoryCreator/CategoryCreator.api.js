import paths from 'constants/api';
// import { errorMessage } from 'constants/errorHandler';


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


export const getCategory = async (id) => {
    if (!id) return null

    const url = `${paths.BLOG_TOPIC}${id}`;

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

export const sendCategory = (formData, id) => {
    let methodType = 'POST'
    let url = `${paths.BLOG_TOPIC}`

    if (id) {
        methodType = 'PATCH'
        url = `${paths.BLOG_TOPIC}${id}/`
    }

    return fetch(url, {
        method: methodType,

        body: formData,
    })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                console.log("taki zeby byl")

                return response.json();
            }
            // throw new Error(errorMessage(response));
            throw new Error("Wystąpił błąd");


        })
        // .then(res => console.log(res))
        .catch(err => { throw new Error(err.message) })
}