import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => {
        logout({ returnTo: window.location.origin });
        localStorage.clear();
      }}
      sx={{ color: 'white', fontFamily: 'comfortaa', fontSize: '1.4rem'}}
    >
      Se déconnecter
    </Button>
  );
};

export default LogoutButton;
