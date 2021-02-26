import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import toBase64 from 'utils/fileToBase64';
import {paths} from 'constants/paths';
import api from 'constants/api';
import {Redirect} from "react-router-dom";
import { AlertContext } from 'context/AlertContext';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
	formInput: {
		margin: theme.spacing(2, 0)
	},
	dialogContent: {
		alignContent: "center"
	}
}));

const addBlogTile = async (token, data) => {
	const url = api.BLOG;
	const res = await fetch(url, {
		headers: {
			"Content-Type": "multipart/form-data"
		},
		method: "POST",
		body: (() => {
			const fd = new FormData();
			Object.keys(data).forEach((item) => {
				fd.append(item, data[item])
			});
			return fd;
		})()
	});

	if (res.status === 201) {
		const parsedRes = await res.json();
		return parsedRes;
	}
	throw new Error(await res.json());
}

const NewBlogModal = ({open, setOpen}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [title, setTitle] = useState("");
	const [photo, setPhoto] = useState(null);
	const [showTitle, setShowTitle] = useState(false);
	const [redirect, setRedirect] = useState({
		action: false,
		destination: null
	});
	const alertC = useContext(AlertContext);
	let tilePhoto = React.createRef();

	const classes = useStyles();

	const handleAddPhoto = async () => {
		const file = tilePhoto.current.files[0];
		const currentPhoto = {
			img: file,
			imgb64: await toBase64(file) || null,
			title: file?.name
		};
		setPhoto(currentPhoto);
		tilePhoto = React.createRef();
	};

	const handleClose = () => {
		setTitle("");
		setPhoto(null);
		setShowTitle(false);
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.reportValidity() === false) {
			if (photo === null || photo?.img === undefined) {
				alertC.showAlert("Brak zdjęcia!");
			}
			event.stopPropagation();
		} else {
			try {
				const {id} = await addBlogTile(null, {
					image: photo.img,
					title,
					show_title: showTitle
				});
				setRedirect({
					action: true,
					destination: id,
				});
				handleClose();
			} catch(ex) {
				alertC.showAlert(ex.message);
			}
		}

	};

	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				maxWidth="lg"
				open={open}
				onClose={handleClose}
				scroll="paper"
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">Dodaj nowy blog</DialogTitle>
				<form onSubmit={handleSubmit} noValidate>
					<DialogContent className={classes.dialogContent}>
						<TextField
							id="outlined-basic"
							label="Tytuł bloga"
							required
							name="title"
							variant="outlined"
							fullWidth
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className={classes.formInput}
						/>
						<input
							ref={(ref) => tilePhoto.current = ref}
							accept="image/*"
							className={classes.input}
							id="icon-button-file"
							required
							name="photo"
							type="file"
							onChange={handleAddPhoto}
						/>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="icon-button-file">
							<Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
								Dodaj zdjęcie kafelka
							</Button>
						</label>
						<TextField
							disabled
							variant="outlined"
							name="photo.title"
							value={photo?.title}
							placeholder="Wybierz plik przyciskiem powyżej."
							className={classes.formInput}
							fullWidth
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={showTitle}
									onChange={(e) => setShowTitle(e.target.checked)}
									name="showTitle"
									color="primary"
								/>
							}
							label="Tytuł widoczny na kafelku"
						/>
					</DialogContent>
					<DialogActions>
						<Button type="submit" variant="contained" color="primary" autoFocus>
							Zatwierdź
						</Button>
						<Button autoFocus onClick={handleClose} color="primary">
							Anuluj
						</Button>
					</DialogActions>
				</form>
			</Dialog>
			{redirect?.action && <Redirect to={paths.BLOG_CATEGORIES.redirect(redirect?.destination)} />}
		</>
	);
}

NewBlogModal.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired
}

export default NewBlogModal;