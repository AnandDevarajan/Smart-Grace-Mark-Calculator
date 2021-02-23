import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogout } from '../actions/studentAction';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(studentLogout());
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <MenuIcon style={{ marginBottom: '25px' }} onClick={showSidebar} />
          </Link>
          <h3 className='text-white ml-auto mr-auto'>
            Smart Grace Mark Calculator
          </h3>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <CloseIcon />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link onClick={logOutHandler}>
                    {item.icon}
                    {item.title === 'Signout' ? (
                      <span>{item.title}</span>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
