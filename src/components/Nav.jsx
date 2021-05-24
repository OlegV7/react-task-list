import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';

function Nav() {
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
            </ul>
        </header>
    )
}

export default Nav
