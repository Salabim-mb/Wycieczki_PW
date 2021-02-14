import React, {useContext, useEffect, useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {AlertContext} from "context/AlertContext";

const Alert = (props) => (
	<MuiAlert elevation={6} variant="filled" {...props} />
);

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		}
	}
}));

const AlertPopup = () => {
	const alertC = useContext(AlertContext);
	const classes = useStyles();
	const [open, setOpen] = useState(alertC.open);
	useEffect(() => {
		if (alertC.open) {
			setOpen(true);
		}
	}, [alertC.open]);

	const handleClose = (event, reason) => {
		if (reason !== 'clickaway') {
			setOpen(false);
			alertC.changeVisibility(false);
		}
	};

	return (
		open && (
			<div className={classes.root}>
				<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
					<Alert severity={alertC.severity} onClose={handleClose}>
						{alertC.message}
					</Alert>
				</Snackbar>
			</div>
		)
	)
};

export default AlertPopup;