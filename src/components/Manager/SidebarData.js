import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [

  {
    title: 'Home',
    path: '/manager',
    icon: <RiIcons.RiBankLine />,
    cName: 'nav-text'
  },
  {
    title: 'Assigned Chits',
    path: '/manager/assignedchits',
    icon: <RiIcons.RiPlayListAddFill />,
    cName: 'nav-text'
  },
 
  {
    title: 'Chits Started',
    path: '/manager/startchit',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Auction Details',
    path: '/manager/auctiondetails',
    icon: <RiIcons.RiAuctionFill />,
    cName: 'nav-text'
  },

  {
    title: 'Change Password',
    path: '/manager/changepassword',
    icon: <RiIcons.RiLockPasswordLine />,
    cName: 'nav-text'
  },

  {
    title: 'Log Out',
    path: '/',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  },
];