// import React from 'react';
// import { NextPage } from 'next';
// import { useRouter } from "next/router";

// const withAuth = <P extends object>(Component: NextPage<P>): NextPage<P> => {
//     const Auth: NextPage<P> = ({ ...props }) => {
//         // If user is not logged in, redirect to login page
//         const userAuth = typeof window !== 'undefined' ? localStorage.getItem("username") : null;

//         const router = useRouter();

//         if (!userAuth && typeof window !== 'undefined') {
//             // Redirect to login page
//             router.push('/auth/login');
//             return null;
//         }
//         return <Component {...props as P} />;
//     };

//     // Copy getInitialProps so it will run as well
//     if (Component.getInitialProps) {
//         Auth.getInitialProps = Component.getInitialProps;
//     }

//     return Auth;
// };

// export default withAuth;
