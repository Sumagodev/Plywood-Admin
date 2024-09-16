import { lazy } from 'react'
import BrandList from '../../views/products/brand/list'
import Review from '../../views/products/review/list/Review'
import AddProduct from '../../views/products/list/AddProduct'
const CategoryList = lazy(() => import('../../views/products/category/list'))
const ProductList = lazy(() => import('../../views/products/list'))


const ProductRoutes = [
  {
    path: '/products/category',
    element: <CategoryList />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  },
  {
    path: '/products/product-lists',
    element: <ProductList />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  },
  {
    path: '/products/brands',
    element: <BrandList />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  },
  {
    path: 'products/add-products',
    element: <AddProduct />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  },
  {
    path: 'products/edit-product/:id',
    element: <AddProduct />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  },
  {
    path: '/products/product-reviews',
    element: <Review />,
    roleArr: ["ADMIN", "DISTRIBUTOR"]
  }

]

export default ProductRoutes
