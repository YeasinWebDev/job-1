import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './page/Root.jsx';
import SignIn from './page/Common/SignIn.jsx';
import SignUp from './page/Common/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import ContextProvider from './Auth/ContextProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: '/signUp',
        element: <SignUp />
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
