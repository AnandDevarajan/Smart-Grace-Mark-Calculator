import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { studentLogout } from "../actions/studentActions";
import { adminLogout } from "../actions/adminActions";
import { facultyLogout } from "../actions/facultyActions";
import { IconContext } from "react-icons";
import HomeIcon from "@material-ui/icons/Home";

import DoneAllSharpIcon from "@material-ui/icons/DoneAllSharp";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import GradeIcon from "@material-ui/icons/Grade";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import ClassIcon from "@material-ui/icons/Class";
import FunctionsIcon from "@material-ui/icons/Functions";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

import "./Navbar.css";

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
      <IconContext.Provider value={{ color: "#fff" }}>
        {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <MenuIcon
              style='menu_icon'
              style={{ marginBottom: '25px', color: 'black' }}
              onClick={() =>
                showSidebar(window.matchMedia('(max-width: 900px)'))
              }
            />
          </Link>
          <h3 className='ml-auto  mr-auto text-center  main_head '>
            <DoneAllSharpIcon className='app_icon' />{' '}
            <span style={{ color: '#3e4042' }} className='text-white '>
              Smart Grace Mark Calculator
            </span>
          </h3>
          <h6 className='text' style={{ marginLeft: '-180px' }}>
            {dt}
          </h6>
        </div> */}
        <nav class="navbar navbar-expand-lg navbar-dark">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active mt-3">
              <Link to="#" className="menu-bars">
                <MenuIcon
                  style="menu_icon"
                  style={{ marginBottom: "25px",marginRight:"750px", color: "white" }}
                  onClick={() =>
                    showSidebar(window.matchMedia("(max-width: 900px)"))
                  }
                />
              </Link>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item active mt-3">
              {studentInfo ? (
                <p className="text-white">
                  Hello, {studentInfo.result.Name} <AccountCircleSharpIcon />
                </p>
              ) : adminInfo ? (
                <p className="text-white">
                  Hello, {adminInfo.result.Name} <AccountCircleSharpIcon />
                </p>
              ) : facultyInfo ? (
                <p className="text-white">
                  Hello, {facultyInfo.result.Name} <AccountCircleSharpIcon />
                </p>
              ) : (
                <p className="text-white">
                  Signed Out <AccountCircleSharpIcon />
                </p>
              )}
            </li>
          </ul>
        </nav>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          {studentInfo ? (
            <ul className="nav-menu-items" onClick={showSidebar}>
              <h5 className="text-white mt-3">
                <DoneAllSharpIcon className="app_icon" /> C8-SGMC
              </h5>
              <li className="navbar-toggle">
                <NavLink to="#" className="menu-bars">
                  <CloseIcon
                    className="close_icon"
                    style={{ color: "white" }}
                    onClick={() =>
                      showSidebar(window.matchMedia("(max-width: 900px)"))
                    }
                  />
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                  to="/student/profile"
                >
                  <AccountCircleIcon />
                  <span className="text">Profile</span>
                </NavLink>
              </li>

              <li className="nav-text">
                <NavLink
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                  to={`/student/grade/${studentInfo.token}-${studentInfo.result.RollNum}`}
                >
                  <MenuBookIcon />
                  <span className="text">Grades</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <Link
                  onClick={studentlogOutHandler}
                  style={{ color: "#d32626" }}
                >
                  <ExitToAppIcon />
                  <span className="text">Logout</span>
                </Link>
              </li>
            </ul>
          ) : facultyInfo ? (
            <ul className="nav-menu-items" onClick={showSidebar}>
              <h5 className="text-white mt-3">
                <DoneAllSharpIcon className="app_icon" /> C8-SGMC
              </h5>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <CloseIcon
                    className="close_icon"
                    style={{ color: "white" }}
                  />
                </Link>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/faculty/profile"
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                >
                  <AccountCircleIcon />
                  <span className="text">Profile</span>
                </NavLink>
              </li>

              {facultyInfo.result.ClassAdviser === "Yes" && (
                <li className="nav-text">
                  <NavLink
                    to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}
                    activeStyle={{
                      color: "#2196f3",
                      fontWeight: "bold",
                      backgroundColor: "#3f3f44",
                    }}
                  >
                    <ClassIcon />
                    <span className="text">
                      {facultyInfo.result.Department}-{facultyInfo.result.Batch}
                    </span>
                  </NavLink>
                </li>
              )}
              <li className="nav-text">
                <NavLink
                  to={`/faculty/students/${facultyInfo.result.Department}`}
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                >
                  <PeopleIcon />
                  <span className="text">Students</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <Link
                  onClick={facultylogOutHandler}
                  style={{ color: "#d32626" }}
                >
                  <ExitToAppIcon />
                  <span className="text">Logout</span>
                </Link>
              </li>
            </ul>
          ) : adminInfo ? (
            <ul className="nav-menu-items" onClick={showSidebar}>
              <h5 className="text-white mt-3">
                <DoneAllSharpIcon className="app_icon" /> C8-SGMC
              </h5>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <CloseIcon
                    className="admin_close-icon"
                    style={{ color: "white" }}
                  />
                </Link>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/admin/profile"
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                >
                  <AccountCircleIcon />
                  <span className="text">{adminInfo.result.Name}</span>
                </NavLink>
              </li>

              <li className="nav-text">
                <NavLink
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                  to="/admin/students"
                >
                  <PeopleIcon />
                  <span className="text">Students</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                  to="/admin/faculties"
                >
                  <PeopleOutlineIcon />
                  <span className="text">Faculty</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/admin/course/report"
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                >
                  <ImportContactsIcon />
                  <span className="text">Courses</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/admin/gracemarklist"
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
                  }}
                >
                  <BeenhereIcon />
                  <span className="text">Grace Mark</span>
                </NavLink>
              </li>
              <li className="nav-text">
                <Link onClick={adminlogOutHandler} style={{ color: "#d32626" }}>
                  <ExitToAppIcon />
                  <span className="text">Logout</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-menu-items" onClick={showSidebar}>
              <h5 className="text-white mt-3">
                <DoneAllSharpIcon className="app_icon" /> C8-SGMC
              </h5>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <CloseIcon
                    className="close_icon"
                    style={{ color: "white" }}
                  />
                </Link>
              </li>
              <li className="nav-text">
                <NavLink
                  to="/"
                  activeStyle={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    backgroundColor: "#3f3f44",
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
