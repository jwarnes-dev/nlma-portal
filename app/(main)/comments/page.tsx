import * as React from 'react';
import Typography from '@mui/material/Typography';
import { PageContainer } from '@toolpad/core';
import PendingComments from './components/PendingComments';

export default function CommentsApprovalPage() {
    const title = `Comments Approval`;

    const  breadCrumbs = [
        {title: "Pending Comments", path: "../comments"},
    ]


    return (
        <PageContainer className='page-container-max' sx={{maxWidth: '200px'}} title={title} >
            <PendingComments />
        </PageContainer>
    )
}
