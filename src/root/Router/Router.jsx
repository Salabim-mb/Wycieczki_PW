import React from 'react';
import path_list from "constants/routes";
import { Switch, Route, useLocation } from 'react-router-dom';

const Router = (props) => {
    const location = useLocation();
    return (
        <>
            {() => (
                <Switch location={location} key={location.pathname}>
                    {path_list.map(
                        ({ component: Component, path, ...rest }) => (
                            <Route path={path} key={path} {...rest}>
                                <Component {...props} {...rest} />
                            </Route>
                        )
                    )}
                </Switch>
            )}
        </>
    );
};

export default Router;