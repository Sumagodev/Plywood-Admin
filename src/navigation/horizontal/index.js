import { Command, Eye, Users } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'
import BlogVideos from './BlogVideos'
import blogs from './Blogs'
import apps from './apps'
import dashboards from './dashboards'
import flashSales from './flashSales'
import formsAndTables from './forms-tables'
import product from './product'
import subscriptions from './subscriptions'
import tickets from './tickets'
import Seo from './Seo'
import quickenquiry from './quickenquiry'
// ** Merge & Export
// export default [...dashboards, ...apps, ...uiElements, ...formsAndTables, ...pages, ...charts, ...others]
export default [...dashboards, ...apps, ...product, ...formsAndTables, ...subscriptions, ...flashSales, ...tickets, ...blogs, ...BlogVideos, ...Seo,
{
    id: 'dashboardas',
    title: 'News Letter',
    icon: <Users />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    // navLink: '/news-letters'
    children: [
        {
            id: 'view-News-Letter-flash-sales',
            title: 'View News Letter',
            icon: <Eye />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/news-letters'
        }
    ]
},
{
    id: 'flash-sales',
    title: 'Reports',
    icon: <Command />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    children: [
        {
            id: 'view-flash-sales',
            title: 'Flash sales',
            icon: <Eye />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/flash-sales/view'
        },
        {
            id: 'view-Subscriptions',
            title: 'Subscriptions',
            icon: <Eye />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/Subscription/view-user-count'
        },
        {
            id: 'view-Leads',
            title: 'Leads',
            icon: <Eye />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/Leads/view'
        },
        {
            id: 'view-Sales-report',
            title: 'Sales report',
            icon: <Eye />,
            roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
            navLink: '/sales/report'
        }
    ]
},
{
    id: 'dashboards',
    title: 'User Requirements',
    icon: <Users />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    navLink: '/user-requirements'
},
{
    id: 'dashboards1',
    title: 'Quick Enquiery',
    icon: <Users />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    navLink: '/user-quickenqury'
},
{
    id: 'dashboards2',
    title: 'Verified User',
    icon: <Users />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    navLink: '/verified-user'
},
{
    id: 'dashboards2',
    title: 'Advertisement Banner',
    icon: <Users />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    navLink: '/advertisementbanners'
},
{
    id: 'dashboards2',
    title: 'Promotions',
    icon: <Eye />,
    roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
    navLink: '/Promotions/view'

}
]
