import { Box } from '@mui/material';
import * as React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useFetchComments from '../../hooks/useFetchComments';
import { useEffect } from 'react';

export default function Comments(){
    const { comments, submitComment } = useFetchComments(); 
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CommentForm submitComment={submitComment} />
            <CommentList comments={comments || []} />
        </Box>
    )
}