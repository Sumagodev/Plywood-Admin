

// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
// import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import _ from 'lodash'
import { toastError, toastSuccess } from '../../../../utility/toastutill'
import { getAllSubscriptionbyUserId, sendMailById } from '../../../../services/UserSubscription.service'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { getReviewForProduct, deleteReviewById} from '../../../../services/product.service'
export default function Review() {
    const { id } = useParams()
    const [userSubscriptionsArr, setUserSubscriptionsArr] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    // ** States
    const [sort, setSort] = useState('desc')
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
    const [totalPages, setTotalPages] = useState(0)
    const [startDate, setstartDate] = useState()
    const [endDate, setEndDate] = useState()
    const handleGetReviews = async (query) => {
        try {
            const { data: res } = await getReviewForProduct(query)
            if (res.data) {
                console.log(res, "userSUb")
                setUserSubscriptionsArr(res.data)
                setTotalPages(res.count)
            }
        } catch (err) {
            toastError(err)
        }
    }


    const deleteProdcutId = async (id) => {
        try {
            const { data: res } = await deleteReviewById(id)
            if (res.message) {
                toastSuccess(res.message)
            handleGetReviews(`q=${searchTerm}&rowsPerPage=${rowsPerPage}&currentPage=${currentPage}`)

            }
        } catch (err) {
            toastError(err)
        }
    }

    useEffect(() => {
            handleGetReviews(`q=${searchTerm}&rowsPerPage=${rowsPerPage}&currentPage=${currentPage}`)
    }, [])

    const columns = [
      {
        name: "Name",
        width: "250px",
        sortable: false,
        selector: (row) => row.name
      },    

      {
        name: "Message",
        minWidth: "500px",
        sortable: false,
        selector: (row) => row.message
      },

      {
        name: "Rating",
        width: "70px",
        sortable: false,
        selector: (row) => row.rating
      },

      {
        name: "Date On",
        width: "150px",
        sortable: false,
        selector: (row) => moment(row.createdAt).format("DD-MM-YYYY")
      },

      {
        name: "Action",
        width: "150px",
        sortable: false,
        cell: (row) => (
          <>
            <Button
              type="button"
              color="success"
              className="btn-sm btn-success"
              onClick={() => deleteProdcutId(row?._id)}
            >
              Delete
            </Button>
          </>
        )
      }
      // {
      //   name: 'Billing',
      //   minWidth: '230px',
      //   sortable: true,
      //   sortField: 'billing',
      //   selector: row => row.billing,
      //   cell: row => <span className='text-capitalize'>{row.billing}</span>
      // },
    ]

     // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    handleGetReviews(`q=${val}&rowsPerPage=${rowsPerPage}&currentPage=${currentPage}`)

    }
    
      const handleFilterByDate = () => {
        handleGetReviews(
          `startDate=${startDate}&endDate=${endDate}&rowsPerPage=${rowsPerPage}&currentPage=1`
        )
      }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        console.log(page.selected, "totalCount")
        handleGetReviews(`q=${searchTerm}&rowsPerPage=${rowsPerPage}&currentPage=${page.selected + 1}`)
        // dispatch(
        //   getAllUsersWithSubsciptionFn({
        //     sort,
        //     sortColumn,
        //     q: searchTerm,
        //     perPage: rowsPerPage,
        //     page: page.selected + 1,
        //     role: currentRole.value,
        //     status: currentStatus.value
        //   })
        // )
        // setCurrentPage(page.selected + 1)
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setCurrentPage(1)
        handleGetReviews(`rowsPerPage=${value}&currentPage=${1}`)
        setRowsPerPage(value)
    }


    const CustomPagination = () => {
        const count = Number(Math.ceil(totalPages / rowsPerPage))

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
      <Card>
        <CardHeader>
          <Col xl="9" className="d-flex align-items-center p-0">
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
          </Col>
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
        </CardHeader>

        <CardBody>
          <Row>
            <div>
              <DataTable
                noHeader
                pagination
                columns={columns}
                paginationServer
                paginationComponent={CustomPagination}
                // sortIcon={<ChevronDown />}
                data={userSubscriptionsArr}
              />
            </div>
          </Row>
        </CardBody>
      </Card>
    )
}