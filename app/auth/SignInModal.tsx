/* eslint no-use-before-define: 0 */  // --> OFF

import React from 'react';
import { Modal, Box, Typography, Button, Alert, Stack, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppProvider, Session } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuth } from './FirebaseContext';

var _svg, _svg2;
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function GoogleIcon() {
  return _svg || (_svg = /*#__PURE__*/_jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    children: [/*#__PURE__*/_jsx("path", {
      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
      fill: "#4285F4"
    }), /*#__PURE__*/_jsx("path", {
      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
      fill: "#34A853"
    }), /*#__PURE__*/_jsx("path", {
      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
      fill: "#FBBC05"
    }), /*#__PURE__*/_jsx("path", {
      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
      fill: "#EA4335"
    }), /*#__PURE__*/_jsx("path", {
      d: "M1 1h22v22H1z",
      fill: "none"
    })]
  }));
}

function FacebookIcon() {
  return _svg2 || (_svg2 = /*#__PURE__*/_jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 48 48",
    children: [/*#__PURE__*/_jsx("path", {
      fill: "#316FF6",
      d: "M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
    }), /*#__PURE__*/_jsx("path", {
      fill: "#fff",
      d: "M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
    })]
  }));
}

function CerebraIcon() {
  return <img style={{width: '24px', height: '24px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAMAAAAynjhNAAABMlBMVEVHcEzf4OKwsbPu8fPb1Me2wcfk5ujD1NKut77T1tPu7u/yeDnkn1rxijz0gEv2mmX1vJS6uLf5vYnFx8rtgEeZmpy9vb/xlWn2nnPxkl7spWrm3tXDyc3FxsnzgiWcjIi6uLb2lFPFxsr3oWrYonv2o3bQs5vLxb/tdT/4omf1kVegoaXMiWblp4vZ2drx3M3OuqzCjnWqq6+PkJP4ggD////+///Y2977mBLz9ff++fL4jBn3zKr1aBD7+/z5jQn72b33fhL4hAD3fAX2cgD3q231cRv4nUv4lzPzVwf5tHv4wZDuYifujlfbxrHHxcT74s3hqX/8lwTYuqSioKHO0dX2iiz87d+9v8GOkJTvgVD2omnlxrPkwqT4/P7Iy87l1svQqZT2sIjtzrP4oWHUhlNfSoqaAAAANXRSTlMA/f79EyH+BDcM+Py89kc8QVwzsceDQolZrrmfjPD7PMHbd2yzJLbQ5pq9yefg7b3woOmr47UyAGoAAAHVSURBVCiRlZMHb5tAGIaPDXFJbMcj3mmWlNHdwwHMMNurtuOdnY7//xd6ZxNSYdlSHwkd4uF9dR86APgfuHxym95tvd8sk7fC8enmKF3gALdZb1ZbUlgK4Y1Q21t/kWZWK5+9JBMH8SjDL9faN5KQFC+uV1bIkiyESi8jxHQKP2CyEx3CmS/S8XAOF1+iqNRpXsQt4GvoOpShZAbfjwHHHx1N6qUc9zpA8guylGL6QafEpyofWVnXderD3mu8kMkMXVVtPD+Rc0KGGElJ7Eb12ZE5UFiS7FNwJaF0143S9FcKsuS4vyPBUCs/W2/zpSr6fIyHXjkJDnqtRDrq7s3Hiyc9rIWKeedoiagagOmfMRGWzsx2YDuJwj/TM1dOtd0wzUan7auWZYvnb8UAnF4tXnzHcWzbsozAbZQik8Yd+e6CgjOzgfhVxxDsDoIog/Mi0het7gBKMktgQaEvhnehU/VKeioifdDVtN6oT1CPEp7qUZYptj7pP7hTe3mo8xrCE3+3O/f3PxCj0XDoXxuGVcW/BMe/3Hqa5zWbTctQjWvEzQ2yqvtpuUEhVf48FKtIq6oa2sB9eK7v55aeAwJD82cnJ+8wxeLZPqLM0OtHltt63Nf4C0fiVgMVzyFNAAAAAElFTkSuQmCC" />
}



const providers = [{ id: 'credentials', name: 'Email and Password' }];


const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};


interface SignInModalProps {
  open: boolean;
  setSession: (session: Session | null) => void;
  handleClose: () => void;
}



const SignInModal: React.FC<SignInModalProps> = ({ open, handleClose, setSession }) => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { user, logout, login, db, isAuthed, isLoading, isError } = useAuth();


  const handleModalClose = (e, reason) => {
    if(reason === 'backdropClick' && isLoading) {
      return
  }
  handleClose();
}

  return (

    <Dialog
        open={open && !isAuthed}
        onClose={handleModalClose}
        autoFocus
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            setLoading(true);

            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            login({ email: formJson.email, password: formJson.password }, setSession);

            // console.log(email);
          },
        }}
      >
        <DialogTitle sx={
          {
            fontSize: '1.5rem',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'center',

          }}>Sign in to Cerebra LMA</DialogTitle>
        <DialogContent>
          <Box sx={{
              width: '330px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant='body2' color='textSecondary' gutterBottom>Please sign in to continue.</Typography>
            <Stack direction={'column'} spacing={1}  sx={{width: '330px', margin: '8px 0'}}>
              <Button disabled={isLoading} variant="outlined" startIcon={<CerebraIcon />}> Sign in with Cerebra </Button>
              <Button disabled={isLoading} variant="outlined" startIcon={<GoogleIcon />}> Sign in with Google </Button>
              <Button disabled={isLoading} variant="outlined" startIcon={<FacebookIcon />}> Sign in with Facebook </Button>
            </Stack>
            <Divider>or</Divider>
            <TextField
              autoFocus
              required
              margin="dense"
              name="email"
              label="Email"
              id="email"
              type="email"
              fullWidth
              variant="outlined"
              size='small'
              disabled={isLoading}
            />
            <TextField
              required
              margin="dense"
              name="password"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              size='small'
              disabled={isLoading}
            />
            { isError ? <Alert sx={{marginTop: '8px'}} severity="error">Oops, those credentials didn&apos;t work! </Alert> : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>Cancel</Button>
          <LoadingButton  loading={isLoading} variant="contained" type='submit'>
            Sign In
      </LoadingButton>
        </DialogActions>
      </Dialog>
  );
};

export default SignInModal;