import React from 'react';
import pathList from "constants/routes";
import { Switch, Route, useLocation } from 'react-router-dom';

const Router = (props) => {
    const location = useLocation();
    return (
        <>
            {() => (
                <Switch location={location} key={location.pathname}>
                    {pathList.map(
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