import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-b9vx32nw.us.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://osmoz.be`,
        });

        //didn't find a better way to find the string after the third "
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const roleSearcher = window.atob(base64);
        setRole(roleSearcher.split('"')[3]);

        //if accessToken isn't null then set it in the local storage with the key 'token' to be fecthed for the creation of axios instance as a header
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          localStorage.setItem('role', role); 
        }

        const userDetailsByIdUrl = user !== undefined ? `https://${domain}/api/v2/users/${user?.sub}` : '';

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, role, user?.sub]);

   return <></>;
};

export default UserProfile;
