
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
import '@common/styles.css'

import type { Navigation } from '@toolpad/core';

import theme from '../theme';

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

const BRANDING = {
  title: 'Legal Matters Accelerator Public Portal',
  logo: ''
};


export default function RootLayout(props: { children: React.ReactNode }) {

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </AppProvider>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
