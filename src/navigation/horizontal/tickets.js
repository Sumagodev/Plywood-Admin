// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        id: 'tickets',
        title: 'Tickets',
        icon: <Command />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        children: [
            {
                id: 'view-tickets',
                title: 'View Tickets',
                icon: <Eye />,
                roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
                navLink: '/Tickets'
            }
        ]
    }
]
