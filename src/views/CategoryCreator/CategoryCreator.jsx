import React from 'react'
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';


const CategoryCreator = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            cover: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <Container>
            <h2>Dodaj kategorię</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField id="title" label="Tytuł" type="text" value={formik.values.title} onChange={event => {
                    formik.setFieldValue('title', event.target.value);
                }} />
                <Input id="cover"
                    name="cover"
                    type="file" onChange={event => {
                        formik.setFieldValue('cover', event.currentTarget.files[0]);
                    }} />
            </form>
        </Container>
    )
}

export default CategoryCreator