// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { deleteadvertisementbanners, getadvertisementbanners, getadvertisementbannerssById, updateadvertisementbanners } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'

// ** Utils
// ** Reactstrap Imports
import {
  Button,
  Card, Col, Input, Row, Badge
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import AddModal from './AddModal'
import { generateFilePath } from '../../../services/url.service'
import { Eye, Trash } from 'react-feather'


const TicketList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.advertisementbanners)
  const FlashSalesArr = useSelector(state => state.advertisementbanners.data)

  const [dataArr, setDataArr] = useState([])


  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setDataArr(FlashSalesArr)
  }, [FlashSalesArr])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Function in get data on rows per page


  const handlePagination = page => {
    dispatch(
      getadvertisementbanners({
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

    dispatch(getadvertisementbanners({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: value,
      page: 1
    }))
    setRowsPerPage(value)
  }

  const handleGetFlashSales = () => {
    dispatch(getadvertisementbanners({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage
    }))
  }
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  }

  useEffect(() => {
    handleGetFlashSales()
  }, [])


  useEffect(() => {
    console.log(FlashSalesArr, "FlashSalesArr")
  }, [FlashSalesArr])


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getadvertisementbanners({
        sort,
        sortColumn,
        q: val,
        perPage: rowsPerPage,
        page: currentPage
      })
    )
  }


  const handleDeleteadvertisementbanners = (e, row) => {

    e.preventDefault()
    if (confirm("Are you sure you want to delete this banner ?")) {
      dispatch(deleteadvertisementbanners(row._id))
    }
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
      name: 'Image',
      sortable: false,
      sortField: 'image',
      selector: row => <img src={generateFilePath(row?.image)} style={{ height: 50, width: 50 }} />
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
            checked={row.isVerified} // Use the boolean value directly
            onChange={e => {
              e.preventDefault()
              dispatch(
                updateadvertisementbanners({
                  isVerified: !row.isVerified, // Toggle the boolean value
                  id: row._id
                })
              )
            }}
          />
        </div>
      )
    },
    {
      name: 'Actions',
      cell: row => (
        <>

          <Button color='primary' onClick={(e) => { e.preventDefault(); dispatch(getadvertisementbannerssById(row._id)); toggleSidebar() }} className='btn-sm  btn-primary'>
            <Eye size={14} />
          </Button>
          <Button color='danger' onClick={(e) => { handleDeleteadvertisementbanners(e, row) }} className='btn-sm  ms-3 btn-primary'>
            <Trash size={14} />
          </Button>

        </>

      )
    }
  ]

  return (
    <Fragment>


      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4 mb-2'>
          
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
      <AddModal open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default TicketList
