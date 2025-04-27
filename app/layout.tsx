// @ts-nocheck
// @ts-ignore
"use client";


import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';

import { DialogsProvider, useDialogs, DialogProps } from '@toolpad/core/useDialogs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';

import { AuthProvider, useAuth } from '@auth/FirebaseContext';

import '@common/styles.css'

import {
  type Session,
} from '@toolpad/core/AppProvider';


import type { Navigation } from '@toolpad/core';

import theme from '../theme';
import SignInModal from './auth/SignInModal';
import { Segment } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'case-search',
    title: 'Search Cases',
    icon: <SearchIcon />,
  },
  {
    segment: 'intake',
    title: 'Public Case Intake',
    icon: <AssignmentIcon />,
  },
  {
    segment: 'document-search',
    title: 'Document Search',
    icon: <FindInPageIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'case-status',
        title: 'Case Status',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'attorney-metrics',
        title: 'Metrics',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const ADMIN: Navigation = [
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Administration',
  },
  {
    segment: 'comments',
    title: 'Pending Comments',
    icon: <MarkChatReadIcon />,
  }
]

const BRANDING = {
  title:<>Legal Matters Accelerator {process.env.NEXT_PUBLIC_ENV_LABEL ? <Chip label={process.env.NEXT_PUBLIC_ENV_LABEL} /> : null}</>,
  logo: ''
};


function MyCustomDialog({ open, onClose }: DialogProps) {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>Custom dialog</DialogTitle>
      <DialogContent>I am a custom dialog</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close me</Button>
      </DialogActions>
    </Dialog>
  );
}



export default function RootLayout(props: { children: React.ReactNode }) {


  const [session, setSession] = React.useState<Session | null>(null);
  
  const [open, setOpen] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);

  const [nav, setNav] = React.useState(NAVIGATION);

  let AdminNav = NAVIGATION;

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setOpen(true);
        // setSession({
        //   user: {
        //     name: 'Justin Warnes',
        //     email: 'jwarnes@gmail.com',
        //   },
        // });
        
      },
      signOut: () => {
        setSession(null);
        setIsAuthed(false);
        setOpen(false);
      },
    };
  }, []);

  function onAuth() {
    setIsAuthed(true);
    setOpen(false);
    setNav(NAVIGATION.concat(ADMIN));
  }


  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
      <AuthProvider authed={isAuthed} setAuth={setIsAuthed} onAuth={onAuth}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              navigation={nav}
              branding={BRANDING}
              session={session}
              authentication={authentication}
              theme={theme}
            >
               {props.children} 
              
            </AppProvider>
            <SignInModal setSession={setSession} open={open} handleClose={() => setOpen(false)} />
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
