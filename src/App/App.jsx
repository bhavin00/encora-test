import React, { useEffect } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute, LoggedInRoute } from '../components';
import { NotePage } from '../NotePage';
import { LoginPage } from '../LoginPage';

const App = () => {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={NotePage} />
                    <LoggedInRoute path="/login" component={LoginPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export { App };