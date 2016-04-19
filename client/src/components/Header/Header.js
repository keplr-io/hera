import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>Hera</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/view' activeClassName={classes.activeRoute}>
      View
    </Link>
  </div>
);

export default Header
