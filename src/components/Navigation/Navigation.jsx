import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuList } from './components';

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

const Navigation = props => {
	const [show, setShow] = useState(false);

	return (
		<>
			<HideOnScroll {...props}>
				<>
					<AppBar position="fixed">
						<Toolbar>
							<IconButton
								edge="start"
								aria-controls="customized-menu"
								aria-haspopup="true"
								color="inherit"
								aria-label="menu"
								onClick={() => setShow(true)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6">Wycieczki PW</Typography>
						</Toolbar>
					</AppBar>
					<MenuList show={show} setShow={setShow} />
				</>
			</HideOnScroll>
		</>
	);
};

export default Navigation;
