
import "../styles/main.css";
import { UserProvider } from "../contexts/UserProvider";
import { useEffect } from 'react';
import '../styles/custom.css'
function MyApp({ Component, pageProps }) {

    return (

        <UserProvider>
  <div className="container">

            <Component {...pageProps} />
            </div>
        </UserProvider>

    );
}

export default MyApp;
