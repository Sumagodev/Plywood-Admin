// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        id: 'seos',
        title: 'Seos',
        icon: <Command />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
            {
                id: 'Seos',
                title: 'View Seos',
                icon: <Eye />,
                roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
                navLink: '/seo/view'
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
