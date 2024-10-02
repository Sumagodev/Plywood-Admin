// ** Icons Import
import {
  Box,
  Circle,
  Map,
  User
} from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
  {
    id: 'apps',
    title: 'Apps',
    icon: <Box />,
    roleArr: ["ADMIN", "SUBADMIN", ROLES_CONSTANT.FIELDUSER],
    children: [
      {
        id: 'users',
        title: 'Users',
        icon: <User size={12} />,
        children: [
          {
            id: 'All Users',
            title: 'All Users',
            icon: <Circle />,
            navLink: '/apps/user/list',
            roleArr: ["ADMIN", "SUBADMIN", ROLES_CONSTANT.FIELDUSER]
          },
          {
            id: 'Users With subscription',
            title: 'Users With subscription',
            icon: <Circle />,
            navLink: '/apps/user/Users-With-Subscription',
            roleArr: ["ADMIN", "SUBADMIN", ROLES_CONSTANT.FIELDUSER]
          }

        ],
        roleArr: ["ADMIN", "SUBADMIN", ROLES_CONSTANT.FIELDUSER]

      },
      {
        id: 'location',
        title: 'Location',
        icon: <Map />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
          {
            id: 'locationCountry',
            title: 'Country',
            icon: <Circle />,
            navLink: '/apps/location/country',
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN]
          },
          {
            id: 'locationState',
            title: 'State',
            icon: <Circle />,
            navLink: '/apps/location/state',
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN]
          },
          {
            id: 'locationCity',
            title: 'City',
            icon: <Circle />,
            navLink: '/apps/location/city',
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN]
          }
        ]
      },
      {
        id: 'Shop Image',
        title: 'Shop Image',
        icon: <Map />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
          {
            id: 'Shop Image',
            title: 'Shop Image',
            icon: <Circle />,
            navLink: '/apps/ShopImage',
            roleArr: ["ADMIN", "SUBADMIN"]
          }
        ]
      },
      {
        id: 'Hompage banners',
        title: 'Hompage banners',
        icon: <Map />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
          {
            id: 'HomepageBanners',
            title: 'Homepage Banners',
            icon: <Circle />,
            navLink: '/apps/homepageBannersimges',
            roleArr: ["ADMIN", "SUBADMIN"]
          }

        ]
      }


    ]
  }

]
