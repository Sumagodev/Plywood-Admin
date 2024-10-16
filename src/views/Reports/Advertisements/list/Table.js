// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { generateFilePath } from '../../../../services/url.service'

// ** Table Columns
import { columns } from './columns'
import { updatePromotions, getPromotions } from '../store'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'

// ** Utils
// ** Reactstrap Imports
import {
  Card, Col, Input, Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const SubscriptionList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.promotions)
  const FlashSalesArr = useSelector(state => state.promotions.data)
  // const allData = useSelector(state => state.products.allData)

  const [dataArr, setDataArr] = useState([])

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setDataArr(FlashSalesArr)
  }, [FlashSalesArr])


  // ** Function in get data on rows per page


  const handlePagination = page => {
    dispatch(
      getPromotions({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)

    dispatch(getPromotions({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: value,
      page: 1
    }))
    setRowsPerPage(value)
  }

  const handlegetPromotions = () => {
    dispatch(getPromotions({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage
    }))
  }


  useEffect(() => {
    handlegetPromotions()
  }, [])


  useEffect(() => {
    console.log(FlashSalesArr, "FlashSalesArr")
  }, [FlashSalesArr])


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getPromotions({
        sort,
        sortColumn,
        q: val,
        perPage: rowsPerPage,
        page: currentPage
      })
    )
  }
  const columns = [
    {
      name: 'S.no',
      sortable: false,
      sortField: 'index',
      width: "5.6%",
      cell: (row, index) => (index + 1)
    },
    {
      name: 'Owner Name',
      sortable: false,
      sortField: 'name',
      width: "15%",
      cell: row => row?.userId?.name
    },
    {
      name: 'Image',
      sortable: false,
      sortField: 'image',
      cell: row => <img src={generateFilePath(row?.image)} style={{ height: 50, width: 50 }} />
    },
    {
      name: 'Product Name',
      sortable: false,
      sortField: 'name',
      width: "25%",
      cell: row => row?.productId?.name
    },
    {
      name: 'Message',
      sortable: false,
      sortField: 'discounttype',
      // width: "25%",
      cell: row => row?.message
    },
    {
      name: 'Approved',
      sortable: true,
      sortField: 'status',
      selector: row => row.isVerified,
      width: "15%",
      cell: row => (
        <div className='form-check form-switch'>
          <Input
            type='switch'
            name='customSwitch'
            id={`customSwitch-${row._id}`}
            checked={row.isVerified}
            onChange={e => {
              e.preventDefault()
              // Dispatch the update action to toggle the verified status
              dispatch(
                updatePromotions({
                  isVerified: !row.isVerified, // Toggle the boolean value
                  id: row._id
                })
              ).then(() => {
                // Re-fetch promotions to refresh the page
                handlegetPromotions()
              })
            }}
          />
        </div>
      )
    },
    {
      name: 'Start Date',
      sortable: false,
      sortField: 'S Date',
      cell: row => `${moment(row?.startDate).format("DD-MM-YYYY")}`
    },
    {
      name: 'End Date',
      sortable: false,
      sortField: 'e Date',
      cell: row => `${moment(row?.endDate).format("DD-MM-YYYY")}`
    }
    // {
    //   name: 'Actions',
    //   cell: row => (
    //     <>

    //       <Link color='primary' to={`/Promotions/view-details/${row._id}`} className='btn-sm  btn-primary'>
    //         <Eye size={14} />
    //       </Link>

    //     </>
    //   )
    // }
  ]
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))
    console.log(count, "count", store.total, rowsPerPage, "rowsPerPage")
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }


  return (
    <Fragment>


      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4 mb-2'>
            <Row>
              <Col xl='6' className='d-flex align-items-center p-0'>
                <div className='d-flex align-items-center w-100'>
                  <label htmlFor='rows-per-page'>Show</label>
                  <Input
                    className='mx-50'
                    type='select'
                    id='rows-per-page'
                    value={rowsPerPage}
                    onChange={handlePerPage}
                    style={{ width: '5rem' }}
                  >
                    <option value='1'>1</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                    <option value='500'>500</option>
                  </Input>
                  <label htmlFor='rows-per-page'>Entries</label>
                </div>
              </Col>
              <Col
                xl='6'
                className='d-flex justify-content-end pe-3'
              >
                <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                  <label className='mb-0' htmlFor='search-invoice'>
                    Search:
                  </label>
                  <Input
                    id='search-invoice'
                    className='ms-50 w-100'
                    type='text'
                    value={searchTerm}
                    onChange={e => handleFilter(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <DataTable
            noHeader
            pagination
            paginationServer
            columns={columns}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={FlashSalesArr}
          />
        </div>
      </Card>

    </Fragment>
  )
}

export default SubscriptionList
