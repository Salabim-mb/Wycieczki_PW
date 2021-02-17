import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { AlertContext } from 'context/AlertContext';
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		}
	}
}));

const Alert = (props) => (
	<MuiAlert elevation={6} variant="filled" {...props} />
);

const AlertPopup = () => {
	const alertC = useContext(AlertContext);
	const [snackPack, setSnackPack] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState(undefined);

	useEffect(() => {
		if (alertC.open) {
			setOpen(false)
			setSnackPack((prev) => [...prev, {
				message: alertC?.message,
				key: new Date().getTime(),
				severity: alertC.severity
			}]);
			setOpen(true);
		}
	}, [alertC.open, alertC.message])

	useEffect(() => {
		if (snackPack.length && !messageInfo) {
			setMessageInfo({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			setOpen(false);
		}
	}, [snackPack, messageInfo, open]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		alertC.changeVisibility(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	const classes = useStyles();
	return (
		<>
			<div key={messageInfo?.message} className={classes.root}>
				<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} onExited={handleExited}>
					<Alert severity="error" onClose={handleClose}>
						{messageInfo?.message}
					</Alert>
				</Snackbar>
			</div>
		</>
	);
}

export default AlertPopup;