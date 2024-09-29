import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
// import { SidebarLinks } from './sidebar/SidebarLink'
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/LOGO.svg'
import adminIcon from '../Assets/icons/adminIcon.svg'
import adminIconActive from '../Assets/icons/adminIconActive.svg'
import BarnsIcon from '../Assets/icons/BarnsIcon.svg'
import BarnsIconActive from '../Assets/icons/BarnsIconActive.svg'
import dashbordA from '../Assets/icons/dashboardIconActive.svg'
import dashboardIcon from '../Assets/icons/dashboardIcon.svg'
import productIcon from '../Assets/icons/productIcon.svg'
import productIconActive from '../Assets/icons/productIconActive.svg'
import serviesIcon from '../Assets/icons/serviesIcon.svg'
import serviesIconActive from '../Assets/icons/serviesIconActive.svg'
import settingsIcon from '../Assets/icons/settingsIcon.svg'
import settingsIconActive from '../Assets/icons/settingsIconActive.svg'
import usersIocn from '../Assets/icons/usersIocn.svg'
import usersIocnActive from '../Assets/icons/usersIocnActive.svg'
import adsIcon from '../Assets/icons/adsIcon.svg'
import adsIconActive from '../Assets/icons/adsIconActive.svg'
import couponIocn from '../Assets/icons/couponIocn.svg'
import couponIocnActive from '../Assets/icons/couponIocnActive.svg'
import calendarIcon from '../Assets/icons/calendarIcon.svg'
import calendarActive from '../Assets/icons/calendarActive.svg'
import chatIocn from '../Assets/icons/chatIocn.svg'
import chatIconActive from '../Assets/icons/chatIconActive.svg'


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const SidebarLinks = [
    {
      title: "Dashboard",
      path: "/dashboard",
      iocn: dashboardIcon,
      acviteIcon: dashbordA
    },

    ...(pathname !== '/barns' ? [

      {
        title: 'Admins',
        path: '/admin',
        iocn: adminIcon,
        acviteIcon: adminIconActive,
        dropdown: false,
        subLinks: [
          {
            title: 'Add Service',
            path: '/register-service',
          },
        ]
      }] : []),
    {
      title: 'Barns',
      path: '/barns',
      iocn: BarnsIcon,
      acviteIcon: BarnsIconActive

    },
    ...(pathname !== '/barns' ? [

      {
        title: 'Users',
        path: '/users',
        iocn: usersIocn,
        acviteIcon: usersIocnActive

      }] : []),
    ...(pathname !== '/barns' ? [

      {
        title: 'Manage Staffs',
        path: '/manage-staffs',
        iocn: usersIocn,
        acviteIcon: usersIocnActive,
        dropdown: true,
        subLinks: [
          {
            title: 'Staff',
            path: '/staff',
          },
          {
            title: 'Roles',
            path: '/roles',
          },
          {
            title: 'Permissions',
            path: '/permissions',
          },
        ],
      }] : []),


    ...(pathname == '/barns' && pathname !== '/manage-products/produts' ? [{
      title: 'Manage Products',
      path: '/manage-products',
      iocn: productIcon,
      acviteIcon: productIconActive,
      dropdown: true,
      subLinks: [
        {
          title: 'Category',
          path: '/category',
        },
        {
          title: 'Sub-Category',
          path: "/sub-category"
        },
        {
          title: "Produts",
          path: "/produts"
        }
      ]
    },] : []),


    ...(pathname == '/barns' ? [

      {
        title: 'Manage Services',
        path: '/manage-services',
        iocn: serviesIcon,
        acviteIcon: serviesIconActive,
        dropdown: true,
        subLinks: [
          {
            title: 'Category',
            path: '/category',
          },
          {
            title: "Services",
            path: "/services"
          }
        ]
      }] : []),
    {
      title: 'Camping',
      path: '/camping',
      iocn: adsIcon,
      acviteIcon: adsIconActive,
      dropdown: true,
      subLinks: [
        {
          title: 'Ads',
          path: '/ads',
        },
        {
          title: "Email",
          path: "/email"
        }
      ]
    },

    {
      title: 'Settings',
      path: '/settings',
      iocn: settingsIcon,
      acviteIcon: settingsIconActive
    },
    {
      title: 'Calendar',
      path: '/calendar',
      iocn: calendarIcon,
      acviteIcon: calendarActive
    },
    ...(pathname == '/barns' ?
      [
        {
          title: 'Coupon',
          path: '/coupons',
          iocn: couponIocn,
          acviteIcon: couponIocnActive,
        }
      ] : []),
    {
      title: 'Chat',
      path: '/chat',
      iocn: chatIocn,
      acviteIcon: chatIconActive,
    },


  ];
  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div

        id="sidebar"
        ref={sidebar}
        className={`flex border flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}

          {/* Logo */}
          <NavLink to="/" className="block">
            {/* <h1 className=' -ml-3 text-center  text-xl font-bold text-white'>LOGO</h1> */}
            {/* {sidebarExpanded && */}
            <img src={Logo} alt='logo' />
            {/* } */}
          </NavLink>
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>

            <ul className="mt-3">
              {/* Dashboard */}
              {SidebarLinks.map((link, index) => {
                return (
                  <div key={index}>
                    <SidebarLinkGroup key={index} index={index} activecondition={pathname === link.path || pathname.includes(link.path)}>
                      {(handleClick, open) => {
                        return (
                          <div key={index}>
                            <Link
                              to={link.path}
                              className={`block text-primary truncate transition duration-150 ${pathname === link.path || pathname.includes('dashboard') ? 'hover:text-primary' : 'hover:text-primary'}
                              }`}
                              onClick={(e) => {
                                {
                                  link.dropdown &&
                                    e.preventDefault();
                                  sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                }

                              }}
                            >
                              <div className="flex items-center justify-between"

                              >
                                <div className="flex items-center">
                                  {/* {<link.iocn className={`${pathname === link.path || pathname.includes(link.path) ? 'text-[#E9A537]' : 'text-slate-400'}`} />} */}
                                  {/* <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {link.title}
                                </span> */}
                                  {pathname === link.path && !link.dropdown ?
                                    <img className=' !w-2xl' src={link.acviteIcon} alt='icon' />
                                    : <img className='!w-2xl' src={link.iocn} alt='icon' />}
                                  <span
                                    className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === link.path || pathname.includes(link.path) ? 'text-[#E9A537]' : 'text-primary'}`}>
                                    {link.title}
                                  </span>
                                </div>
                                {/* Icon */}
                                {link.dropdown && <>
                                  <div className="flex shrink-0 ml-2">
                                    <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                    </svg>
                                  </div>
                                </>}

                              </div>
                            </Link>
                            {link.dropdown &&
                              link.subLinks.map((subLinks) => {
                                return (<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                  <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                    <li className="mb-1 last:mb-0">
                                      <NavLink
                                        end
                                        to={`${link.path}${subLinks.path}`}
                                        className={({ isActive }) =>
                                          'block transition duration-150 truncate ' + (isActive ? ' text-[#E9A537]' : 'text-gray-600')
                                        }
                                      >
                                        <span className="text-sm  font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          {subLinks.title}
                                        </span>
                                      </NavLink>
                                    </li>
                                  </ul>
                                </div>)
                              })}
                          </div>
                        );
                      }}
                    </SidebarLinkGroup>
                  </div>

                )
              })}

            </ul>
          </div>
          {/* More group */}

        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
