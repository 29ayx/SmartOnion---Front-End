
import "../styles/main.css";
import { UserProvider } from "../contexts/UserProvider";
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {

    // useEffect(() => {
    //     const scripts = [
    //         "/assets/vendor/global/global.min.js",
    //         "/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js",
    //         "/assets/vendor/jquery-nice-select/js/jquery.nice-select.min.js",
    //         "/assets/js/custom.min.js",
    //         "/assets/js/dlabnav-init.js",
    //         "/assets/js/demo.js",
    //         "/assets/js/styleSwitcher.js"
    //     ];

    //     scripts.forEach(src => {
    //         const script = document.createElement('script');
    //         script.src = src;
    //         script.async = true;
    //         document.body.appendChild(script);
    //         return () => {
    //             document.body.removeChild(script);
    //         }
    //     });

    //     return () => {
    //         scripts.forEach(src => {
    //             document.querySelectorAll(`script[src="${src}"]`).forEach(el => el.remove());
    //         });
    //     };
    // }, []);

    return (

        <UserProvider>


            <Component {...pageProps} />

        </UserProvider>

    );
}

export default MyApp;
