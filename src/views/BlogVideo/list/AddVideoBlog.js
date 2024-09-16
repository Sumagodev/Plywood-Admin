// ** Reactstrap Imports
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label } from 'reactstrap'
import { addBlogVideoApi } from '../../../services/BlogVideo.service'
import { generateFilePath } from '../../../services/url.service'
import FileUpload from '../../../utility/FileUpload'
import { toastError } from '../../../utility/toastutill'
import { addBlogVideo, getBlogVideoById, updateBlogVideo } from '../store'
const AddblogVideo = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogObj = useSelector(state => state.BlogVideo.selectedBlogVideo)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])

  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }

    if (isEditing === true) {
      dispatch(
        updateBlogVideo({
          name,
          url,
          id
        })
      )
    } else {
      dispatch(
        addBlogVideo({
          name,
          url
        })
      )
    }
  }
  useEffect(() => {
    if (blogObj && blogObj.name && isEditing) {
      setname(blogObj?.name ? blogObj?.name : "")
      setUrl(blogObj?.url ? blogObj?.url : "")
    } else {
      setname("")
      setUrl([])
    }

  }, [blogObj, isEditing])


  const handlegetBlogsById = () => {
    dispatch(getBlogVideoById(id))
  }

  useEffect(() => {
    // console.log(id ? "true" : "false")
    if (id) {
      handlegetBlogsById()
      setIsEditing(true)
    }

  }, [id])


  const handleaddBlogs = () => {
    let tempArr = messageArr
    tempArr = [...tempArr]
    tempArr.push({ message: "" })
    setMessageArr([...tempArr])
  }


  const handleRemoveSubscription = () => {
    let tempArr = messageArr
    tempArr = [...tempArr]
    if (tempArr.length > 1) {
      tempArr.pop()
      setMessageArr([...tempArr])
    }
  }

  const handleSetMessge = (value, index) => {
    const tempArr = _.cloneDeep(messageArr)
    // setMessageArr(messageArr.map((ele, indexX) => {
    //   if (indexX === index) {
    //     ele.message = value
    //   }
    //   return ele
    // }))
    tempArr[index].message = value
    setMessageArr([...tempArr])

  }

  return (
    <Card>
      <CardHeader>
        <Link to="/blogs-video/view" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Blog Video</CardTitle>
      </CardHeader>

      <CardBody>
        {/* <Row> */}
        <Col className='mb-1' xl='6' md='6' sm='12'>
          <Label className='form-label' for='basicInput'>
            Name
          </Label>
          <Input type='text' id='basicInput' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Name' />
        </Col>
        <Col className='mb-1' xl='6' md='6' sm='12'>
          <Label className='form-label' for='basicInput'>
            Video Url
          </Label>
          <Input type='text' id='basicInput' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter Url' />
        </Col>

        <Col className='mb-1 mt-4' xl='12' md='12' sm='12'>
          <Button type='button' className='me-1' color='primary' onClick={() => onSubmit()}>
            Submit
          </Button>
        </Col>
        {/* </Row> */}
      </CardBody>
    </Card >
  )
}
export default AddblogVideo
