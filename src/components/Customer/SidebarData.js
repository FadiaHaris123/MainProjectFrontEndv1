import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FaGoodreads } from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [

  
  {
    title: 'Home',
    path: '/customer',
    icon: <RiIcons.RiBankLine />,
    cName: 'nav-text'
  },
  {
    title: 'ID Card',
    path: '/customer/profile',
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
    title: 'Joined Chits',
    path: '/customer/joinedchits',
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
    title: 'Payment',
    path: '/customer/otp/payment',
    icon:  <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  
  {
    title: 'Log Out',
    path: '/',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];


