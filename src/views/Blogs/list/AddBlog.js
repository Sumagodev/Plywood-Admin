// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { addBlogs, getBlogsById, updateBlogs } from '../store'
import _ from 'lodash'
import QuillEditor from '../../../QuillEditor'
import { toastError } from '../../../utility/toastutill'
import FileUpload from '../../../utility/FileUpload'
import { generateFilePath } from '../../../services/url.service'
const Addblog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogObj = useSelector(state => state.Blogs.selectedBlogs)
  const [selectedSubscription, setSelectedSubscription] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [durationInDays, setDurationInDays] = useState(0)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])
  const [numberOfPromotions, setNumberOfPromotions] = useState(0)

  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }

    if (`${description}` === '') {
      toastError('Please Fill Description')
      return 0
    }

    if (isEditing === true) {
      dispatch(
        updateBlogs({
          name,
          description,
          image,
          id
        })
      )
    } else {
      dispatch(
        addBlogs({
          name,
          description
        })
      )
    }
  }
  useEffect(() => {
    if (blogObj && blogObj.name && isEditing) {
      setname(blogObj?.name ? blogObj?.name : "")
      setDescription(blogObj?.description ? blogObj?.description : "")
      setDurationInDays(blogObj?.durationInDays ? blogObj?.durationInDays : "")
      setImage(blogObj?.image ? blogObj?.image : "")
      setPrice(blogObj?.price ? blogObj?.price : "")
      setNumberOfPromotions(blogObj?.numberOfPromotions ? blogObj?.numberOfPromotions : "")
      setMessageArr(blogObj?.messageArr ? blogObj?.messageArr : [{ message: "" }])
    } else {
      setname("")
      setDescription("")
      setDurationInDays("")
      setPrice("")
      setNumberOfPromotions("")
      setMessageArr([])
    }

  }, [blogObj, isEditing])


  const handlegetBlogsById = () => {
    dispatch(getBlogsById(id))
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
        <Link to="/blogs/view" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Blog</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Name
            </Label>
            <Input type='text' id='basicInput' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Subscription Name' />
          </Col>
          <Col className='mb-1' xl='12' md='12' sm='12'>
            <Label className='form-label' for='basicInput'>
              Image (width:522px and height:280px)
            </Label>
            <div>
              {
                image.includes("base64") ? <img src={image} style={{ height: 100, width: 100 }} alt="" srcset="" /> : <img src={generateFilePath(image)} style={{ height: 100, width: 100 }} alt="" srcset="" />
              }
            </div>
            <FileUpload onFileChange={setImage} />
          </Col>

          <Col className='mb-1 d-flex justify-content-between' xl='12' md='12' sm='12'>
            <Label for='basicInput'>
              Message
            </Label>

          </Col>
          <Col className='mb-1 d-flex' xl='12' md='12' sm='12'>
            <QuillEditor handleChange={setDescription} value={description} />
          </Col>

          <Col className='mb-1 mt-4' xl='12' md='12' sm='12'>
            <Button type='button' className='me-1' color='primary' onClick={() => onSubmit()}>
              Submit
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card >
  )
}
export default Addblog
