import React, { useContext, useEffect, useRef, useState } from 'react';
import {Redirect, useParams} from 'react-router-dom';
import { Backdrop, CircularProgress, CssBaseline, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { AlertContext } from 'context/AlertContext';
import { makeStyles } from '@material-ui/core/styles';
import paths from 'constants/paths';
import api from 'constants/api';
import BlogSideBar from './components/BlogSideBar';
import AttachmentContainer from './components/AttachmentContainer';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	mainGrid: {
		// marginTop: theme.spacing(3),
		padding: theme.spacing(3, 4, 3, 4)
	},
	entryBody: {
		...theme.typography.body2,
		padding: theme.spacing(3, 0),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	divider: {
		width: "95%",
		marginBottom: theme.spacing(2)
	},
}));

const getEntryContent = async (id) => {
	const url = `${api.BLOG_POST}${id}/`;
	const headers = {
		"Content-Type": "application/json"
	}
	const res = await fetch(url, {
		headers,
		method: "GET"
	});

	if (res.status === 200) {
		return await res.json();
	}
	// eslint-disable-next-line no-throw-literal
	throw {
		status: res.status,
		content: new Error((await res.json()).detail),
	};
};

const mapEntry = (data) => ({
	id: data.id,
	date: (new Date()).toISOString(),
	title: data.title,
	content: data.content,
	mainPhoto: data.header || null,
	attachments: data.downloadables || [],
});

const BlogEntry = () => {
	const {category, entryId} = useParams();
	const [redirect, setRedirect] = useState({
		action: false,
		destination: null
	});
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
				if (ex.status === 404) {
					setRedirect({
						destination: paths.ERROR,
						action: true
					})
				} else {
					alertC.current.showAlert(ex.message?.content || "Coś poszło nie tak przy próbie pobierania posta.")
				}
			} finally {
				setLoading(false);
			}
		};
		loadPost();
	}, []);

	const mapDate = (date) => {
		const d = new Date(date);
		return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
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
					<Paper className={classes.mainPhoto} style={{ backgroundImage: `url(${entryData.mainPhoto})`}}>
						<img style={{ display: 'none' }} src={entryData.mainPhoto} alt={entryData.title} />
					</Paper>
					<Grid container className={classes.mainGrid}>
						<Grid item xs={12} md={8}>
							<Typography variant="h4" component="h6" gutterBottom>
								{entryData.title || "Tytuł"}
							</Typography>
							<Typography variant="caption" gutterBottom>
								 Utworzono: {mapDate(entryData.date)}
							</Typography>
							<Divider className={classes.divider}/>
							<div className={classes.entryBody} dangerouslySetInnerHTML={{__html: entryData.content}}/>
							<Divider className={classes.divider}/>
							<Typography variant="h5" component="h6">
								Materiały do pobrania
							</Typography>
							{entryData?.attachments?.map((item) => (
								<AttachmentContainer key={item.id} fileUrl={item.file_url} filename="Nazwa pliku" />
							))}
						</Grid>
						<BlogSideBar
							featuredPosts={[]}
							setRedirect={setRedirect}
							pathParams={[
								{name: "Strona główna", path: paths.DASHBOARD.path},
								{name: category, path: paths.BLOG_CATEGORIES.redirect(category)},
								{name: entryData.title, path: paths.BLOG_ENTRY.redirect(category, entryId)}
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