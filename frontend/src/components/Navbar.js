import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import ClassIcon from '@material-ui/icons/Class';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import './Navbar.css';

function Navbar() {
  const [dt, setDt] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <MenuIcon
              style={{ marginBottom: '25px', color: 'white' }}
              onClick={showSidebar}
            />
          </Link>
          <h3 className='text-white ml-auto mr-auto'>
            Smart Grace Mark Calculator
          </h3>
          <h7 className='text-white '>{dt}</h7>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {studentInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon style={{ color: 'white' }} />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/student/profile'>
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link
                  to={`/student/edit/profile/${studentInfo.result.RollNum}`}
                >
                  <EditTwoToneIcon />
                  <span>Edit Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to={`/student/grade/${studentInfo.result.RollNum}`}>
                  <MenuBookIcon />
                  <span>Grades</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={studentlogOutHandler}>
                  <ExitToAppIcon />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          ) : facultyInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon style={{ color: 'white' }} />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/faculty/profile'>
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link
                  to={`/faculty/edit/profile/${facultyInfo.result.FacultyID}`}
                >
                  <EditTwoToneIcon />
                  <span>Edit Profile</span>
                </Link>
              </li>
              {facultyInfo.result.ClassAdviser === 'Yes' && (
                <li className='nav-text'>
                  <Link
                    to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}
                  >
                    <ClassIcon />
                    <span>
                      {facultyInfo.result.Department}-{facultyInfo.result.Batch}
                    </span>
                  </Link>
                </li>
              )}
              <li className='nav-text'>
                <Link to={`/faculty/students/${facultyInfo.result.Department}`}>
                  <PeopleIcon />
                  <span>Students</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={facultylogOutHandler}>
                  <ExitToAppIcon />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          ) : adminInfo ? (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon style={{ color: 'white' }} />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/admin/profile'>
                  <AccountCircleIcon />
                  <span>{adminInfo.result.Name}</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to={`/admin/edit/profile/${adminInfo.result.adminID}`}>
                  <EditTwoToneIcon />
                  <span>Edit Profile</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/admin/students'>
                  <PeopleIcon />
                  <span>Students</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/admin/faculties'>
                  <PeopleOutlineIcon />
                  <span>Faculty</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/admin/gracemarklist'>
                  <BeenhereIcon />
                  <span>Grace Mark</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link onClick={adminlogOutHandler}>
                  <ExitToAppIcon />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <CloseIcon style={{ color: 'white' }} />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to='/'>
                  <HomeIcon />
                  <span>Home</span>
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
