import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const DashboardRoutes = [
  // {
  //   path: '/dashboard/analytics',
  //   element: <DashboardAnalytics />
  // },
  {
    path: '/dashboard',
    element: <DashboardEcommerce />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  }
]

export default DashboardRoutes
