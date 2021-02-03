import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import TextTruncate from 'react-text-truncate'
import NavBar from 'components/shared/nav/NavBar.jsx'
import BlogCard from 'components/blog/BlogCard.jsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/link'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Footer from 'components/home/Footer'

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
    author: string
    mainImg: string
    date: string
    isFeatured: boolean
}

const  Blog: React.FC= () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [blogs, setBlogs]= useState<PostType | any>(null)
    const [archiveBlogs, setArchiveBlogs]= useState<PostType | any>(null)
    const [recentBlogs, setRecentBlogs]= useState<PostType | any>(null)

    const [featuredBlogs, setFeaturedBlogs]= useState<PostType | any>(null)

    const [isLoading, setIsLoading]= useState<boolean>(false)

    const [filterBy, setFilterBy]= useState<string>('All')
    const [filterByAuthor, setFilterByAuthor]= useState<string>('All')  
    const [categories, setCategories]= useState<any>('')
    const [authors, setAuthors]= useState<any>('')

    const [featuredBlogImages, setFeaturedBlogImages]= useState(null)

    const [contentWidth, setContentWidth]= useState<any>('')

    useEffect(() => {
        const win = typeof window === 'object' ? window : false;

        if(win) {
            setContentWidth(window.innerWidth + 'px')
            win.addEventListener('resize', handleResize)
        }
    
    }, [])
    
    const handleResize = (e) => {
        let width = window.innerWidth + 'px'
        setTimeout(() => {
            setContentWidth(width)
        },50)
    }
    
    const handleFilterBy= (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterBy(event.target.value as string)
        retrieveBlogs(event.target.value,1);
    }

    const handleFilterByAuthor= (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterByAuthor(event.target.value as string)
        retrieveBlogs(event.target.value,2);
    }  

    const filterArchive = (id) => {
        //setFilterBy(id as string)
        //retrieveBlogs(id,4);
    }

    const filterRecentPost = (id) => {
        //setFilterBy(id as string)
        retrieveBlogs(id,3);
    }

    const filterCategory = (id) => {
        setFilterBy(id as string)
        retrieveBlogs(id,1);
    }

    const filterAuthor = (id) => {
        setFilterByAuthor(id as string)
        retrieveBlogs(id,2);
    }

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    };

    const retrieveRecentBlogs= () => {
        let datetest = new Date();
        datetest.setDate(datetest.getDate() - 7);
        const lastweekdate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(datetest);    

        const weekexplode = lastweekdate.split("/");    
        const beforelastweek = weekexplode[2]+'-'+weekexplode[0]+'-'+weekexplode[1];
        const currentYear = weekexplode[2]+'-01-01';
       

        setIsLoading(true)             
        API({
            method: 'POST',
            url: '/blog/recentposts',
        })
        .then( response => {
            setRecentBlogs(response.data)
            setIsLoading(false)
        }) 
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveArchiveBlogs= () => {

        let datetest = new Date();
        datetest.setDate(datetest.getDate() - 7);
        const lastweekdate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(datetest);    

        const weekexplode = lastweekdate.split("/");    
        const beforelastweek = weekexplode[2]+'-'+weekexplode[0]+'-'+weekexplode[1];
        const currentYear = weekexplode[2]+'-01-01';

        setIsLoading(true)         
        API({
            method: 'POST',
            url: '/blog/archiveposts',
            data:{startDate:currentYear,endDate:beforelastweek}
        })
        .then( response => {
            setArchiveBlogs(response.data)
            setIsLoading(false)
        }) 
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveBlogs= (id,type) => {
        console.log("filterBy");
        console.log(filterBy);
        console.log(filterByAuthor);
        setIsLoading(true)     

        API({
            method: 'POST',
            url: '/blog/posts',
            data: {type:type,id:id}
        })
        .then( response => {
            setBlogs(response.data)
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveFeaturedBlogs= () => {
        API({
            method: 'GET',
            url: '/blog/posts/featured',
        })
        .then( response => {
            setFeaturedBlogs(response.data)
            response.data.map( blog => {
                retrieveFeaturedBlogMainImg(blog.mainImg)
            })
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveFeaturedBlogMainImg= (id) => {
        API({
            method: 'GET',
            url: '/media/'+id,
            responseType: 'arraybuffer'
          })
          .then( response => {
            const base64Str = btoa(  
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );    
            let image= `data:image/${id.substring(id.lastIndexOf('.')+1)};base64, ${base64Str}`
            if(featuredBlogImages === null)
                setFeaturedBlogImages(image)
            else
                setFeaturedBlogImages([...featuredBlogImages, image])
          })
          .catch( err => {
            console.log(err)
          })
    }

    const retrieveCategories= () => {
        API({
            method: 'GET',
            url: '/category',
        })
        .then( response => {
            setCategories(response.data)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveAuthors= () => {
        API({
            method: 'GET',
            url: '/author',
        })
        .then( response => {
            setAuthors(response.data)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }


    useEffect(() => {

        retrieveCategories()
        retrieveAuthors()

    }, []);

    useEffect(() => {
        if(blogs !== null)
            retrieveFeaturedBlogs()
    }, [blogs])

    useEffect( () => {
        setBlogs(null)
        retrieveRecentBlogs();
        retrieveArchiveBlogs();
        retrieveFeaturedBlogs()
        retrieveBlogs('All',1);
    }, [filterBy])
 

    return (
        <>
        <Box className={classes.containerStyle} pt={0}>
        <NavBar bg="#fff" textColor="#191919" />
            <Container maxWidth="lg">
                {/* <Box my={2} display="flex" justifyContent="center" style={{marginBottom: 0}}><Typography variant="h3" style={{color: 'black'}}>Blog</Typography></Box> */}

                <Box mt={5} display="flex" justifyContent="center">
                    <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>Blog</Typography>
                </Box>

                <Box my={0} display="flex" justifyContent="center"><Typography variant="h3" style={{color: 'black'}}>&nbsp;</Typography></Box>
                {/* <Header title="Blog" sections={sections} /> */}
                <Box pt={5} style={{marginTop:0, paddingTop: 0}}>
                    {
                        featuredBlogs && featuredBlogs.length ? 

                        (
                        <Grid container style={{marginTop: 50}}>
                            {
                                featuredBlogs[0] ? (
                                    <Link href={`/blog/${featuredBlogs[0].slug}`}>
                                        <Grid className={classes.featuredImg} item xs={12} md={8} style={{position: 'relative', maxHeight: 450, overflow: 'hidden', display: 'flex', alignItems: 'center', borderRadius: 5}}>
                                            <Image
                                                src={featuredBlogImages}
                                                style={{objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer'}}
                                                loading={false}
                                                color="#27293D"
                                            />
                                            <Box display="flex" alignItems="flex-end" width="100%" height="100%" style={{position: 'absolute', cursor: 'pointer'}}>
                                                <Box width="100%" height="100px" style={{background: '#212121', position: 'absolute', opacity: .8, zIndex: 1}}></Box>
                                                <Box height="100px" display="flex" flexDirection="column" justifyContent="center" width="100%" p={matches ? 1 : 2} style={{position: 'absolute', zIndex: 2}}>
                                                    <Typography variant={matches ? 'h6' : 'h6'} style={{fontWeight: 600, color: '#FFF'}}>
                                                        <TextTruncate
                                                            line={3}
                                                            element="span"
                                                            truncateText="…"
                                                            text={featuredBlogs[0].title}
                                                        />
                                                    </Typography>
                                                    <Typography variant="body2" style={{ color: "#fafafa" }} noWrap dangerouslySetInnerHTML={{__html: featuredBlogs[0].content}}>
                                                        
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Link>
                                ) : null  
                            }
                            <Grid item xs={12} md={4}>
                                <Box ml={matches ? 0 : 3} mt={matches ? 3 : 0} display="flex" flexDirection="column" height="100%" maxHeight={matches ? 850 : 450}>
                                    {
                                        featuredBlogs[1] ? (
                                            <Link href={`/blog/${featuredBlogs[1].slug}`}>
                                                <Box display="flex" maxHeight={matches ? 450 : 225} overflow="hidden" borderRadius={5} position="relative" className={classes.featuredImg}>
                                                    <Image
                                                        src={featuredBlogImages[1]}
                                                        style={{objectFit: 'cover', width: '100%', height: '100%',}}
                                                        loading={false}
                                                        color="#27293D"
                                                    />
                                                    <Box display="flex" alignItems="flex-end" width="100%" height="100%" style={{position: 'absolute',cursor: 'pointer' }}>
                                                        <Box width="100%" height="100px" style={{background: '#212121', position: 'absolute', opacity: .6, zIndex: 1}}></Box>
                                                        <Box height="100px" display="flex" flexDirection="column" justifyContent="center" width="100%" p={matches ? 1 : 2} style={{position: 'absolute', zIndex: 2}}>
                                                            <Typography variant={matches ? 'h6' : 'h6'} style={{fontWeight: 600, color: '#FFF'}}>
                                                            <TextTruncate
                                                                line={3}
                                                                element="span"
                                                                truncateText="…"
                                                                text={featuredBlogs[1].title}
                                                            />
                                                            </Typography>
                                                            <Typography noWrap variant="body2" style={{ color: "#fafafa" }} dangerouslySetInnerHTML={{__html: featuredBlogs[1].content}} >
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        ) : null
                                    }
                                    {
                                        featuredBlogs[2] ? (
                                            <Link href={`/blog/${featuredBlogs[0].slug}`}>
                                                <Box mt={3} display="flex" maxHeight={matches ? 450 : 225} overflow="hidden" borderRadius={5} position="relative" className={classes.featuredImg}>
                                                    <Image    
                                                        src={featuredBlogImages[2]}
                                                        style={{objectFit: 'cover', width: '100%', height: '100%',}}
                                                        loading={false}
                                                        color="#27293D"
                                                    />
                                                    <Box display="flex" alignItems="flex-end" width="100%" height="100%" style={{position: 'absolute',cursor: 'pointer'}}>
                                                        <Box width="100%" height="100px" style={{background: '#212121', position: 'absolute', opacity: .6, zIndex: 1}}></Box>
                                                        <Box height="100px" display="flex" flexDirection="column" justifyContent="center" width="100%" p={matches ? 1 : 2} style={{position: 'absolute', zIndex: 2}}>
                                                            <Typography variant={matches ? 'h6' : 'h6'} style={{fontWeight: 600, color: '#FFF'}}>
                                                            <TextTruncate
                                                                line={3}
                                                                element="span"
                                                                truncateText="…"
                                                                text={featuredBlogs[2].title}
                                                            />
                                                            </Typography>
                                                            <Typography noWrap variant="body2" style={{ color: "#fafafa" }} dangerouslySetInnerHTML={{__html: featuredBlogs[2].content}}>
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        ) : null
                                    }
                                </Box>
                            </Grid>
                        </Grid>) : null
                    }
                </Box>
         




                <Grid container direction="row">     
                    <Grid container direction="column" md={6} sm={6} className={classes.boxPadding} >
                        <FormControl variant="outlined" className={classes.formControl} >
                            <InputLabel id="demo-simple-select-outlined-label" style={{ color:'black' }}>Filter By</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filterBy}
                                onChange={handleFilterBy}
                                label="Filter By"   
                                style={{ color:'black' }}
                            >   
                            <MenuItem value="All" >All Category</MenuItem>
                            {
                                categories && categories.length ? categories.map( ( category,index ) => 
                                    (
                                        <MenuItem key={index} value={category.id}>{category.title}</MenuItem>
                                    )    
                                ) : null
                            }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container direction="column" md={6} className={classes.boxPadding} >
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label" style={{ color:'black' }}>Filter By</InputLabel>
                            <Select    
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filterByAuthor}
                                onChange={handleFilterByAuthor}
                                label="Filter By"
                                style={{ color:'black' }}
                            >   
                            <MenuItem value="All">All Author</MenuItem>
                            {        
                                authors && authors.length ? authors.map( ( author,index ) => 
                                    (
                                        <MenuItem key={index} value={author.id}>{author.title}</MenuItem>
                                    )    
                                ) : null
                            }
                            </Select>
                        </FormControl> 
                    </Grid>  
                </Grid>          

                <Grid container direction="row">         
                    <Grid container direction="column" lg={12} className={classes.boxPadding} >
                        &nbsp;
                    </Grid>
                </Grid>    
               
                {/* <Grid container direction="row">         
                    <Grid container direction="column" lg={12} className={classes.boxPadding} style={{ 'backgroundColor':'#162235'}}>
                        <Grid container spacing={0}>
                            {        
                                blogs && blogs.length ? blogs.map( ( blog,index ) => 
                                    (
                                        <BlogCard blog={blog} isAdmin={false} key={index} handleDelete={null} handleEdit={null}  />
                                    )    
                                ) : <span style={{color:'black'}}>No blogs found</span>
                            }    
                            {
                                isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                            }
                        </Grid> 
                    </Grid>  
                    
                </Grid> */}
                <Container  style={{width: contentWidth, maxWidth: 'calc(3000px)',background: '#05284d', color: '#fff', padding: '10px 0px 10px 0px', margin: '50px 0px', 'marginLeft': 'calc(-50vw + 50%)'}}>
            <Box my={5} display="flex" style={{marginBottom: 10, color: '#00'}} justifyContent="center"><Typography variant="h3" >Featured Blogs</Typography></Box>
            <Box mt={10} style={{marginTop:0, padding: matches ? '0 10px' : '0 50px' }}>
                <Container maxWidth="lg">
                    <Box py={10} style={{marginTop: 0, paddingTop: 0}}>
                        <Grid container spacing={3}>
                            {
                                blogs && blogs.length ? blogs.map( ( blog,index ) => 
                                    (
                                    <BlogCard blog={blog} isAdmin={false} key={index} handleDelete={null} handleEdit={null}  />

                                    )
                                ) : null
                            }
                            {
                                isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>
            
            
        </Container>
        <Footer color="black"/>
        </Container>

        </Box>

        </>
    )
}

export default Blog
