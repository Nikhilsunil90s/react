import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles((theme) => ({
    containerStyle:{
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 50,
        minHeight: '100vh'
    },
    boxPadding : {
        //padding:'20px',  
    },
    featuredImg: {
        transition: 'all 1s',
        '&:hover':{
            opacity: .8
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}))

interface PostType{
    id: number
    title: string
    content: string
    description: string,
    url:string
}

const  Page: React.FC= () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [pages, setPages]= useState<PostType | any>(null)
    const [isLoading, setIsLoading]= useState<boolean>(false)
    
    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    };

    

    useEffect( () => {
        setPages(null)
        // retrievePages();
    }, [])
 

    return (
        
        <></>
        // <Box className={classes.containerStyle} pt={0}>
        // <NavBar bg="#fff" textColor="#191919" />
        //     <Container maxWidth="lg">
        //         {/* <Box my={2} display="flex" justifyContent="center" style={{marginBottom: 0}}><Typography variant="h3" style={{color: 'black'}}>Blog</Typography></Box> */}

        //         <Box mt={5} display="flex" justifyContent="center">
        //             <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>Pages</Typography>
        //         </Box>

        //         <Box my={0} display="flex" justifyContent="center"><Typography variant="h3" style={{color: 'black'}}>&nbsp;</Typography></Box>
                

        //     </Container>

        //         <Grid container direction="row">         
        //             <Grid container direction="column" lg={12} className={classes.boxPadding} >
        //                 &nbsp;
        //             </Grid>
        //         </Grid>    
               
        //         <Grid container direction="row">         
        //             <Grid container direction="column" lg={12} className={classes.boxPadding} style={{'backgroundColor':'#162235'}}>
        //                 {/* style={{'backgroundColor':'#162235'}} */}
        //                 <Grid container spacing={0}>
        //                     {        
        //                         blogs && blogs.length ? blogs.map( ( blog,index ) => 
        //                             (
        //                                 <BlogCard blog={blog} isAdmin={false} key={blog.id} handleDelete={null} handleEdit={null}  />
        //                             )    
        //                         ) : <span style={{color:'black'}}>No blogs found</span>
        //                     }    
        //                     {
        //                         isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
        //                     }
        //                 </Grid> 
        //             </Grid>  
                  
        //         </Grid>
        // </Box>
        // <Footer />
    )
}

export default Page
