import React, { useContext } from 'react';
import { AlertContext } from 'context/AlertContext';
import { Button } from '@material-ui/core';

const Test = () => {
	const alertC = useContext(AlertContext);

	const handleClick = message => {
		alertC.showAlert(message);
	};

	console.log('xd');

	return (
		<div>
			<Button onClick={() => handleClick('siema')}>aaa</Button>
			<Button onClick={() => handleClick('eniu')}>eniu</Button>
		</div>
	);
};

export default Test;
