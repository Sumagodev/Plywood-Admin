// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components

// ** Utils

// ** Third Party Components
import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import {
    Button,
    Modal, ModalBody,
    ModalHeader
} from 'reactstrap'

// ** Store & Actions
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getCategoryApi } from '../../../../services/category.service'
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../../../../services/location.service'
import { getSalesUsersApi } from '../../../../services/user.service'
import FileUpload from '../../../../utility/FileUpload'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import { toastError } from '../../../../utility/toastutill'
import { addUser } from '../store'

const defaultValues = {
    email: '',
    phone: '',
    company: '',
    fullName: '',
    lastName: ''
}

const AddModal = ({ open, toggleSidebar }) => {
    // ** States
    const role = useSelector(state => state.auth.userData.role)

    const salesUsers = useSelector(state => state.users.salesUsers)
    const [brandNames, setBrandNames] = useState("")

    ///////new Fields///////
    const [natureOfBusiness, setNatureOfBusiness] = useState()
    const [annualTurnover, setAnnualTurnover] = useState()
    const [iecCode, setIecCode] = useState()
    const [yearOfEstablishment, setYearOfEstablishment] = useState()
    const [legalStatus, setLegalStatus] = useState()
    const [cinNo, setCinNo] = useState()
    const [companyCeo, setCompanyCeo] = useState()
    const [googleMapsLink, setGoogleMapsLink] = useState()
    const [salesObj, setSalesObj] = useState(null)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [name, setname] = useState("")
    const [mobile, setmobile] = useState("")
    const [email, setemail] = useState("")
    const [whatsapp, setwhatsapp] = useState("")
    const [type, settype] = useState(ROLES_CONSTANT.USER)
    const [companyName, setcompanyName] = useState("")
    const [companyEmail, setcompanyEmail] = useState("")
    const [companyPhone, setcompanyPhone] = useState("")
    const [gstNumber, setgstNumber] = useState("")
    const [address, setaddress] = useState("")
    const [dob, setdob] = useState("")
    const [noofepmployee, setnoofepmployee] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [signature, setsignature] = useState("")
    const [gstCertificate, setgstCertificate] = useState("")
    const [landline, setLandline] = useState("")
    const [aniversaryDate, setAniversaryDate] = useState(new Date())
    const [password, setPassword] = useState("")
    const [bannerImage, setBannerImage] = useState("")

    const [salesUsersArr, setSalesUsersArr] = useState([])

    const [categoryArr, setcategoryArr] = useState([])
    const [category, setcategory] = useState("")


    const [countryArr, setcountryArr] = useState([])
    const [stateArr, setstateArr] = useState([])
    const [cityArr, setcityArr] = useState([])
    const [countryId, setcountryId] = useState("")
    const [stateId, setstateId] = useState("")
    const [cityId, setcityId] = useState("")
    // ** Store Vars
    const dispatch = useDispatch()
    const checkIsUser = () => {
        if ((type === ROLES_CONSTANT.DISTRIBUTOR || type === ROLES_CONSTANT.MANUFACTURER || type === ROLES_CONSTANT.DEALER)) {
            return true
        } else {
            return false
        }
    }


    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const checkIsValid = () => {
        if (`${name}` === "") {
            alert("Name is Required")
            return
        }
        // if (`${mobile}` === "") {
        //     alert("Mobile is Required")
        //     return 0
        // }
        if (!checkIsUser()) {
            if (`${email}` === "") {
                alert("Email is Required")
                return 0
            }
            if (`${password}` === "") {
                alert("Password is Required")
                return 0
            }
            return true
        } else {
            // if (`${salesObj.value}` === "") {
            //     alert("Sales employee is Required")
            //     return 0
            // }
        }

        if (`${companyName}` === "") {
            alert("Organization Name is Required")
            return 0
        }
        // if (`${companyEmail}` === "") {
        //     alert("Organization Email is Required")
        //     return 0
        // }
        // if (`${companyPhone}` === "") {
        //     alert("Organization Phone is Required")
        //     return 0
        // }
        if (`${gstNumber}` === "") {
            alert("Gst is Required")
            return 0
        }
        if (`${address}` === "") {
            alert("Address is Required")
            return 0
        }
        if (`${countryId}` === "") {
            alert("Country is Required")
            return 0
        }
        if (`${stateId}` === "") {
            alert("State is Required")
            return 0
        }
        if (`${cityId}` === "") {
            alert("City is Required")
            return 0
        }
        if (`${yearOfEstablishment}` === "") {
            alert("Year of Establishment is Required")
            return 0
        }


        return true
    }

    // ** Function to handle form submit
    const onSubmit = () => {
        if (checkIsValid()) {
            toggleSidebar()


            const obj = {
                name,
                email,
                phone: mobile,

                role: type,
                companyObj: {},
                approved: true
            }


            if (!checkIsUser()) {

                obj.password = password
            } else {
                obj.dob = dob
                obj.address = address
                obj.brandNames = brandNames
                obj.whatsapp = whatsapp
                obj.gstNumber = gstNumber
                obj.countryId = countryId
                obj.stateId = stateId
                obj.cityId = cityId
                obj.aniversaryDate = aniversaryDate
                obj.landline = landline
                obj.gstCertificate = gstCertificate
                obj.bannerImage = bannerImage
                obj.profileImage = profileImage
                obj.categoryArr = category.map(el => ({ categoryId: el.value }))
            }
            if (type !== ROLES_CONSTANT.ADMIN && type !== ROLES_CONSTANT.SUBADMIN && type !== ROLES_CONSTANT.APPROVERS && type !== ROLES_CONSTANT.USER) {

                obj.companyObj.name = companyName
                obj.companyObj.email = companyEmail
                obj.companyObj.phone = companyPhone
                obj.companyObj.address = address
                obj.companyObj.gstNumber = gstNumber
                obj.companyObj.noofepmployee = noofepmployee
                obj.companyObj.yearOfEstablishment = yearOfEstablishment
                obj.companyObj.natureOfBusiness = natureOfBusiness
                obj.companyObj.googleMapsLink = googleMapsLink
                obj.companyName = companyName
                obj.companyEmail = companyEmail
                obj.companyPhone = companyPhone
                obj.gstNumber = gstNumber
                obj.dob = dob
                obj.profileImage = profileImage
                obj.signature = signature
                obj.gstCertificate = gstCertificate
                obj.countryId = countryId
                obj.stateId = stateId
                obj.cityId = cityId
            }
            if (salesObj && salesObj?._id) {
                obj.salesId = salesObj?._id
            }
            dispatch(
                addUser(obj)
            )
        }
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            console.log(key)
            setValue(key, '')
        }
    }


    const handleGetCoutries = async () => {
        try {
            const { data: res } = await getCountriesApi()
            console.log(res.data, "data")
            if (res.data) {
                setcountryArr(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNestedCategory = async () => {
        try {
            const { data: res } = await getCategoryApi()
            if (res.success && res.data.length) {
                setcategoryArr(res.data)
            }

        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }


    const handleGetStates = async (countryId) => {
        try {
            const { data: res } = await getStateByCountryApi(`countryId=${countryId}`)
            if (res.data) {
                setstateArr(res.data)
            } else {
                setstateArr([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCities = async (stateId) => {
        try {
            const { data: res } = await getCityByStateApi(`stateId=${stateId}`)
            if (res.data) {
                setcityArr(res.data)
            } else {
                setcityArr([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSalesUsers = async () => {
        try {
            const { data: res } = await getSalesUsersApi()
            if (res) {
                setSalesUsersArr(res.data)
            }
        } catch (error) {
            toastError(error)
        }
    }

    useEffect(() => {
        handleGetCoutries()
        handleNestedCategory()
        getAllSalesUsers()
    }, [])
    useEffect(() => {
        if (countryId) {
            console.log(countryId, "countryId")
            handleGetStates(countryId)
        }
    }, [countryId])

    useEffect(() => {
        if (stateId) {
            handleGetCities(stateId)
        }
    }, [stateId])


    return (
        <>
            <Modal
                isOpen={open}
                onClosed={handleSidebarClosed}
                toggle={toggleSidebar}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={toggleSidebar}></ModalHeader>
                <ModalBody className='px-3 pb-3'>
                    <div className='text-center'>
                        <h2>Add User</h2>
                    </div>

                    <label>Role <span className="text-danger">*</span>  </label>
                    <Select options={
                        Object.values(ROLES_CONSTANT).filter((el) => el !== 'ADMIN' && ((role !== ROLES_CONSTANT.APPROVERS && el !== ROLES_CONSTANT.APPROVERS))).map(el => ({ label: el, value: el }))
                    }
                        value={{ value: type, label: type }}
                        onChange={(e) => settype(e.value)}
                    />
                    

                    {(type === ROLES_CONSTANT.DISTRIBUTOR || type === ROLES_CONSTANT.MANUFACTURER || type === ROLES_CONSTANT.DEALER) &&
                        <div className="row">

                            <div className="col-md-6 mt-2">
                                <label>Name of Organization <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={companyName}
                                    onChange={(e) => setcompanyName(e.target.value)}
                                />
                            </div>
                         
                            <div className="col-md-6 mt-2">
                                <label>Organization Phone / Landline</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={companyPhone}
                                    onChange={(e) => setcompanyPhone(e.target.value)}
                                    maxLength="10"
                                />
                            </div>
                            {/* <div className="col-md-6 mt-2">
                                <label>Landline Number <span className="text-danger">*</span> </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={landline}
                                    onChange={(e) => setLandline(e.target.value)}
                                />
                            </div> */}
                            <div className="col-md-6 mt-2">
                                <label> Year of Establishment <span className="text-danger">*</span> </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={yearOfEstablishment}
                                    onChange={(e) => setYearOfEstablishment(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <div style={{ width: "max-content" }}>
                                    <label>Category <span className="text-danger me-2">*</span>
                                    </label>
                                </div>
                                <Select className='form-control' options={categoryArr && categoryArr.length > 0 && categoryArr.map((el) => ({ ...el, label: el.name, value: el._id }))} value={category} closeMenuOnSelect={false} onChange={(e) => setcategory(e)} isMulti />

                            </div>
                            <div className="col-md-6 mt-2">
                                <label> Dealing With Brand Names </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={brandNames}
                                    onChange={(e) => setBrandNames(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label> Google Maps Link  </label>
                                <a href="https://www.google.com/maps" target="_blank" style={{ textDecorationLine: "underline" }}> Click to open google maps</a>
                                <br />
                                <br />
                                <span>Note : The link above will take you to google maps where you can select the your business's location to get the link and paste it in the text input given below</span>
                                <br />
                                <input
                                    type="text"
                                    className="form-control"
                                    value={googleMapsLink}
                                    onChange={(e) => setGoogleMapsLink(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-2">
                                <label> Address <span className="text-danger">*</span></label>
                                <textarea
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-md-4 mt-2">
                                <label> Country <span className="text-danger">*</span></label>
                                {
                                    countryArr && (
                                        <select className="form-control" onChange={(e) => setcountryId(e.target.value)}>
                                            <option value="">Please Select Country</option>
                                            {countryArr.map((country) => (
                                                <option value={country._id} >{country.name}</option>
                                            ))}
                                        </select>
                                    )
                                }
                            </div>
                            <div className="col-md-4 mt-2">
                                <label> State <span className="text-danger">*</span></label>
                                {
                                    stateArr && (
                                        <select className="form-control" onChange={(e) => setstateId(e.target.value)}>
                                            <option value="">Please Select State</option>
                                            {stateArr.map((state) => (
                                                <option value={state._id} >{state.name}</option>
                                            ))}
                                        </select>
                                    )
                                }
                            </div>
                            <div className="col-md-4 mt-2">
                                <label> City <span className="text-danger">*</span></label>
                                {
                                    cityArr && (
                                        <select className="form-control" onChange={(e) => setcityId(e.target.value)}>
                                            <option value="">Please Select City</option>
                                            {cityArr.map((city) => (
                                                <option value={city._id} >{city.name}</option>
                                            ))}
                                        </select>
                                    )
                                }
                            </div>
                            <div className="col-md-6 mt-2">
                                <label> Profile Photo</label>

                                <FileUpload onFileChange={(val) => { setProfileImage(val) }} />
                            </div>


                            <div className="col-md-6 mt-2">
                                <label> Banner Photo  (Exterior/Interior Image of your Showroom/Unit)</label>

                                <FileUpload onFileChange={(val) => setBannerImage(val)} />
                            </div>
                            {/* <div className="col-md-6 mt-2">
                                <label> Nature of your business</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={natureOfBusiness}
                                    onChange={(e) => setNatureOfBusiness(e.target.value)}
                                />
                            </div> */}
                            <div className="col-md-6 mt-2">
                                <label> GST No <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={gstNumber}
                                    onChange={(e) => setgstNumber(e.target.value)}
                                />
                            </div>
{/* 
                            <div className="col-md-6 mt-2">
                                <label>Sales</label>
                                <Select className='form-control' options={salesUsersArr && salesUsersArr.length > 0 && salesUsersArr.map((el) => ({ ...el, label: el.name, value: el._id }))} value={salesObj} onChange={(e) => setSalesObj(e)} />

                            </div> */}


                        </div>
                    }
                    <div className='row'>

                        <h4 className="heading yellow mt-4">{checkIsUser() ? "Contact Person Details" : ""}</h4>
                        <div className="col-md-6 mt-2">
                            <label>{checkIsUser() ? "Name of Authorised person" : "Name"}<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                  <div className="col-md-6 mt-2">
                            <label>Email <span className="text-danger">*</span> </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div> 
                        <div className="col-md-6 mt-2">
                            <label>Date of Birth </label>
                            <input
                                type="date"
                                className="form-control"
                                value={moment(aniversaryDate).format("YYYY-MM-DD")}
                                onChange={(e) => setAniversaryDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mt-2">
                            <label>Your Email Id <span className="text-danger">*</span> </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mt-2">
                                    <label>Whatsapp No.</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={whatsapp}
                                        onChange={(e) => setwhatsapp(e.target.value)}
                                        maxLength="10"
                                    />
                                </div>
                        <div className="col-md-6 mt-2">
                            <label>Mobile No. </label>
                            <input
                                type="tel"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                maxLength="10"
                            />
                        </div>
                    
                        {
                            !checkIsUser() &&
                            <>

                                <div className="col-md-6 mt-2">
                                    <label>Whatsapp No.</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={whatsapp}
                                        onChange={(e) => setwhatsapp(e.target.value)}
                                        maxLength="10"
                                    />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        }
                    </div>

                    <div className="col-md-12 mt-2">
                        <Button type='button' className='me-1' color='primary' onClick={() => { onSubmit() }} >
                            Submit
                        </Button>
                    </div>


                </ModalBody>
            </Modal>
        </>

    )
}

export default AddModal
