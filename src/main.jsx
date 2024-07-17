import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './page/Root.jsx';
import SignIn from './page/Common/SignIn.jsx';
import SignUp from './page/Common/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import ContextProvider from './Auth/ContextProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './page/user/Profile.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import AllUser from './page/Admin/AllUser.jsx';
import AllTransactions from './page/Agent/AllTransactions.jsx';
const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<div className='w-full flex items-center justify-center flex-col gap-5'>
      <h1 className='font-semibold text-xl md:text-2xl pt-10'>404 Page not Found</h1>
      <Link to={'/profile'} className='btn w-fit bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl hover:bg-blue-800'>Go Back</Link>
    </div>,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path:'/profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path:'/allUser',
        element: <PrivateRoute><AllUser /></PrivateRoute>
      },
      {
        path:'/agency',
        element:<PrivateRoute><AllTransactions/></PrivateRoute>
      }
    ]

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
