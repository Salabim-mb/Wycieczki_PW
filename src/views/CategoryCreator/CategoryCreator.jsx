import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
// import { useQuery } from 'react-query';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import paths from 'constants/api';

const StyledForm = styled.form`
    display:flex;
    flex-direction: column;
    justify-content: center;
`;

const CategoryCreator = () => {
    // const { isLoading, isError, error, data } = useQuery('title', formik.onSubmit);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            cover: ''
        },
        onSubmit: (token = '') => {
            // console.log(isLoading, isError, error, data)
            fetch(`${paths.BLOG_TOPIC}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: formik.values,
            })
                .then(response => response.json())
                .then(resp => {
                    console.log('Success:', resp);
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        },
    });

    return (
        <Container>
            <h2>Dodaj kategorię</h2>
            <StyledForm onSubmit={formik.handleSubmit}>
                <TextField id="title" label="Tytuł" type="text" value={formik.values.title} onChange={event => {
                    formik.setFieldValue('title', event.target.value);
                }} />
                <TextField id="description" label="Opis" type="text" value={formik.values.description} onChange={event => {
                    formik.setFieldValue('description', event.target.value);
                }} />
                <Input id="cover"
                    name="cover"
                    type="file" onChange={event => {
                        formik.setFieldValue('cover', event.currentTarget.files[0]);
                    }} />
                <Button type="submit" onSubmit={formik.handleSubmit}>Zatwierdź</Button>
            </StyledForm>
            {/* <div>{isLoading} {isError} {error}</div> */}

        </Container>
    )
}

export default CategoryCreator