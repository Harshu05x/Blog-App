import React, { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';

function App(props) {

    return (
        <div className='bg-slate-800'>
           <Routes>
                <Route path='/' element={ <HomePage />}/>
                <Route path='/login' element={ <LoginPage /> }/>
                <Route path='/signup' element={ <SignupPage /> }/>
                <Route path='/createBlog' element={ <CreateBlogPage />}/>
                <Route path='/editBlog' element={ <EditBlogPage />}/>
                <Route path='/blog/:blogId' element={<BlogPage />}/>
           </Routes>
        </div>
    );
}

export default App;