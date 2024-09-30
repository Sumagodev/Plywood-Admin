// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { addTopup, getTopupById, updateTopup } from '../store'
import _ from 'lodash'
import { toastError } from '../../../utility/toastutill'
import { ROLES_CONSTANT } from '../../../utility/constant'
import Select from 'react-select'

const AddTopup = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const TopupObj = useSelector(state => state.topup.selectedTopup)
  const [selectedTopup, setSelectedTopup] = useState({})

  const [includesFlashSales, setIncludesFlashSales] = useState(false)
  const [includesAdvertisements, setIncludesAdvertisements] = useState(false)
  const [includesOpportunities, setIncludesOpportunities] = useState(false)
  const [includesBannerImages, setIncludesBannerImages] = useState(false)


  const [isEditing, setIsEditing] = useState(false)
  const [name, setname] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [messageArr, setMessageArr] = useState([{ message: "" }])
  const [numberOfSales, setNumberOfSales] = useState(0)
  const [saleDays, setSaleDays] = useState(0)
  const [numberOfAdvertisement, setNumberOfAdvertisement] = useState(0)
  const [advertisementDays, setAdvertisementDays] = useState(0)

  const [numberOfOpportunity, setNumberOfOpportunity] = useState(0)
  const [opportunityDays, setOpportunityDays] = useState(0)

  const [numberOfBannerImages, setNumberOfBannerImages] = useState(0)
  const [bannerimagesDays, setBannerImagesDays] = useState(0)

  const [rolesOptions, setrolesOptions] = useState([])
  const [role, setRole] = useState("")

  const onSubmit = () => {

    if (`${name}` === '') {
      toastError('Please Fill Name')
      return 0
    }

    if (`${price}` === '' || price <= 0) {
      toastError('Please Fill Price with a valid input (more than 0)')
      return 0
    }
    // if (`${description}` === '') {
    //   toastError('Please Fill Description')
    //   return 0
    // }

    if (includesAdvertisements) {

      if (parseInt(numberOfAdvertisement) < 0) {
        toastError('Please Fill No of Advertisement with a valid input (more than 0)')
        return 0
      }

      if (parseInt(advertisementDays) < 0) {
        toastError('Please Fill No of days of Advertisement with a valid input (more than 0)')
        return 0
      }

    }

    if (includesFlashSales) {

      if (parseInt(numberOfSales) < 0) {
        toastError('Please Fill No of Flashsales with a valid input (more than 0)')
        return 0
      }
      if (parseInt(saleDays) < 0) {
        toastError('Please Fill No of days of Flashsales with a valid input (more than 0)')
        return 0
      }

    }

    if (includesOpportunities) {

      if (parseInt(numberOfOpportunity) < 0) {
        toastError('Please Fill No of Opportunity with a valid input (more than 0)')
        return 0
      }
      if (parseInt(opportunityDays) < 0) {
        toastError('Please Fill No of days of Opportunity with a valid input (more than 0)')
        return 0
      }
    }

    if (includesBannerImages) {

      if (parseInt(numberOfBannerImages) < 0) {
        toastError('Please Fill No of Banner with a valid input (more than 0)')
        return 0
      }
      if (parseInt(bannerimagesDays) < 0) {
        toastError('Please Fill No of days of Banner with a valid input (more than 0)')
        return 0
      }
    }

    if (parseInt(price) < 0) {
      toastError('Please Fill Price with a valid input (more than 0)')
      return 0
    }

    if (!role || !role?.value) {
      toastError('Please Select Role for Topup')
      return 0
    }

    const obj = {
      name,
      price,
      description,
      messageArr,
      includesFlashSales,
      includesAdvertisements,
      includesOpportunities,
      includesBannerImages,
      role: role?.value
    }

    if (includesAdvertisements) {
      obj.numberOfAdvertisement = numberOfAdvertisement
      obj.advertisementDays = advertisementDays
    }


    if (includesFlashSales) {
      obj.numberOfSales = numberOfSales
      obj.saleDays = saleDays
    }

    if (includesOpportunities) {
      obj.numberOfOpportunity = numberOfOpportunity
      obj.opportunityDays = opportunityDays
    }

    if (includesBannerImages) {
      obj.numberOfBannerImages = numberOfBannerImages
      obj.bannerimagesDays = bannerimagesDays
    }

    if (isEditing === true) {
      dispatch(
        updateTopup({
          ...obj,
          id
        })
      )
    } else {
      dispatch(
        addTopup(obj)
      )
    }
  }
  useEffect(() => {
    if (TopupObj && TopupObj.name && isEditing) {
      setname(TopupObj?.name ? TopupObj?.name : "")
      if (TopupObj?.role) {
        setRole({ label: TopupObj?.role, value: TopupObj?.role })
      }
      setDescription(TopupObj?.description ? TopupObj?.description : "")
      setPrice(TopupObj?.price ? TopupObj?.price : "")
      setSaleDays(TopupObj?.saleDays ? TopupObj?.saleDays : "")
      setNumberOfSales(TopupObj?.numberOfSales ? TopupObj?.numberOfSales : "")
      setMessageArr(TopupObj?.messageArr ? TopupObj?.messageArr : [{ message: "" }])
      setIncludesFlashSales(TopupObj?.includesFlashSales)
      setIncludesAdvertisements(TopupObj?.includesAdvertisements)
      setNumberOfAdvertisement(TopupObj?.numberOfAdvertisement)
      setAdvertisementDays(TopupObj?.advertisementDays)

      setIncludesOpportunities(TopupObj?.includesOpportunities)
      setNumberOfOpportunity(TopupObj?.numberOfOpportunity)
      setOpportunityDays(TopupObj?.opportunityDays)

      setIncludesBannerImages(TopupObj?.includesBannerImages)
      setNumberOfBannerImages(TopupObj?.numberOfBannerImages)
      setBannerImagesDays(TopupObj?.bannerimagesDays)
    } else {
      setname("")
      setDescription("")
      setRole("")
      setPrice(1)
      setSaleDays(0)
      setIncludesFlashSales(false)
      setIncludesAdvertisements(false)
      setNumberOfAdvertisement(0)
      setAdvertisementDays(0)

      setIncludesOpportunities(false)
      setNumberOfOpportunity(0)
      setOpportunityDays(0)

      setIncludesBannerImages(false)
      setNumberOfBannerImages(0)
      setBannerImagesDays(0)

      setNumberOfSales(1)
      setMessageArr([{ message: "" }])
    }

  }, [TopupObj, isEditing])


  const handlegetTopupById = () => {
    dispatch(getTopupById(id))
  }

  useEffect(() => {
    const roleSelect = [...Object.values(ROLES_CONSTANT).map(el => {
      return { label: el, value: el }
    })].filter((el => (el.label !== "ADMIN" || el.label !== ROLES_CONSTANT.FIELDUSER || el.label !== ROLES_CONSTANT.SUBADMIN)))
    setrolesOptions([...roleSelect])

    if (id) {
      handlegetTopupById()
      setIsEditing(true)
    }

  }, [id])


  const handleaddTopup = () => {
    let tempArr = messageArr
    tempArr = [...tempArr]
    tempArr.push({ message: "" })
    setMessageArr([...tempArr])
  }


  const handleRemoveTopup = () => {
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
        <Link to="/Topup/View" className=' btn btn-sm btn-warning' color='primary'>
          <ArrowUpLeft />Back
        </Link>
        <CardTitle tag='h4'>{isEditing ? "Edit" : "Add"} Topup</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Name
            </Label>
            <Input type='text' id='basicInput' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Topup Name' />
          </Col>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Description
            </Label>
            <Input type='text' id='basicInput' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' />
          </Col>
        </Row>
        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Role
            </Label>
            <Select
              isClearable={false}
              value={role}
              options={rolesOptions}
              className='react-select'
              classNamePrefix='select'
              onChange={(val) => setRole(val)}
            />
          </Col>

        </Row>
        <Row>
          <Col className='mb-1 my-3' xl='2' md='2' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Flash sales
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesFlashSales} onChange={(e) => setIncludesFlashSales(e.target.checked)} />
          </Col>
          <Col className='mb-1  my-3' xl='3' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Advertisements
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesAdvertisements} onChange={(e) => setIncludesAdvertisements(e.target.checked)} />
          </Col>

          <Col className='mb-1 my-3' xl='2' md='2' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Opprtunities
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesOpportunities} onChange={(e) => setIncludesOpportunities(e.target.checked)} />
          </Col>

          <Col className='mb-1 my-3' xl='2' md='2' sm='12'>
            <Label className='form-label' for='basicInput'>
              Includes Banner
            </Label>
            <Input type='checkbox' className='ms-3' id='basicInput' checked={includesBannerImages} onChange={(e) => setIncludesBannerImages(e.target.checked)} />
          </Col>
        </Row>
        <Row>
          {
            includesFlashSales &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of sales allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={numberOfSales} onChange={(e) => setNumberOfSales(e.target.value)} placeholder='Enter number Of sales allowed in this Topup' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which Sales are allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={saleDays} onChange={(e) => setSaleDays(e.target.value)} placeholder='Enter the number Of days for which Sales are allowed in this Topup' />
              </Col>
            </>
          }
        </Row>
        <Row>
          {
            includesAdvertisements &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of advertisements allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={numberOfAdvertisement} onChange={(e) => setNumberOfAdvertisement(e.target.value)} placeholder=' Number Of advertisements allowed in this Topup' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which advertisements are allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={advertisementDays} onChange={(e) => setAdvertisementDays(e.target.value)} placeholder='Number Of days for which advertisements are allowed in this Topup' />
              </Col>
            </>
          }
        </Row>
        <Row>
          {
            includesOpportunities &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of Opportunities allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={numberOfOpportunity} onChange={(e) => setNumberOfOpportunity(e.target.value)} placeholder='Enter number Of Opportunities allowed in this Topup' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which Opportunity are allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={opportunityDays} onChange={(e) => setOpportunityDays(e.target.value)} placeholder='Enter the number Of days for which Opportunities are allowed in this Topup' />
              </Col>
            </>
          }
        </Row>
        <Row>
          {
            includesBannerImages &&
            <>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of Banners allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={numberOfBannerImages} onChange={(e) => setNumberOfBannerImages(e.target.value)} placeholder='Enter number Of Banners allowed in this Topup' />
              </Col>
              <Col className='mb-1' xl='6' md='6' sm='12'>
                <Label className='form-label' for='basicInput'>
                  Number Of days for which Banners are allowed in this Topup
                </Label>
                <Input type='number' id='basicInput' value={bannerimagesDays} onChange={(e) => setBannerImagesDays(e.target.value)} placeholder='Enter the number Of days for which Banners are allowed in this Topup' />
              </Col>
            </>
          }
        </Row>  

        <Row>
          <Col className='mb-1' xl='6' md='6' sm='12'>
            <Label className='form-label' for='basicInput'>
              Price
            </Label>
            <Input type='number' id='basicInput' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Topup Price' />
          </Col>


          <Col className='mb-1 d-flex justify-content-between' xl='12' md='12' sm='12'>
            <Label for='basicInput'>
              Message
            </Label>
            <div>
              <Button type='button' className='me-1' color='primary' onClick={() => handleaddTopup()}>
                +
              </Button>
              <Button type='button' className='me-1' color='danger' onClick={() => handleRemoveTopup()}>
                -
              </Button>
            </div>
          </Col>
          <Row className='mb-1' xl='12' md='12' sm='12'>

            {
              messageArr && messageArr.length > 0 && messageArr.map((el, index) => {
                return (
                  <Col key={index} className="mt-2" xl='4' md='4' sm='4'>
                    <Input type='text' id='basicInput' value={el?.message} onChange={(e) => handleSetMessge(e.target.value, index)} placeholder={`Message ${index + 1}`} />
                  </Col>
                )
              })
            }
          </Row>

          <Col className='mb-1' xl='12' md='12' sm='12'>
            <Button type='button' className='me-1' color='primary' onClick={() => onSubmit()}>
              Submit
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card >
  )
}
export default AddTopup
