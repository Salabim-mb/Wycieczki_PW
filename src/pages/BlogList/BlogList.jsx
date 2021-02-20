import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewBlogModal from './components/NewBlogModal';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		position: "fixed"
	}
}));

const BlogList = () => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	return (
		<>
			<div className={classes.root}>
				<Fab
					className={classes.fab}
					onClick={() => setOpen(true)}
					aria-label="add"
					color="secondary"
					variant="extended"
				>
					<AddIcon className={classes.extendedIcon} />
					Dodaj blog
				</Fab>
			</div>
			<NewBlogModal open={open} setOpen={setOpen} />
		</>
	)
};

export default BlogList;