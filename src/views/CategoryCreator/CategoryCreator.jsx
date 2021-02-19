import React from 'react'
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';


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
    )
}

export default CategoryCreator