import * as React from 'react';
import { Box, Paper, Stack, Typography, TextField, Button, Divider, Alert, CircularProgress, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';

import LoadingButton from '@mui/lab/LoadingButton';

import { useState } from 'react';
import useFetchComments from '../../hooks/useFetchComments';
import { FileUploadOutlined } from '@mui/icons-material';
import axios from 'axios';

interface ICommentForm {
    fname: string;
    lname: string;
    email: string;
    town: string;
    comment: string;
    loading: boolean;
}

interface ICommentAlert {
    text: string;
    severity: 'success' |  'info' |  'warning' |  'error';
}

type CommentFormProps = {
    submitComment: Function;
  };
  
export default function CommentForm({submitComment}: CommentFormProps){
    const [form, setForm] = useState<ICommentForm>({fname: "", lname: "", comment: "", loading: false, town: "", email: ""});

    const [alert, setAlert] = useState<ICommentAlert>({severity: 'info', text: 'Comments are reviewed before display and may not appear immediately.'})

    const [file, setFile] = useState<string>('');


    const handleSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const isFormValid = ():boolean => {
        return form.fname.length > 0 && form.lname.length > 0 && form.comment.length > 0 && form.email.length > 0 && form.town.length > 0
    }

    const handleSubmitComment = () => {
        setForm({...form, loading: true})

        setTimeout(() => {
            setForm({fname: "", lname: "", comment: "", loading: false, town: "", email: ""})
            submitComment({
                date: new Date().toString(),
                fname: form.fname,
                lname: form.lname,
                email: form.email,
                town: form.town,
                text: form.comment,
                id: `C${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
            })

            setAlert({severity: 'success', text: 'Your comment has been submitted and is awaiting review!'})
        }, 1200)
    }

    
    const FILE_UPLOAD_URL = '/upload';

    const handleUpload = (event) => {
        event.preventDefault();
        console.log("File submitted", event.target.files[0])

        const file = event.target.files[0];
        const formData = new FormData();

        setFile(file.name);
        formData.append('file', file);
      
        axios.post(FILE_UPLOAD_URL, formData)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
    }

    const submitUpload = () => {
        
    }


    return (
        <Paper elevation={0}>
            <Typography variant='h5' sx={{marginBottom: '16px'}}>Submit a comment</Typography>
            <Grid container spacing={2}>
                <Grid size={6}> 
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
                            sx={{width: '147px'}}
                        >
                            Submit
                        </LoadingButton>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{marginTop: '8px', width: '600px'}}>
                        <TextField
                            required
                            name="email"
                            label="Email" size='small'
                            value={form.email}
                            onChange={handleSearchFormChange}
                            disabled={form.loading}
                            fullWidth 
                        />
                        <TextField
                            required
                            name="town"
                            label="Town" size='small'
                            value={form.town}
                            onChange={handleSearchFormChange}
                            disabled={form.loading}
                            fullWidth 
                        />
                    </Stack>
                    <TextField name="comment" sx={{minWidth: '600px', margin: '8px 0'}} multiline label="Comment" placeholder='Add your comment for submission' 
                        value={form.comment}
                        onChange={handleSearchFormChange}
                        disabled={form.loading}
                        variant='filled'
                    />
                    <TextField
                        variant="standard"          
                        type="text"
                        placeholder='Attach a file to this comment submission'
                        value={file}
                        sx={{minWidth: '600px'}}
                        InputProps={{
                            endAdornment: (
                            <IconButton component="label">
                                <FileUploadOutlined />
                                <input
                                    style={{display:"none"}}
                                    type="file"
                                    hidden
                                    onChange={handleUpload}
                                    name="[attachment]"
                                    accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png"
                                />
                            </IconButton>
                            ),
                        }}
                        />
                </Grid>
                <Grid size={4} alignContent={'center'}>
                    {form.loading ? 
                        <Alert variant="outlined" severity='info' icon={false}>
                            <Stack direction="row" spacing={2}>
                                <CircularProgress color="primary" size={20} />
                                <Box>Submitting...</Box>
                            </Stack>
                        </Alert>
                        : <Alert variant="outlined" severity={alert.severity}>
                            {alert.text}
                        </Alert>
                    }
                </Grid>
            </Grid>
            <Divider sx={{marginTop: '20px'}} />
        </Paper>
    )
}