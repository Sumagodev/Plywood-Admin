// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components

// ** Utils

// ** Third Party Components
import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import {
    Button, Form, Input, Label, Modal, ModalBody,
    ModalHeader
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import FileUpload from '../../../../utility/FileUpload'
import { toastError, toastSuccess } from '../../../../utility/toastutill'
import { getAllCity } from '../../../location/City/store'
import { getAllCountry } from '../../../location/Country/store'
import { getAllState } from '../../../location/State/store'
import { addUser, editUser } from '../store'
import { generateFilePath } from '../../../../services/url.service'
import { editUserApi, getSalesUsersApi } from '../../../../services/user.service'
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../../../../services/location.service'
import { getCategoryApi } from '../../../../services/category.service'
import Select from 'react-select'
import moment from 'moment'

const defaultValues = {
    email: '',
    phone: '',
    company: '',
    fullName: '',
    lastName: ''
}

const RegisterModal = ({ open, togglregister }) => {
    // ** States
  

    return (
        <>
            <Modal
                isOpen={open}
                onClosed={() => togglregister()}
                className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => togglregister()}></ModalHeader>
                <ModalBody className='px-3 pb-3'>
                    <h1>Register form</h1>

                    {/* <div className='text-center'>
                        <h2>Register From</h2>
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
                                <label>Organization Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={companyEmail}
                                    onChange={(e) => setcompanyEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label>Organization Phone / Landline<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={companyPhone}
                                    onChange={(e) => setcompanyPhone(e.target.value)}
                                    maxLength="10"
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label>Landline Number <span className="text-danger">*</span> </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={landline}
                                    onChange={(e) => setLandline(e.target.value)}
                                />
                            </div>
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
                                <label> Dealing With Brand Names <span className="text-danger">*</span> </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={brandNames}
                                    onChange={(e) => setBrandNames(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label> Google Maps Link <span className="text-danger">*</span> </label>
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
                                        <select className="form-control" value={countryId} onChange={(e) => setcountryId(e.target.value)}>
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
                                        <select className="form-control" value={stateId} onChange={(e) => setstateId(e.target.value)}>
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
                                        <select className="form-control" value={cityId} onChange={(e) => setcityId(e.target.value)}>
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

                                <div>
                                    {
                                        profileImage.includes("base64") ? <img src={profileImage} style={{ height: 100, width: 100 }} /> : <img src={generateFilePath(profileImage)} style={{ height: 100, width: 100 }} />
                                    }
                                </div>

                                <FileUpload onFileChange={(val) => { setProfileImage(val) }} />
                            </div>


                            <div className="col-md-6 mt-2">
                                <label> Banner (Image of your Showroom)</label>

                                <div>
                                    {
                                        profileImage.includes("base64") ? <img src={generateFilePath(bannerImage)} style={{ height: 100, width: 100 }} /> : <img src={generateFilePath(bannerImage)} style={{ height: 100, width: 100 }} />
                                    }
                                </div>

                                <FileUpload onFileChange={(val) => setBannerImage(val)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label> Nature of your business</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={natureOfBusiness}
                                    onChange={(e) => setNatureOfBusiness(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label> GST No <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={gstNumber}
                                    onChange={(e) => setgstNumber(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 mt-2">
                                <label>Sales</label>
                                <Select className='form-control' options={salesUsersArr && salesUsersArr.length > 0 && salesUsersArr.map((el) => ({ ...el, label: el.name, value: el._id }))} value={salesObj} onChange={(e) => setSalesObj(e)} />

                            </div>


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
                        {!checkIsUser() ? <div className="col-md-6 mt-2">
                            <label>Email <span className="text-danger">*</span> </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div> : <div className="col-md-6 mt-2">
                            <label>Date of Birth <span className="text-danger">*</span> </label>
                            <input
                                type="date"
                                className="form-control"
                                value={moment(aniversaryDate).format("YYYY-MM-DD")}
                                onChange={(e) => setAniversaryDate(e.target.value)}
                            />
                        </div>
                        }
                        <div className="col-md-6 mt-2">
                            <label>Mobile No. <span className="text-danger">*</span></label>
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
                    </div> */}


                </ModalBody>
            </Modal>
        </>
        // <Sidebar
        //   size='lg'
        //   open={open}
        //   title='New User'
        //   headerClassName='mb-1'
        //   contentClassName='pt-0'
        //   toggleFn={toggleFn}
        //   onClosed={handleSidebarClosed}
        // >
        //   <Form onSubmit={handleSubmit(onSubmit)}>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='fullName'>
        //         Full Name <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='fullName'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='fullName' placeholder='John Doe' invalid={errors.fullName && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='lastName'>
        //         lastName <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='lastName'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='lastName' placeholder='johnDoe99' invalid={errors.lastName && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='userEmail'>
        //         Email <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='email'
        //         control={control}
        //         render={({ field }) => (
        //           <Input
        //             type='email'
        //             id='userEmail'
        //             placeholder='john.doe@example.com'
        //             invalid={errors.email && true}
        //             {...field}
        //           />
        //         )}
        //       />
        //       <FormText color='muted'>You can use letters, numbers & periods</FormText>
        //     </div>

        //     <div className='mb-1'>
        //       <Label className='form-label' for='phone'>
        //         phone <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='phone'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='phone' placeholder='(397) 294-5153' invalid={errors.phone && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='company'>
        //         Company <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='company'
        //         control={control}
        //         render={({ field }) => (
        //           <Input id='company' placeholder='Company Pvt Ltd' invalid={errors.company && true} {...field} />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='country'>
        //         Country <span className='text-danger'>*</span>
        //       </Label>
        //       <Controller
        //         name='country'
        //         control={control}
        //         render={({ field }) => (
        //           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
        //           <Select
        //             isClearable={false}
        //             classNamePrefix='select'
        //             options={countryOptions}
        //             theme={selectThemeColors}
        //             className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
        //             {...field}
        //           />
        //         )}
        //       />
        //     </div>
        //     <div className='mb-1'>
        //       <Label className='form-label' for='user-role'>
        //         User Role
        //       </Label>
        //       <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
        //         <option value='subscriber'>Subscriber</option>
        //         <option value='editor'>Editor</option>
        //         <option value='maintainer'>Maintainer</option>
        //         <option value='author'>Author</option>
        //         <option value='admin'>Admin</option>
        //       </Input>
        //     </div>
        //     <div className='mb-1' value={plan} onChange={e => setPlan(e.target.value)}>
        //       <Label className='form-label' for='select-plan'>
        //         Select Plan
        //       </Label>
        //       <Input type='select' id='select-plan' name='select-plan'>
        //         <option value='basic'>Basic</option>
        //         <option value='enterprise'>Enterprise</option>
        //         <option value='company'>Company</option>
        //         <option value='team'>Team</option>
        //       </Input>
        //     </div>
        //     <Button type='submit' className='me-1' color='primary'>
        //       Submit
        //     </Button>
        //     <Button type='reset' color='secondary' outline onClick={toggleFn}>
        //       Cancel
        //     </Button>
        //   </Form>
        // </Sidebar>
    )
}

export default RegisterModal
