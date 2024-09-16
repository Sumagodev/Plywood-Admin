// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Table Columns

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getLeads } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'

// ** Utils
// ** Reactstrap Imports


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import moment from 'moment'
import AddModal from './AddModal'

import { User } from 'react-feather'
import {
  Button, Card,
  Col, Input,
  Row
} from 'reactstrap'

const SubscriptionList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.Leads)
  const FlashSalesArr = useSelector(state => state.Leads.data)
  const allData = useSelector(state => state.products.allData)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [dataArr, setDataArr] = useState([])

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [selectedUser, setSelectedUser] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)


  useEffect(() => {
    setDataArr(FlashSalesArr)
  }, [FlashSalesArr])


  useEffect(() => {

    const tempDate = new Date()
    tempDate.setMonth(tempDate.getMonth() - 1)
    setStartDate(tempDate)

  }, [])

  // ** Function in get data on rows per page


  const handlePagination = page => {
    dispatch(
      getLeads({
        sort,
        sortColumn,
        q: searchTerm,
        startDate,
        endDate,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)

    dispatch(getLeads({
      sort,
      sortColumn,
      q: searchTerm,
      startDate,
      endDate,
      perPage: value,
      page: 1
    }))
    setRowsPerPage(value)
  }

  const handleGetFlashSales = () => {
    dispatch(getLeads({
      sort,
      sortColumn,
      q: searchTerm,
      startDate,
      endDate,
      perPage: rowsPerPage,
      page: currentPage
    }))
  }


  useEffect(() => {
    handleGetFlashSales()
  }, [startDate, endDate])


  useEffect(() => {
    console.log(FlashSalesArr, "FlashSalesArr")
  }, [FlashSalesArr])


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getLeads({
        sort,
        sortColumn,
        q: val,
        startDate,
        endDate,
        perPage: rowsPerPage,
        page: currentPage
      })
    )
  }

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


  const columns = [
    {
      name: 'S.no',
      sortable: false,
      sortField: 'index',
      width: "5.6%",
      cell: (row, index) => (index + 1)
    },
    {
      name: 'Name',
      sortable: false,
      sortField: 'name',
      width: "15%",
      cell: row => row?.name
    },
    {
      name: 'Sale count',
      sortable: false,
      sortField: 'name',
      width: "25%",
      cell: row => row?.salesCount
    },
    {
      name: 'Role',
      sortable: false,
      sortField: 'e Date',
      cell: row => row?.role
    },
    {
      name: 'Joined On',
      sortable: false,
      sortField: 'e Date',
      cell: row => `${moment(row?.createdAt).format("DD-MM-YYYY")}`

    },
    {
      name: 'View Users',
      sortable: false,
      sortField: 'aaaaa',
      selector: row => <Button color='primary' onClick={(e) => { e.preventDefault(); setSelectedUser(row.salesArr); toggleSidebar() }} className='btn-sm ms-2 '

      >
        <User size={14} />
      </Button>

    }

  ]

  return (
    <Fragment>


      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4 mb-2'>
            <Row>
              <Col xl='8' className='d-flex align-items-center p-0'>
                <div className='d-flex align-items-center' style={{ margin: "0px 35px 0px 0px" }}>
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


                <div className='d-flex align-items-center w-100'>
                  <label>Start Date</label>
                  <Input
                    className='mx-50'
                    type='date'
                    value={moment(startDate).format("YYYY-MM-DD")}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ width: '15rem' }}
                  />
                </div>
                <div className='d-flex align-items-center w-100'>
                  <label>End Date</label>
                  <Input
                    className='mx-50'
                    type='date'
                    value={moment(endDate).format("YYYY-MM-DD")}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ width: '15rem' }}
                  />
                </div>
              </Col>
              <Col
                xl='4'
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
      <AddModal open={sidebarOpen} selectedUser={selectedUser} toggleSidebar={toggleSidebar} />

    </Fragment>
  )
}

export default SubscriptionList
