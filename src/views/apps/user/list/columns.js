// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap'
import { approveUserById } from '../../../../services/user.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'
import { useSelector } from 'react-redux'
import { ROLES_CONSTANT } from '../../../../utility/constant'

// ** Renders Client Columns
const role = useSelector(state => state.auth.userData.role)

const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
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
const handleisBlocked = async (id, isBlocked) => {
  try {
    const obj = {
      isBlocked
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

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {/* {renderClient(row)} */}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
          <small className=' mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row?.role,
    cell: row => renderRole(row)
  },
  // {
  //   name: 'Plan',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'currentPlan',
  //   selector: row => row.currentPlan,
  //   cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  // },
  // {
  //   name: 'Billing',
  //   minWidth: '230px',
  //   sortable: true,
  //   sortField: 'billing',
  //   selector: row => row.billing,
  //   cell: row => <span className='text-capitalize'>{row.billing}</span>
  // },
  {
    name: 'Approved',
    minWidth: '138px',
    sortable: true,
    sortField: 'approved',
    selector: row => row.approved,
    cell: row => (
      <div className='form-check form-switch'>
        <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked={row.approved} onChange={() => handleStatus(row._id, !row.approved)} />
        {role}
      </div>
      // <Badge className='text-capitalize' color={statusObj[row.approved === true ? 'active' : 'inactive']} pill>


      // </Badge>
    )
  },
  {
    name: 'Blocked',
    minWidth: '138px',
    sortable: true,
    sortField: 'isBlocked',
    selector: row => row.isBlocked,
    cell: row => (
      <div className='form-check form-switch'>
        <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked={row.isBlocked} onChange={() => handleisBlocked(row._id, !row.isBlocked)} />

      </div>
      // <Badge className='text-capitalize' color={statusObj[row.approved === true ? 'active' : 'inactive']} pill>


      // </Badge>
    )
  },
  {

    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <>

        <Link color='success' className='btn-sm btn-success asdfasdf' to={`/apps/user/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >     <FileText size={14} /></Link>

        <Button color='primary' className='btn-sm ms-2 '
        >
          <Edit size={14} />
        </Button>
        {
          role !== ROLES_CONSTANT.FIELDUSER || role !== ROLES_CONSTANT.SALES &&
          <Button color='danger' className='ms-2 btn-sm'
            onClick={e => {
              e.preventDefault()
              store.dispatch(deleteUser(row._id))
            }}
          >    <Trash2 size={14} /></Button>
        }
      </>
    )
  }
]
