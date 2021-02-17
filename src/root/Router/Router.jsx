import React from 'react';
import path_list from "constants/routes";
import { Switch, Route } from 'react-router-dom';

const Router = () => (
    <Switch>
        {path_list.map(
            (data) => (
                <Route {...data} />
            )
        )}
    </Switch>
);

export default Router;