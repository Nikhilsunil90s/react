import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SnackBar from 'components/shared/SnackBar'
import MediaPreview from 'components/shared/MediaPreview'
import Badge from '@material-ui/core/Badge';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface HomeProps{
    accessToken: string
}

const Home: React.FC<HomeProps>= ({accessToken}) => {

    const [snackBarVal, setSnackBarVal]= useState<any>(null)

    const [header_image, setHeader_Image]= useState<any>(null)
    const [curr_header_image, setCurr_Header_Image]= useState<any>(null)
    const [curr_header_image_path, setCurr_Header_Image_Path]= useState<any>(null)

    const retrieveHeaderImagePath= () => {
        API({
            method: 'GET',
            url: '/home',
        })
        .then( response => {
            setCurr_Header_Image_Path(response.data[0].header_image)
        })
        .catch (err => {
            console.log('Error')
        })
    }

    const retrieveHeaderImage= () => {
      
        API({
            method: 'GET',
            url: '/media/'+curr_header_image_path,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${curr_header_image_path.substring(curr_header_image_path.lastIndexOf('.')+1)};base64, ${base64Str}`
            setCurr_Header_Image(image)
  
          })
          .catch( err => {
            console.log(err)
          })
    }

    const handleHeaderUpload= (e:any) => {
        setHeader_Image(e)
      }
    
    const removeCurrHeader= () => {
        setCurr_Header_Image(null)
    }

    const handleSubmit= () => {

        let formData=  new FormData()

        formData.append('headerImage', header_image[0])

        API({
            method: 'POST',
            url: '/home',
            data: formData
        })
        .then( response => {  
            console.log(response.data)
            window.location.reload()
        })
        .catch (err => {
            console.log('Error')
        })
    }
    useEffect( () => {
        retrieveHeaderImagePath()
    }, [snackBarVal])

    useEffect( () => {
        if(curr_header_image_path !== null)
            retrieveHeaderImage()
    }, [curr_header_image_path])

    return (
        <Container maxWidth="xl">

            <Box mt={5}>
                <Typography variant="h4" color="primary">Home</Typography>
            </Box>

            <Box mt={15}>
            <Box mb={5}><Typography variant="h6" color="primary">Hero Image: </Typography></Box>
                {
                    curr_header_image && curr_header_image.length !== 0 ? 
                    (
                    <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrHeader() } />}>
                        <Box style={{width: 80, height: 80}}><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={curr_header_image}/></Box>
                    </Badge> 
                    ) : 
                    (
                    <Box>
                        <MediaPreview handleImageUpload={handleHeaderUpload} />
                        <Box mt={5}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            onClick={ () => handleSubmit()}
                        >
                            Add Header Image
                        </Button>
                        </Box>
                    </Box>
                    )
                }
            </Box>

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }

        </Container>
    )
}

export default Home
