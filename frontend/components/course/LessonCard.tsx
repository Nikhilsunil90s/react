import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import TextTruncate from 'react-text-truncate'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import API from 'utils/API'
import { Button, Grid } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    videoOverlay: {
        cursor: 'pointer',
        opacity: 0,
        transition: 'all 1s',
        '&:hover': {
            opacity: 1,
        }
    },
    buttonWrapper: {
        width: 250,
        marginTop: 20,
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'center',

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },

}))

interface lessonType {
    id: number,
    thumbnail: string,
    video: string,
    duration: string,
    title: string,
    description: string
}

interface CourseCardProps {
    lesson: lessonType,
    count: number,
    isAdmin?: boolean,
    showLessonModal(e: lessonType): void,
    handleDelete?(e: any): void,
    handleEdit?(e: any): void
}

const LessonCard: React.FC<CourseCardProps> = ({ lesson, isAdmin, count, showLessonModal, handleDelete, handleEdit }) => {

    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const screenMatches = useMediaQuery('(max-width:768px)')
    const [thumbnail, setThumbnail] = useState(null)

    const retrieveThumbnail = () => {
        console.log(lesson.thumbnail)

        API({
            method: 'GET',
            url: '/media/' + lesson.thumbnail,
            responseType: 'arraybuffer'

        })
            .then(response => {

                const base64Str = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                let image = `data:image/${lesson.thumbnail.substring(lesson.thumbnail.lastIndexOf('.') + 1)};base64, ${base64Str}`
                setThumbnail(image)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        retrieveThumbnail()
    })

    return (
        <Box>
        

            { isAdmin ?
                (
                    
                    <Box display="flex" flexDirection={matches ? 'column' : 'row'}>
                    <Box position="relative" flex={matches ? "" : "0 0 250px"} display="flex" alignItems="center" width="250px" height="200px" borderRadius={5} style={{ overflow: 'hidden' }}>
                        <Image
                            src={thumbnail}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                            color="#27293D"
                        />
                        <Box position="absolute" borderRadius={10} style={{ background: '#191919', right: 10, bottom: 10, padding: 5 }}>
                            <Typography variant="body2" style={{ color: '#F6F6F6', fontWeight: 600 }}>{lesson.duration}</Typography>
                        </Box>
                        <Box position="absolute" width="250px" height="200px" className={classes.videoOverlay} onClick={() => showLessonModal(lesson)}>
                            <Box zIndex={9} width="250px" height="200px" position="absolute" display="flex" justifyContent="center" alignItems="center" style={{ background: '#191919', opacity: .6 }}></Box>
                            <Box zIndex={9} width="250px" height="200px" position="absolute" display="flex" justifyContent="center" alignItems="center"><PlayCircleOutlineIcon color="primary" style={{ width: 50, height: 50 }} /></Box>
                        </Box>
                    </Box>
                    <Box ml={matches ? 0 : 3} mt={matches ? 3 : 0} height={matches ? 'auto' : 200} maxWidth="600" display="flex" flexDirection="column" justifyContent={matches ? "flex-start" : "center"}>
                        <Box>
                            <Typography variant="h6" style={{ fontWeight: 600, color: '#F6F6F6', cursor: 'pointer' }} onClick={() => showLessonModal(lesson)} >
                                <TextTruncate
                                    line={3}
                                    element="span"
                                    truncateText="…"
                                    text={count + ". " + lesson.title}
                                />
                            </Typography>
                        </Box>
                        <Box mt={1}>
                            <Typography variant="body1" style={{ color: '#7f7f7f' }}>
                                <TextTruncate
                                    line={4}
                                    element="span"
                                    truncateText="…"
                                    text={lesson.description}
                                />
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.buttonWrapper}>
                        {
                            <Box>
                                <EditIcon color="primary" onClick={() => handleEdit(lesson)} style={{ cursor: 'pointer' }} />
                                <DeleteIcon color="primary" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => { if (window.confirm('Delete this lesson?')) { handleDelete(lesson.id) }; }} />
                            </Box>
                        }
                    </Box>
                </Box>
                         
                ) : 
            <Box >
                <Accordion  >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    <Typography className={classes.heading} onClick={() => showLessonModal(lesson)}>
                        <TextTruncate
                        line={3}
                        element="span"
                        truncateText="…"
                        text={count + ". " + lesson.title}
                    />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="body1" style={{ color: '#7f7f7f' }}>
                    <TextTruncate
                        line={4}
                        element="span"
                        truncateText="…"
                        text={lesson.description}
                    />
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Box>
            }


        </Box>
    )
}

export default LessonCard