import React from 'react';
import { Button, FormGroup, TextField, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const HeaderInput = ({ handleChangeFile, header, handleChangeLink, error }) => {
	const FILE_LABEL = '';
	return (
		<FormGroup my={2}>
			<Button variant="contained" component="label" color="default" startIcon={<PhotoCamera />}>
				Prześlij nagłówek
				<input
					id="headerFile"
					name="headerFile"
					type="file"
					accept="image/*"
					hidden
					onChange={handleChangeFile}
				/>
			</Button>
			<Typography my={2}>lub</Typography>
			<TextField
				fullWidth
				id="headerLink"
				name="headerLink"
				label="Link do filmu yt"
				variant="outlined"
				value={typeof header === 'string' ? header : FILE_LABEL}
				inputProps={{ minLength: 1, maxLength: 120 }}
				onChange={handleChangeLink}
			/>
			{error && <Alert severity="error">{error}</Alert>}
		</FormGroup>
	);
};

export default HeaderInput;
