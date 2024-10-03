// ** React Import
import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
    Button,
    Form,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Input
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import FileUpload from '../../../utility/FileUpload'
import { addHomepageBanners, updateHomepageBanner } from '../store'
import { generateFilePath } from '../../../services/url.service'

const AddModal = ({ open, toggleSidebar }) => {
    // ** States
    const store = useSelector(state => state.homepageBannersimges)
    const [isUpdated, setIsUpdated] = useState(false)
    const [image, setimage] = useState()
    const [url, seturl] = useState("")
    // ** Store Vars
    const dispatch = useDispatch()


    // ** Function to handle form submit
    const onSubmit = () => {
        toggleSidebar()
    
        if (isUpdated === true) {
            // Ensure a valid _id is present before dispatching the update action
            if (store?.selectedObj?._id) {
                dispatch(
                    updateHomepageBanner({
                        image,
                        id: store.selectedObj._id, // Ensure valid _id is passed
                        url,
                        type: "Adminbanner"
                    })
                )
            } else {
                console.error("Error: No valid _id provided for updating the banner.")
            }
        } else {
            dispatch(
                addHomepageBanners({
                    image,
                    url,
                    type: "Adminbanner"
                })
            )
        }
    }

    const handleSidebarClosed = () => {
    }


    useEffect(() => {
        if (store.selectedObj !== null && store.selectedObj?.image) {
            const category = store.selectedObj
            setimage(category?.image)
            setIsUpdated(true)
        } else {
            setimage("")
            setIsUpdated(false)
        }
    }, [store.selectedObj])


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
                        <h2>{isUpdated ? "Update" : "Add"}  Homepage Banner</h2>
                    </div>
                    <Form className="row">
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label' for='fullName'>
                                URl <span className='text-danger'>*</span>
                            </Label>
                            <Input className='form-control' value={url} onChange={(e) => seturl(e.target.value)} />
                        </div>
                        <div className='mb-1 col-md-6'>
                            <Label className='form-label'>
                                Image (width:1920px and height:460px)
                            </Label>
                            <div>
                                {
                                    image && image.includes("base64") ? <img src={image} style={{ height: 100, width: 100 }} /> : <img src={generateFilePath(image)} style={{ height: 100, width: 100 }} />
                                }
                            </div>
                            <FileUpload onFileChange={(val) => setimage(val)} />
                        </div>
                        <div className='mb-1 col-md-12'>
                            <Button type='button' className='me-1' color='primary' onClick={() => { onSubmit() }} >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddModal
