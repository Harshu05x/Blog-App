import BlogForm from '@/components/ui/BlogForm';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import React from 'react';
import { useSelector } from 'react-redux';

function EditBlogPage(props) {
    const {blog} = useSelector((state) => state.auth);
    return (
        <div>
            <Navbar />
            <BlogForm create={false} post={blog}/>
            <Footer />
        </div>
    );
}

export default EditBlogPage;