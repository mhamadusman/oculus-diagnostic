import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { AuthProvider } from './Components/Auth/AuthContext/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals'
import Home from './Components/Home/Home';
import Layout from './Layout/Layout';
import Profile from './Components/Profile/Profile';
import Result from './Components/Result/Result';
import LoginForm from './Components/Auth/LoginForm';
import Records from './Components/Record/Records'
import SignUpForm from './Components/Auth/SignUpForm';
import FileUpload from './Components/Home/FileUpload/FileUpload';
import ImageDetails from './Components/ImageDetaile/ImageDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes without Layout (Login & Sign Up) */}
      <Route path='/login' element={<LoginForm />} />
      <Route path='/signup' element={<SignUpForm />} />

      {/* Routes with Layout */}
      
        <Route path='/' element={<Layout />}>
     
          <Route index element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/result' element={<Result />} />
          <Route path='/records' element={<Records />} />
          <Route path='/records/:id' element={<ImageDetails />} />
          <Route path='/upload' element={<FileUpload />} />
    
        </Route>
      
    </>
  )
);

root.render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
