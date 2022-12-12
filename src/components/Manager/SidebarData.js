import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [

  {
    title: 'Assigned Chits',
    path: '/manager/assignedchits',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Chits Started',
    path: '/manager/startchit',
    icon: <RiIcons.RiAuctionFill />,
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
    icon: <RiIcons.RiAuctionFill />,
    cName: 'nav-text'
  }
];