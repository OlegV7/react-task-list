import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';

import { Button } from '@material-ui/core';
import classes from './Nav.module.css';

function Nav() {
    const history = useHistory();

    const logOutHandler = async () => {
        try {
            await auth.signOut();

            history.replace('/auth');
            window.location.reload(false);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <NavLink to="/">
                    Logo
                </NavLink>
            </h1>

            <ul className={classes.list}>
                <li className={classes['list-item']}>
                    <NavLink to="/add-todo" >Add todo</NavLink>
                </li>
                <li className={classes['list-item']}>
                    <NavLink to="/todos">Todos</NavLink>
                </li>
                <li className={classes['list-item']}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={logOutHandler}
                    >Logout</Button>
                </li>
            </ul>
        </header>
    )
}

export default Nav
