import React, { useContext } from 'react';
import {Route, Redirect}     from 'react-router-dom';
import {AuthContext}         from '../firebase/auth';

function ProtectedRoute(props) {
    const { currentUser } = useContext(AuthContext);

    if(currentUser === null) {
        return (
            <Redirect to={props.redirectTo}></Redirect>
        );
    } 

    return (
        <Route exact to={props.path}>
            {props.children}
        </Route>
    );
}

export default ProtectedRoute;