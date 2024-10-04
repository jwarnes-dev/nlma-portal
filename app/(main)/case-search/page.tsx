"use client"; 

import * as React from 'react';
import Typography from '@mui/material/Typography';
import CaseTable from './components/CaseTable';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { LicenseInfo } from '@mui/x-license';
LicenseInfo.setLicenseKey('61a54ed3211f341a4682d845b2c01039Tz05ODk2OCxFPTE3NTkwNTU0NDMwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLFBWPVEzLTIwMjQsS1Y9Mg==');

export default function CaseSearchPage() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CaseTable />
    </LocalizationProvider>
  );
}
