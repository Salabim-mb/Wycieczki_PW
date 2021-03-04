import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { UploadButton, AlertInfo, Input } from 'components';
import { PhotoCamera } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { Alert } from '@material-ui/lab';
import CenteredContainer from 'components/CenteredContainer'
import { useQueryBlogs } from './CategoryCreator.hooks'
import { sendCategory } from './CategoryCreator.api'

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
    const { data, isError, isLoading, error } = useQueryBlogs()
    // const mutation = useMutationCategory()


    const formik = useFormik({
        initialValues: {
            title: '',
            blog: 0,
            description: '',
            cover_image: '',
            header_image: ''
        },
        onSubmit: async () => {
            const formData = new FormData();
            formData.append('cover_image', formik.values.cover_image);
            formData.append('header_image', formik.values.header_image);
            formData.append('title', formik.values.title);
            formData.append('blog', formik.values.blog);
            formData.append('description', formik.values.description);
            // formData.append('authorization', user.token);
            sendCategory(formData)
            // try {
            //     const todo = await mutation.mutateAsync(formData)
            //     console.log(todo)
            // } catch (err) {
            //     console.error(err)
            // } finally {
            //     console.log('done')
            // }
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
                <Input
                    fullWidth
                    id="title"
                    name="title"
                    label="Tytuł"
                    variant="outlined"
                    value={formik.values.title}
                    inputProps={{ minLength: 1, maxLength: 100, 'data-testid': 'test-id' }}
                    handleChange={formik.handleChange}
                />
                {formik.touched.title && formik.errors.title && (<Alert severity="error">Nie może być puste i dłuższe niż 100 znaków</Alert>)}
                <Input
                    fullWidth
                    id="description"
                    name="description"
                    label="Opis"
                    variant="outlined"
                    value={formik.values.description}
                    handleChange={formik.handleChange}
                />
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
                <AlertInfo isLoading={isLoading} isError={isError}>
                    {error?.message}
                </AlertInfo>

                {formik.touched.blog && formik.errors.blog && (<Alert severity="error">Nie może być puste.</Alert>)}

                <UploadButton
                    header="Prześlij cover"
                    accept="image/*"
                    icon={<PhotoCamera />}
                    id="cover_image"
                    name="cover_image"
                    handleChange={event => {
                        formik.setFieldValue('cover_image', event.currentTarget.files[0]);
                    }}
                    error={formik.touched.cover && formik.errors.cover ? formik.errors.cover : ''}
                />
                {/* <Input id="cover_image"
                    name="cover_image"
                    type="file" onChange={event => {
                        formik.setFieldValue('cover_image', event.currentTarget.files[0]);
                    }} /> */}

                <UploadButton
                    header="Prześlij cover"
                    accept="image/*"
                    icon={<PhotoCamera />}
                    id="header_image"
                    name="header_image"
                    handleChange={event => {
                        formik.setFieldValue('header_image', event.currentTarget.files[0]);
                    }}
                    error={formik.touched.cover && formik.errors.cover ? formik.errors.cover : ''}
                />

                {/* <Input id="header_image"
                    name="header_image"
                    type="file" onChange={event => {
                        formik.setFieldValue('header_image', event.currentTarget.files[0]);
                    }} /> */}
                <Button type="submit" onSubmit={formik.handleSubmit}>Zatwierdź</Button>
            </StyledForm>

        </CenteredContainer>
    )
}

export default CategoryCreator