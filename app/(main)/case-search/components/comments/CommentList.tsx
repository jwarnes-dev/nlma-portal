'use client'

import * as React from 'react';
import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import useFetchComments from '../../hooks/useFetchComments';
import { useEffect } from 'react';

import { Comment } from '@common/types'

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

type CommentsListProps = {
  comments: Comment[];
};


export default function CommentsList({ comments }: CommentsListProps) {

  const sortedComments = comments.sort((a,b) => a.date < b.date ? 1 : -1)
    return (
        <Box>
            <h3>Comments</h3>
            {sortedComments && sortedComments.map(c => (
                <Paper square={false} key={c.id} elevation={2} sx={{marginTop: "16px", padding: "14px"}}>
                    <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                        <Avatar {...stringAvatar(`${c.fname} ${c.lname}`)} />
                        <Typography variant='h6' fontWeight={'500'}>{`${c.fname} ${c.lname[0]}.`}</Typography>
                        <Typography color="#67727e">{
                            dayjs().diff(dayjs(c.date), 'days') <= 3 
                            ? dayjs(c.date).fromNow() 
                            : dayjs(c.date).format('MMM D, YYYY')
                            }</Typography>
                    </Stack>
                    <Typography sx={{marginTop: '12px'}} color="#67727e">
                        {c.text}
                    </Typography>
                </Paper>
            ))}
        </Box>
    )
}