import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogout } from '../actions/studentAction';
import { adminLogout } from '../actions/adminAction';
import { IconContext } from 'react-icons';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;
  const studentlogOutHandler = () => {
    dispatch(studentLogout());
  };
  const adminlogOutHandler = () => {
    dispatch(adminLogout());
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
          {studentInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/student/profile'>
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/student/grade'>
                  <MenuBookIcon />
                  <span>Grades</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={studentlogOutHandler}>
                  <ExitToAppIcon />
                  <span>Sign out</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/'>
                  <HomeIcon />
                  <span>Home</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link>
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link>
                  <PeopleIcon />
                  <span>Students</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link>
                  <PeopleOutlineIcon />
                  <span>Faculty</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link>
                  <MenuBookIcon />
                  <span>Grades</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={adminlogOutHandler}>
                  <ExitToAppIcon />
                  <span>Sign out</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
