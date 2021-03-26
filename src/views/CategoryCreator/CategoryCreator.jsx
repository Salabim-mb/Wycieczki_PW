import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import paths from 'constants/api'
// import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import { UploadButton, AlertInfo, Input } from 'components';
import { PhotoCamera } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { Alert } from '@material-ui/lab';
import CenteredContainer from 'components/CenteredContainer'
import CategoryTile from 'components/CategoryTile'
import { useQueryBlogs, useMutationCategory } from './CategoryCreator.hooks'
// import { sendCategory } from './CategoryCreator.api';

const StyledForm = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: ${({ theme }) => theme.margin.l};
    color: black;

    @media (min-width: 1024px){
        /* width: 50%; */
    }
`;

const CategoryCreator = () => {
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const { data, isError, isLoading, error } = useQueryBlogs()
    const mutation = useMutationCategory()
    // const history = useHistory()

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
            // sendCategory(formData)
            try {
                await mutation.mutateAsync(formData)
            } catch (err) {
                console.log(err)
            }
            // console.log(sendCategory(formData))

            // history.push("/cośtam")
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

    useEffect(() => {
        if (formik.values.cover_image !== '') {
            // ('xd')
            setCoverImageUrl(URL.createObjectURL(formik.values.cover_image))
            console.log(coverImageUrl)
        }


    }, [formik.values.cover_image])


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
                    multiline
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
                <Typography variant="p">Podgląd kafelka:</Typography>
                <CategoryTile title={formik.values.title} desc={formik.values.description} cover={coverImageUrl} />
            </StyledForm>

        </CenteredContainer>
    )
}

export default CategoryCreator