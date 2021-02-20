// import React from 'react';
import BlogList from '../pages/BlogList';
import { paths as pathList } from './paths';

export default [
    {
        path: pathList.DASHBOARD.path,
        component: BlogList,
        exact: true
    }
]