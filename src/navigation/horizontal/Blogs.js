// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        id: 'blogs',
        title: 'Blogs',
        icon: <Command />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
            {
                id: 'Blogs',
                title: 'View Blogs',
                icon: <Eye />,
                roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
                navLink: '/blogs/view'
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
