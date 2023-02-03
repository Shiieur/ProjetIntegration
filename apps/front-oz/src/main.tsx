import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-b9vx32nw.us.auth0.com"
    clientId="EOHLdEZS8KaK5CfpscR9ebZzd9ibyy4C"
    redirectUri={window.location.origin}
    audience="https://osmoz.be"
    scope="read:current_user update:current_user_metadata" // create:ingredients read:ingredients delete:ingredients	update:ingredients read:recipes	create:recipes delete:recipes	update:recipes
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>
);
