import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchForm from './SearchForm';

const Nav = props => (
  <header>
  	{ (props.location.pathname === '/search')
  		? <SearchForm nextProps={props} />
  		: <br /> }
	<nav className="main-nav">
	  <ul>
		<li><NavLink to='/cats'>Cats</NavLink></li>
		<li><NavLink to='/dogs'>Dogs</NavLink></li>
		<li><NavLink to='/birds'>Birds</NavLink></li>
	  </ul>
    </nav>
  </header>


);

export default Nav;
