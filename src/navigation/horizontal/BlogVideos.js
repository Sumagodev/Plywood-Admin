// ** Icons Import
import { Command, Eye } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        id: 'blogs1',
        title: 'Blog Video',
        icon: <Command />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
            {
                id: 'Blogssas',
                title: 'View Blog Video',
                icon: <Eye />,
                roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
                navLink: '/blogs-video/view'
            }
            // {
            //     id: 'ViewAdvertisementSubscriptions',
            //     title: 'View advertisement Subscriptions',
            //     icon: <Eye />,
            //     roleArr: ["ADMIN"],
            //     navLink: '/subscription/advertisement/view'
            // }
        ]
    }
]
