import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './assets/home';
import Chat from './assets/Chat';
import NotFound from './assets/NotFound';
import Login from './assets/Login';
import SignUp from './assets/SignUp';
import Loading from './assets/Loading';

export default function App (){
  const router = createBrowserRouter([

    {path: "/",element: <Loading /> },
    {path: "/Login",element: <Login /> },
    {path: "/SignUp",element: <SignUp /> },
    {path: "/Home",element: <Home /> },
    {path: "/chat",element: <Chat /> },
    {path: "*",element: <NotFound /> },
  
  ]);
  
  return <RouterProvider router={router}/>
}
