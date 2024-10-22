import * as React from 'react';
import { Box, Paper, Stack, Typography, TextField, Button, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useState } from 'react';
import useFetchComments from '../../hooks/useFetchComments';

interface ICommentForm {
    fname: string;
    lname: string;
    comment: string;
    loading: boolean;
}

type CommentFormProps = {
    submitComment: Function;
  };
  
export default function CommentForm({submitComment}: CommentFormProps){
    const [form, setForm] = useState<ICommentForm>({fname: "", lname: "", comment: "", loading: false});


    const handleSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const isFormValid = ():boolean => {
        return form.fname.length > 0 && form.lname.length > 0 && form.comment.length > 0
    }

    const handleSubmitComment = () => {
        setForm({...form, loading: true})

        setTimeout(() => {
            setForm({fname: "", lname: "", comment: "", loading: false})
            submitComment({
                date: new Date().toString(),
                fname: form.fname,
                lname: form.lname,
                text: form.comment,
                id: `C${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
            })
        }, 1200)
    }

    return (
        <Paper elevation={0}>
            <Typography variant='h5' sx={{marginBottom: '16px'}}>Submit a comment</Typography>
            <Stack direction="row" spacing={2}>
                <TextField
                    required
                    name="fname"
                    label="First Name" size='small'
                    value={form.fname}
                    onChange={handleSearchFormChange}
                    disabled={form.loading}
                />
                <TextField
                    required
                    name="lname"
                    label="Last Name" size='small'
                    value={form.lname}
                    onChange={handleSearchFormChange}
                    disabled={form.loading}
                />
                <LoadingButton
                    variant='outlined'
                    onClick={handleSubmitComment}
                    loading={form.loading}
                    disabled={!isFormValid()}
                >
                    Submit
                </LoadingButton>
            </Stack>
            <TextField name="comment" sx={{minWidth: '700px', margin: '8px 0'}} multiline label="Comment" placeholder='Add your comment for submission' 
                value={form.comment}
                onChange={handleSearchFormChange}
                disabled={form.loading}
            />
            <Divider />
        </Paper>
    )
}