// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye, Users } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
    {
        
            id: 'dashboards',
            title: 'Quick Enquiry',
            icon: <Users />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/user-quickenqury'
        
    }
]
