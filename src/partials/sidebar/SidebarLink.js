
import adminIcon from '../../Assets/icons/adminIcon.svg'
import adminIconActive from '../../Assets/icons/adminIconActive.svg'
import BarnsIcon from '../../Assets/icons/BarnsIcon.svg'
import BarnsIconActive from '../../Assets/icons/BarnsIconActive.svg'
import dashbordA from '../../Assets/icons/dashboardIconActive.svg'
import dashboardIcon from '../../Assets/icons/dashboardIcon.svg'
import productIcon from '../../Assets/icons/productIcon.svg'
import productIconActive from '../../Assets/icons/productIconActive.svg'
import serviesIcon from '../../Assets/icons/serviesIcon.svg'
import serviesIconActive from '../../Assets/icons/serviesIconActive.svg'
import settingsIcon from '../../Assets/icons/settingsIcon.svg'
import settingsIconActive from '../../Assets/icons/settingsIconActive.svg'
import usersIocn from '../../Assets/icons/usersIocn.svg'
import usersIocnActive from '../../Assets/icons/usersIocnActive.svg'
import adsIcon from '../../Assets/icons/adsIcon.svg'
import adsIconActive from '../../Assets/icons/adsIconActive.svg'
import couponIocn from '../../Assets/icons/couponIocn.svg'
import couponIocnActive from '../../Assets/icons/couponIocnActive.svg'
import calendarIcon from '../../Assets/icons/calendarIcon.svg'
import calendarActive from '../../Assets/icons/calendarActive.svg'
import chatIocn from '../../Assets/icons/chatIocn.svg'
import chatIconActive from '../../Assets/icons/chatIconActive.svg'


export const SidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    iocn: dashboardIcon,
    acviteIcon: dashbordA
  },


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
  },
  {
    title: 'Barns',
    path: '/barns',
    iocn: BarnsIcon,
    acviteIcon: BarnsIconActive

  },
  {
    title: 'Users',
    path: '/users',
    iocn: usersIocn,
    acviteIcon: usersIocnActive

  },
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
    ]
  },
  {
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
  },

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
  },
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
  {
    title: 'Coupon',
    path: '/coupons',
    iocn: couponIocn,
    acviteIcon: couponIocnActive,
  },
  {
    title: 'Chat',
    path: '/chat',
    iocn: chatIocn,
    acviteIcon: chatIconActive,
  },


];