import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import lightBlue from "@material-ui/core/colors/lightBlue"

const primaryLight = lightBlue[100];

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        maxWidth: 300,
        width: '100%',
        background: theme.palette.primary.light,
        display: 'flex',
        flexDirection: 'column',
        margin: '20px 0px',
        padding: 20,
        borderRadius: 10,
        gap: 10,
        boxShadow:'2px 2px 5px #DDD',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 600,
        },
    },
    category: {
        fontWeight: 600, 
        background: primaryLight, 
        padding: 5, 
        display: 'inline'
    }
}))

export default function Categories({categories}) {

    const classes = useStyles()

    return (
        <Box className={classes.contentWrapper} >
            <Typography variant="h6" style={{fontWeight: 600}} color="primary">Categories</Typography>
                {
                    categories ? categories.map( category => (
                        <Box mt={1}><Typography key={category.id} style={{cursor: 'pointer'}} variant="body1" color="primary" className={classes.category}>{category}</Typography></Box>
                    )) : null
                }
        </Box>
    )
}
