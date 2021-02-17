import React, {useState} from 'react';
import alertStyle from 'constants/alertOptions';

export const AlertContext = React.createContext({
	open: false,
	message: "",
	showAlert: () => {}
});

export const AlertProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState(alertStyle.ERROR);

	const data = {
		open,
		message,
		severity,
		changeVisibility: (newOpen) => setOpen(newOpen),
		changeMessage: (newMessage, newSeverity=alertStyle.ERROR) => {
			setOpen(true);
			setMessage(newMessage);
			setSeverity(newSeverity);
		},
		showAlert: (newMessage, newSeverity) => {
			data.changeMessage(newMessage, newSeverity);
			data.changeVisibility(true);
		},
	};

	return <AlertContext.Provider value={data} {...props} />
};