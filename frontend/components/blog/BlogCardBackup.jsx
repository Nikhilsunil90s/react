import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Image from 'material-ui-image'
import lightBlue from "@material-ui/core/colors/lightBlue"
import TextTruncate from 'react-text-truncate'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

const primaryLight = lightBlue[100];

const useStyles = makeStyles((theme) => ({

    contentWrapper: {
        maxWidth: 600,
        width: '100%',
        background: theme.palette.primary.dark,
        display: 'flex',
        margin: '20px 0px',
        padding: 20,
        borderRadius: 10,
        gap: 20,
        boxShadow:'2px 2px 5px #1E88F7',
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        },
    },
    content: {
        display: 'flex',
        gap: 10,
        marginBottom: 5,
    },
    title: {
        width: 'auto',
        color: '#817D7D',
        marginRight: 5,
    },
    img: {
        marginRight: 5,
    },
    buttonWrapper: {
        marginTop: 20,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        },

    },
    button: {
        margin: theme.spacing(1),
    },

}))


export default function EventCard({blog, isAdmin, handleDelete, handleEdit}) {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')
    const matchesSmall = useMediaQuery('(max-width:400px)')
    const matchesXs = useMediaQuery('(max-width:400px)')
    const [date, setDate]= useState('')

    useEffect( () => {
        const d= new Date(blog.createdAt)
        setDate(d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear())
    }, [])

    return (
        <Box className={classes.contentWrapper}>
        <Box alignSelf="flex-start" className={classes.img}>
            <Image
                src={`/media/images/${blog.mainImg}`}
                style={{objectFit: 'cover', width: 150, height: 150, cursor: 'pointer'}}
            />
        </Box>
        <Box width="100%">
            <Box mb={matches ? '10px' : '0px'}>
                <Typography variant={ matchesSmall ? 'body2' : 'body1'} style={{fontWeight: 600, cursor: 'pointer', color: '#1E88F7'}}>
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={blog.title}
                    />
                </Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="body2" style={{color: '#fff'}}>
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={blog.content}
                    />
                </Typography>
            </Box>

            <Box className={classes.content} mt={1}>
                <Box className={classes.title}><Typography variant="body2">By:</Typography></Box>
                <Box width="100%">
                    <Typography variant="body2" style={{color: '#FFF'}}>
                        <TextTruncate
                                line={1}
                                element="div"
                                truncateText="…"
                                text={blog.author}
                        />
                    </Typography>
                </Box>
            </Box>

            <Box className={classes.content} mt={1}>
                <Box className={classes.title}><Typography variant="body2">Date:</Typography></Box>
                <Box width="100%">
                    <Typography variant="body2" style={{color: '#FFF'}}>
                        <TextTruncate
                                line={1}
                                element="div"
                                truncateText="…"
                                text={date}
                        />
                    </Typography>
                </Box>
            </Box>
            { isAdmin ? 
                    (
                        <Box className={classes.buttonWrapper}>
                            {
                                !matchesXs ? 
                                (
                                    <Box>
                                        <Button
                                        className={classes.button}
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={ () => handleEdit(blog) }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => { if(window.confirm('Delete this course?')){handleDelete(blog.id)};}}
                                    >
                                        Delete
                                    </Button>
                                    </Box>
                                ) : 
                                (
                                    <Box>
                                        <EditIcon 
                                            color="primary" 
                                            onClick={ () => handleEdit(blog) }
                                        />
                                        <DeleteIcon 
                                            color="primary" 
                                            style={{marginLeft: 5}} 
                                            onClick={() => { if(window.confirm('Delete this course?')){handleDelete(blog.id)};}}
                                        />
                                    </Box>
                                )
                            }
                        </Box>
                    ) : null
                }   
        </Box>
    </Box>
    )
}
