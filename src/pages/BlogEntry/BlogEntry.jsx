import React, { useContext, useEffect, useRef, useState } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import { Backdrop, CircularProgress, CssBaseline, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { AlertContext } from 'context/AlertContext';
import { makeStyles } from '@material-ui/core/styles';
import { pathList } from 'constants/routes';
import BlogSideBar from './components/BlogSideBar';

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	entryBody: {
		...theme.typography.body2,
		padding: theme.spacing(3, 0),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const getEntryContent = async (id) => {
	const url = `/${id}/`;
	const headers = {
		"Content-Type": "application/json"
	}
	const res = await fetch(url, {
		headers,
		method: "GET"
	});

	if (res.status === 200) {
		return await res.json();
	} else {
		throw await res.json();
	}
};

const mapEntry = (data) => ({
	id: data.id,

});

const BlogEntry = () => {
	const {category, entryId} = useParams();
	const [redirect, setRedirect] = useState(false);
	const [entryData, setEntryData] = useState({});
	const [loading, setLoading] = useState(false);
	const alertC = useRef(useContext(AlertContext));

	useEffect(() => {
		const loadPost = async () => {
			setLoading(true);
			try {
				const res = await getEntryContent(entryId);
				setEntryData(mapEntry(res));
			} catch(ex) {
				alertC.current.showAlert(ex.message || "Coś poszło nie tak przy próbie pobierania posta.")
			} finally {
				setLoading(false);
			}
		};
		loadPost();
	});

	const mapDate = (date) => {
		const d = new Date(date);
		return `${d.getDate()} - ${d.getMonth() + 1} - ${d.getFullYear()}`;
	}

	const classes = useStyles();

	return (
		<Paper>
			{loading ? (
				<Backdrop open={loading} className={classes.backdrop}>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<>
					<CssBaseline />
					<Grid container spacing={5} className={classes.mainGrid}>
						<Grid item xs={12} md={8}>
							<Typography variant="h6" gutterBottom>
								Utworzono: {entryData.title}
							</Typography>
							<Typography variant="caption" gutterBottom>
								{mapDate(entryData.date)}
							</Typography>
							<Divider />
							<div className={classes.entryBody}>
								{entryData.content}
							</div>
						</Grid>
						<BlogSideBar
							featuredPosts={[]}
							setRedirect={setRedirect}
							pathParams={[
								{name: "Strona główna", path: pathList.DASHBOARD.path},
								{name: category, path: pathList.BLOG_CATEGORIES.redirect(category)},
								{name: entryData.title, path: pathList.BLOG_ENTRY.redirect(category, entryId)}
							]}
						/>
					</Grid>
					{redirect?.action && <Redirect to={redirect?.destination || null} />}
				</>
			)}
		</Paper>
	)
};

export default BlogEntry;