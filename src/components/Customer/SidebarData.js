import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [

  {
    title: 'Profile',
    path: '/customer',
    icon: <RiIcons.RiProfileLine />,
    cName: 'nav-text'
  },

  {
    title: 'Available Chits',
    path: '/customer/availablechits',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Auction',
    path: '/customer/auction',
    icon: <RiIcons.RiAuctionFill />,
    cName: 'nav-text'
  },
  
  {
    title: 'Log Out',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];