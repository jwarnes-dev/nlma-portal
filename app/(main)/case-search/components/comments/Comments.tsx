import { Box } from '@mui/material';
import * as React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useFetchComments from '../../hooks/useFetchComments';
import { useEffect } from 'react';
import { doc, addDoc, setDoc, query, orderBy, collection, onSnapshot, getDocs} from "firebase/firestore";
import { useAuth } from '@/app/auth/FirebaseContext';
import CommentsListApprove from './CommentsListApprove';

export default function Comments(){
    const { comments, submitComment } = useFetchComments(); 
    const { user, logout, db, isAuthed } = useAuth();
    
    const caseId = 'C494248';

    const addComment = (comment) => {

        const cRef = collection(db, "comments", 'C494248', 'comments');
        addDoc(cRef, {...comment, status: 'pending'});
    }
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CommentForm submitComment={addComment} />
            {/* <CommentList comments={comments || []} /> */}
            <CommentsListApprove commentso={[]} actions={false} />
        </Box>
    )
}