import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogout } from '../actions/studentActions';
import { adminLogout } from '../actions/adminActions';
import { facultyLogout } from '../actions/facultyActions';
import { IconContext } from 'react-icons';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import ClassIcon from '@material-ui/icons/Class';
import FunctionsIcon from '@material-ui/icons/Functions';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import './Navbar.css';

function Navbar() {
  const [dt, setDt] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const [sidebar, setSidebar] = useState(true);

  const showSidebar = (x) => {
    if (x.matches) {
      setSidebar(!sidebar);
    } else {
      setSidebar(sidebar);
    }
  };

  const dispatch = useDispatch();
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const studentlogOutHandler = () => {
    dispatch(studentLogout());
  };
  const adminlogOutHandler = () => {
    dispatch(adminLogout());
  };
  const facultylogOutHandler = () => {
    dispatch(facultyLogout());
  };
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <MenuIcon
              style='menu_icon'
              style={{ marginBottom: '25px', color: 'black' }}
              onClick={() =>
                showSidebar(window.matchMedia('(max-width: 900px)'))
              }
            />
          </Link>

          <h3 className='ml-auto  mr-auto text-center main_head mt-4'>
            <FormatIndentIncreaseIcon className='app_icon' />{' '}
            <span style={{ color: '#3e4042' }}>
              Smart Grace Mark Calculator
            </span>
          </h3>
          <h6 className='text' style={{ marginLeft: '-180px' }}>
            {dt}
          </h6>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {studentInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon
                    className='close_icon'
                    style={{ color: 'white' }}
                    onClick={() =>
                      showSidebar(window.matchMedia('(max-width: 900px)'))
                    }
                  />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/student/profile'>
                  <AccountCircleIcon />
                  <span className='text'>Profile</span>
                </Link>
              </li>

              <li className='nav-text'>
                <Link
                  to={`/student/grade/${studentInfo.token}-${studentInfo.result.RollNum}`}
                >
                  <MenuBookIcon />
                  <span className='text'>Grades</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={studentlogOutHandler}>
                  <ExitToAppIcon />
                  <span className='text'>Logout</span>
                </Link>
              </li>
            </ul>
          ) : facultyInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon
                    className='close_icon'
                    style={{ color: 'white' }}
                  />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/faculty/profile'>
                  <AccountCircleIcon />
                  <span className='text'>Profile</span>
                </Link>
              </li>

              {facultyInfo.result.ClassAdviser === 'Yes' && (
                <li className='nav-text'>
                  <Link
                    to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}
                  >
                    <ClassIcon />
                    <span className='text'>
                      {facultyInfo.result.Department}-{facultyInfo.result.Batch}
                    </span>
                  </Link>
                </li>
              )}
              <li className='nav-text'>
                <Link to={`/faculty/students/${facultyInfo.result.Department}`}>
                  <PeopleIcon />
                  <span className='text'>Students</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={facultylogOutHandler}>
                  <ExitToAppIcon />
                  <span className='text'>Logout</span>
                </Link>
              </li>
            </ul>
          ) : adminInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon
                    className='admin_close-icon'
                    style={{ color: 'white' }}
                  />
                </Link>
              </li>
              <li className='nav-text'>
                <NavLink
                  to='/admin/profile'
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                >
                  <AccountCircleIcon />
                  <span className='text'>{adminInfo.result.Name}</span>
                </NavLink>
              </li>

              <li className='nav-text'>
                <NavLink
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                  to='/admin/students'
                >
                  <PeopleIcon />
                  <span className='text'>Students</span>
                </NavLink>
              </li>
              <li className='nav-text'>
                <NavLink
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                  to='/admin/faculties'
                >
                  <PeopleOutlineIcon />
                  <span className='text'>Faculty</span>
                </NavLink>
              </li>
              <li className='nav-text'>
                <NavLink
                  to='/admin/course/report'
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                >
                  <ImportContactsIcon />
                  <span className='text'>Courses</span>
                </NavLink>
              </li>
              <li className='nav-text'>
                <NavLink
                  to='/admin/gracemarklist'
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                >
                  <BeenhereIcon />
                  <span className='text'>Grace Mark</span>
                </NavLink>
              </li>
              <li className='nav-text'>
                <Link onClick={adminlogOutHandler}>
                  <ExitToAppIcon className='text-danger' />
                  <span className='text'>Logout</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon
                    className='close_icon'
                    style={{ color: 'white' }}
                  />
                </Link>
              </li>
              <li className='nav-text'>
                <NavLink
                  to='/'
                  activeStyle={{
                    color: '#2196f3',
                    fontWeight: 'bold',
                    backgroundColor: '#3f3f44',
                  }}
                >
                  <HomeIcon />
                  <span>Home</span>
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
