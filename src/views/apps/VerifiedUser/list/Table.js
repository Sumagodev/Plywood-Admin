// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
// ** Custom Components
// ** Store & Actions
// ** Icons Imports
import { approveUserById } from '../../../../services/user.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Invoice List Sidebar

// ** Table Columns

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { deletequickenquries, getAllquickenquries } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, Database, Edit, Edit2, FileText, Settings, Slack, Trash2, User, Eye } from 'react-feather'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

import { store } from "@store/store"


// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Input,
  Label, Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { ROLES_CONSTANT } from '../../../../utility/constant'
// import AddModal from './AddModal'
// import EditModal from './EditModal'

const UsersWithSubscription = () => {
  // ** Store Vars
  const dispatch = useDispatch()


  const userData = useSelector(state => state.VerifiedUser)
  const [selectedUser, setSelectedUser] = useState({})
  // ** States
  const [sort, setSort] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('name')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [rolesOptions, setrolesOptions] = useState([])
  const [editModal, setEditModal] = useState(false)
  const [startDate, setstartDate] = useState()
  const [endDate, setEndDate] = useState()
  // ** Function to toggle sidebar

  // ** Get data on mount
  useEffect(() => {
    // dispatch(getAllData())
    dispatch(
      getAllquickenquries({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        showName: true
        // currentPlan: currentPlan.value
      })
    )
    // ** Set Roles


  }, [dispatch, userData?.data?.length, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getAllquickenquries({
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
      getAllquickenquries({
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
      getAllquickenquries({
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

  const handleFilterByDate = () => {
    dispatch(
      getAllquickenquries({
        sort,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        startDate,
        endDate
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(userData.total / rowsPerPage))

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


  const handleStatus = async (id, status) => {
    try {
      const obj = {
        status
      }
      const { data: res } = await approveUserById(id, obj)
      if (res.message) {
        toastSuccess(res.message)
      }
    } catch (error) {
      toastError(error)
    }
  }


  // ** Renders Role Columns
  const renderRole = row => {
    const roleObj = {
      USER: {
        class: 'text-primary',
        icon: User
      },
      MANUFACTURER: {
        class: 'text-success',
        icon: Database
      },
      editor: {
        class: 'text-info',
        icon: Edit2
      },
      DISTRIBUTOR: {
        class: 'text-warning',
        icon: Settings
      },
      DEALER: {
        class: 'text-danger',
        icon: Slack
      },
      APPROVERS: {
        class: 'text-danger',
        icon: Slack
      }
    }

    const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

    return (
      <span className='text-truncate text-capitalize align-middle'>
        <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
        {row.role}
      </span>
    )
  }


  useEffect(() => {
    console.log(userData, "userData")
  }, [userData])


  const columns = [
    // {
    //   name: 'User',
    //   sortable: true,
    //   minWidth: '300px',
    //   sortField: 'fullName',
    //   selector: row => row.name,
    //   cell: row => (
    //     <div className='d-flex justify-content-left align-items-center'>
    //       {/* {renderClient(row)} */}
    //       <div className='d-flex flex-column'>
    //         <Link
    //           to={``}
    //           className='user_name text-truncate text-body'
    //           onClick={() => dispatch(getUser(row.id))}
    //         >
    //           <span className='fw-bolder'>{row.name}</span>
    //         </Link>
    //         <small className=' mb-0'>{row.email}</small>
    //       </div>
    //     </div>
    //   )
    // },
    // {
    //   name: 'Role',
    //   sortable: true,
    //   minWidth: '172px',
    //   sortField: 'role',
    //   selector: row => row?.role,
    //   cell: row => renderRole(row)
    // },
    {
      name: 'S.no',
      sortable: false,
      sortField: 'index',
      width: "10%",
      cell: (row, index) => (index + 1)
    },
    {
      name: 'Phone',
      minWidth: '230px',
      sortable: true,
      sortField: 'phone',
      selector: row => row.phone,
      cell: row => <span className='text-capitalize'>{row.phone}</span>
    },
    {
      name: 'verifiedAt',
      minWidth: '230px',
      sortable: true,
      sortField: 'verifiedAt',
      selector: row => row.verifiedAt,
      // cell: row => <span className='text-capitalize'>{row.verifiedAt}</span>
      cell: row => new Date(row.verifiedAt).toDateString()

    },

    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <>

          <Button color='danger' className='ms-2 btn-sm'
            onClick={e => {
              e.preventDefault()
              store.dispatch(deletequickenquries(row._id))
            }}
          >    <Trash2 size={14} /></Button>
        </>

      )
    }
  ]

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="mx-2 pt-2 ">
          <Row>
            <Col xl="3" className="d-flex justify-content-start">
              <h3>
                <b> Verifed Users</b>
              </h3>
            </Col>
            {/* <Col xl="2" className="d-flex align-items-center p-0">
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
                  <option value="100">100</option>
                  <option value="500">500</option>
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
            </Col> */}
            {/* <Col xl="7" className="d-flex justify-content-end">
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

              <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                Add New User
              </Button>
            </Col> */}
          </Row>
        </div>
        <div>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationServer
            paginationComponent={CustomPagination}
            // sortIcon={<ChevronDown />}
            data={userData.data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersWithSubscription
