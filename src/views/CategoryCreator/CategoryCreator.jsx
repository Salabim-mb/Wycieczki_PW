import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import paths from 'constants/api';

const StyledForm = styled.form`
    display:flex;
    flex-direction: column;
    justify-content: center;
`;

const CategoryCreator = () => {
    const getBlogs = async () => {
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

    const { data, isError } = useQuery('blogs', getBlogs)

    const formik = useFormik({
        initialValues: {
            title: '',
            blog: 0,
            description: '',
            cover_image: '',
            header_image: ''
        },
        onSubmit: () => {
            const formData = new FormData();
            formData.append('cover_image', formik.values.cover_image);
            formData.append('header_image', formik.values.header_image);
            formData.append('title', formik.values.title);
            formData.append('blog', formik.values.blog);
            formData.append('description', formik.values.description);
            // formData.append('authorization', user.token);
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
        },
        validate: (values) => {
            const errors = {};

            if (!values.title) {
                errors.title = 'Required';
            } else if (values.title.length > 100) {
                errors.title = 'Too long';
            }
            if (!values.blog) {
                errors.blog = 'Required';
            }

            return errors;
        }
    });


    return (
        <Container>
            <h2>Dodaj kategorię</h2>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Input id="title" placeholder="Tytuł" type="text" value={formik.values.title} onChange={event => {
                    formik.setFieldValue('title', event.target.value);
                }} />
                {formik.touched.title && formik.errors.title && (<Alert severity="error">Nie może być puste i dłuższe niż 100 znaków</Alert>)}
                <Input id="description" placeholder="Opis" type="text" value={formik.values.description} onChange={event => {
                    formik.setFieldValue('description', event.target.value);
                }} />
                <Select
                    native
                    value={formik.values.blog}
                    onChange={event => { formik.setFieldValue('blog', event.target.value); }}
                >
                    <option value="" selected>-----------</option>
                    {isError ? <option value="">Nie udało się pobrać blogów</option> : data?.map((blog) => (
                        <option key={blog.id} value={blog.id}>{blog.title}</option>
                    ))}
                </Select>
                {formik.touched.blog && formik.errors.blog && (<Alert severity="error">Nie może być puste.</Alert>)}
                <Input id="cover_image"
                    name="cover_image"
                    type="file" onChange={event => {
                        formik.setFieldValue('cover_image', event.currentTarget.files[0]);
                    }} />

                <Input id="header_image"
                    name="header_image"
                    type="file" onChange={event => {
                        formik.setFieldValue('header_image', event.currentTarget.files[0]);
                    }} />
                <Button type="submit" onSubmit={formik.handleSubmit}>Zatwierdź</Button>
            </StyledForm>

        </Container>
    )
}

export default CategoryCreator