import { useEffect, useState } from 'react' 
import {
    Button,
    Form,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Input
} from 'reactstrap' 
import { useDispatch, useSelector } from 'react-redux' 
import FileUpload from '../../../utility/FileUpload' 
import { addHomepageBanners, updateHomepageBanner } from '../store' 
import { generateFilePath } from '../../../services/url.service' 

const AddModal = ({ open, toggleSidebar }) => {
    const store = useSelector(state => state.homepageBannersimges) 
    const dispatch = useDispatch() 

    const [isUpdated, setIsUpdated] = useState(false) 
    const [image, setImage] = useState('') 
    const [url, setUrl] = useState('') 

    const onSubmit = () => {
        toggleSidebar() 
    
        if (isUpdated) {
            // Ensure a valid _id is present before dispatching the update action
            const id = store?.selectedObj?._id 
            if (id) {
                dispatch(
                    updateHomepageBanner({
                        image,
                        id, // Pass the ID directly
                        url,
                        type: "Adminbanner"
                    })
                ) 
            } else {
                console.error("Error: No valid _id provided for updating the banner.") 
            }
        } else {
            // Proceed to add a new homepage banner
            dispatch(
                addHomepageBanners({
                    image,
                    url,
                    type: "Adminbanner"
                })
            ) 
        }
    } 
    
    useEffect(() => {
        if (store.selectedObj && store.selectedObj.image) {
            setImage(store.selectedObj.image) 
            setUrl(store.selectedObj.url || '')  // Assuming the URL is also in the selected object
            setIsUpdated(true) 
        } else {
            setImage('') 
            setUrl('') 
            setIsUpdated(false) 
        }
    }, [store.selectedObj]) 

    return (
        <Modal isOpen={open} toggle={toggleSidebar} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={toggleSidebar}></ModalHeader>
            <ModalBody className='px-3 pb-3'>
                <div className='text-center'>
                    <h2>{isUpdated ? "Update" : "Add"} Homepage Banner</h2>
                </div>
                <Form className="row">
                    <div className='mb-1 col-md-6'>
                        <Label className='form-label' for='url'>
                            URL <span className='text-danger'>*</span>
                        </Label>
                        <Input
                            className='form-control'
                            id='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-1 col-md-6'>
                        <Label className='form-label'>Image (width:1920px and height:460px)</Label>
                        <div>
                            {image && (image.includes("base64") ? (
                                <img src={image} style={{ height: 100, width: 100 }} alt="Preview" />
                            ) : (
                                <img src={generateFilePath(image)} style={{ height: 100, width: 100 }} alt="Preview" />
                            ))}
                        </div>
                        <FileUpload onFileChange={(val) => setImage(val)} />
                    </div>
                    <div className='mb-1 col-md-12'>
                        <Button type='button' className='me-1' color='primary' onClick={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    ) 
} 

export default AddModal 
