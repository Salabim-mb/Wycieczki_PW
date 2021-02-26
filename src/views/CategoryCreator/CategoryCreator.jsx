import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { Alert } from '@material-ui/lab';
import paths from 'constants/api';
import CenteredContainer from 'components/CenteredContainer'

import { getBlogs } from './CategoryCreator.api'

const StyledForm = styled.form`
    display:flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: ${({ theme }) => theme.margin.l};

    @media (min-width: 1024px){
        width: 50%;
    }
`;

const CategoryCreator = () => {
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
                errors.title = 'Pole wymagane';
            } else if (values.title.length > 100) {
                errors.title = 'Za długie';
            }
            if (!values.blog) {
                errors.blog = 'Pole wymagane';
            }

            return errors;
        }
    });


    return (
        <CenteredContainer>
            <h2>Dodaj kategorię</h2>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Input id="title" placeholder="Tytuł" type="text" value={formik.values.title} onChange={formik.handleChange} />
                {formik.touched.title && formik.errors.title && (<Alert severity="error">Nie może być puste i dłuższe niż 100 znaków</Alert>)}
                <Input id="description" placeholder="Opis" type="text" value={formik.values.description} onChange={formik.handleChange} />
                <Select
                    id="blog"
                    native
                    value={formik.values.blog}
                    onChange={formik.handleChange}
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

        </CenteredContainer>
    )
}

export default CategoryCreator