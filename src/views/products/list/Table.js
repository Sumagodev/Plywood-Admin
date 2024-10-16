// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getProduct, deleteProduct, updateProduct } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit, ChevronDown } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input, Label, Row, Col, Card } from 'reactstrap'
import { updateProductApi } from '../../../services/product.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { ROLES_CONSTANT } from '../../../utility/constant'

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
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
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
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

          <div className='d-flex align-items-center table-header-actions'>
            {/* <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}

            <Link to="/products/add-products" className='add-new-user btn btn-primary' color='primary'>
              Add New
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)
  const allData = useSelector(state => state.products.allData)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [rolesOptions, setrolesOptions] = useState([])

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleStatus = async (id, status) => {
    try {
      // Create an object with the new status
      const obj = {
        approved: status // Directly use the status passed from the radio buttons
      }

      // Call the API to update the product status
      const { data: res } = await updateProductApi(obj, id)

      // Show success message if the response contains a message
      if (res.message) {
        toastSuccess(res.message)
      }
      dispatch(getProduct({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: currentPage,
        role: currentRole.value,
        status: currentStatus.value
      }))
    } catch (error) {
      // Show error message if the API call fails
      toastError(error)
    }
  }


  // ** Get data on mount
  useEffect(() => {
    dispatch(getProduct({
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
    // dispatch(
    //   getProduct({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value
    //     // currentPlan: currentPlan.value
    //   })
    // )
    // ** Set Roles

    const roleSelect = Object.values(ROLES_CONSTANT).map(el => {
      return { label: el, value: el }
    })
    setrolesOptions(roleSelect)

  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** User filter options
  // const roleOptions = [
  //   { value: '', label: 'Select Role' },
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'author', label: 'Author' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'maintainer', label: 'Maintainer' },
  //   { value: 'subscriber', label: 'Subscriber' }
  // ]

  // const planOptions = [
  //   { value: '', label: 'Select Plan' },
  //   { value: 'basic', label: 'Basic' },
  //   { value: 'company', label: 'Company' },
  //   { value: 'enterprise', label: 'Enterprise' },
  //   { value: 'team', label: 'Team' }
  // ]

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'active', label: 'Active', number: true },
    { value: 'inactive', label: 'Inactive', number: false }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getProduct({
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
      getProduct({
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
      getProduct({
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
    const count = Number(Math.ceil(store.total / rowsPerPage))

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
    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getProduct({
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


  useEffect(() => {
    if (store.selectedCategory !== null) {
      toggleSidebar()
    }

  }, [store.selectedCategory])
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  }

  const columns = [
    // {
    //   name: 'S.no.',
    //   sortable: false,
    //   sortField: 'name',
    //   width: "25%",
    //   cell: (row, i) => i + 1
    // },
    {
      name: 'Name',
      sortable: true,
      sortField: 'name',
      width: "20%",
      cell: row => row.name
    },
    {
      name: 'Price',
      sortable: true,
      sortField: 'Price',
      width: "10%",
      cell: row => row.price
    },
    {
      name: 'Status',
      sortable: true,
      sortField: 'status',
      selector: row => row.status,
      width: "10%",
      cell: row => (
        <Badge style={{ cursor: "pointer" }} className='text-capitalize'
          onClick={e => {
            e.preventDefault()
            store.dispatch(
              updateProduct({
                status: !row.status,
                id: row._id
              })
            )
          }}
          color={statusObj[row.status === true ? 'active' : 'inactive']} pill>
          {row.status === true ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      name: 'Actions',
      width: "40%",
      cell: row => (
        <>
          {/* Radio Buttons for Status */}
          <div className="d-flex align-items-center">
            {/* Approved Radio Button */}
            <div className="form-check form-check-inline me-2">
              <Input
                type="radio"

                name={`status-${row._id}`}
                id={`approved-${row._id}`}
                checked={row.approved === "APPROVED"}
                onChange={() => handleStatus(row._id, "APPROVED")}


              />
              <Label for={`approved-${row._id}`} className="form-check-label">
                Approved
              </Label>
            </div>

            {/* Pending Radio Button */}
            <div className="form-check form-check-inline me-2">
              <Input
                type="radio"
                name={`status-${row._id}`}
                id={`pending-${row._id}`}
                checked={row.approved === "PENDING"}
                onChange={() => handleStatus(row._id, "PENDING")}
              />
              <Label for={`pending-${row._id}`} className="form-check-label">
                Pending
              </Label>
            </div>

            {/* Rejected Radio Button */}
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                name={`status-${row._id}`}
                id={`rejected-${row._id}`}
                checked={row.approved === "REJECTED"}
                onChange={() => handleStatus(row._id, "REJECTED")}
              />
              <Label for={`rejected-${row._id}`} className="form-check-label">
                Rejected
              </Label>
            </div>
          </div>       
        </>
      )
    },
    {
      name: 'Actions',
      width: "10%",
      cell: row => (
        <>

          <Link color='primary' to={`/products/edit-product/${row._id}`} className='btn-sm ms-2  btn-primary' onClick={() => {

            store.dispatch(getProduct(row._id))
          }}>     <Edit size={14} /></Link>
          <Button color='danger' className='ms-2 btn-sm'
            onClick={e => {
              e.preventDefault()
              store.dispatch(deleteProduct(row._id))
            }}
          >    <Trash2 size={14} /></Button>
        </>
        // <div className='column-action'>
        //   <UncontrolledDropdown>
        //     <DropdownToggle tag='div' className='btn btn-sm'>
        //       <MoreVertical size={14} className='cursor-pointer' />
        //     </DropdownToggle>
        //     <DropdownMenu>
        //       <DropdownItem tag='a' href='/' className='w-100' onClick={e => { 
        //         e.preventDefault() 
        //         store.dispatch(getProduct(row._id))
        //         }}
        //         >
        //         <Archive size={14} className='me-50' />
        //         <span className='align-middle'>Edit</span>
        //       </DropdownItem>
        //       <DropdownItem
        //         tag='a'
        //         href='/'
        //         className='w-100'
        //         onClick={e => {
        //           e.preventDefault()
        //           store.dispatch(deleteProduct(row._id))
        //         }}
        //       >
        //         <Trash2 size={14} className='me-50' />
        //         <span className='align-middle'>Delete</span>
        //       </DropdownItem>
        //     </DropdownMenu>
        //   </UncontrolledDropdown>
        // </div>
      )
    }
  ]
  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={rolesOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setCurrentRole(data)
                  dispatch(
                    getProduct({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col>
            {/* <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={planOptions}
                value={currentPlan}
                onChange={data => {
                  setCurrentPlan(data)
                  dispatch(
                    getProduct({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col> 
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getProduct({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            paginationServer
            responsive
            paginationComponent={CustomPagination}
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

    </Fragment>
  )
}

export default UsersList
