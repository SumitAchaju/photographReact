import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomNavLink = ({ to, children }) => {
  const location = useLocation();

  // Use matchPath to check if the current URL matches the given pattern
  let isActive = location.pathname.startsWith('/'+ to);
  if(location.pathname === to){
    isActive = true
  }

  return (
    <Link to={to} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
};

export default CustomNavLink;