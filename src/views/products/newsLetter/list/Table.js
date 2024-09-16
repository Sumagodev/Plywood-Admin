// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// import { getnewsLetters } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import ReactPaginate from 'react-paginate'
// ** Utils
// ** Reactstrap Imports
import {
  Button,
  Card,
  Col,
  Input,
  Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getnewsLetters } from '../store'

// ** Table Header


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const newsLetter = useSelector(state => state.newsLetter)
  // const brand = useSelector(state => state.brands.brand)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('name')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
      const [startDate, setstartDate] = useState()
      const [endDate, setEndDate] = useState()
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getnewsLetters({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage,
      role: currentRole.value,
      status: currentStatus.value
    }))
  }, [])
  useEffect(() => {


  }, [dispatch, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getnewsLetters({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)
    dispatch(
      getnewsLetters({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: 1,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getnewsLetters({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(newsLetter.total / rowsPerPage))

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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    console.log(newsLetter, "newsLetterdsdds")
    if (newsLetter.newsLetter.length > 0) {
      return newsLetter.newsLetter
    } else if (!newsLetter || (newsLetter.newsLetter.length === 0 && isFiltered)) {
      return []
    } else {
      return newsLetter?.newsLetter?.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getnewsLetters({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
  }
  const handleFilterByDate = () => {
       dispatch(
         getnewsLetters({
           sort,
           sortColumn,
           page: currentPage,
           perPage: rowsPerPage,
           startDate,
           endDate
         })
       )

  }

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="invoice-list-table-header w-100 px-4 ms-50 mt-2">
          <Row>
            <Col xl="6" className="d-flex align-items-center p-0">
              <div className="d-flex align-items-center w-100">
                <label htmlFor="rows-per-page">Show</label>
                <Input
                  className="mx-50"
                  type="select"
                  id="rows-per-page"
                  value={rowsPerPage}
                  onChange={handlePerPage}
                  style={{ width: "5rem" }}
                >
                  <option value="1">1</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Input>
                <label htmlFor="rows-per-page">Entries</label>
              </div>
              <div className="d-flex align-items-center">
                <label className="mb-0" htmlFor="search-invoice">
                  Filter
                </label>
                <Input
                  id="search-invoice"
                  className="ms-50 w-100"
                  type="date"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                />
                <Input
                  id="search-invoice"
                  className="ms-50 w-100"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button color="primary" onClick={() => handleFilterByDate()}>
                Filter
              </Button>
            </Col>
            <Col
              xl="6"
              className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
            >
              <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                <label className="mb-0" htmlFor="search-invoice">
                  Search:
                </label>
                <Input
                  id="search-invoice"
                  className="ms-50 w-100"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </div>

              <div className="d-flex align-items-center table-header-actions">
                <Button
                  className="add-new-user"
                  color="primary"
                  onClick={toggleSidebar}
                >
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersList