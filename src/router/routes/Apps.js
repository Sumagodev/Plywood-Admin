// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import UsersWithSubscription from '../../views/apps/UsersWithSubscription/list'
import UserWithSubscriptionDetail from '../../views/apps/UsersWithSubscription/list/UserWithSubscriptionDetail'
import AddSubscription from '../../views/Subscriptions/list/AddSubscription'
import SubscriptionList from '../../views/Subscriptions/list/Table'
import FlashSalesList from '../../views/Reports/FlashSales/list/Table'
import FlashSalesDetails from '../../views/Reports/FlashSales/list/FlashSalesDetails'
import AdverisementSubscriptionList from '../../views/AdvertisementSubsctiptions/list/Table'
import AddAdvertisementSubscription from '../../views/AdvertisementSubsctiptions/list/AddAdvertisementSubscription'
import Tickets from '../../views/UserTickets/list'
import UserTicketDetails from '../../views/UserTickets/list/UserTicketDetails'
import PromotionList from '../../views/Reports/Advertisements/list'
import PromotionDetails from '../../views/Reports/Advertisements/list/PromotionDetails'
import AllSubscriptionList from '../../views/Reports/SubscriptionsReport/list'
import AllSubscribedUsers from '../../views/Reports/SubscriptionsReport/list/AllSubscribedUsers'
import LeadsList from '../../views/Reports/Leads/list'
import UserRequirements from '../../views/apps/UserRequirements/list'
import QuickEnquiery from '../../views/apps/Quick reviews/list'
import VerifiedUsers from '../../views/apps/VerifiedUser/list'
import Blogs from '../../views/Blogs/list'
import Addblog from '../../views/Blogs/list/AddBlog'
import BlogVideo from '../../views/BlogVideo/list'
import AddblogVideo from '../../views/BlogVideo/list/AddVideoBlog'
import AddTopup from '../../views/Topup/list/AddTopup'
import TopupList from '../../views/Topup/list'
import NewsLetterList from '../../views/products/newsLetter/list'
import SalesReportList from '../../views/Reports/SalesUsers/list'
import HomepageBanners from '../../views/homepageBanners/list'
import WebsiteData from '../../views/WebsiteData/list'
import Seo from '../../views/seo/list'
import AddSeo from '../../views/seo/list/AddSeo'
import HomepageBannersimges from '../../views/homepageBannersimges/list'
import Advertisementbanners from '../../views/advertisementbanners/list'
const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))
const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const AppRoutes = [
  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add'
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <UserList />,
    path: '/apps/user/list',
    roleArr: ["ADMIN", "APPROVERS"]
  },
  {
    element: <UsersWithSubscription />,
    path: '/apps/user/Users-With-Subscription',
    roleArr: ["ADMIN"]
  },
  {
    element: <UserWithSubscriptionDetail />,
    path: '/apps/user/View-Subscription-for-user/:id',
    roleArr: ["ADMIN"]
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  },
  {
    element: <SubscriptionList />,
    path: '/subscription/view'
  },
  {
    element: <AddSubscription />,
    path: '/subscription/Add'
  },
  {
    element: <AddSubscription />,
    path: '/subscription/Edit/:id'
  },
  {
    element: <TopupList />,
    path: '/topup/view'
  },
  {
    element: <AddTopup />,
    path: '/topup/Add'
  },
  {
    element: <AddTopup />,
    path: '/topup/Edit/:id'
  },
  {
    element: <AddSubscription />,
    path: '/subscription/Add'
  },
  {
    element: <AdverisementSubscriptionList />,
    path: '/subscription/advertisement/view'
  },
  {
    element: <AddAdvertisementSubscription />,
    path: '/subscription/advertisement/add'
  },
  {
    element: <AddAdvertisementSubscription />,
    path: '/subscription/advertisement/Edit/:id'
  },
  {
    element: <FlashSalesList />,
    path: '/flash-sales/view'
  },
  {
    element: <PromotionList />,
    path: '/Promotions/view'
  },
  {
    element: <FlashSalesDetails />,
    path: '/flash-sales/view-details/:id'
  },
  {
    element: <PromotionDetails />,
    path: '/Promotions/view-details/:id'
  },
  {
    element: <Tickets />,
    path: '/Tickets'
  },
  {
    element: <NewsLetterList />,
    path: '/news-letters'
  },
  {
    element: <UserTicketDetails />,
    path: '/User-Tickets/View/:id'
  },
  {
    element: <AllSubscriptionList />,
    path: '/Subscription/view-user-count'
  },
  {
    element: <AllSubscribedUsers />,
    path: '/Subscription/view-users/:id'
  },
  {
    element: <LeadsList />,
    path: '/Leads/view'
  },
  {
    element: <SalesReportList />,
    path: '/sales/report'
  },
  {
    element: <UserRequirements />,
    path: '/user-requirements'
  },
  {
    element: <QuickEnquiery />,
    path: '/user-quickenqury'
  },
  {
    element: <VerifiedUsers />,
    path: '/verified-user'
  },
  {
    element: <Advertisementbanners />,
    path: '/advertisementbanners'
  },
  {
    element: <Blogs />,
    path: '/blogs/view'
  },
  {
    element: <Addblog />,
    path: '/Blogs/Add'
  },
  {
    element: <Addblog />,
    path: '/Blogs/edit/:id'
  },
  {
    element: <BlogVideo />,
    path: '/blogs-video/view'
  },
  {
    element: <AddblogVideo />,
    path: '/Blogs-video/Add'
  },
  {
    element: <AddblogVideo />,
    path: '/Blogs-video/edit/:id'
  },
  {
    element: <Seo />,
    path: '/seo/view'
  },
  {
    element: <AddSeo />,
    path: '/seo/Add'
  },
  {
    element: <AddSeo />,
    path: '/seo/edit/:id'
  },
  {
    element: <WebsiteData />,
    path: '/apps/ShopImage',
    roleArr: ["ADMIN"]
  },
  {
    element: <HomepageBanners />,
    path: '/apps/homepageBanners',
    roleArr: ["ADMIN"]
  },
  {
    element: <HomepageBannersimges />,
    path: '/apps/homepageBannersimges',
    roleArr: ["ADMIN"]
  }
]

export default AppRoutes
