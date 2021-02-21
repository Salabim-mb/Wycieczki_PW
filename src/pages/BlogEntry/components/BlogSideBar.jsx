import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Chip, Grid, Paper, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
	sidebarBreadcrumbs: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.grey[200],
	},
	sidebarSection: {
		marginTop: theme.spacing(3),
	},
}));

const BlogSideBar = ({pathParams, featuredPosts, setRedirect}) => {
	const classes = useStyles();

	return (
		<Grid item xs={12} md={4}>
			<Paper elevation={0} className={classes.sidebarBreadcrumbs}>
				<Typography variant="h6" component="h6">
					Nawigacja
				</Typography>
				<Breadcrumbs separator={<NavigateNextIcon fontsize="small" />} aria-label="breadcrumb">
					{pathParams.map((item) => (
						<Chip
							label="Basic"
							variant="outlined"
							onClick={() => setRedirect({action: true, destination: item.path})}
						>
							{item.name}
						</Chip>
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

export default BlogSideBar;