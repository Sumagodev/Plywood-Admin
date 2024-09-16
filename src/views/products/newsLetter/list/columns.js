// ** React Imports

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions

// ** Icons Imports
import { Database, Edit2, Settings, Slack, User } from 'react-feather'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'
import { generateFilePath } from '../../../../services/url.service'

// ** Renders Client Columns
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

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
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
    name: 'Email',
    sortable: true,
    sortField: 'name',
    width: "25%",
    cell: row => row.email
  }
  // {
  //   name: 'Image',
  //   sortable: true,
  //   sortField: 'level',
  //   width: "25%",
  //   cell: row => <a href={generateFilePath(row.image)} target="_blank"><img src={generateFilePath(row.image)} style={{ height: 50, width: 50 }} alt="" srcset="" /></a>
  // },
  // {
  //   name: 'Status',
  //   sortable: true,
  //   sortField: 'status',
  //   selector: row => row.status,
  //   cell: row => (
  //     <Badge className='text-capitalize' color={statusObj[row.status === true ? 'active' : 'inactive']} pill>
  //       {row.status === true ? 'Active' : 'Inactive'}
  //     </Badge>
  //   )
  // }
]
