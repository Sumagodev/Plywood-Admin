
// ** React Import

// ** Custom Components

// ** Utils

// ** Third Party Components

// ** Reactstrap Imports
import {
  Button,
  Card,
  Form, Input,
  Label
} from 'reactstrap'

// ** Store & Actions
import FileUpload from '../../../utility/FileUpload'
import { useEffect, useState } from 'react'
import { toastError } from '../../../utility/toastutill'
import { AddWebsiteData, getWebsiteData } from '../../../services/WebsiteData.service'
import { generateFilePath } from '../../../services/url.service'

const WebsiteData = () => {
  // ** States

  // ** Store Vars
  const [image, setImage] = useState("")
  const [previousImage, setPreviousImage] = useState("")


  const handleGetWebsiteData = async () => {
    try {
      const { data: res } = await getWebsiteData()
      console.log(res)
      if (res.data && res.data.shopImage) {
        setPreviousImage(res.data.shopImage)
      }

    } catch (error) {
      toastError(error)
    }
  }


  const handleAddWebsiteData = async () => {
    try {
      const obj = {}
      if (!(image && image !== "")) {
        toastError("Please upload an image !!!")
        return
      }

      obj.image = image
      const { data: res } = await AddWebsiteData(obj)
      console.log(res)
      if (res.message) {
        handleGetWebsiteData()
      }

    } catch (error) {
      toastError(error)
    }
  }
  useEffect(() => {
    handleGetWebsiteData()

  }, [])

  return (
    <>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4 mb-2'>

            <div className='text-center'>
              <h2>Add Website data</h2>
            </div>

            <div className="row">

              <div className='mb-1 col-md-6'>
                <Label className='form-label'>
                  Image (width:1920 height: 735px and aspect ratio:128:49)
                </Label>
                <div>
                  Image on server
                </div>
                <div>

                  <img src={generateFilePath(previousImage)} style={{ height: 100, width: 100 }} />
                </div>
                <div>
                  Your uploaded Image
                </div>
                <div>

                  <img src={image} style={{ height: 100, width: 100 }} />
                </div>

                <FileUpload onFileChange={(val) => setImage(val)} />
              </div>


              <div className='mb-1 col-md-12'>
                <Button type='button' className='me-1' color='primary' onClick={() => { handleAddWebsiteData() }} >
                  Submit
                </Button>
              </div>
            </div>
          </div>

        </div>
      </Card>
    </>
  )
}

export default WebsiteData
