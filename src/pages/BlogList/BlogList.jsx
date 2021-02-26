import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AlertContext } from 'context/AlertContext';
import api from 'constants/api';
import NewBlogModal from './components/NewBlogModal';

const fetchBlogList = async () => {
	const url = api.BLOGS;
	const res = await fetch(url, {
		method: "GET"
	});
	
	if (res.status === 200) {
		const parsedRes = await res.json();
		return parsedRes;
	} 
	throw new Error(await res.json());
	
}

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
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const BlogList = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const alertC = useRef(useContext(AlertContext));
	const classes = useStyles();

	useEffect(() => {
		const loadBlogs = async () => {
			setLoading(true);
			try {
				const res = await fetchBlogList();
				setBlogs(res);
			} catch(ex) {
				alertC.current.showAlert(ex.message);
			} finally {
				setLoading(false);
			}
		};
		loadBlogs();
	}, []);


	return loading ? (
		<Backdrop className={classes.backdrop} open={loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : (
		<>
			<div className={classes.root}>
				{blogs && (<div>{blogs[0]?.title}</div>)}
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