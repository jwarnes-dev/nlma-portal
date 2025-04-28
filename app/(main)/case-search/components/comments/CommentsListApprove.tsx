'use client'

import * as React from 'react';
import { Avatar, Box, Button, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import useFetchComments from '../../hooks/useFetchComments';
import { useEffect, useRef, useState } from 'react';

import { Comment } from '@common/types'

import { doc, addDoc, setDoc, query, orderBy, collection, onSnapshot, getDocs} from "firebase/firestore";
import { useAuth } from '@auth/FirebaseContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

dayjs.extend(relativeTime);

//TODO: move to util
function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

type CommentsListApprovetProps = {
  commentso: Comment[];
  actions: boolean;
};


export default function CommentsListApprove({ commentso, actions }: CommentsListApprovetProps) {

  const [ comments, setComments ] = useState<Comment[]>([]);
  const { user, logout, db, isAuthed } = useAuth();
  
  const initialized = useRef(false)

  useEffect(() => {
    const q = query(collection(db, 'comments', 'C494248', 'comments'), orderBy("last", "asc"));

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //       const c = {...change.doc.data(), id: change.doc.id} as Comment
    //       if (change.type === "added") {
    //         console.log("comment", c);
    //       //     setContacts( prev => {
    //       //         return [...prev, c]
    //       //     })
    //       }
    //       if (change.type === "modified") {
    //           // setContacts( prev => prev.map(i => {
    //           //     return i.id === c.id ? c : i;
    //           // }))
    //       }
    //       if (change.type === "removed") {
    //           // setContacts(prev => prev.filter(i => i.id !== c.id))
    //       }
    //   });
    // });

    const querySnapshot =  getDocs(collection(db, "comments", 'C494248', 'comments')).then((querySnapshot) => {
      if (!initialized.current) {
        initialized.current = true;


      querySnapshot.forEach((doc) => {
        let c = {...doc.data(), id: doc.id};
        // c.date = c.date.toDate();

          setComments(prev =>{
            if(comments.filter(f => f.id === c.id).length < 1) {
              return [...prev, c as Comment]
            } else {
              return prev;
            }
          });

        

      });
    }
    });


  }, [])

  const handleComment = (options) => {
    console.log("handleComment", options)

    const cRef = doc(db, "comments", 'C494248', 'comments', options.id);
    setDoc(cRef, { status: options.status }, { merge: true });

    setComments(prev => prev.map(c => {
      if(c.id === options.id) {
        return {...c, status: options.status}
      } else {
        return c;
      }
    }))

  }

  
  const filteredComments = actions ? comments.filter(c => c.status === 'pending') : comments.filter(c => c.status === 'approved');
  const sortedComments = filteredComments.sort((a,b) => a.date < b.date ? 1 : -1)
    return (
        <Box>
          {sortedComments.length < 1 && <Typography>No public comments posted.</Typography>}
            {sortedComments && sortedComments.map(c => (
                <Paper square={false} key={c.id} elevation={2} sx={{marginTop: "16px", padding: "14px"}}>
                    <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                        <Avatar {...stringAvatar(`${c.fname} ${c.lname}`)} />
                        <Typography variant='h6' fontWeight={'500'}>{`${c.fname} ${c.lname[0]}.`}</Typography>
                        <Typography color="#67727e">{
                            dayjs().diff(dayjs(c.date), 'days') <= 3 
                            ? dayjs(c.date).fromNow() 
                            : dayjs(c.date).format('MMM D, YYYY')
                            }
                        </Typography>
                        {actions ? <>
                                <Typography>Case: <Link href="/case-search/C494248">C494248</Link></Typography>
                                <Button onClick={() => handleComment({
                                  case: 'C494248',
                                  id: c.id,
                                  status: 'approved'
                                })} variant="outlined" color='success' startIcon={<CheckIcon />}> Approve Comment </Button>
                                <Button onClick={() => handleComment({
                                  case: 'C494248',
                                  id: c.id,
                                  status: 'rejected'
                                })} variant="outlined" color='error' startIcon={<CloseIcon />}> Reject </Button>
                                </>
                         : null}

                    </Stack>
                    <Typography sx={{marginTop: '12px'}} color="#67727e">
                        {c.text}
                    </Typography>
                </Paper>
            ))}
        </Box>
    )
}
