// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        id: 'topup',
        title: 'Topup',
        icon: <Command />,
        roleArr: ["ADMIN"],
        children: [
            {
                id: 'Viewtopup',
                title: 'View Topups',
                icon: <Eye />,
                roleArr: ["ADMIN"],
                navLink: '/topup/view'
            }
            // {
            //     id: 'ViewAdvertisementSubscriptions',
            //     title: 'View advertisement Subscriptions',
            //     icon: <Eye />,
            //     roleArr: ["ADMIN"],
            //     navLink: '/subscription/advertisement/view'
            // }
        ]
    },
    {
        id: 'subscriptions',
        title: 'Subscriptions',
        icon: <Command />,
        roleArr: ["ADMIN"],
        children: [
            {
                id: 'ViewSubscriptions',
                title: 'View Subscriptions',
                icon: <Eye />,
                roleArr: ["ADMIN"],
                navLink: '/subscription/view'
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
