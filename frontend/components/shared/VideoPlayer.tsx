import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ReactPlayer from 'react-player/lazy'
import API from 'utils/API'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      background: '#3f3f3f',
      height: '100%',
      width: '100%',
      display: 'flex',
      minHeight: "400px",
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      maxHeight: 'calc(100vh - 65px)',
      width: '100%',
      maxWidth: 1920,
      overflow: 'hidden',
    },
    appBar: {
      position: 'relative',
      background: theme.palette.primary.light,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface lessonType {
  id: number,
  thumbnail: string,
  video: string,
  duration: string,
  title: string,
  description: string
}

interface videoPlayerProps {
  showLessonModal: boolean,
  lesson?: lessonType
  handleShowLessonModal(e: boolean): void,
  trailer?: string
  course_slug?: string
  enrolled?: boolean
}

const VideoPlayer: React.FC<videoPlayerProps> = ({ showLessonModal, lesson, trailer, handleShowLessonModal, course_slug, enrolled }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [courseTrailer, setCourseTrailer] = React.useState(null)
  const [lessonVideo, setLessonVideo] = React.useState(null)

  

  
  const retrieveTrailer = () => {

    API({
      method: 'GET',
      url: '/media/' + trailer,
      responseType: 'arraybuffer'

    })
      .then(response => {

        const base64Str = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        let video = `data:video/${trailer.substring(trailer.lastIndexOf('.') + 1)};base64, ${base64Str}`
        setCourseTrailer(video)

      })
      .catch(err => {
        console.log(err)
      })
  }

  const retrieveLesson = () => {

    API({
      method: 'GET',
      url: '/media/' + lesson.video,
      responseType: 'arraybuffer'

    })
      .then(response => {

        const base64Str = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        let video = `data:video/${lesson.video.substring(lesson.video.lastIndexOf('.') + 1)};base64, ${base64Str}`
        setLessonVideo(video)

      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    setOpen(showLessonModal)
    if (lesson) {
      console.log(enrolled)
      if (enrolled)
        retrieveLesson()
        
    }
    else
      retrieveTrailer()
  }, [showLessonModal])

  return (
    <div style={{height: "auto", width: "100%"}}>
        <AppBar className={classes.appBar}>
          <Toolbar>
          
            <Typography variant="h6" className={classes.title}>
              {lesson ? lesson.title : 'Trailer'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.wrapper}>
          {
            enrolled ? (

              <Box className={classes.content}>
                <ReactPlayer
                  url={lesson ? lessonVideo : courseTrailer}
                  width="95%"
                  height="400px"
                  controls={true}
                />
              </Box>

            ) : (
                <Box style={{width: "100%", textAlign: 'center'}}>  
                  { lesson ?

                    <Link href={`/checkout/${course_slug}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrowIcon />}
                        style={{ fontWeight: 600 }}
                      >
                        Enroll Now
                      </Button>
                    </Link>
                    :

                    <Box className={classes.content}>
                      <ReactPlayer
                        url={lesson ? lessonVideo : courseTrailer}
                        width="95%"
                        height="400px"
                        controls={true}
                      />
                    </Box>

                  }

                </Box>
              )
          }
        </Box>
    </div>
  );
}

export default VideoPlayer