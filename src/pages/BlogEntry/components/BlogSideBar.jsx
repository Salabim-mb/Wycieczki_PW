import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Chip, Grid, Paper, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		maxWidth: '100%',
		padding: theme.spacing(2, 0)
	},
	sidebarBreadcrumbs: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.grey[200],
		margin: theme.spacing(4, 0, 3, 0)
	},
	sidebarSection: {
		marginTop: theme.spacing(3),
	},
}));

const BlogSideBar = ({pathParams, featuredPosts, setRedirect}) => {
	const classes = useStyles();

	return (
		<Grid item xs={12} md={4} className={classes.wrapper}>
			<Paper elevation={0} className={classes.sidebarBreadcrumbs}>
				<Typography variant="h6" component="h6">
					Nawigacja
				</Typography>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					{pathParams.map((item) => (
						<Chip
							key={item.path}
							label={item.name}
							variant="outlined"
							onClick={() => setRedirect({action: true, destination: item.path})}
						/>
					))}
				</Breadcrumbs>
			</Paper>
			<Typography variant="h5" component="h6">
				Proponowane wpisy
			</Typography>
			Tu będą ze 3 tytuły proponowanych / losowych wpisów
			{featuredPosts}
		</Grid>
	);
};

BlogSideBar.propTypes = {
	pathParams: PropTypes.arrayOf(
		PropTypes.objectOf({
			name: PropTypes.string,
			path: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
		})
	).isRequired,
	featuredPosts: PropTypes.arrayOf(
		null // instancja posta
	).isRequired,
	setRedirect: PropTypes.func.isRequired
}

export default BlogSideBar;