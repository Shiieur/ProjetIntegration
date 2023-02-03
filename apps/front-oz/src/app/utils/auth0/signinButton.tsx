import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const SigninButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect({
    screen_hint: 'signup',
  })} sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem'}}>S'inscrire</Button>;
};

export default SigninButton;
