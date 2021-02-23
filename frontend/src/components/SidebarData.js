import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Profile',
    path: '/',
    icon: <AccountCircleIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Students',
    path: '/',
    icon: <PeopleIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Faculty',
    path: '/',
    icon: <PeopleOutlineIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Grades',
    path: '/',
    icon: <MenuBookIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Signout',
    path: '/',
    icon: <ExitToAppIcon />,
    cName: 'nav-text',
  },
];
