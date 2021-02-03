import React from 'react'
import { Box, Typography } from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export default function Widget({bg,title,desc, type}) {
    
    return (
        <div>
            <Box display="flex" height="100px" style={{background: '#191919' , borderRadius: 10}}>
                <Box display="flex" justifyContent="center" alignItems="center" style={{background: `${bg}`}} height="80px" width="80px" mt={-5} ml={2}>
                    {
                        type === "ClassIcon" ? <ClassIcon fontSize="large" /> :
                            (type === "DescriptionIcon" ? <DescriptionIcon fontSize="large" /> :
                            (type === "InsertCommentIcon" ? <InsertCommentIcon fontSize="large" /> :
                            (type === "PeopleAltIcon" ? <PeopleAltIcon fontSize="large" /> : null)))
                    }
                </Box>
                <Box width="150px" display="flex" flexDirection="column" alignItems="flex-end" pr={1} pt={1}>
                    <Box><Typography variant="h6">{title}</Typography></Box>
                    <Box><Typography variant="h6">{desc}</Typography></Box>
                </Box>
            </Box>
        </div>
    )
}
