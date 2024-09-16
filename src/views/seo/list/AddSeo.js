// ** Reactstrap Imports
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label } from 'reactstrap'
import { addSeoApi } from '../../../services/Seo.service'
import { generateFilePath } from '../../../services/url.service'
import FileUpload from '../../../utility/FileUpload'
import { toastError } from '../../../utility/toastutill'
import { addSeo, getSeoById, updateSeo } from '../store'
const AddSeo = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogObj = useSelector(state => state.Seo.selectedSeo)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])

  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }

    if (`${url}` === '') {
      toastError('Please Fill Url')
      return 0
    }

    if (isEditing === true) {
      dispatch(
        updateSeo({
          name,
          title,
          image,
          description,
          keywords,
          url,
          id
        })
      )
    } else {
      dispatch(
        addSeo({
          name,
          url,
          title,
          image,
          description,
          keywords
        })
      )
    }
  }
  useEffect(() => {
    if (blogObj && blogObj.name && isEditing) {
      setname(blogObj?.name ? blogObj?.name : "")
      setUrl(blogObj?.url ? blogObj?.url : "")
      setTitle(blogObj?.title ? blogObj?.title : "")
      setKeywords(blogObj?.keywords ? blogObj?.keywords : "")
      setDescription(blogObj?.description ? blogObj?.description : "")
      setImage(blogObj?.image ? blogObj?.image : "")
    } else {
      setname("")
      setUrl([])
    }

  }, [blogObj, isEditing])


  const handlegetBlogsById = () => {
    dispatch(getSeoById(id))
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
        <Link to="/seo/view" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Blog Seo</CardTitle>
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
            Seo Url
          </Label>
          <Input type='text' id='basicInput' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter Page Url' />
        </Col>
        <Col className='mb-1' xl='6' md='6' sm='12'>
          <Label className='form-label' for='basicInput'>
            Title
          </Label>
          <Input type='text' id='basicInput' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Page Title' />
        </Col>

        <Col className='mb-1' xl='6' md='6' sm='12'>
          <Label className='form-label' for='basicInput'>
            Description
          </Label>
          <Input type='textarea' id='basicInput' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Page Description' />
        </Col>


        <Col className='mb-1' xl='6' md='6' sm='12'>
          <Label className='form-label' for='basicInput'>
            Keywords
          </Label>
          <Input type='text' id='basicInput' value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder='Enter Page Keywords' />
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
export default AddSeo
