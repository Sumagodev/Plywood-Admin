// ** Icons Import
import { ShoppingCart, Circle, List } from 'react-feather'
import { ROLES_CONSTANT } from '../../utility/constant'

export default [
  {
    id: 'productGroup',
    title: 'Products',
    icon: <ShoppingCart />,
    roleArr: ["ADMIN", "DISTRIBUTOR", "APPROVERS", ROLES_CONSTANT.SUBADMIN],
    children: [
      {
        id: 'category',
        title: 'Category',
        icon: <List />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        navLink: '/products/category'
      },
      {
        id: 'brand',
        title: 'Brand',
        icon: <List />,
        roleArr: ["ADMIN", ROLES_CONSTANT.SUBADMIN],
        navLink: '/products/brands'
      },
      {
        id: 'product',
        title: 'Product',
        icon: <List />,
        roleArr: ["ADMIN", "DISTRIBUTOR", "APPROVERS", ROLES_CONSTANT.SUBADMIN],
        navLink: '/products/product-lists'
      },
      {
        id: 'review',
        title: 'Review',
        icon: <List />,
        roleArr: ["ADMIN", "DISTRIBUTOR", "APPROVERS", ROLES_CONSTANT.SUBADMIN],
        navLink: '/products/product-reviews'
      }
    ]
  }
]
